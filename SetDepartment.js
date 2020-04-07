const fs2 = require('fs');
function loadDepar(){
    fs2.readFile('./totalMoneyDepar.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        var money = JSON.parse(jsonString);

        var i=0;
        Object.keys(money).forEach(function(key) {
                i+=1;
               $('#depar').append('<tr><td>'+i+'</td><td>'+key+'</td><td>'+money[key]+'</td></tr>');       
          });
    }); 
}