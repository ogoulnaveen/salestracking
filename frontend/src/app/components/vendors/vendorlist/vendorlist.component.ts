import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from 'src/app/services/dbservice.service';
declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf'; 
require('jspdf-autotable');
import * as xlsx from 'xlsx';
import html2canvas from 'html2canvas';  
import { CustomMisc } from 'src/app/models/utils/CustomMisc';


@Component({
  selector: 'app-vendorlist',
  templateUrl: './vendorlist.component.html',
  styleUrls: ['./vendorlist.component.css']
})
export class VendorlistComponent implements OnInit {

 constructor(private _dbService: DBService, private _router: Router) { }
 
 VendorDataArr = [];
 filteredTableDataArr: any;
 flagShowVendorReport= true;

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

    if (!this._dbService.getPageMatrix().show_field_menu_link_createvendor)
      this.CAN_ADD = false;
    let result = await this._dbService.getAllVendors().toPromise();
    console.log("result:", result);
    this.VendorDataArr = result["data"];
    this.filteredTableDataArr = this.VendorDataArr;

  }
  
  async ngOnInit() {
    await this.init();
  }
  
 
 onClickEdit(obj) {
    this._router.navigate(['/vendors/createvendor', obj.vendor_id]);
  }
  
   async onClickDelete(obj) {
    await this._dbService.deleteVendor(obj).toPromise();
    await this.init();
  }

  search(term: string) {
    let fieldName = "customer_name";
    this.filteredTableDataArr = this.VendorDataArr.filter(x =>
      x[fieldName].trim().toLowerCase().includes(term.trim().toLowerCase())
    );
  }
   
  fileName= 'Vendorlist.excel'; 
exportToExcel() {
  let element = null;
  if (this.flagShowVendorReport) { 
    this.fileName = "Customerlist.xlsx";
    //let element = document.getElementById('content4'); 
    const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet(this.VendorDataArr);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    xlsx.writeFile(wb, this.fileName);
  
  }
}
downloadPdf(){
  let data = null;
  const doc = new jsPDF();
  let fileName = "Customerlist.pdf";
  if (this.flagShowVendorReport) {
    fileName = "customerlist.pdf";
    //data = document.getElementById('content2');
    const col = ["Customer Name","Email", "Mobile", "First Name","Last Name"];
    const rows = [];
     
  for (let k = 0; k < this.VendorDataArr.length; k++) {
    var temp = [this.VendorDataArr[k].customer_name,this.VendorDataArr[k].email, this.VendorDataArr[k].phone,
    this.VendorDataArr[k].first_name, this.VendorDataArr[k].last_name
    
    ];
    rows.push(temp);
    }
    const header = function (data) {
      doc.setFontSize(18);
      doc.setTextColor(30);
      doc.setFontStyle('normal');
//doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
      doc.text("Report for Customer List", data.settings.margin.left, 50);
  };
    doc.autoTable(col, rows,{
      theme : 'grid',
     /*  theme: 'striped' */
      styles: {
              halign: 'right',},
      headerStyles: {
                   fillColor: [0, 65, 69],halign:'center'},
                   margin: {top: 60}, beforePageContent: header,
          
      columnStyles:{
           0: {halign:'left'}
      },
     

  });


    doc.save(fileName);

  }

}
downloadFile(data, filename='data') {
  if (this.flagShowVendorReport) {
  let csvData = this.ConvertToCSV(data, ['customer_name','email','phone','first_name','last_name']);
  console.log(csvData)
  let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
  let dwldLink = document.createElement("a");
  let url = URL.createObjectURL(blob);
  let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
  if (isSafariBrowser) { //if Safari open in new window to save file with random filename.
  dwldLink.setAttribute("target", "_blank");
  }
  dwldLink.setAttribute("href", url);
  dwldLink.setAttribute("download", filename + ".csv");
  dwldLink.style.visibility = "hidden";
  document.body.appendChild(dwldLink);
  dwldLink.click();
  document.body.removeChild(dwldLink);
  }
  }
  
  ConvertToCSV(objArray, headerList) {
  let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str = '';
  let row = 'S.No,';
  
  for (let index in headerList) {
  row += headerList[index] + ',';
  }
  row = row.slice(0, -1);
  str += row + '\r\n';
  for (let i = 0; i < array.length; i++) {
  let line = (i+1)+'';
  for (let index in headerList) {
  let head = headerList[index];
  
  line += ',' + array[i][head];
  }
  str += line + '\r\n';
  }
  return str;
  }
  
  generateCsv(){
  this.downloadFile(this.VendorDataArr, 'Customerlist');
  }

  
  exportToPrint()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0; 
     
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Customerlist.pdf'); // Generated PDF   
    });  
  } 
  }

