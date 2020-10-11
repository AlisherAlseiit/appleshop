import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {FbResponse, Product} from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
type = 'IPhone'
  cartProducts: Product [] = []
  constructor(private http: HttpClient) { }

  create(product) {
    return this.http.post(`${environment.fbDbUrl}/products.json`, product).pipe(map((res: FbResponse) => {
        return {
          // spread operator
          ...product,
          id: res.name,
          date: new Date(product.date)
        }

      }))
  }
  getProduct(){
    //  pipe uses to  transform date, map for  transform stream
    return this.http.get(`${environment.fbDbUrl}/products.json`).pipe(map(res => {
        return Object.keys(res).map(key => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date)
        }))
      }))
  }

  getInformationOfProducts(id){
    //  pipe uses to  transform date, map for  transform stream
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`).pipe(map((res: Product) => {
        return {
          ...res,
          id,
          date: new Date(res.date)
        }
      }))
  }

  remove(id) {

    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`)
  }

  update(product: Product) {
    return this.http.patch(`${environment.fbDbUrl}/products/${product.id}.json`, product)
  }

  setType(type){
  this.type = type
  }

addProduct(product){
  this.cartProducts.push(product)
}
}