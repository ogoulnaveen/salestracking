import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { UserDetail } from '../models/UserDetail.model';
import { ProductDetail } from '../models/ProductDetail.model';
import { QuoteDetail } from '../models/QuoteDetail.model';
import { VendorDetail } from '../models/VendorDetail.model';
import { CategoryDetail } from '../models/CategoryDetail.model';
import { UserType } from '../models/UserType.model';
import { ExpenseDetail } from '../models/ExpenseDetail.model';
import { ExpenseitemDetail } from '../models/ExpenseitemDetail';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { userInfo } from 'os';
import { PageMatrix } from '../models/utils/PageMatrix';


@Injectable()
export class DBService {

    SERVER_URL = "http://localhost:3000/api";
    constructor(private _http: HttpClient) {
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    // myOptions = {
    //     headers: new HttpHeaders({
    //         // 'Authorization': 'Bearer ' + localStorage.getItem("jwt")
    //         'Authorization': 'Bearer ' + this.getToken()
    //     })
    // }

    getMyOptions(){
        const  headers = ({
            'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            // 'Authorization': 'Bearer ' + this.getToken()
        });
        return headers;
    }
    

    // Handle API errors
    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };


    register(user): Observable<any> {
        return this._http
            .post<any>(this.SERVER_URL + '/register', user, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }
    login(user): Observable<any> {
        return this._http
            .post<any>(this.SERVER_URL + '/login', user, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }
    addUser(obj: UserDetail) {
        console.log("Inside addUser");
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/addUser', obj, {headers});
    }

    addProduct(obj: ProductDetail) {
        console.log("Inside addProduct");
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/addProduct', obj, {headers});
    }

    addQuote(obj: QuoteDetail) {
        let headers = this.getMyOptions();
        console.log("Inside addQuote");
        return this._http.post(this.SERVER_URL + '/addQuote', obj, {headers});
    }
    addVendor(obj: VendorDetail) {
        let headers = this.getMyOptions();
        console.log("Inside addVendor");
        return this._http.post(this.SERVER_URL + '/addVendor', obj, {headers});
    }

    updateUser(obj: UserDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateUser', obj, {headers});
    }

    updateProduct(obj: ProductDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateProduct', obj, {headers});
    }

    updateQuote(obj: QuoteDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateQuote', obj, {headers});
    }

    updateVendor(obj: VendorDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateVendor', obj, {headers});
    }

    getUserFromEmail(email) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getUserFromEmail/' + email, {headers});
    }

    getUser(user_id) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getUser/' + user_id, {headers});
    }
    getProduct(product_id) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getProduct/' + product_id, {headers});
    }
    getQuote(quote_id) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getQuote/' + quote_id, {headers});
    }
    getVendors(vendor_id) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getVendors/' + vendor_id, {headers});
    }


    deleteUser(obj) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteUser', obj, {headers});
    }
    deleteProduct(obj) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteProduct', obj, {headers});
    }

    deleteQuote(obj) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteQuote', obj, {headers});
    }
    deleteVendor(obj) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteVendor', obj, {headers});
    }


    getAllProducts() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllProducts', {headers});
    }
    getAllUsers() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllUsers', {headers});
    }

    getUsersByUserType(userType): Observable<any> {
        let headers = this.getMyOptions();
        return this._http
            .post<any>(this.SERVER_URL + '/getUsersByUserType', userType, {headers})
            .pipe(
                catchError(this.handleError)
            )
    }
    getAllQuotes() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllQuotes', {headers});
    }

    getAllQuotes1() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllQuotes1', {headers});
    }

    // converted above function to observables
    getAllVendors(): Observable<any> {
        let headers = this.getMyOptions();
        return this._http
            .get<any>(this.SERVER_URL + '/getAllVendors', {headers})
            .pipe(
                catchError(this.handleError)
            )
    }

    getTotalUsers() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getTotalUsers', {headers});
    }
    getTotalQuotes() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getTotalQuotes', {headers});
    }
    getTotalProducts() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getTotalProducts', {headers});
    }
    getTotalVendors() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getTotalVendors', {headers});
    }
    getTotalVisits() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getTotalVisits', {headers});
    }
    dashboardSearch() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/dashboardSearch', {headers});
    }
    deleteCategory(obj) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteCategory', obj, {headers});
    }
    getAllCategory() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllCategory', {headers});
    }
    getCategory(category_id) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getCategory/' + category_id, {headers});
    }
    updateCategory(obj: CategoryDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateCategory', obj, {headers});
    }
    addCategory(obj: CategoryDetail) {
        let headers = this.getMyOptions();
        console.log("Inside addCategory");
        return this._http.post(this.SERVER_URL + '/addCategory', obj, {headers});
    }
    deleteUserType(obj) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteUserType', obj, {headers});
    }
    getAllUserType() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllUserType', {headers});
    }
    getUserType(usertype_id) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getUserType/' + usertype_id, {headers});
    }
    updateUserType(obj: UserType) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateUserType', obj, {headers});
    }
    addUserType(obj: UserType) {
        let headers = this.getMyOptions();
        console.log("Inside addUserType");
        return this._http.post(this.SERVER_URL + '/addUserType', obj, {headers});
    }

    //////////////////// -- visits code --////////////////////////
    getVisitsOfSalesUser() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + "/getVisitsOfSalesUser", {headers});
    }
    getAllVisits(): Observable<any> {
        let headers = this.getMyOptions();
        return this._http
            .get<any>(this.SERVER_URL + '/getAllVisits', {headers})
            .pipe(
                catchError(this.handleError)
            )
    }
    getAllVisits1(): Observable<any> {
        let headers = this.getMyOptions();
        return this._http
            .get<any>(this.SERVER_URL + '/getAllVisits1', {headers})
            .pipe(
                catchError(this.handleError)
            )
    }
    getVisit(visit_id): Observable<any> {
        let headers = this.getMyOptions();
        return this._http
            .get<any>(this.SERVER_URL + '/getVisit/' + visit_id, {headers})
            .pipe(
                catchError(this.handleError)
            )
    }
    getVisitsBetweenDate(dates): Observable<any> {
        let headers = this.getMyOptions();
        return this._http
            .post<any>(this.SERVER_URL + '/getVisitsBetweenDates', dates, {headers})
            .pipe(
                catchError(this.handleError)
            )
    }
    addVisit(visit): Observable<any> {
        let headers = this.getMyOptions();
        return this._http
            .post<any>(this.SERVER_URL + '/addVisit', visit, {headers})
            .pipe(
                catchError(this.handleError)
            )
    }
    updateVisit(visit): Observable<any> {
        let headers = this.getMyOptions();
        return this._http
            .post<any>(this.SERVER_URL + '/updateVisit', visit, {headers})
            .pipe(
                catchError(this.handleError)
            )
    }
    deleteVisit(visit): Observable<any> {
        let headers = this.getMyOptions();
        return this._http
            .post<any>(this.SERVER_URL + '/deleteVisit', visit, {headers})
            .pipe(
                catchError(this.handleError)
            )
    }
    scheduleVisit(visit): Observable<any> {
        let headers = this.getMyOptions();
        return this._http
            .post<any>(this.SERVER_URL + '/scheduleVisit', visit, {headers})
            .pipe(
                catchError(this.handleError)
            )
    }
    getAllScheduleVisits() {
        let headers = this.getMyOptions();
        return this._http
            .get<any>(this.SERVER_URL + '/getAllScheduleVisits', {headers})
            .pipe(
                catchError(this.handleError)
            )
    }
    getScheduleVisit(schedule_visit_id): Observable<any> {
        let headers = this.getMyOptions();
        return this._http
            .get<any>(this.SERVER_URL + '/getScheduleVisit/' + schedule_visit_id, {headers})
            .pipe(
                catchError(this.handleError)
            )
    }
    updateScheduleVisit(schedule_visit): Observable<any> {
        let headers = this.getMyOptions();
        return this._http
            .post<any>(this.SERVER_URL + '/updateScheduleVisit', schedule_visit, {headers})
            .pipe(
                catchError(this.handleError)
            )
    }
    deleteScheduleVisit(schedule_visit): Observable<any> {
        let headers = this.getMyOptions();
        return this._http
            .post<any>(this.SERVER_URL + '/deleteScheduleVisit', schedule_visit, {headers})
            .pipe(
                catchError(this.handleError)
            )
    }
    logoutAction(user) {
        let headers = this.getMyOptions();
        return this._http
            .post<any>(this.SERVER_URL + '/logout', user, {headers})
            .pipe(
                catchError(this.handleError)
            )
    }
    getAllUserActions() {
        let headers = this.getMyOptions();
        return this._http
            .get<any>(this.SERVER_URL + '/getAllUserActions', {headers})
            .pipe(
                catchError(this.handleError)
            )
    }

    addExpense(obj: ExpenseDetail) {
        let headers = this.getMyOptions();
        console.log("Inside addExpense ");
        return this._http.post(this.SERVER_URL + '/addExpense', obj, {headers});
    }
    updateExpense(obj: ExpenseDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateExpense', obj, {headers});
    }

    deleteExpense(obj) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteExpense', obj, {headers});
    }
    getAllExpenseForEmail() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllExpenseForEmail', {headers});
    }
    getAllExpense() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllExpense', {headers});
    }
    getExpense(expense_id) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getExpense/' + expense_id, {headers});
    }
    getTotalExpenses() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getTotalExpenses', {headers});
    }
    addExpenseItem(obj: ExpenseitemDetail) {
        let headers = this.getMyOptions();
        console.log("Inside addExpenseItem ");
        return this._http.post(this.SERVER_URL + '/addExpenseItem', obj, {headers});
    }
    updateExpenseItem(obj: ExpenseitemDetail) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/updateExpenseItem', obj, {headers});
    }

    deleteExpenseItem(obj) {
        let headers = this.getMyOptions();
        return this._http.post(this.SERVER_URL + '/deleteExpenseItem', obj, {headers});
    }
    getAllExpenseItem() {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getAllExpenseItem', {headers});
    }
    getExpenseItem(item_id) {
        let headers = this.getMyOptions();
        return this._http.get(this.SERVER_URL + '/getExpenseItem/' + item_id, {headers});
    }


    ////////////////
    private currentUserDetail: UserDetail;
    private pageMatrix: PageMatrix;
    private token: String;

    getToken(){
        return this.token;
    }
    setToken(token){
        this.token = token;
    }

    getCurrentUserDetail() {
        return this.currentUserDetail;
    }

    setCurrentUserDetail(userDetail) {
        this.currentUserDetail = userDetail;
    }

    getPageMatrix() {
        return this.pageMatrix;
    }

    setPageMatrix(pageMatrix) {
        this.pageMatrix = null;
        this.pageMatrix = pageMatrix;
    }

    ////////////////

    CheckInOutAction(checkStatus) {
        let headers = this.getMyOptions();
        return this._http
            .post<any>(this.SERVER_URL + '/checkInOutAction', checkStatus, {headers})
            .pipe(
                catchError(this.handleError)
            )
    }
    getAllCheckInOut() {
        let headers = this.getMyOptions();
        return this._http
            .get<any>(this.SERVER_URL + '/getAllCheckInOut', {headers})
            .pipe(
                catchError(this.handleError)
            )
    }


}


