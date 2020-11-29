import { IProduct } from './product.model';
export interface IUser {
  email: string
  displayName: string
  imageUlr?: string
  products: IProduct[]
  purchased: IProduct[]
}