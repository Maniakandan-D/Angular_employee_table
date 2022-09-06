import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:3000/Employee";

  postEmployee(data: any){
  return this.http.post<any>(this.url, data)
  .pipe(map((res: any ) =>{
    return res
  }))
  }

  getEmployee(){
    return this.http.get<any>(this.url)
    .pipe(map((res: any ) =>{
      return res
    }))
    }

  updateEmployee(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/Employee/"+id, data)
    .pipe(map((res: any ) =>{
      return res
    }))
  }

  deleteEmployee(id: any){
    return this.http.delete<any>("http://localhost:3000/Employee/"+id)
    .pipe(map((res: any ) =>{
      return res
    }))
  }
      
      
}
