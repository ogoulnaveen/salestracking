import { Component, OnInit, ViewChild } from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { Utility } from 'src/app/services/utility.service';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-schedulevisit',
  templateUrl: './schedulevisit.component.html',
  styleUrls: ['./schedulevisit.component.css']
})
export class SchedulevisitComponent implements OnInit {

  keyword = 'email';
  customer_keyword = "customer_name";
  salesUsers;
  vendorLists;
  salesUser;
  vendor;
  date;
  time;
  phone;
  address;
  scheduleVisit;
  isUpdate:boolean = false;
  constructor(private _dbService: DBService,
     private util: Utility, private toastyService: ToastyService,
     private _activatedRoute: ActivatedRoute,
     private _router: Router
     ) { 
    
  }
  ngOnInit() {
    //naveen - get all visits from db
    this._dbService.getAllVendors().subscribe(res => {
      if (res) {
        this.vendorLists = res.data;
      }
    });
    //naveen - get all sales users to populate in autocomplete dropdown 
    this._dbService.getUsersByUserType({userType: 'Sales User'}).subscribe(res =>{
      this.salesUsers = res.data;
    });
    this._activatedRoute.params.subscribe(
      async params => {
        let schedule_visit_id = params["id"];
        console.log(schedule_visit_id ,"heree");
        if (schedule_visit_id) {
          this._dbService.getScheduleVisit(schedule_visit_id).subscribe(res => {
            console.log(res ,"heree1");
            if (res) {
              this.scheduleVisit = res["data"];
              this.isUpdate = true;
              this.salesUser = this.scheduleVisit.sales_email;
              this.vendor = this.scheduleVisit.vendor_name;
              this.phone = this.scheduleVisit.phone;
              this.address = this.scheduleVisit.address;
              this.date = this.scheduleVisit.date;
              this.time = this.scheduleVisit.time;
            }
          })
        }
      }
    );
  }
  selectEvent(customer) {
    this.phone = customer.phone;
    this.address = customer.address;
  }
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

  scheduleVisits(){
    let username;
    let useremail;
    this.util.userValue.subscribe(user =>{
      if(user){
        username = user['username'];
        useremail = user['email'];
      }
    });
    if(this.salesUser && this.vendor && this.date && this.time){
      let visit = {
        schedule_visit_id: Date.now(),
        vendor_id: this.vendor._id,
        vendor_name: this.vendor.customer_name,
        sales_email: this.salesUser.email,
        phone:this.phone,
        address: this.address,
        sales_user_id: this.salesUser._id,
        schedule_visit_added_by_email: useremail,
        date: this.date,
        time: this.time,
      }
      if (this.isUpdate) {
        visit.schedule_visit_id = this.scheduleVisit.schedule_visit_id;
        this._dbService.updateScheduleVisit(visit).subscribe(res => {
          let type = res.status == 200 ? 'success' : 'failed'
          this.showAlert(res.message, type);
          this._router.navigate(['managevisit/assignedvisit']);
        })
      } else {
        this._dbService.scheduleVisit(visit).subscribe(res =>{
          if(res){
            let type = res.status == 200 ? 'success' : 'failed'
            this.showAlert(res.message, type);
            this._router.navigate(['managevisit/assignedvisit']);
          }
        })
      }
    }else{
      alert("You must fill in all of the fields  ");
    }
    
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

