import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-invoice',
  templateUrl: './client-invoice.component.html',
  styleUrls: ['./client-invoice.component.css']
})
export class ClientInvoiceComponent implements OnInit {

  public fragment: string = "details";
  
  constructor() { }

  ngOnInit() {
  }

}
