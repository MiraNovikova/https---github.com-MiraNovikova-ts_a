import { Component, OnInit } from '@angular/core';
import { SettingsUsers, UserSettingsService } from '../services/user-settings.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: SettingsUsers[];
  searchValue: string;
  
  asyncUsers = this.userSettingsService.getUsers()
  constructor(private userSettingsService: UserSettingsService) { }

  ngOnInit(): void {
    this.userSettingsService.getUsers().subscribe((data) => {
      this.users = data;
   })
  }

}
