import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers:[DatePipe]
})
export class HistoryComponent implements OnInit {

  userActions;
  _userActions;
  fromDate;
  toDate;
  constructor(
    private _dbService: DBService,
    private toastyService: ToastyService,
    private datePipe: DatePipe
  ) {

  }
  ngOnInit() {
    this._dbService.getAllUserActions().subscribe(res => {
      if (res) {
        this._userActions = res.data;
        this.userActions = res.data;
      }
    });
  }

  downloadFile() {
    let data = [];
    this.userActions.forEach(element => {
      let obj ={
     /*    Username: element.username, */
     Email:element.email,
        Action: element.action,
        Date: this.datePipe.transform(element.action_id,'short')
      }
      data.push(obj);
    });
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], { type: 'text/csv' })
    saveAs(blob, "userActions.csv");
  }
  filterActions(){
    let filteredActions = [];
    let filter = {
      from: new Date(this.fromDate).getTime(),
      to: new Date(this.toDate).getTime() + 86400000,  // end of the day timestamp
    };
    if(this.fromDate && this.toDate){
      for(let i = 0; i< this._userActions.length; i++){
        if(this._userActions[i].action_id > filter.from && this._userActions[i].action_id < filter.to ){
          filteredActions.push(this._userActions[i]);
        }
      }
    }else{
      filteredActions = this._userActions;
    }
    this.userActions = filteredActions;
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
}