// import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
// import { Injectable } from '@angular/core';
// import { UserDetail } from '../models/UserDetail.model';
// import { ProductDetail } from '../models/ProductDetail.model';
// import { QuoteDetail } from '../models/QuoteDetail.model';
// import { VendorDetail } from '../models/VendorDetail.model';
// import { CategoryDetail } from '../models/CategoryDetail.model';
// import { UserType } from '../models/UserType.model';
// import { ExpenseDetail } from '../models/ExpenseDetail.model';
// import { ExpenseitemDetail } from '../models/ExpenseitemDetail';
// import { throwError } from 'rxjs/internal/observable/throwError';
// import { Observable } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { userInfo } from 'os';
// import { PageMatrix } from '../models/utils/PageMatrix';


// @Injectable()
// export class DBService {

//     SERVER_URL = "http://localhost:3000/api";
//     constructor(private _http: HttpClient) {
//     }

//     httpOptions = {
//         headers: new HttpHeaders({
//             'Content-Type': 'application/json'
//         })
//     }

//     myOptions = {
//         headers: new HttpHeaders({
//             // 'Authorization': 'Bearer ' + localStorage.getItem("jwt")
//             'Authorization': 'Bearer ' + this.getToken()
//         })
//     }

//     getMyOptions(){
//         const  headers = ({
//             'Authorization': 'Bearer ' + localStorage.getItem("jwt")
//             // 'Authorization': 'Bearer ' + this.getToken()
//         });
//         return headers;
//     }
    

