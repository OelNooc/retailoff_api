import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  public url: string;

  constructor(
    public _http: HttpClient
  ) { 
    this.url="https://1csx6qilt8.execute-api.us-east-2.amazonaws.com/produccion/"
  }

  addProducto(producto: Producto): Observable<Producto>{
    return this._http.post<Producto>(this.url+'api-retailoff/producto/addproducto', producto);
  }

  getProducto(): Observable<any>{
    return this._http.get(this.url+'api-retailoff/producto/getproducto');
  }
}
