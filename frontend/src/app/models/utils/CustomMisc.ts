import { CustomLogger } from './CustomLogger';

export class CustomMisc {

    static getArrayFromStringSplit(str: string, splitDelimiter: string) {
        return str.split(splitDelimiter);
    }

    static getCurrentTimeInMilli() {
        return Date.now();
    }
    static getCurrentTimeInString() {
        let d = new Date(Date.now());
        let delim = "/";
        let delim2 = ":";
        return d.getDate() + delim + d.getMonth() + delim + d.getFullYear() + delim2 + d.getHours() + delim2 + d.getMinutes() + delim2 + d.getSeconds();
    }

    static getCurrentBrowser() {
        // let isIE1 =/^.*MSIE [5-9]/i.test(window.navigator.userAgent);
        CustomLogger.logStringWithObject("navigator:: ", window.navigator);
        return window.navigator.appCodeName + " - " + window.navigator.appVersion;
    }

    static showAlert(message: string, isError: boolean = false) {
        if (isError)
            alert("!!!! " + message + " !!!!");
        else
            alert(message);
    }

    static showErrorObject(errorObj) {
        var str = "ERROR. Please Check Internal Logs.";
        try {
            str = errorObj.error.data.details;
        } catch (error) {
            CustomLogger.logError(error);
        }

        alert("!!!!! " + str + " !!!!!");
    }


    static searchDataArr(tableDataArr, term: string, fieldName) {
        let filteredTableDataArr = tableDataArr;
        if (!term) {
            filteredTableDataArr = tableDataArr;
        } else {
            filteredTableDataArr = tableDataArr.filter(x =>
                x[fieldName].trim().toLowerCase().includes(term.trim().toLowerCase())
            );
        }
        return filteredTableDataArr;
    }

    static convertRuleStringArrToMap(tmpStr) {
        let tmpStrArr = tmpStr.split("#");
        let map = new Map();
        for (let k = 0; k < tmpStrArr.length; k++) {
            let tmpEntityPermissionStrArr = tmpStrArr[k].split(":");
            let key = tmpEntityPermissionStrArr[0];
            let value: string[] = tmpEntityPermissionStrArr[1].split(",")
            CustomLogger.logString("key:" + key + " value:" + value);
            map.set(key, value);
        }
        return map;
    }

    static convertRuleMapToString(map) {
        let tmpStrArr = [];
        map.forEach((value, key) => {
            tmpStrArr.push(key + ":" + value);
        });
        return tmpStrArr.join("#");
    }

    /**
     * 
     */
    static getNewUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    //////////
    //user types
    static readonly USER_TYPE_ADMIN = "Admin";
    static readonly USER_TYPE_MANAGER = "Manager";
    static readonly USER_TYPE_SALES = "Sales User";
    static readonly USER_TYPE_CUSTOMERS = "Customers";



    static isPageVisible(next, userType_Name) {
        console.log("CustomMisc: next:" + next + " userType_Name:" + userType_Name);
        if (next._routerState.url == "/expense/expenselist") {
            if (userType_Name == CustomMisc.USER_TYPE_ADMIN) return false;
        }
        return true;
    }











}//end of class