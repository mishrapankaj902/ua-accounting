import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(
    private usrsService: UsersService
  ) { }

  ngOnInit() {
    this.usrsService.get().subscribe(d => {
      console.log(d)
    });
  }


}
