import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css'],
  providers:[DatePipe]
})
export class AttendanceListComponent implements OnInit {
  userObj;
  userActions;
  _userActions;
  keyword = 'email';
  fromDate;
  toDate;
  allUsers;
  constructor(
    private _dbService: DBService,
    private toastyService: ToastyService,
    private datePipe: DatePipe
  ) {

  }
  async ngOnInit() {
    let result = await this._dbService.getAllUsers().toPromise();
    this.allUsers = result['data'];
    console.log(this.allUsers)
    this._dbService.getAllCheckInOut().subscribe(res => {
      if (res) {
        this._userActions = res.data;
        this.userActions = res.data;
      }
    });}
  filterActions(){
    let email;
    if(this.userObj){
      email = this.userObj.email;
    }else{
      email ='';
    }
    
    let filter = {
      email: email,
      from: new Date(this.fromDate).getTime(),
      to: new Date(this.toDate).getTime() + 86400000,  // end of the day timestamp
    };
    let filteredVisits = [];
    if(!this.userObj && !this.fromDate && !this.toDate){
      filteredVisits = this._userActions;
    }else if(this.userObj && !this.fromDate && !this.toDate){
      console.log(filter);
      for(let i = 0; i< this._userActions.length; i++){
        if(this._userActions[i].email == filter.email){
          filteredVisits.push(this._userActions[i]);
        }
      }
    }else if(!this.userObj && this.fromDate && !this.toDate){
      for(let i = 0; i < this._userActions.length; i++){
        if(this._userActions[i].status_id > filter.from){
          filteredVisits.push(this._userActions[i]);
        }
      }
    }else if(!this.userObj && !this.fromDate && this.toDate){
      for(let i = 0; i < this._userActions.length; i++){
        if(this._userActions[i].status_id < filter.to){
          filteredVisits.push(this._userActions[i]);
        }
      }
    }else if(!this.userObj && this.fromDate && this.toDate){
      for(let i = 0; i< this._userActions.length; i++){
          if((this._userActions[i].status_id > filter.from) && (this._userActions[i].status_id < filter.to) )
          filteredVisits.push(this._userActions[i]);
      }
    }else if(this.userObj && this.fromDate && this.toDate){
      for(let i = 0; i< this._userActions.length; i++){
        if(this._userActions[i].email == filter.email){
          if((this._userActions[i].status_id > filter.from) && (this._userActions[i].status_id < filter.to) )
          filteredVisits.push(this._userActions[i]);
        }
      }
    }
    this.userActions = filteredVisits;
  }
  showAlert(msg, type) {
    var toastOptions: ToastOptions = {
      title: type,
      msg: msg,
      showClose: true,
      timeout: 5000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
    if (type == "success") {
      this.toastyService.success(toastOptions);
    } else if (type == "failed") {
      this.toastyService.error(toastOptions);
    } else {
      this.toastyService.warning(toastOptions);
    }
  }
  selectEvent(customer) {
    
  }
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }
}
