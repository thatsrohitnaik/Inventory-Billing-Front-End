declare var JsBarcode: any;
import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import '../../assets/JsBarcode.all.js';
import {Inject } from '@angular/core';
import { MdInputModule } from '@angular/material';
import {MdIconModule,DateAdapter} from '@angular/material';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {MdSnackBar} from '@angular/material';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent implements OnInit {
  public apiurl:string="http://localhost/inventory/";
 public suppliers:string="";
   public supp:any="";
      public info:any="";
            public details:any="";
                public PID:any="";
  createMemGauge(x,y,z,a,b) {
console.log("ffffffffffffffffffffffffffff");
    b=b.replace("-", "");
    b=b.replace("-", "");
var s="xx"+x;
var out = document.createElement("div");
var ini = document.createElement("div");
var tit =document.createElement("div");
tit.innerHTML="<table style='width: 100%; margin-top: 10px;' ><tr><td class='pno' style='width:50%;font-size:7px;'>Silk Emporium</td><td class='pno' style='width:50%;'></td></tr></table>";
var des =document.createElement("div");
des.innerHTML="<table style='width: 100%;'><tr><td class='pno' style='width:50%;font-size:7px;'> "+z+"</td><td class='pno' style='width:50%;font-size:7px;'>Rs "+y+"</td></tr><tr><td class='pno' style='width:50%;font-size:7px;'>Size:</td><td class='pno' style='width:50%;font-size:7px;'>Batch:"+a+b+"</td></tr></table>";
var t = document.createElement("img");
t.style.width="115px";
t.style.height="84px";
t.id=s;

out.className="col-sm-3 ";
out.style.maxWidth="190px"
ini.className="bord";
ini.style.border="1px solid black";
ini.style.padding="2px 2px 2px 12px";
ini.style.margin="2px";
ini.appendChild(tit);
//para.appendChild(rate);
ini.appendChild(des);
ini.appendChild(t);
out.appendChild(ini);
document.getElementById("here").appendChild(out);
s="#"+s;
        new JsBarcode(s, x, {
        displayValue: true,
        fontSize: 10
      });  //drawGauge() is a function inside d3gauge.js
    }
  constructor(private http:Http,private dateAdapter:DateAdapter<Date>) {  dateAdapter.setLocale('de'); // DD.MM.YYYY}
}

getInfo(x,y){
  var d = new Date(x);
var date = d.getDate();
var year = d.getFullYear();
var month = d.getMonth()+1;
var fulldate =year+"-"+month+"-"+date;
console.log(fulldate);
var d = new Date(y);
var date = d.getDate();
var year = d.getFullYear();
var month = d.getMonth()+1;
var fulldate1 =year+"-"+month+"-"+date;
  this.http.get(this.apiurl + 'getPurchasedItem.php?start='+fulldate+"&end="+fulldate1+"&sid="+this.supp).subscribe(
  (res: Response) => { //const abc = res.json();
    this.details = res.json();
  })

}

clear(){

  document.getElementById("here").innerHTML="";

}
done(x,y){if(((x)&&(y))!=null){
  var d = new Date(x);
var date = d.getDate();
var year = d.getFullYear();
var month = d.getMonth()+1;
var fulldate =year+"-"+month+"-"+date;
console.log(fulldate);
var d = new Date(y);
var date = d.getDate();
var year = d.getFullYear();
var month = d.getMonth()+1;
var fulldate1 =year+"-"+month+"-"+date;
  console.log(fulldate1);
  this.http.get(this.apiurl + 'getBarcode.php?pid='+this.PID).subscribe(
  (res: Response) => { //const abc = res.json();
    this.info = res.json();
var key,key1;
  document.getElementById("here").innerHTML="";
for (key in this.info ){

  this.createMemGauge(this.info[key]["barcode"],this.info[key]["rate"],this.info[key]["description"],this.info[key]["SID"],this.info[key]["purchasedate"]);


}


  })

}}
goPrint(divName){
  var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;

}
getItems(){

  this.http.get(this.apiurl + 'getSelectedItem.php?pid=4').subscribe(
  (res: Response) => { //const abc = res.json();
    this.details = res.json();
  })

}

  ngOnInit() {
      //  this.createMemGauge("rohit");
        this.http.get(this.apiurl + 'getSupplier.php').subscribe(
        (res: Response) => { //const abc = res.json();
          this.suppliers = res.json();
        })
  }

}
