import { Component, OnInit } from '@angular/core';
import { SettingUsersService } from '../../services/setting-users-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  users: any[];
  searchValue: string;
  asyncUsers = this.usersSettingsService.getUsers();

  constructor(private usersSettingsService : SettingUsersService) { }

  ngOnInit(): void {
    this.usersSettingsService.getUsers().subscribe((data) => {
      this.users = data
    })
  }

}
