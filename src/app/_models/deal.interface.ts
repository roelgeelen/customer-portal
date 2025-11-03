export interface IDeal
{
  id: string;
  properties: {
    customer_status?: string,
    available_statuses?: string,
    dealstage?: string
  }
}
