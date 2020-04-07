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
        
    });
}






