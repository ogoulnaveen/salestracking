import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AgmMap, MouseEvent, MapsAPILoader } from '@agm/core';
import { DBService } from 'src/app/services/dbservice.service';
import { Utility } from 'src/app/services/utility.service';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitDetails } from 'src/app/models/VisitDetails.model';
import {UserDetail} from 'src/app/models/UserDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';

@Component({
  selector: 'app-addvisit',
  templateUrl: './addvisit.component.html',
  styleUrls: ['./addvisit.component.css']
})
export class AddvisitComponent implements OnInit {


  title = 'AGMMapAngular';
  isUpdate: boolean = false;
  @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  userDetail
  latitude: number;
  longitude: number;
  zoom: number = 10;
  address: string;
  private geoCoder;

  keyword = 'customer_name';
  customers;
  customerVisit = new VisitDetails();
  customer_name:string;



  constructor(
    private mapsAPILoader: MapsAPILoader,
    private _dbService: DBService,
    private toastyService: ToastyService,
    private _activatedRoute: ActivatedRoute,
    private util: Utility,
    private _router: Router

  ) {

  }
  updateFlag = false;
 
  ngOnInit() {
  
    this.updateFlag = this.isUpdate;
    //load map and set current position of user, only runs in add mode
    if(!this.isUpdate){
      this.mapsAPILoader.load().then(() => {
        this.setCurrentLocation();
        this.geoCoder = new google.maps.Geocoder;
      });
    }
    // get all vendors/customers to show it in autocomplete field
    this._dbService.getAllVendors().subscribe(res => {
      if (res) {
        this.customers = res.data;
      }
    });

  
   
    // for editing a visit
    
    this._activatedRoute.params.subscribe(
      async params => {
        let visit_id = params["id"];
        if (visit_id) {
          this._dbService.getVisit(visit_id).subscribe(res => {
            if (res) {
              this.customerVisit = res["data"];
              CustomLogger.logStringWithObject("Customer Visit", this.customerVisit);
              this.latitude = this.customerVisit.lat;
              this.longitude = this.customerVisit.long;
              
              this.isUpdate = true;             
            }
          })
        }
      }
    );
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 10;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  
  onClickMarker(infoWindow, $event: MouseEvent){
    if(this.isUpdate){
      infoWindow.open();
    }
  }
  openMapInNewTab(lat,long){
    let url = 'https://www.google.com/maps/search/?api=1&query='+lat+','+long;
    window.open(
      url,
      '_blank' // <- This is what makes it open in a new window.
    );
  }
  selectEvent(customer) {
    delete customer._id;
    this.customerVisit = customer;
  }
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

  saveVisit() {
    let username;
    let useremail;
    //get the logged in user details - username and email
    this.util.userValue.subscribe(user =>{
      if(user){
        username = user['username'];
        useremail = user['email'];
      }
    })
    //this.customerVisit.address = this.address;
  
    this.customerVisit.lat = this.latitude;
    this.customerVisit.long = this.longitude;
    //this.customerVisit.visit_added_by_username = username;
    //this.customerVisit.visit_added_by_name = username // remove if not required
    //this.customerVisit.visit_added_by_email = useremail // take from session
    //in case of update do not set the visit_id
    
    console.log(this.customerVisit);
    if (this.isUpdate) {
      this._dbService.updateVisit(this.customerVisit).subscribe(res => {
        let type = res.status == 200 ? 'success' : 'failed'
        this.showAlert(res.message, type);
      })
    } else {
      // set visit_id while adding new record
      this.customerVisit.user_id = this._dbService.getCurrentUserDetail().user_id; 
      this.customerVisit.visit_id = Date.now();
     
      this._dbService.addVisit(this.customerVisit).subscribe(res => {
        let type = res.status == 200 ? 'success' : 'failed'
        this.showAlert(res.message, type);
      })
    }
    this._router.navigate(['visitmode/searchvisits'])

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
