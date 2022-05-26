import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public HomeData: any = [];
  constructor(private httpClient: HttpClient) { }

  public RequestGet() {
    return this.httpClient.get('https://dxf-proj.herokuapp.com/getmasterdata/',);
  }
  public postData(param: any) {
    {
      return this.httpClient.post('https://dxf-proj.herokuapp.com/createsignboard/', param);
    }
  }
  public getsignboard() {
    return this.httpClient.get('https://dxf-proj.herokuapp.com/getsignboard/',);
  }
  public getboardsize() {
    return this.httpClient.get('https://dxf-proj.herokuapp.com/getboardsize/',);
  }
}
