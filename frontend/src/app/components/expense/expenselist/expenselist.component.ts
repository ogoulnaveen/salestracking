import { OnInit } from '@angular/core';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { ExpenseDetail } from 'src/app/models/ExpenseDetail.model';
import { ExpenseitemDetail } from 'src/app/models/ExpenseitemDetail';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomLogger } from '../../../models/utils/CustomLogger';
import { CustomMisc } from '../../../models/utils/CustomMisc';
import { Utility } from 'src/app/services/utility.service';

declare const require: any;
const jsPDF = require('jspdf');
import * as jspdf from 'jspdf';
require('jspdf-autotable');
import * as xlsx from 'xlsx';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-expenselist',
  templateUrl: './expenselist.component.html',
  styleUrls: ['./expenselist.component.css']
})
export class ExpenselistComponent implements OnInit {
  expenseDataArr = [];
  filteredTableDataArr: any;
  expenseItemDetail: ExpenseitemDetail; @ViewChild('pdfPrint', { static: false }) pdfPrint: ElementRef;

  constructor(private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute,private util: Utility) { }
  isUpdate = false;
  flagShowExpenseReport = true;
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

    if (!this._dbService.getPageMatrix().show_field_menu_link_addexpense)
      this.CAN_ADD = false;
    let result = null;
    if (this._dbService.getCurrentUserDetail().usertype_name == CustomMisc.USER_TYPE_SALES) {
      result = await this._dbService.getAllExpenseForEmail().toPromise();
    } else {
      result = await this._dbService.getAllExpense().toPromise();
    }

    console.log("result:", result);
    this.expenseDataArr = result["data"];
    this.filteredTableDataArr = this.expenseDataArr;
  }

  async ngOnInit() {
    this.expenseItemDetail = new ExpenseitemDetail();
    await this.init();
    this._activatedRoute.params.subscribe(
      async params => {
        console.log("params:", params);
        let item_id = params["id"];
        if (item_id) {
          let result = await this._dbService.getExpenseItem(item_id).toPromise();
          console.log(result);
          this.expenseItemDetail = result["data"];
          this.isUpdate = true;
        }

      });
  }

  async onSubmit() {
    CustomLogger.logStringWithObject("Will save expenseItemDetail...", this.expenseItemDetail);
    try {
      let result = null;
      if (this.isUpdate)
        result = await this._dbService.updateExpenseItem(this.expenseItemDetail).toPromise();
      else
        result = await this._dbService.addExpenseItem(this.expenseItemDetail).toPromise();

      CustomLogger.logStringWithObject("expenseItemDetail:result:", result);
      if (!this.isUpdate)
        CustomMisc.showAlert("expenseItemDetail Added Successfully");
      else
        CustomMisc.showAlert("expenseItemDetail Updated Successfully");
      this._router.navigate(["expense/addexpense"]);

    }
    catch (error) {
      CustomLogger.logError(error);
      CustomMisc.showAlert("Error in adding Expense: " + error.message, true);
    }

  }


  onClickEdit(obj) {
    this._router.navigate(['/expense/addexpense', obj.expense_id]);
  }

  async onClickDelete(obj) {
    console.log("will delete expense details:::", obj);
    await this._dbService.deleteExpense(obj).toPromise();
    await this.init();
  }
  search(term: string) {
    let fieldName = "expense_item";
    this.filteredTableDataArr = this.expenseDataArr.filter(x =>
      x[fieldName].trim().toLowerCase().includes(term.trim().toLowerCase())
    );
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
      pdf.save('ExpensesList.pdf'); // Generated PDF   
    });
  }

  fileName = 'Expenselist.excel';
  exportToExcel() {
    let element = null;
    if (this.flagShowExpenseReport) {
      this.fileName = "Expenselist.xlsx";
      //let element = document.getElementById('content4'); 
      const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet(this.expenseDataArr);
      const wb: xlsx.WorkBook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      xlsx.writeFile(wb, this.fileName);

    }
  }

  downloadPdf() {
    let data = null;
    const doc = new jsPDF();
    let fileName = "Expenselist.pdf";
    if (this.flagShowExpenseReport) {
      fileName = "Expenselist.pdf";
      //data = document.getElementById('content2');
      const col = ["Expenses Id", "Expenses Item", "Date", "Amount"];
      const rows = [];

      for (let k = 0; k < this.expenseDataArr.length; k++) {
        var temp = [this.expenseDataArr[k].expense_id, this.expenseDataArr[k].expense_item,
        this.expenseDataArr[k].date, this.expenseDataArr[k].amount

        ];
        rows.push(temp);
      }
      const header = function (data) {
        doc.setFontSize(18);
        doc.setTextColor(30);
        doc.setFontStyle('normal');
        //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
        doc.text("Report for Expense List", data.settings.margin.left, 50);
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
      }
      ); doc.save(fileName);

    }
  }
  downloadFile(data, filename = 'data') {
    if (this.flagShowExpenseReport) {
      let csvData = this.ConvertToCSV(data, ['expense_id', 'expense_item', 'date', 'amount']);
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

  generateCsv() {
    this.downloadFile(this.expenseDataArr, 'Expenses');
  }
  onClickForm(){
    this.expenseItemDetail.expense_item = "";
    
  }
}