//     // Handle API errors
//     handleError(error: HttpErrorResponse) {
//         if (error.error instanceof ErrorEvent) {
//             // A client-side or network error occurred. Handle it accordingly.
//             console.error('An error occurred:', error.error.message);
//         } else {
//             // The backend returned an unsuccessful response code.
//             // The response body may contain clues as to what went wrong,
//             console.error(
//                 `Backend returned code ${error.status}, ` +
//                 `body was: ${error.error}`);
//         }
//         // return an observable with a user-facing error message
//         return throwError(
//             'Something bad happened; please try again later.');
//     };


//     register(user): Observable<any> {
//         return this._http
//             .post<any>(this.SERVER_URL + '/register', user, this.httpOptions)
//             .pipe(
//                 catchError(this.handleError)
//             )
//     }
//     login(user): Observable<any> {
//         return this._http
//             .post<any>(this.SERVER_URL + '/login', user, this.httpOptions)
//             .pipe(
//                 catchError(this.handleError)
//             )
//     }
//     addUser(obj: UserDetail) {
//         console.log("Inside addUser");
//         let headers = this.getMyOptions();
//         return this._http.post(this.SERVER_URL + '/addUser', obj, {headers});
//     }

//     addProduct(obj: ProductDetail) {
//         console.log("Inside addProduct");
//         return this._http.post(this.SERVER_URL + '/addProduct', obj, this.myOptions);
//     }

