import {Component, Input, OnInit} from '@angular/core';
import {NgImageSliderModule} from "ng-image-slider";

@Component({
  selector: 'app-image-slider',
  imports: [
    NgImageSliderModule
  ],
  templateUrl: './image-slider.component.html',
  standalone: true,
  styleUrl: './image-slider.component.scss'
})
export class ImageSliderComponent implements OnInit{
  @Input() images: Array<object> = [];
  image = [];
  ngOnInit() {
    console.log(this.images)
    // @ts-ignore
    this.image = this.images;
  }

}
