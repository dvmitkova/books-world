import { Timestamp } from "rxjs";

export interface Book {
  name: string;
  condition: string;
  points: string;
  description: string;
  added: any;
  wishlist: string[];
  ordered: number;
  pages: string;
  author: string;
  image: string;
}