//     addQuote(obj: QuoteDetail) {
//         console.log("Inside addQuote");
//         return this._http.post(this.SERVER_URL + '/addQuote', obj, this.myOptions);
//     }
//     addVendor(obj: VendorDetail) {
//         console.log("Inside addVendor");
//         return this._http.post(this.SERVER_URL + '/addVendor', obj, this.myOptions);
//     }

//     updateUser(obj: UserDetail) {
//         return this._http.post(this.SERVER_URL + '/updateUser', obj, this.myOptions);
//     }

//     updateProduct(obj: ProductDetail) {
//         return this._http.post(this.SERVER_URL + '/updateProduct', obj, this.myOptions);
//     }

//     updateQuote(obj: QuoteDetail) {
//         return this._http.post(this.SERVER_URL + '/updateQuote', obj, this.myOptions);
//     }

//     updateVendor(obj: VendorDetail) {
//         return this._http.post(this.SERVER_URL + '/updateVendor', obj, this.myOptions);
//     }

//     getUserFromEmail(email) {
//         return this._http.get(this.SERVER_URL + '/getUserFromEmail/' + email, this.myOptions);
//     }

//     getUser(user_id) {
//         return this._http.get(this.SERVER_URL + '/getUser/' + user_id, this.myOptions);
//     }
//     getProduct(product_id) {
//         return this._http.get(this.SERVER_URL + '/getProduct/' + product_id, this.myOptions);
//     }
//     getQuote(quote_id) {
//         return this._http.get(this.SERVER_URL + '/getQuote/' + quote_id, this.myOptions);
//     }
//     getVendors(vendor_id) {
//         return this._http.get(this.SERVER_URL + '/getVendors/' + vendor_id, this.myOptions);
//     }


//     deleteUser(obj) {
//         return this._http.post(this.SERVER_URL + '/deleteUser', obj, this.myOptions);
//     }
//     deleteProduct(obj) {
//         return this._http.post(this.SERVER_URL + '/deleteProduct', obj, this.myOptions);
//     }

//     deleteQuote(obj) {
//         return this._http.post(this.SERVER_URL + '/deleteQuote', obj, this.myOptions);
//     }
//     deleteVendor(obj) {
//         return this._http.post(this.SERVER_URL + '/deleteVendor', obj, this.myOptions);
//     }


//     getAllProducts() {
//         return this._http.get(this.SERVER_URL + '/getAllProducts', this.myOptions);
//     }
//     getAllUsers() {
//         return this._http.get(this.SERVER_URL + '/getAllUsers', this.myOptions);
//     }

//     getUsersByUserType(userType): Observable<any> {
//         return this._http
//             .post<any>(this.SERVER_URL + '/getUsersByUserType', userType, this.myOptions)
//             .pipe(
//                 catchError(this.handleError)
//             )
//     }
//     getAllQuotes() {
//         return this._http.get(this.SERVER_URL + '/getAllQuotes', this.myOptions);
//     }

//     // converted above function to observables
//     getAllVendors(): Observable<any> {
//         let headers = this.getMyOptions();
//         return this._http
//             .get<any>(this.SERVER_URL + '/getAllVendors', {headers})
//             .pipe(
//                 catchError(this.handleError)
//             )
//     }

