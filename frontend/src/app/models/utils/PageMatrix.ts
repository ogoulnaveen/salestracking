import { SimplePermissions } from './SimplePermissions';
import { CustomMisc } from './CustomMisc';
import { CustomLogger } from './CustomLogger';

export class PageMatrix {
    page_matrix_id: string;

    show_field_menu_heading_navigation = true;
    permission_addVisit = new SimplePermissions();
    show_field_menu_link_addVisit = false;
    show_field_menu_link_searchVisit = true;
    show_field_menu_link_schedulevisit = true;
    show_field_menu_link_assignedvisit = true;
    show_field_menu_link_addexpense = false;
    show_field_menu_link_expenselist = true;
    show_field_menu_link_adduser = true;
    show_field_menu_link_userlist = true;
    show_field_menu_link_createproduct = true;
    show_field_menu_link_productlist = true;
    show_field_menu_link_categoryadd = true;
    show_field_menu_link_categorylist = true;
    show_field_menu_link_createquotation = true;
    show_field_menu_link_quotationlist = true;
    show_field_menu_link_createvendor = true;
    show_field_menu_link_vendorlist = true;
    show_field_menu_link_history = true;
    show_field_menu_link_attendance = true;
    show_field_menu_link_attendancelist = true;

    all_delete_permissions = true;

    constructor(userTypeName) {
        CustomLogger.logString("PageMatrix: userTypeName:" + userTypeName);
        if (userTypeName == CustomMisc.USER_TYPE_MANAGER) {
            this.all_delete_permissions = false;
            this.show_field_menu_link_addVisit = false;
        } else if (userTypeName == CustomMisc.USER_TYPE_SALES) {
            
            this.show_field_menu_link_adduser = false;
            this.show_field_menu_link_createproduct = false;
            this.show_field_menu_link_schedulevisit = false;
            this.show_field_menu_link_adduser = false;
           
            this.show_field_menu_link_userlist = false;
            this.show_field_menu_link_attendance = false;
            this.show_field_menu_link_attendancelist = false;
            this.show_field_menu_link_categoryadd = false;
            this.show_field_menu_link_categorylist = false;
        } else if (userTypeName == CustomMisc.USER_TYPE_CUSTOMERS) {
            this.show_field_menu_link_addVisit = false;
            this.show_field_menu_link_searchVisit = false;
            this.show_field_menu_link_schedulevisit = false;
            this.show_field_menu_link_assignedvisit = false;
            this.show_field_menu_link_addexpense = false;
            this.show_field_menu_link_expenselist = false;
            this.show_field_menu_link_adduser = false;
            this.show_field_menu_link_userlist = false;
            this.show_field_menu_link_createproduct = false;
            this.show_field_menu_link_productlist = true;
            this.show_field_menu_link_categoryadd = false;
            this.show_field_menu_link_categorylist = false;
            this.show_field_menu_link_createquotation = false;
            this.show_field_menu_link_quotationlist = false;
            this.show_field_menu_link_createvendor = false;
            this.show_field_menu_link_vendorlist = false;
            this.show_field_menu_link_history = false;
            this.show_field_menu_link_attendance = false;
            this.show_field_menu_link_attendancelist = false;
        }

    }
}