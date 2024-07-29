

export type ProductResponse ={
  content: Product[];
  totalPages: number;
  
}

export type Product ={
  id:number;
  name: string;
  imgUrl: string;
  categories: Category[];
  inventories:Inventory[]
  idProvider: number;
}

export type Category = {
  id: number;
  name: string;
}

export type Inventory = {
  size: number;
  stock:number
}


