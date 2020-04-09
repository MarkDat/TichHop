$(document).ready(function () {
    //table depar
    $.getJSON('totalMoneyDepar.json', function(money) {
        var i=0;
        Object.keys(money).forEach(function(key) {
                i+=1;
            $('#depar').append('<tr><td>'+i+'</td><td>'+key+'</td><td>'+money[key]+'</td></tr>');       
        });
    });
    
    var key=["Employee_ID","Name","Gender","Ethnicity","Shareholder_Status","Employment_Status","Hire_Date","Pay_Rate_Name","Department","Pay_Amount"];
    //table employee
    $.getJSON('listEmployee.json', function(a) {
        var i=0;
        var check = true;
        var bold;
        a.forEach(function(obj){
                console.log(obj);
                i+=1;
                if(check){
                    bold = "even"; check = false;
                } 
                else {bold = "odd";check=true;}
                $('#employee').append("<tr class='"+bold+"'>"
                                        +'<td>'+obj[key[0]]+'</td>'
                                        +'<td>'+obj[key[1]]+'</td>'
                                        +'<td>'+obj[key[2]]+'</td>'
                                        +'<td>'+obj[key[3]]+'</td>'
                                        +'<td>'+obj[key[4]]+'</td>'
                                        +'<td>'+obj[key[5]]+'</td>'
                                        +'<td>'+obj[key[6]]+'</td>'
                                        +'<td>'+obj[key[7]]+'</td>'
                                        +'<td>'+obj[key[8]]+'</td>'
                                        +'<td>'+obj[key[9]]+'</td></tr>');       
          });       
    });
    //table vacation
    $.getJSON('totalVacation.json', function(a) {
        var i=0;
        a.forEach(function(obj){
            i+=1;
            $('#vacation').append("<tr>"
                                    +'<td>'+i+'</td>'
                                    +'<td>'+obj[key[0]]+'</td>'
                                    +'<td>'+obj[key[1]]+'</td>'
                                    +'<td>'+obj[key[2]]+'</td>'
                                    +'<td>'+obj[key[3]]+'</td>'
                                    +'<td>'+obj[key[4]]+'</td>'
                                    +'<td>'+obj[key[5]]+'</td>'
                                    +'<td>'+obj["Vacation_Days"]+'</td></tr>');       
      });       
    });
});