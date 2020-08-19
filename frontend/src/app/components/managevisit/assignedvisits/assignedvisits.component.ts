import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmMap, MouseEvent, MapsAPILoader } from '@agm/core';
import { DBService } from 'src/app/services/dbservice.service';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Utility } from 'src/app/services/utility.service';

@Component({
  selector: 'app-assignedvisits',
  templateUrl: './assignedvisits.component.html',
  styleUrls: ['./assignedvisits.component.css']
})
export class AssignedvisitsComponent implements OnInit {

  username;
  fromDate;
  toDate;
  usertype_name;
  scheduleVisitLists:any = [];
  _scheduleVisitLists;
  isUpdate:boolean = false;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private _dbService: DBService,
    private toastyService: ToastyService,
    private _router: Router,
    private util: Utility
  ) {

  }
  ngOnInit() {
    this.util.userValue.subscribe(data =>{
      this.username = data['username'];
      this.usertype_name = data['usertype_name'];
    })
    let assignedVisits = [];
    this._dbService.getAllScheduleVisits().subscribe(res => {
      if (res) {
        if(this.usertype_name == 'Admin' || this.usertype_name == 'Manager'){
          this._scheduleVisitLists = res.data;

          this.scheduleVisitLists = res.data;
          this.isUpdate = true;
        }else{
          res.data.forEach(scheduleVisit => {
            if(scheduleVisit.sales_username == this.username){
              assignedVisits.push(scheduleVisit);
            }
          });
          this._scheduleVisitLists = assignedVisits;
          this.scheduleVisitLists = assignedVisits;
        }
      }
    });
  }
  onClickEdit(obj){
    this._router.navigate(['/managevisit/schedulevisit', obj.schedule_visit_id]);
  }
  //delete the visit
  onClickDelete(obj){
    if(confirm("Are you sure to delete this visit")) {
      this._dbService.deleteScheduleVisit({schedule_visit_id: obj.schedule_visit_id}).subscribe(res =>{
        let type = res.status == 200 ? 'success' : 'failed'
        this.showAlert(res.message, type);
      });


      let assignedVisits = [];
      //after delete update the table, getAllVisit and update 
      this._dbService.getAllScheduleVisits().subscribe(res => {
        if (this.isUpdate) {
          //show all scheduled visits to admin and manager
          if(this.usertype_name == 'Admin' || this.usertype_name == 'Manager'){
            this._scheduleVisitLists = res.data;
            this.scheduleVisitLists = this._scheduleVisitLists;
          }else{
             //show all scheduled visits of a logged in user, if user is not manager or Admin
            res.data.forEach(scheduleVisit => {
              if(scheduleVisit.sales_username == this.username){
                assignedVisits.push(scheduleVisit);
              }
            });
            this._scheduleVisitLists = assignedVisits;
            this.scheduleVisitLists = assignedVisits;
          }
        }
      });
    }
  }
  filterVisits(){
    let filteredVisits = [];
    let filter = {
      from: new Date(this.fromDate).getTime() -1,
      to: new Date(this.toDate).getTime() + 1,  // end of the day timestamp
    };
    if(this.fromDate && this.toDate){
      for(let i = 0; i< this._scheduleVisitLists.length; i++){
        let savedDate = (new Date(this._scheduleVisitLists[i].date)).getTime();
        if(savedDate > filter.from && savedDate < filter.to ){
          filteredVisits.push(this._scheduleVisitLists[i]);
        }
      }
    }else{
      filteredVisits = this._scheduleVisitLists;
    }
    this.scheduleVisitLists = filteredVisits;
  }
  //naveen - to show alerts at completion or failure of actions
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
