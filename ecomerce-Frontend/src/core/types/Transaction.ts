export type TransactionResponse ={
    content: Transaction[];
    totalPages: number; 
  }
  

 
  export enum TransactionType {
    Entry = "ENTRADA",  // Representa una entrada
    Exit = "SALIDA"     // Representa una salida
  }
  
  export type Transaction = {
    ID: number;
    productId: number;
    nameProduct:string;
    SizeId: number;
     // Puedes ajustar el tipo según tu modelo
    date: string;
    type: TransactionType;  // Usando el enum definido arriba
    quantity: number;
  };