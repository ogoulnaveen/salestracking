import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmMap, MouseEvent, MapsAPILoader } from '@agm/core';
import { DBService } from 'src/app/services/dbservice.service';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { Utility } from 'src/app/services/utility.service';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { VendorDetail } from 'src/app/models/VendorDetail.model';


@Component({
  selector: 'app-searchvisits',
  templateUrl: './searchvisits.component.html',
  styleUrls: ['./searchvisits.component.css']
})
export class SearchvisitsComponent implements OnInit {
 

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private _dbService: DBService,
    private toastyService: ToastyService,
    private _router: Router,
    private util: Utility

  ) {
    
  }
  userObj;
  fromDate;
  toDate;
  salesUsers:any;
  title = 'AGMMapAngular';
  @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  latitude: number;
  longitude: number;
  zoom: number = 10;
  private geoCoder;
  keyword = 'email';
  visitLists;
  allVisitLists;
  isNoRecords:boolean = false;

  selectedDate;
  filteredTableDataArr: any;
  customerdetails: VendorDetail[];
  
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;



  async init() {
    this.ALL_DELETE_ALLOWED = this._dbService.getPageMatrix().all_delete_permissions;
    if (this._dbService.getCurrentUserDetail().usertype_name == CustomMisc.USER_TYPE_SALES ||
      this._dbService.getCurrentUserDetail().usertype_name == CustomMisc.USER_TYPE_CUSTOMERS){
        this.SHOW_ICONS = false;
        this.SHOW_EDIT_DELETE = false;
      }

    if (!this._dbService.getPageMatrix().show_field_menu_link_addVisit)
      this.CAN_ADD = false;
    let result = await this._dbService.getAllVisits1().toPromise();
    console.log("result:", result);
    this.allVisitLists = result["data"];
   
  
  }
 
  getAppropriateVisits() {
    CustomLogger.logString("USER TYPE::" + this._dbService.getCurrentUserDetail().usertype_name);
    if (this._dbService.getCurrentUserDetail().usertype_name == CustomMisc.USER_TYPE_SALES) {
      this._dbService.getVisitsOfSalesUser().subscribe(res => {
        if (res) {
          this.allVisitLists = res["data"];
          this.visitLists = res["data"];
        }
      });
    } else {
      this._dbService.getAllVisits1().subscribe(res => {
        CustomLogger.logStringWithObject("VISITS OF VENDOR", res);
        if (res) {
          CustomLogger.logStringWithObject("ADDING", res["data"]);
          this.allVisitLists = res["data"];
          this.visitLists = res["data"];
        }
      });
    }}
   


  async ngOnInit() {
   await this.init();
    //naveen - load map and set current location of user
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });console.log("this._dbService.getCurrentUserDetail() ::", this._dbService.getCurrentUserDetail());
     console.log("this._dbService.getCurrentUserDetail().usertype_name ::", this._dbService.getCurrentUserDetail().usertype_name);
    this.getAppropriateVisits();


    //naveen - get all visits from db
   
    //naveen - get all sales users to populate in autocomplete dropdown 
   let result= await this._dbService.getAllVisits1().toPromise()
   if (result) {
   this.allVisitLists = result['data'];
        this.visitLists = result['data'];
        }
   console.log(this.salesUsers)
    this._dbService.getUsersByUserType({ userType: 'Sales User' }).subscribe(res => {
     
        this.salesUsers = result['data'];
      });
    }
 
    searchVisits() {
      let email;
      if (this.userObj) {
        email = this.userObj.email;
      } else {
        email = '';}
    let filter = {
      email: email,
      from: new Date(this.fromDate).getTime(),
      to: new Date(this.toDate).getTime() + 86400000,  // end of the day timestamp
    };
    let filteredVisits = [];
    if(!this.userObj && !this.fromDate && !this.toDate){
      filteredVisits = this.allVisitLists;
    }else if(this.userObj && !this.fromDate && !this.toDate){
      console.log(filter);
      for(let i = 0; i< this.allVisitLists.length; i++){
        if(this.allVisitLists[i].email== filter.email){
          filteredVisits.push(this.allVisitLists[i]);
        }
      }
    }else if(!this.userObj && this.fromDate && !this.toDate){
      for(let i = 0; i < this.allVisitLists.length; i++){
        if(this.allVisitLists[i].visit_id > filter.from){
          filteredVisits.push(this.allVisitLists[i]);
        }
      }
    }else if(!this.userObj && !this.fromDate && this.toDate){
      for(let i = 0; i < this.allVisitLists.length; i++){
        if(this.allVisitLists[i].visit_id < filter.to){
          filteredVisits.push(this.allVisitLists[i]);
        }
      }
    }else if(!this.userObj && this.fromDate && this.toDate){
      for(let i = 0; i< this.allVisitLists.length; i++){
          if((this.allVisitLists[i].visit_id > filter.from) && (this.allVisitLists[i].visit_id < filter.to) )
          filteredVisits.push(this.allVisitLists[i]);
      }
    }else if(this.userObj && this.fromDate && this.toDate){
      for(let i = 0; i< this.allVisitLists.length; i++){
        if(this.allVisitLists[i].email == filter.email){
          if((this.allVisitLists[i].visit_id > filter.from) && (this.allVisitLists[i].visit_id < filter.to) )
          filteredVisits.push(this.allVisitLists[i]);
        }
      }
    }
    this.visitLists = filteredVisits;
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
  mapClicked(e){

  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        //this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  //naveen - show the marker information on click
  onClickMarker(infoWindow, $event: MouseEvent){
    infoWindow.open();
  }
  openMapInNewTab(lat,long){
    let url = 'https://www.google.com/maps/search/?api=1&query='+lat+','+long;
    window.open(
      url,
      '_blank' // <- This is what makes it open in a new window.
    );
  }
   //naveen - hide the marker information on hover out
  mouseOutMarker(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }
  //naveen - on edit of visit, redirect to add visit page with visit_id
  onClickEdit(obj) {
    this._router.navigate(['/visitmode/addvisit', obj.visit_id]);
  }
  //naveen - delete a particular visit
  onClickDelete(obj){
    if(confirm("Are you sure to delete "+obj.customer_name)) {
      this._dbService.deleteVisit({visit_id: obj.visit_id}).subscribe(res =>{
        let type = res.status == 200 ? 'success' : 'failed'
        this.showAlert(res.message, type);
      });
    
      this.getAppropriateVisits();
    }
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

 /*  obj : VendorDetail[] = [
    {
     
    customer_name: '',
    email: '',
    phone: '',
    first_name: '',
    last_name: '',
   address: ''
    },
   
  ];
} */
