import { Injectable } from '@angular/core';
import { IPointing } from '../shared/interfaces/IPointing';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PointingService {
  baseUrl = "https://pointing-4409.restdb.io/rest";
  apiKey = "655c69550795620f2b229c6c";
  constructor(private http: HttpClient) { }
  collection = 'pointing';
  add(pointing: IPointing) {
    return this.http.post(`${this.baseUrl}/${this.collection}?apikey=${this.apiKey}`,pointing)
  }
  get() {
    return this.http.get(`${this.baseUrl}/${this.collection}?apikey=${this.apiKey}`)
  }
  deleteAll(idList: string[]) {

    console.log(idList,'id list');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: idList // This is where you include your data in the request body
    };
    return this.http.delete(`${this.baseUrl}/${this.collection}/*?apikey=${this.apiKey}`,httpOptions)

  }
}
