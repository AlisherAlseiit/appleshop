import { Pipe, PipeTransform } from '@angular/core';
import { Product} from './interface/interfaces';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], productName = ''): any {
    // trim to delete spaces
    // if productName equal to null
    if (!productName.trim()){
      return products
    }
    return products.filter( product =>{
      return product.title.toLowerCase().includes(productName.toLowerCase())
    })
  }

}
