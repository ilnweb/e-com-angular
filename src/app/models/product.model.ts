export interface IProduct {
  _id:string
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  price: number;
  creator: {
    displayName: string;
    imageUrl: string;
    _id: string;
  }
}
