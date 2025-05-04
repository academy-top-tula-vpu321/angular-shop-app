export class Product {
  public id: string;
  public title: string;
  public price: number;
  public activity: boolean;

  constructor(
    id: string,
    title: string,
    price: number
  ){
    this.id = id;
    this.title = title;
    this.price = price;
    this.activity = true;
  }
}
