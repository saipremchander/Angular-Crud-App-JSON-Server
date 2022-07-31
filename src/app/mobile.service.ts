import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})

export class MobileService {


 
  constructor(private http:HttpClient) { }

  API_URL = "http://localhost:3000/mobiles"
  fetchMobile(){
    return this.http.get(this.API_URL)
  }
  deleteMobile(id:Number){
    return this.http.delete(this.API_URL+"/" + id)
  }


 
  postMobile(body:any){
    return this.http.post(this.API_URL,body)
  }
 
  putMobile(id:Number, body:any){

   return this.http.put(this.API_URL+"/"+id,body)
  }
}
