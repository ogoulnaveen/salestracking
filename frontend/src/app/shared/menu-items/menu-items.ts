import { Injectable, OnInit } from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}


@Injectable()
export class MenuItems {
  constructor(private _dbService: DBService) {
    CustomLogger.logString("Menu: COnstructor called");
    this.init();
  }

  MENUITEMS = [];


  init() {
    this.MENUITEMS = [];
    this.MENUITEMS.push({
      label: 'Navigation',
      main: [
        {
          state: 'dashboard',
          name: 'Dashboardmenu',
          type: 'link',
          icon: 'ti-dashboard'
        }
      ],
    });

    let pageMatrix = this._dbService.getPageMatrix();
    CustomLogger.logStringWithObject("Menu: PageMatrix:", pageMatrix);


    if (pageMatrix.show_field_menu_link_addVisit || pageMatrix.show_field_menu_link_searchVisit) {
      let childrenArr = [];

      if (pageMatrix.show_field_menu_link_addVisit) {
        childrenArr.push({
          state: 'addvisit',
          name: 'Addvisitmenu'
        });
      }

      if (pageMatrix.show_field_menu_link_searchVisit) {
        childrenArr.push({
          state: 'searchvisits',
          name: 'Searchvisitsmenu'
        });
      }

      this.MENUITEMS.push({
        label: "Visits",
        main: [
          {
            state: 'visitmode',
            name: 'Visitsmenu',
            type: 'sub',
            icon: 'ti-location-pin',
            children: childrenArr
          }
        ]
      });
    }

    if (pageMatrix.show_field_menu_link_schedulevisit || pageMatrix.show_field_menu_link_assignedvisit) {
      let childrenArr = [];

      if (pageMatrix.show_field_menu_link_schedulevisit) {
        childrenArr.push({
          state: 'schedulevisit',
          name: 'Schedulevisitsmenu'
        });
      }

      if (pageMatrix.show_field_menu_link_assignedvisit) {
        childrenArr.push({
          state: 'assignedvisit',
          name: 'Assignedvisitsmenu'
        });
      }

      this.MENUITEMS.push({
        label: "Visits",
        main: [
          {
            state: 'managevisit',
            name: 'Assignvisitsmenu',
            type: 'sub',
            icon: 'ti-pin',
            children: childrenArr
          }
        ]
      });
    }



    // if (pageMatrix.show_field_menu_link_schedulevisit || pageMatrix.show_field_menu_link_assignedvisit) {
    //   let childrenArr = [];

    //   if (pageMatrix.show_field_menu_link_schedulevisit) {
    //     childrenArr.push({
    //       state: 'schedulevisit',
    //       name: 'Schedulevisitsmenu'
    //     });
    //   }

    //   if (pageMatrix.show_field_menu_link_assignedvisit) {
    //     childrenArr.push({
    //       state: 'assignedvisit',
    //       name: 'Assignedvisitsmenu'
    //     });
    //   }

    //   this.MENUITEMS.push({
    //     label: "Visits",
    //     main: [
    //       {
    //         state: 'managevisit',
    //         name: 'Assignvisitsmenu',
    //         type: 'sub',
    //         icon: 'ti-pin',
    //         children: childrenArr
    //       }
    //     ]
    //   });
    // }


    if (pageMatrix.show_field_menu_link_addexpense || pageMatrix.show_field_menu_link_expenselist) {
      let childrenArr = [];

      if (pageMatrix.show_field_menu_link_addexpense) {
        childrenArr.push({
          state: 'addexpense',
          name: 'Addexpensemenu'
        });
      }

      if (pageMatrix.show_field_menu_link_expenselist) {
        childrenArr.push({
          state: 'expenselist',
          name: 'showallexpensemenu'
        });
      }

      this.MENUITEMS.push({
        label: "Visits",
        main: [
          {
            state: 'expense',
            name: 'expensesmenu',
            type: 'sub',
            icon: 'ti-stats-up',
            children: childrenArr
          }
        ]
      });
    }


    if (pageMatrix.show_field_menu_link_adduser || pageMatrix.show_field_menu_link_userlist) {
      let childrenArr = [];

      if (pageMatrix.show_field_menu_link_adduser) {
        childrenArr.push({
          state: 'adduser',
          name: 'AddUsersmenu'
        });
      }

      if (pageMatrix.show_field_menu_link_userlist) {
        childrenArr.push({
          state: 'userlist',
          name: 'Showallusersmenu'
        });
      }

      this.MENUITEMS.push({
        label: "Visits",
        main: [
          {
            state: 'user',
            name: 'Usersmenu',
            type: 'sub',
            icon: 'ti-user',
            children: childrenArr
          }
        ]
      });
    }

    if (pageMatrix.show_field_menu_link_createproduct
      || pageMatrix.show_field_menu_link_productlist
      || pageMatrix.show_field_menu_link_categoryadd
      || pageMatrix.show_field_menu_link_categorylist) {
      let childrenArr = [];

      if (pageMatrix.show_field_menu_link_createproduct) {
        childrenArr.push({
          state: 'createproduct',
          name: 'Addproductsmenu'
        });
      }

      if (pageMatrix.show_field_menu_link_productlist) {
        childrenArr.push({
          state: 'productlist',
          name: 'Showallproductsmenu'
        });
      }

      if (pageMatrix.show_field_menu_link_categoryadd) {
        childrenArr.push({
          state: 'categoryadd',
          name: 'Productcategorymenu'
        });
      }

      if (pageMatrix.show_field_menu_link_categorylist) {
        childrenArr.push({
          state: 'categorylist',
          name: 'Productcategorylistmenu'
        });
      }


      this.MENUITEMS.push({
        label: "Visits",
        main: [
          {
            state: 'products',
            name: 'ProductMenu',
            type: 'sub',
            icon: 'ti-bag',
            children: childrenArr
          }
        ]
      });
    }


    if (pageMatrix.show_field_menu_link_createquotation || pageMatrix.show_field_menu_link_quotationlist) {
      let childrenArr = [];

      if (pageMatrix.show_field_menu_link_createquotation) {
        childrenArr.push({
          state: 'createquotation',
          name: 'AddQuotationmenu'
        });
      }

      if (pageMatrix.show_field_menu_link_quotationlist) {
        childrenArr.push({
          state: 'quotationlist',
          name: 'Quotationlistmenu'
        });
      }

      this.MENUITEMS.push({
        label: "Visits",
        main: [
          {
            state: 'quotation',
            name: 'Quotationmenu',
            type: 'sub',
            icon: 'fa fa-book',
            children: childrenArr
          }
        ]
      });
    }

    if (pageMatrix.show_field_menu_link_attendance || pageMatrix.show_field_menu_link_attendancelist) {
      let childrenArr = [];

    
      if (pageMatrix.show_field_menu_link_attendancelist) {
        childrenArr.push({
          state: 'attendancelist',
          name: 'AttendanceList'
        });
      }

      this.MENUITEMS.push({
        label: "Visits",
        main: [
          {
            state: 'attendance',
            name: 'Attendancemenu',
            type: 'sub',
            icon: 'ti-book',
            children: childrenArr
          }
        ]
      });
    }

    if (pageMatrix.show_field_menu_link_createvendor || pageMatrix.show_field_menu_link_vendorlist) {
      let childrenArr = [];

      if (pageMatrix.show_field_menu_link_createvendor) {
        childrenArr.push({
          state: 'createvendor',
          name: 'AddCustomersmenu'
        });
      }

      if (pageMatrix.show_field_menu_link_vendorlist) {
        childrenArr.push({
          state: 'vendorlist',
          name: 'Customerslistmenu'
        });
      }

      this.MENUITEMS.push({
        label: "Visits",
        main: [
          {
            state: 'vendors',
            name: 'Customersmenu',
            type: 'sub',
            icon: 'fa fa-users',
            children: childrenArr
          }
        ]
      });
    }

    if (pageMatrix.show_field_menu_link_history) {
      let childrenArr = [];

      childrenArr.push({
        state: 'history',
        name: 'HistorySubMenu'
      });


      this.MENUITEMS.push({
        label: "Visits",
        main: [
          {
            state: 'settings',
            name: 'SettingsMenu',
            type: 'sub',
            icon: 'ti-settings',
            children: childrenArr
          }
        ]
      });
    }















  }

