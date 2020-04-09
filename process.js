var fs = require("fs");



var sever;
var severTemp;

function merge(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}
function has(object, key) {
    return object ? hasOwnProperty.call(object, key) : false;
 }
function listDepartment(severTemp){
    var obj ={};
    for(var i = 0; i < severTemp.length;i++){
        if(severTemp[i].Department in obj) continue;
        obj[severTemp[i].Department]=0;
    }
      return obj;
}
function totalMoneyDepar(severTemp,depar){
    for(var i = 0; i < severTemp.length;i++){
        if(severTemp[i].Department in depar){
            depar[severTemp[i].Department] = depar[severTemp[i].Department] + severTemp[i].Pay_Amount;
        }
    }
    return depar;
}
function listVacation(severTemp){
    var arr =[];
    for(var i = 0; i < severTemp.length;i++){
        var obj = {};
        obj.Employee_ID = severTemp[i].Employee_ID;
        obj.Name = severTemp[i].First_Name +" "+ severTemp[i].Middle_Initial +" "+ severTemp[i].Last_Name;
        var gioiTinh;
        if(severTemp[i].Gender==true) gioiTinh = 'Man';
        else gioiTinh ='Woman';
        obj.Gender = gioiTinh;
        obj.Ethnicity = severTemp[i].Ethnicity;
        obj.Shareholder_Status = severTemp[i].Shareholder_Status;
        obj.Employment_Status = severTemp[i].Employment_Status;
        obj.Vacation_Days = severTemp[i].Vacation_Days
        arr.push(obj);
    }
      return arr;
}
function listEmployee(severTemp){
    var arr =[];
    for(var i = 0; i < severTemp.length;i++){
        var obj = {};
        obj.Employee_ID = severTemp[i].Employee_ID;
        obj.Name = severTemp[i].First_Name +" "+ severTemp[i].Middle_Initial +" "+ severTemp[i].Last_Name;
        var gioiTinh;
        if(severTemp[i].Gender==true) gioiTinh = 'Man';
        else gioiTinh ='Woman';
        obj.Gender = gioiTinh;
        obj.Ethnicity = severTemp[i].Ethnicity;
        obj.Shareholder_Status = severTemp[i].Shareholder_Status;
        obj.Employment_Status = severTemp[i].Employment_Status;
        obj.Hire_Date = severTemp[i].Hire_Date;
        obj.Pay_Rate_Name = severTemp[i].Pay_Rate_Name;
        obj.Department= severTemp[i].Department;
        obj.Pay_Amount=severTemp[i].Pay_Amount;

        arr.push(obj);
    }
      return arr;
}
module.exports = function process(){

    fs.readFile('./sever.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        sever = JSON.parse(jsonString);
        // console.log(sever.sql[0].Employee_ID);
        // console.log(sever.mysql[0].idEmployee);
    
        // severTemp.push(sever.sql[0]);
        // console.log(severTemp[0]);
        console.log(sever.sql.length)
        console.log(sever.mysql.length);
    
        severTemp=[];
        for(var i = 0; i < sever.sql.length; i++){
            for(var j = 0; j <sever.mysql.length;j++){
                    if(sever.sql[i].Employee_ID==sever.mysql[j].idEmployee){
                        severTemp.push(merge(sever.sql[i],sever.mysql[j]));
                    }
            }
        }
    
        
        
        // const arrSever = {
        //     arrSever: severTemp
        // };
         const jsonStr = JSON.stringify(severTemp);
         fs.writeFile('./sever2.json', jsonStr, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })
    
        
        //Lay danh sach phong ban
        var depar =listDepartment(severTemp);
        total = totalMoneyDepar(severTemp,depar);
        console.log(total);
        fs.writeFile('./totalMoneyDepar.json', JSON.stringify(total), err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file total money Deparment')
            }
        })
        var vaca = listVacation(severTemp);
        //console.log(vaca);
        fs.writeFile('./totalVacation.json', JSON.stringify(vaca), err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file total vacation')
            }
        })
        var listE = listEmployee(severTemp);
        console.log(listE);
        fs.writeFile('./listEmployee.json', JSON.stringify(listE), err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file total vacation')
            }
        })
    });
}






