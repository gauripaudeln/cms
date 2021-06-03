import axios, { AxiosResponse } from 'axios'
import categories from 'src/components/categories';
import { Category } from 'src/models/category';
import { Product } from 'src/models/product';
const api_base:string  = "http://localhost:8080"



export const DataService   = {

  
  getProducts : async () =>  {
  try {
    return await axios.get<Product[]>(`${api_base}/prouducts`);
  } catch (error) {
    console.error(error)
  }
},
 getCategories : async () => {
    try {
      return await axios.get<Category[]>(`${api_base}/categories`);
    } catch (error) {
      console.error(error)
   }
}
}


  