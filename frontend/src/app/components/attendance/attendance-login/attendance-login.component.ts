import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { Utility } from 'src/app/services/utility.service';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  templateUrl: './attendance-login.component.html',
  styleUrls: ['./attendance-login.component.css'],
  providers:[DatePipe]
})
export class AttendanceLoginComponent implements OnInit {
  checkStatus: boolean = false;
  
  constructor(
    private _dbService: DBService,
    private toastyService: ToastyService,
    private datePipe: DatePipe,
    private util: Utility,
  ) {

  }
  ngOnInit() {
    
  }
  onCheckIn(){
    this.checkStatus = !this.checkStatus;
    console.log(this.checkStatus);
    let username,useremail;
    this.util.userValue.subscribe(user =>{
      if(user){
        username = user['username'];
        useremail = user['email'];
      }
    });
    let req ={
     //username:username,
      email: useremail,
      checkStatus: this.checkStatus ? 'Check In': 'Check Out'
    }
    this._dbService.CheckInOutAction(req).subscribe(val =>{
      console.log(val)
    });
  }
}
