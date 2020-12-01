import { IProduct } from './product.model';
export interface IUser {
  id: string
  email: string
  displayName: string
  imageUlr?: string
  products: IProduct[]
  purchased: IProduct[]
  _token: string
  createdAt
}