//     getTotalUsers() {
//         return this._http.get(this.SERVER_URL + '/getTotalUsers', this.myOptions);
//     }
//     getTotalQuotes() {
//         return this._http.get(this.SERVER_URL + '/getTotalQuotes', this.myOptions);
//     }
//     getTotalProducts() {
//         return this._http.get(this.SERVER_URL + '/getTotalProducts', this.myOptions);
//     }
//     getTotalVendors() {
//         return this._http.get(this.SERVER_URL + '/getTotalVendors', this.myOptions);
//     }
//     getTotalVisits() {
//         return this._http.get(this.SERVER_URL + '/getTotalVisits', this.myOptions);
//     }
//     dashboardSearch() {
//         return this._http.get(this.SERVER_URL + '/dashboardSearch', this.myOptions);
//     }
//     deleteCategory(obj) {
//         return this._http.post(this.SERVER_URL + '/deleteCategory', obj, this.myOptions);
//     }
//     getAllCategory() {
//         return this._http.get(this.SERVER_URL + '/getAllCategory', this.myOptions);
//     }
//     getCategory(category_id) {
//         return this._http.get(this.SERVER_URL + '/getCategory/' + category_id, this.myOptions);
//     }
//     updateCategory(obj: CategoryDetail) {
//         return this._http.post(this.SERVER_URL + '/updateCategory', obj, this.myOptions);
//     }
//     addCategory(obj: CategoryDetail) {
//         console.log("Inside addCategory");
//         return this._http.post(this.SERVER_URL + '/addCategory', obj, this.myOptions);
//     }
//     deleteUserType(obj) {
//         return this._http.post(this.SERVER_URL + '/deleteUserType', obj, this.myOptions);
//     }
//     getAllUserType() {
//         return this._http.get(this.SERVER_URL + '/getAllUserType', this.myOptions);
//     }
//     getUserType(usertype_id) {
//         return this._http.get(this.SERVER_URL + '/getUserType/' + usertype_id, this.myOptions);
//     }
//     updateUserType(obj: UserType) {
//         return this._http.post(this.SERVER_URL + '/updateUserType', obj, this.myOptions);
//     }
//     addUserType(obj: UserType) {
//         console.log("Inside addUserType");
//         return this._http.post(this.SERVER_URL + '/addUserType', obj, this.myOptions);
//     }

//     //////////////////// -- visits code --////////////////////////
//     getVisitsOfSalesUser() {
//         let headers = this.getMyOptions();
//         return this._http.get(this.SERVER_URL + "/getVisitsOfSalesUser", {headers});
//     }
//     getAllVisits(): Observable<any> {
//         let headers = this.getMyOptions();
//         return this._http
//             .get<any>(this.SERVER_URL + '/getAllVisits', {headers})
//             .pipe(
//                 catchError(this.handleError)
//             )
//     }
//     getVisit(visit_id): Observable<any> {
//         return this._http
//             .get<any>(this.SERVER_URL + '/getVisit/' + visit_id, this.myOptions)
//             .pipe(
//                 catchError(this.handleError)
//             )
//     }
//     getVisitsBetweenDate(dates): Observable<any> {
//         return this._http
//             .post<any>(this.SERVER_URL + '/getVisitsBetweenDates', dates, this.myOptions)
//             .pipe(
//                 catchError(this.handleError)
//             )
//     }
//     addVisit(visit): Observable<any> {
//         let headers = this.getMyOptions();
//         return this._http
//             .post<any>(this.SERVER_URL + '/addVisit', visit, {headers})
//             .pipe(
//                 catchError(this.handleError)
//             )
//     }
//     updateVisit(visit): Observable<any> {
//         return this._http
//             .post<any>(this.SERVER_URL + '/updateVisit', visit, this.myOptions)
//             .pipe(
//                 catchError(this.handleError)
//             )
//     }
//     deleteVisit(visit): Observable<any> {
//         return this._http
//             .post<any>(this.SERVER_URL + '/deleteVisit', visit, this.myOptions)
//             .pipe(
//                 catchError(this.handleError)
//             )
//     }
//     scheduleVisit(visit): Observable<any> {
//         return this._http
//             .post<any>(this.SERVER_URL + '/scheduleVisit', visit, this.myOptions)
//             .pipe(
//                 catchError(this.handleError)
//             )
//     }
//     getAllScheduleVisits() {
//         return this._http
//             .get<any>(this.SERVER_URL + '/getAllScheduleVisits', this.myOptions)
//             .pipe(
//                 catchError(this.handleError)
//             )
//     }
//     getScheduleVisit(schedule_visit_id): Observable<any> {
//         return this._http
//             .get<any>(this.SERVER_URL + '/getScheduleVisit/' + schedule_visit_id, this.myOptions)
//             .pipe(
//                 catchError(this.handleError)
//             )
//     }
//     updateScheduleVisit(schedule_visit): Observable<any> {
//         return this._http
//             .post<any>(this.SERVER_URL + '/updateScheduleVisit', schedule_visit, this.myOptions)
//             .pipe(
//                 catchError(this.handleError)
//             )
//     }
//     deleteScheduleVisit(schedule_visit): Observable<any> {
//         return this._http
//             .post<any>(this.SERVER_URL + '/deleteScheduleVisit', schedule_visit, this.myOptions)
//             .pipe(
//                 catchError(this.handleError)
//             )
//     }
//     logoutAction(user) {
//         return this._http
//             .post<any>(this.SERVER_URL + '/logout', user, this.myOptions)
//             .pipe(
//                 catchError(this.handleError)
//             )
//     }
//     getAllUserActions() {
//         return this._http
//             .get<any>(this.SERVER_URL + '/getAllUserActions', this.myOptions)
//             .pipe(
//                 catchError(this.handleError)
//             )
//     }

