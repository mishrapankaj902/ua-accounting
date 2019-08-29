import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export class ListMenuComponent implements OnInit {

  constructor(
    private usrsService: UsersService
  ) { }

  ngOnInit() {
    this.usrsService.get().subscribe(d => {
      console.log(d)
    });
  }

}
