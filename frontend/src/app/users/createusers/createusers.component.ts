import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { UserDetail } from 'src/app/models/UserDetail.model';

@Component({
  selector: 'app-createusers',
  templateUrl: './createusers.component.html',
  styleUrls: ['./createusers.component.css']
})
export class CreateusersComponent implements OnInit {

  userDetail: UserDetail;

  constructor(private _dbService:DBService) { }

  ngOnInit() {
    console.log("11111111111");
    this.userDetail = new UserDetail();


  }

  async onClickSave(){
    console.log("Will save user...", this.userDetail);
    let result = await this._dbService.addUser(this.userDetail).toPromise();
    // let result = await this._dbService.getAllUsers().toPromise();
    console.log("Result:", result);

  }

}