//     addExpense(obj: ExpenseDetail) {
//         console.log("Inside addExpense ");
//         return this._http.post(this.SERVER_URL + '/addExpense', obj, this.myOptions);
//     }
//     updateExpense(obj: ExpenseDetail) {
//         return this._http.post(this.SERVER_URL + '/updateExpense', obj, this.myOptions);
//     }

//     deleteExpense(obj) {
//         return this._http.post(this.SERVER_URL + '/deleteExpense', obj, this.myOptions);
//     }
//     getAllExpenseForEmail() {
//         return this._http.get(this.SERVER_URL + '/getAllExpenseForEmail', this.myOptions);
//     }
//     getAllExpense() {
//         return this._http.get(this.SERVER_URL + '/getAllExpense', this.myOptions);
//     }
//     getExpense(expense_id) {
//         return this._http.get(this.SERVER_URL + '/getExpense/' + expense_id, this.myOptions);
//     }
//     getTotalExpenses() {
//         return this._http.get(this.SERVER_URL + '/getTotalExpenses', this.myOptions);
//     }
//     addExpenseItem(obj: ExpenseitemDetail) {
//         console.log("Inside addExpenseItem ");
//         return this._http.post(this.SERVER_URL + '/addExpenseItem', obj, this.myOptions);
//     }
//     updateExpenseItem(obj: ExpenseitemDetail) {
//         return this._http.post(this.SERVER_URL + '/updateExpenseItem', obj, this.myOptions);
//     }

//     deleteExpenseItem(obj) {
//         return this._http.post(this.SERVER_URL + '/deleteExpenseItem', obj, this.myOptions);
//     }
//     getAllExpenseItem() {
//         return this._http.get(this.SERVER_URL + '/getAllExpenseItem', this.myOptions);
//     }
//     getExpenseItem(item_id) {
//         return this._http.get(this.SERVER_URL + '/getExpenseItem/' + item_id, this.myOptions);
//     }


//     ////////////////
//     private currentUserDetail: UserDetail;
//     private pageMatrix: PageMatrix;
//     private token: String;

//     getToken(){
//         return this.token;
//     }
//     setToken(token){
//         this.token = token;
//     }

//     getCurrentUserDetail() {
//         return this.currentUserDetail;
//     }

//     setCurrentUserDetail(userDetail) {
//         this.currentUserDetail = userDetail;
//     }

//     getPageMatrix() {
//         return this.pageMatrix;
//     }

//     setPageMatrix(pageMatrix) {
//         this.pageMatrix = null;
//         this.pageMatrix = pageMatrix;
//     }

//     ////////////////

//     CheckInOutAction(checkStatus) {
//         return this._http
//             .post<any>(this.SERVER_URL + '/checkInOutAction', checkStatus, this.myOptions)
//             .pipe(
//                 catchError(this.handleError)
//             )
//     }
//     getAllCheckInOut() {
//         return this._http
//             .get<any>(this.SERVER_URL + '/getAllCheckInOut', this.myOptions)
//             .pipe(
//                 catchError(this.handleError)
//             )
//     }


// }