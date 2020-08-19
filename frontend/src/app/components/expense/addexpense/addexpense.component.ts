import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { ExpenseDetail } from 'src/app/models/ExpenseDetail.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpenseitemDetail } from 'src/app/models/ExpenseitemDetail';
import { CustomLogger } from '../../../models/utils/CustomLogger';
import { CustomMisc } from '../../../models/utils/CustomMisc';
import { Utility } from 'src/app/services/utility.service';

@Component({
  selector: 'app-addexpense',
  templateUrl: './addexpense.component.html',
  styleUrls: ['./addexpense.component.css']
})
export class AddexpenseComponent implements OnInit {

  expenseDetail: ExpenseDetail;
  expenseItemDetail: ExpenseitemDetail[] = [];

  constructor(private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute,private util: Utility) { }

  isUpdate = false;
  async htmlInit() {

    let result = await this._dbService.getAllExpenseItem().toPromise();
    this.expenseItemDetail = result["data"];
  }
  catch(error) {
    CustomLogger.logStringWithObject("ERROR:", error);
  }

  ngOnInit() {
    this.expenseDetail = new ExpenseDetail();
    this.htmlInit();
    this._activatedRoute.params.subscribe(
      async params => {
        console.log("params:", params);
        let expense_id = params["id"];
        if (expense_id) {
          let result = await this._dbService.getExpense(expense_id).toPromise();
          console.log(result);
          this.expenseDetail = result["data"];
          this.isUpdate = true;
        }

      }
    );

  }



  async onSubmit() {
    CustomLogger.logStringWithObject("Will save expenses...", this.expenseDetail);
    try {
      let result = null;
      if (this.isUpdate)
        result = await this._dbService.updateExpense(this.expenseDetail).toPromise();
      else {
      /*   this.expenseDetail.expense_added_by_email = this._dbService.getCurrentUserDetail().email; */
        result = await this._dbService.addExpense(this.expenseDetail).toPromise();
      }


      CustomLogger.logStringWithObject("addexpense:result:", result);
      if (!this.isUpdate)
        CustomMisc.showAlert("Expenses Added Successfully");
      else
        CustomMisc.showAlert("Expenses Updated Successfully");
      this._router.navigate(["expense/expenselist"]);

    }
    catch (error) {
      CustomLogger.logError(error);
      CustomMisc.showAlert("Error in adding Expense: " + error.message, true);
    }

  }
  onClickForm() {
    this.expenseDetail.amount = "";
    this.expenseDetail.date = "";
    this.expenseDetail.expense_id = "";
    this.expenseDetail.expense_item = "";
   
}
}
