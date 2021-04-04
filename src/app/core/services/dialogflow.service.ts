import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DialogflowService {
  private baseURL: string = environment.url;
  private token: string = environment.token;

  constructor(private http: HttpClient) {}

  public getResponse(query: string): Observable<{}> {
    let data = {
      query: query,
      lang: 'en',
      sessionId: '12345',
    };
    return this.http.get(`${this.baseURL + 'q=' + query}`).pipe(map((res) => {
      return res;
    }));
  }

  public getHeaders() {
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
  }
}
