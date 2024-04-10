import { User } from "./user";

export interface Comment {
  userId: string;
  bookId: string;
  name: string;
  comment: string;
}
