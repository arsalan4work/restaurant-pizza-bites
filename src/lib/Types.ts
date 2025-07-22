export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string; // <-- optional
};
