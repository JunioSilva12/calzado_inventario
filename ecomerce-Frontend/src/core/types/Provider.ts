export type ProviderResponse ={
    content: Provider[];
    totalPages: number; 
  }
  
  export type Provider = {
  
    idProvider: number;
    name: string;
    ref: string;
  }