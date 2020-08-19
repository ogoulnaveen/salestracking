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
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  constructor(private _dbService: DBService, private _router: Router) { }

  tableDataArr = [];
  filteredTableDataArr: any;
  flagShowUserReport = true;

  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;

  async init() {
    this.ALL_DELETE_ALLOWED = this._dbService.getPageMatrix().all_delete_permissions;
    if (this._dbService.getCurrentUserDetail().usertype_name == CustomMisc.USER_TYPE_SALES ||
      this._dbService.getCurrentUserDetail().usertype_name == CustomMisc.USER_TYPE_CUSTOMERS) {
      this.SHOW_ICONS = false;
      this.SHOW_EDIT_DELETE = false;
    }

    if (!this._dbService.getPageMatrix().show_field_menu_link_adduser)
      this.CAN_ADD = false;
    let result = await this._dbService.getAllUsers().toPromise();
    console.log("result:", result);
    this.tableDataArr = result["data"];
    this.filteredTableDataArr = this.tableDataArr;
  }
  async ngOnInit() {
    await this.init();
  }

  onClickEdit(obj) {
    this._router.navigate(['/user/adduser', obj.user_id]);
  }

  async onClickDelete(obj) {
    console.log("will delete user:::", obj);
    await this._dbService.deleteUser(obj).toPromise();
    await this.init();
  }


  search(term: string) {
    let fieldName = "usertype_name";
    this.filteredTableDataArr = this.tableDataArr.filter(x =>
      x[fieldName].trim().toLowerCase().includes(term.trim().toLowerCase())
    );
  }


  fileName = 'userlist.excel';
  exportToExcel() {
    let element = null;
    
      this.fileName = "Userlist.xlsx";
      //let element = document.getElementById('content4'); 
      const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet(this.tableDataArr);
      const wb: xlsx.WorkBook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      xlsx.writeFile(wb, this.fileName);


  }

  downloadPdf() {
    let data = null;
    const doc = new jsPDF();
    let fileName = "Userlist.pdf";
    if (this.flagShowUserReport) {
      fileName = "Userlist.pdf";
      //data = document.getElementById('content2');
      const col = ["User Id", "UserType", "First Name", "Last Name"];
      const rows = [];

      for (let k = 0; k < this.tableDataArr.length; k++) {
        var temp = [this.tableDataArr[k].user_id, this.tableDataArr[k].usertype_name,
        this.tableDataArr[k].first_name, this.tableDataArr[k].last_name

        ];
        rows.push(temp);
      }
      const header = function (data) {
        doc.setFontSize(18);
        doc.setTextColor(30);
        doc.setFontStyle('normal');
        //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
        doc.text("Report for User List", data.settings.margin.left, 50);
      };

      doc.autoTable(col, rows, {
        theme: 'grid',
        /*  theme: 'striped' */
        styles: {
          halign: 'right',
        },
        headerStyles: {
          fillColor: [0, 65, 69], halign: 'center'
        },
        margin: { top: 60 }, beforePageContent: header,

        columnStyles: {
          0: { halign: 'left' }
        },


      });

      doc.save(fileName);

    }

  }

  downloadFile(data, filename = 'data') {
    if (this.flagShowUserReport) {
      let csvData = this.ConvertToCSV(data, ['user_id', 'usertype_name', 'first_name', 'last_name']);
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
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];

        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }

  generateCsv(){
    this.downloadFile(this.tableDataArr, 'Userlist');
    }
  
  exportToPrint() {
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
      pdf.save('userlist.pdf'); // Generated PDF   
    });
  }
}


