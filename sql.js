var express = require('express');
var app = express();
var sql = require("mssql");
var mysql = require("mysql");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
var proces = require('./process.js');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser("secret"));
app.use(
  expressSession({
    cookie: {
      maxAge: 60000,
    },
  })
);

var configSQL = {
    user: 'sa',
    password: '123456',
    server: 'localhost',
    database: 'HR',
    options: {
        encrypt: false
    }
};
var configMysql = {
    host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'payroll'
};
//mysql connect
/*var conn = mysql.createConnection(configMysql);
app.get("/",(req,res)=>{
        var sql = "SELECT * FROM users"
        conn.query(sql,(err,results)=>{
            if(err) throw err;
            res.send(results);
    });
});*/
//sqlserver connect
/*app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'asd',
        server: 'localhost', 
        database: 'HR' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from Personal', function (err, result) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(result.recordset);
            
        });
    });
});*/
// app.get('/', function (req, res) {
//     var sqlResult1;
//     var mysqlResult1;


//     sql.connect(configSQL, function (err) {
//         if (err) console.log(err);
//         var request = new sql.Request();
//         var mysqlConnect = mysql.createConnection(configMysql);
//         mysqlConnect.query("SELECT * FROM users", (mysqlResult)=> {
//             mysqlResult1=mysqlResult;
//          });
//         request.query('SELECT * FROM Personal', (sqlResult)=> {
//             sqlResult1 = sqlResult
//         });
//         res.send({
//             mysqlResult1,
//             sqlResult1
//         });

//     });
// });
app.get("/",(req,res)=>{
(async () => {
    try { 

        
      let pool =  await sql.connect(configSQL);
     
      let result = await pool.request().query("SELECT E.Employee_ID,P.First_Name,P.Middle_Initial,P.Last_Name,P.Gender,P.Ethnicity,H.Department,P.Shareholder_Status,E.Employment_Status,E.Hire_Date,E.Termination_Date,B.Benefit_Plan_ID,B.Plan_Name FROM dbo.Personal P,dbo.Employment E,dbo.Benefit_Plans B,dbo.Job_History H WHERE P.Benefit_Plans=B.Benefit_Plan_ID AND P.Employee_ID = H.Employee_ID AND P.Employee_ID = E.Employee_ID");
          console.log('DB1 result:');
          
      var pool2 = await mysql.createConnection(configMysql);
      var mysqlQuery = "SELECT e.idEmployee,e.Last_Name,e.First_Name,e.Vacation_Days,e.Paid_To_Date,e.Paid_Last_Year,p.Pay_Rate_Name,p.Pay_Amount,p.Pay_Type,p.Value FROM employee e,pay_rates p WHERE e.PayRates_id=p.idPay_Rates"
      
      var pool3 = await mysql.createConnection(configMysql);
      var mysqlQuery3 = 'select User_Name,Password from users';

        
      pool3.query(mysqlQuery3, (err, result2) => {
        if (err) throw err;
        console.log('Save user list:');
        fs.writeFile('user.json', JSON.stringify(result2), (err) => {
          if (err) throw err;
        });
    });
      
      pool2.query(mysqlQuery,(err,result2)=>{
        if(err) throw err;
        console.log('DB2 result:');
        var data = {
            sql : result.recordset,
            mysql : result2
        }

        // fs.writeFile("sever.json", JSON.stringify(result.recordset),(err)=>{
        //     if(err) throw err;
        //     console.log("da luu SQL");
        // });

        fs.writeFile("sever.json", JSON.stringify(data),(err)=>{
            if(err) throw err;
            console.log("da luu");
        });
        
    
        res.send(data);
        proces();
    });
    } catch (err) {
      if (err) console.log(err);
    }

    
  }) ();
})

app.post("/update", function (request, response) {
    const employeeid = request.body.Employee_ID; // à
    const firstname = request.body.First_Name; 
    const lastname = request.body.Last_Name;
    const middleinitial = request.body.Middle_Initial;
    if (employeeid && firstname && lastname) {
      var pool2 = mysql.createConnection(configMysql);
      pool2.query(
        "UPDATE Employee E SET E.Last_Name = ?, E.First_Name = ? WHERE E.idEmployee =?", // cái này chạy đc rồi mà
        [lastname, firstname, employeeid]
      );
  
      (async () => {
        try {
          let pool = await sql.connect(configSQL); // nãy diền đạt 44mình bên mysql có amyas suy ngh cho tyty          Đc rồi, ngủ à cháucháu
          let result = await pool
            .request()
            .query(
              "UPDATE  Personal  SET First_Name= N'" +
                firstname +
                "' , Last_Name= N'" +
                lastname +
                "' ,Middle_Initial=  N'" +
                middleinitial +
                "'  WHERE Employee_ID= '" +
                employeeid +
                "'"
            );  
        } catch (err) {
          if (err) console.log(err);
        }
      })();
      response.redirect("/table");
    }
  });
app.get("/edit", function (request, response) {
    //if (request.session.loggedin) {
      response.sendFile(path.join(`${__dirname}/Admin.html`)); // còn đây là chỗ gọi form ra nè
   // } else {
   //   response.redirect("/");
    //}
  });
var server = app.listen(5000, function () {
    console.log('Server is running..');
}); 

