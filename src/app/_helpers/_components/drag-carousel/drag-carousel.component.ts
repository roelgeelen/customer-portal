import {Component, ElementRef, Input, ViewChild, AfterViewInit, HostListener, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ApiService} from "../../../_services/api.service";
import {MatIcon} from "@angular/material/icon";

type Item = { src: string; title: string; href: string, external?: boolean};

@Component({
  selector: 'app-drag-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIcon],
  templateUrl: './drag-carousel.component.html',
  styleUrls: ['./drag-carousel.component.scss']
})
export class DragCarouselComponent implements AfterViewInit {
  @Input() items: Item[] = [];

  /** kaartbreedte en gap in px – pas aan naar je design */
  @Input() cardWidth = 220;
  @Input() gap = 16;
  /** optioneel padding aan de randen zodat je “peek” ziet */
  @Input() sidePadding = 12;

  @Input() isExtern: string = '';

  @ViewChild('track',    { static: true }) track!: ElementRef<HTMLElement>;
  @ViewChild('viewport', { static: true }) viewport!: ElementRef<HTMLElement>;

  currentIndex = 0;
  progress = 0; // 0..1

  private isDown = false;
  private startX = 0;
  private startOffset = 0;  // translateX bij drag start
  private rafId: number | null = null;
  // nieuw: flags en drempel
  private dragging = false;
  private pointerId: number | null = null;
  private dragThreshold = 6; // px

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit(): void {
    this.snapTo(0, false);
    // Defer: voorkomt NG0100
    queueMicrotask(() => {
      this.updateProgress();
      this.cdr.markForCheck();
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.snapTo(this.currentIndex, false);
    this.updateProgress();
  }

  onPointerDown(ev: PointerEvent) {
    if (ev.button !== 0 && ev.pointerType === 'mouse') return;

    this.pointerId = ev.pointerId;
    this.isDown = true;
    this.dragging = false;        // <-- reset
    this.startX = ev.clientX;
    this.startOffset = this.currentTranslateX();
    // BELANGRIJK: nog GEEN setPointerCapture hier!
    // Geen transition wijzigen: doen we pas wanneer het slepen echt start.
  }

  onPointerMove(ev: PointerEvent) {
    if (!this.isDown) return;

    const delta = ev.clientX - this.startX;

    // start drag pas als we voorbij drempel zijn
    if (!this.dragging && Math.abs(delta) > this.dragThreshold) {
      this.dragging = true;
      // vanaf nu capture + animatie uit
      this.viewport.nativeElement.setPointerCapture(this.pointerId!);
      this.track.nativeElement.style.transition = 'none';
    }

    if (!this.dragging) {
      // nog geen echte drag -> NIET preventDefault, laat click mogelijk blijven
      return;
    }

    ev.preventDefault(); // alleen tijdens echt slepen

    let next = this.startOffset + delta;
    const maxOffset = this.maxOffsetPx();
    const minOffset = -this.totalScrollablePx();
    if (next > maxOffset) next = maxOffset + (next - maxOffset) * 0.2;
    if (next < minOffset) next = minOffset + (next - minOffset) * 0.2;

    this.setTranslateX(next);
    this.updateProgress();
  }

  onPointerUp() {
    if (!this.isDown) return;
    this.isDown = false;

    // Als we niet hebben gesleept -> het was een 'tap':
    // niets doen; laat de click/routerLink op de kaart zelf afgaan.
    if (!this.dragging) {
      this.dragging = false;
      return;
    }

    // Wel gesleept -> snap naar dichtstbijzijnde kaart
    this.dragging = false;
    const x = -this.currentTranslateX();
    const step = this.cardWidth + this.gap;
    this.currentIndex = Math.max(0, Math.min(Math.round(x / step), this.items.length - 1));
    this.snapTo(this.currentIndex, true);
    this.updateProgress();
  }

  // Toetsenbord
  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') { e.preventDefault(); this.next(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); this.prev(); }
  }

  next() { this.currentIndex = Math.min(this.currentIndex + 1, this.items.length - 1); this.snapTo(this.currentIndex, true); this.updateProgress(); }
  prev() { this.currentIndex = Math.max(this.currentIndex - 1, 0); this.snapTo(this.currentIndex, true); this.updateProgress(); }

  // Intern
  private snapTo(index: number, animate: boolean) {
    const x = -index * (this.cardWidth + this.gap);
    const trackEl = this.track.nativeElement;
    trackEl.style.transition = animate ? 'transform 320ms cubic-bezier(.22,.61,.36,1)' : 'none';
    this.setTranslateX(x);
  }

  private setTranslateX(x: number) {
    const el = this.track.nativeElement;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => { el.style.transform = `translate3d(${x}px,0,0)`; });
  }

  private currentTranslateX(): number {
    const style = getComputedStyle(this.track.nativeElement);
    const m = new DOMMatrixReadOnly(style.transform);
    return m.m41;
  }

  private maxOffsetPx(): number {
    // linker marge zodat je niet voorbij de eerste kaart kunt slepen
    return this.sidePadding;
  }

  private totalScrollablePx(): number {
    const totalWidth = this.items.length * this.cardWidth + (this.items.length - 1) * this.gap;
    const viewportWidth = this.viewport.nativeElement.clientWidth - this.sidePadding * 2;
    return Math.max(0, totalWidth - viewportWidth);
  }

  private updateProgress() {
    const scrolled = Math.min(this.totalScrollablePx(), Math.max(70, -this.currentTranslateX() + this.sidePadding));
    this.progress = this.totalScrollablePx() === 0 ? 0 : scrolled / this.totalScrollablePx();
  }

  routerLink(href: string, external?: boolean) {
    if (external) {
      window.open(href, '_blank');
    } else {
      this.router.navigate([href], {relativeTo: this.route, queryParams: {extern: this.isExtern}});
    }
  }

}
