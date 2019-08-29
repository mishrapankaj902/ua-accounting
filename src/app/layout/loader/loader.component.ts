import { LoaderService } from './../../services/loader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent implements OnInit {
  loader = false;
  public container = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    'z-index': '1100',
    'background-color': 'rgba(0,0,0,0.3)',
    'text-align': 'center',
    'padding-top': '40vh',
  }
  public spinner = {
    width: '10vw',
    height: '10vw',
    'z-index': '1100'
  }
  constructor(private loaderSevice: LoaderService) { }

  ngOnInit() {
    this.loaderSevice.loader$.subscribe(v => {
      this.loader = v.loader;
    });
  }

}
