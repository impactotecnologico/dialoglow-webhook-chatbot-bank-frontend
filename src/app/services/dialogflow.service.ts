import { environment } from '@env/environment';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class DialogflowService {

  private baseURL: string = "https://console.dialogflow.com/api-client/demo/embedded/5ac42e17-73a3-4e41-a400-3b5e1ece11c3/demoQuery?sessionId=0c518ab0-6403-ee54-5441-953e0da705b2&";
  private token: string = environment.token;

  constructor(private http: Http){}

  public getResponse(query: string){
    let data = {
      query : query,
      lang: 'en',
      sessionId: '12345'
    }
    return this.http
      .get(`${this.baseURL + "q=" + query}`)
      .map(res => {
        return res.json()
      })
  }

  public getHeaders(){
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
  }
}
