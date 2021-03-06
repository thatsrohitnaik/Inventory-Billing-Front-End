import { Component, OnInit } from '@angular/core';
import {Http,Response} from '@angular/http';
import {PageEvent} from '@angular/material';
import { LolService } from '../lol.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-show-stock',
  templateUrl: './show-stock.component.html',
  styleUrls: ['./show-stock.component.css']
})
export class ShowStockComponent implements OnInit {
public apiurl:string="";
  constructor(private router: Router,private lol:LolService,private http:Http) { }

  ngOnInit() {
    if(!this.lol.getLol()){

      this.router.navigateByUrl('/login');

    }
    this.apiurl = "http://" + window.location.hostname + ":" + window.location.port + "/";
this.apiurl = this.apiurl + "connect/";
this.apiurl="http://localhost/inventory/";
this.apiurl = "http://" + window.location.hostname + ":" + window.location.port + "/";
this.apiurl = this.apiurl + "inventory/";
this.apiurl = this.apiurl.replace(/:4200/g, '').toLowerCase();

this.showStock();
  }
 public displayStock:any;
 length = 100;
 pageSize = 10;
 pageSizeOptions = [5, 10, 25, 100];

 // MdPaginator Output
 pageEvent: PageEvent;
pageIndex=0;

 setPageSizeOptions(setPageSizeOptionsInput: string) {
   this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
 }
 showStock(){

   this.http.get(this.apiurl + 'showlib.php?useracc='+this.lol.getAcc()+'&sr='+0+"&sr1="+50).subscribe(
   (res: Response) => { //const abc = res.json();
     this.displayStock = res.json();

   })
 }


}
