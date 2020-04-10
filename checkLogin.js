
function openInNewTab(url) {
    var win = window.open(url,'_blank');
    win.focus();
  }

$('#nut').click(function (e) { 
    var check =false;
    $.getJSON('user.json', function(arr) {
        var name = $("#username").val();
        var pass = $("#pass").val();
        Object.keys(arr).forEach(function(key) { 
            if(arr[key].User_Name==name&&arr[key].Password==pass){ 
                openInNewTab('http://127.0.0.1:9000/table.html');
                check=true;
            }  
        });
        if(check==false) alert('Nhập lại đê !');
    });
    
});