  getAll(): Menu[] {
    // CustomLogger.logStringWithObject("ADMIN MENU:", this.MENUITEMS);
    return this.MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}




// const MENUITEMS = [
//   {
//     label: 'Navigation',
//     main: [
//       {
//         state: 'dashboard',
//         name: 'Dashboardmenu',
//         type: 'link',
//         icon: 'ti-dashboard'
//       }
//     ],
//   },
//   /*  {
//     label: 'Navigation',
//     main: [
//       {
//         state: 'visits',
//         name: 'Visits',
//         type: 'link',
//         icon: 'ti-home'
//       }
//     ],
//   }, */
//   {
//     label: 'Navigation',
//     main: [
//       {
//         state: 'visitmode',
//         name: 'Visitsmenu',
//         type: 'sub',
//         icon: 'ti-location-pin',
//         children: [
//           {
//             state: 'addvisit',
//             name: 'Addvisitmenu'
//           },
//           {
//             state: 'searchvisits',
//             name: 'Searchvisitsmenu'
//           },


//         ]
//       }
//     ],
//   },
//   {
//     label: 'Navigation',
//     main: [
//       {
//         state: 'managevisit',
//         name: 'Assignvisitsmenu',
//         type: 'sub',
//         icon: 'ti-pin',
//         children: [
//           {
//             state: 'schedulevisit',
//             name: 'Schedulevisitsmenu'
//           },
//           {
//             state: 'assignedvisit',
//             name: 'Assignedvisitsmenu'
//           },
//         ]
//       }
//     ],
//   },
//   {
//     label: 'Navigation',
//     main: [
//       {
//         state: 'expense',
//         name: 'expensesmenu',
//         type: 'sub',
//         icon: 'ti-stats-up',
//         children: [
//           {
//             state: 'addexpense',
//             name: 'Addexpensemenu'
//           },
//           {
//             state: 'expenselist',
//             name: 'showallexpensemenu'
//           }
//         ]
//       }
//     ],
//   },

//   {
//     label: 'UI Element',
//     main: [
//       {
//         state: 'user',
//         name: 'Usersmenu',
//         type: 'sub',
//         icon: 'ti-user',
//         children: [
//           {
//             state: 'adduser',
//             name: 'AddUsersmenu'
//           },
//           {
//             state: 'userlist',
//             name: 'Showallusersmenu'
//           }

//         ]
//       },

//     ]
//   }, {
//     label: 'UI Element',
//     main: [
//       {
//         state: 'products',
//         name: 'ProductMenu',
//         type: 'sub',
//         icon: 'ti-bag',
//         children: [


//           {
//             state: 'createproduct',
//             name: 'Addproductsmenu'
//           },
//           {
//             state: 'productlist',
//             name: 'Showallproductsmenu'
//           },
//           {
//             state: 'categoryadd',
//             name: 'Productcategorymenu'
//           },
//           {
//             state: 'categorylist',
//             name: 'Productcategorylistmenu'
//           }

//         ]
//       },

//     ]
//   },



//   {
//     label: 'Navigation',
//     main: [
//       {
//         state: 'quotation',
//         name: 'Quotationmenu',
//         type: 'sub',
//         icon: 'fa fa-book',
//         children: [
//           {
//             state: 'createquotation',
//             name: 'AddQuotationmenu'
//           },
//           {
//             state: 'quotationlist',
//             name: 'Quotationlistmenu'
//           }
//         ]

//       }
//     ],
//   }, {
//     label: 'Navigation',
//     main: [
//       {
//         state: 'vendors',
//         name: 'Customersmenu',
//         type: 'sub',
//         icon: 'fa fa-users',
//         children: [
//           {
//             state: 'createvendor',
//             name: 'AddCustomersmenu'
//           },
//           {
//             state: 'vendorlist',
//             name: 'Customerslistmenu'
//           }
//         ]

//       }
//     ],
//   },
//   {
//     label: 'Navigation',
//     main: [
//       {
//         state: 'settings',
//         name: 'SettingsMenu',
//         type: 'sub',
//         icon: 'ti-settings',
//         children: [
//           {
//             state: 'history',
//             name: 'HistorySubMenu'
//           }
//         ]

//       }
//     ],
//   },

//   /* {
//     label: 'Navigation',
//     main: [
//       {
//         state: 'quotationlist',
//         name: 'quotationlist',
//         type: 'link',
//         icon: 'ti-home'
//       }
//     ],
//   }, */





//   /*

//     {
//       label: 'Forms',
//       main: [
//         {
//           state: 'forms',
//           name: 'Form Components',
//           type: 'link',
//           icon: 'ti-layers'
//         }
//       ]
//     },
//     {
//       label: 'Tables',
//       main: [
//         {
//           state: 'bootstrap-table',
//           name: 'Bootstrap Table',
//           type: 'link',
//           icon: 'ti-receipt'
//         }
//       ]
//     },
//     {
//       label: 'Map',
//       main: [
//         {
//           state: 'map',
//           name: 'Maps',
//           type: 'link',
//           icon: 'ti-map-alt'
//         }
//       ]
//     },
//     {
//       label: 'Pages',
//       main: [
//         {
//           state: 'auth',
//           short_label: 'A',
//           name: 'Authentication',
//           type: 'sub',
//           icon: 'ti-id-badge',
//           children: [
//             {
//               state: 'login',
//               type: 'link',
//               name: 'Login',
//               target: true
//             }, {
//               state: 'registration',
//               type: 'link',
//               name: 'Registration',
//               target: true
//             }
//           ]
//         }
//       ]
//     },
//     {
//       label: 'Other',
//       main: [
//         {
//           state: '',
//           name: 'Menu Levels',
//           type: 'sub',
//           icon: 'ti-direction-alt',
//           children: [
//             {
//               state: '',
//               name: 'Menu Level 2.1',
//               target: true
//             }, {
//               state: '',
//               name: 'Menu Level 2.2',
//               type: 'sub',
//               children: [
//                 {
//                   state: '',
//                   name: 'Menu Level 2.2.1',
//                   target: true
//                 },
//                 {
//                   state: '',
//                   name: 'Menu Level 2.2.2',
//                   target: true
//                 }
//               ]
//             }, {
//               state: '',
//               name: 'Menu Level 2.3',
//               target: true
//             }, {
//               state: '',
//               name: 'Menu Level 2.4',
//               type: 'sub',
//               children: [
//                 {
//                   state: '',
//                   name: 'Menu Level 2.4.1',
//                   target: true
//                 },
//                 {
//                   state: '',
//                   name: 'Menu Level 2.4.2',
//                   target: true
//                 }
//               ]
//             }
//           ]
//         },

//         {
//           state: 'simple-page',
//           name: 'Simple Page',
//           type: 'link',
//           icon: 'ti-layout-sidebar-left'
//         }
//       ]
//     }*/
// ];

