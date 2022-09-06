import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  formValue !: FormGroup;
  //Model objectect pass
  employeeObj: Employee = new Employee();

  //get employee data property
  employeeData: any;
  showAdd: boolean;
  showUpdate: boolean;
  //pagination
  totalLength:any;
  page:number = 1;
  //filter
  name:any;
  employee: Employee[] = [];
  // sorting
  key: string = 'id';
  reverse: boolean = false;

  constructor(private  formbuilder: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name :[''],
      email : [''],
      designation :[''],
      department :[''],
      date :[''],
      status :[''],
      salary :['']
    })
    this.getAllEmployee();
  }
  // Hide Update Button in addemployee form and edit form
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
   }

  postEmployeeDetails(){
  this.employeeObj.name = this.formValue.value.name;
  this.employeeObj.email = this.formValue.value.email;
  this.employeeObj.designation = this.formValue.value.designation;
  this.employeeObj.department = this.formValue.value.department;
  this.employeeObj.date = this.formValue.value.date;
  this.employeeObj.status = this.formValue.value.status;
  this.employeeObj.salary = this.formValue.value.salary;

  this.employeeService.postEmployee(this.employeeObj)
  .subscribe(res =>{
    console.log(res);
    alert("Employee Added Successfully")
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllEmployee();
  },
  err=>{
    alert("Somthing Went wrong")
  })
  }
 
  getAllEmployee(){
    this.employeeService.getEmployee()
    .subscribe(res =>{
      // store all employee data
     this.employeeData = res;
    })
  }

  deleteEmployee(row : any){
      // add confirmation before deleting 
      if (confirm("Are you sure to delete ?")){
      this.employeeService.deleteEmployee(row.id)
      .subscribe(res => { 
       
      })
      // No need to Refresh
      this.getAllEmployee();
     }
    }
     onEdit(row:any){
      this.showAdd = false;
      this.showUpdate = true;
      this.employeeObj.id= row.id;
  
      this.formValue.controls['name'].setValue(row.name);
      this.formValue.controls['email'].setValue(row.email);
      this.formValue.controls['designation'].setValue(row.designation);
      this.formValue.controls['department'].setValue(row.department);
      this.formValue.controls['date'].setValue(row.date);
      this.formValue.controls['status'].setValue(row.status);
      this.formValue.controls['salary'].setValue(row.salary);
  
    }

    updateEmployeeDetails(){
      this.employeeObj.name = this.formValue.value.name;
      this.employeeObj.email = this.formValue.value.email;
      this.employeeObj.designation = this.formValue.value.designation;
      this.employeeObj.department = this.formValue.value.department;
      this.employeeObj.date = this.formValue.value.date;
      this.employeeObj.status = this.formValue.value.status;
      this.employeeObj.salary = this.formValue.value.salary;

      this.employeeService.updateEmployee(this.employeeObj, this.employeeObj.id)
      .subscribe(res =>{
        alert("Employee Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      })
  }
  //Filter
  search(){
    if (this.name == ""){
      this.ngOnInit();
    }else{
      this.employee = this.employee.filter(res =>{
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }
  }
  //sorting
  sort(key){
     this.key = key;
     this.reverse = !this.reverse;
  }
}