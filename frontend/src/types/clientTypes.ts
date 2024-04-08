export interface ClientAddressInterface {
    cep?:string
    number?: string
    street?: string
  }
  
export interface ClientContactInterface {
    email?: string
    phone?: string
  }
  
export interface ClientInterface {
    id?:string | null;
    address?:  ClientAddressInterface
    contacts?: ClientContactInterface[]
    document?: string
    name?:     string
  }