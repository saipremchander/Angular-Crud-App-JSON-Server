import { Component, OnInit } from '@angular/core';
import { MobileService } from './mobile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

   mobiles: any | null;
  formheader="Mobileform";
  mobilename:String | null;
  name:String | null;
  price:Number | null;
  ram:Number | null;
  storage:Number| null;
  id:any;
  submit="Submit"
  showform:boolean=false;

  addsuccess:boolean=false;
delsuccess:boolean=false;
updatesuccess:boolean=false;
clear:boolean=false;
open:boolean=true;
  ramsize = [
    {ram:'2GB'},
    {ram:'4GB'},
    {ram:'8GB'},
    {ram:'12GB'},
    {ram:'16GB'},
];


storagerom = [
  {rom:'16GB'},
  {rom:'32GB'},
  {rom:'64GB'},
  {rom:'128GB'},
  {rom:'256GB'},
  {rom:'512GB'},
  {rom:'1TB'},
];
  constructor(private ms:MobileService){}
 

  ngOnInit():void{
    this.getMobiles()


  }

  
  getMobiles(){

    this.ms.fetchMobile().subscribe(

        data => this.mobiles = data,
    
      (error)=>{
        console.log(error),
        alert("Something Went Wrong")
      }
     )
     }

  deleteMobile(id:Number){
    this.ms.deleteMobile(id).subscribe(
      (res)=>{
        this.getMobiles()

         
       this.delsuccess=true ; 

       this.open=true;

      }
    )
  }



  openform(data=null){
    this.showform=true;
          
    this.mobilename = null;
    this.price = null;
    this.ram= null;
    this.storage= null;
    if(data){
      
      this.mobilename = data["name"];
      this.price = data["price"];
      this.ram= data["ram"];
      this.storage= data["storage"];
      this.id = data["id"];
      this.formheader="Edit Form";
      this.submit="Update Data";
    this.clear=true;
    this.open=false;
    }else{
      this.id= null;
      this.formheader="Mobile Form";
      this.submit="Submit Data";
      this.delsuccess=false ; 
      this.open=false;
    }
  }
  closeform(){
    this.showform=false;
    this.clearform()
    this.open=true;
  }

  clearform(){

      
      this.mobilename = null;
      this.price = null;
      this.ram= null;
      this.storage= null;
 

  }
  save(){
      this.showform=false;
      let body = {
        name:this.mobilename,
        price:this.price,
        ram : this.ram,
        storage:this.storage,
        id:this.id,
  
      }
       if(this.id){
        body['id'] = this.id;
        this.ms.putMobile( this.id, body).subscribe(
          (res)=>{
            this.getMobiles();

            this.open=true;
          this.updatesuccess=true;
          }
        )
       }
       else{
        this.ms.postMobile(body).subscribe(
         (res)=>{
          this.getMobiles();
          this.open=true;
          this.addsuccess=true;
         }
        )
       }
  }
  close(){
    this.open=true;
    this.addsuccess=false;
    this.delsuccess=false;
    this.updatesuccess=false;
  }
 
}
