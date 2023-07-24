/*Los servicios en angular se utilizan para
1 Hacer las peticiones https hacia el back-end
2 Reutilizacion de codigo entre componentes
3 Comunicacion de datos entre componentes*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//Importamos el observable
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//Url y Api
export class TarjetaService {
  private myAppUrl = 'https://localhost:44310/';
  private myApiUrl = 'api/tarjeta/'

  constructor(private http: HttpClient) { }

  //Le decimos que devuelva un observable
  //Metodo listar tarjetas
  getListTarjetas(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }
  
  //Metodo borrar tarjetas
  deleteTarjeta(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id)
  }
  
  //Metodo guardarar tarjetas    
  saveTarjeta(tarjeta: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, tarjeta);
  }

  //Metodo editar tarjetas
  updateTarjeta(id: number, tarjeta: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl + id, tarjeta);
  }
}
