document.addEventListener("deviceready", onDeviceReady, false);
var db = window.openDatabase("Invoice_Craft", "1.0", "InvoiceCraft  Database", 200000); //will create database Dummy_DB or open it
var rowid='';
var oname='';
 //function will be called when device ready
    function onDeviceReady(){
        db.transaction(customerTable, error1, success1);
        document.getElementById('update_customer').addEventListener('click', validateEdit, false);
    }
 
    //create table
    function customerTable(tx1) {
        tx1.executeSql('CREATE TABLE IF NOT EXISTS Customers (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Address TEXT NOT NULL, Phone TEXT NOT NULL, Email TEXT NOT NULL, Notes TEXT, Status TEXT NOT NULL, Balance FLOAT)');
        //tx1.executeSql('INSERT INTO Customers(Name,Address, phone, email, notes, status, balance) VALUES ("Premier Specialists Medical Center", "7, Ologun Agbaje Close, Off Adeola Odeku, Vi Lagos.", "", "thepremierSpecialists.@thepremierspecialists.com", "", "Active", "0")');
        //tx1.executeSql('Drop table iLogin');
                   }
 
    //function will be called when an error occurred
    function error1(err1) {
        alert("Error processing SQL: "+err1);
        console.log("SQL Error "+err1);
    }
 
    //function will be called when process succeed
    function success1() {
        db.transaction(query1,error1);
        console.log("CLIST OPENED");          
    }
       
    $(document).on("click", ".ul_class", function(){
    rowid = $(this).parents("li").data("rowid");
    //call your update code
    console.log(rowid);
    
    db.transaction(function(tx){
    	
tx.executeSql('SELECT * FROM Customers where id= ?',[rowid],function(tx, results){
        	
        	var row = results.rows.item(0);
        	/*
        	("#ecname").val(results.rows.item(0).Name);
        	("#eaddress").val(results.rows.item(i).Address) ;
        	("#eemail").val(results.rows.item(i).Email);
        	("#ephone").val(results.rows.item(i).Phone) ;
        	("#enotes").val(results.rows.item(i).Notes) ;
        	*/
        	
        	
        	
        	$( "#ecname" ).textinput({ disabled: true, theme: "b"});
        	$( "#eaddress" ).textinput({ disabled: true, theme: "b" });
        	$( "#eemail" ).textinput({ disabled: true, theme: "b" });
        	$( "#ephone" ).textinput({ disabled: true, theme: "b" });
        	$( "#enotes" ).textinput({ disabled: true, theme: "b" });
        	
        	oname = row['Name'];
        	
        	$( "#ecname" ).val( oname );
        	$( "#eaddress" ).val( row['Address'] );
        	$( "#eemail" ).val( row['Email'] );
        	$( "#ephone" ).val( row['Phone'] );
        	$( "#enotes" ).val( row['Notes'] );
        	
        	$.mobile.changePage("#customerEdit", { transition: "slide"});
        	
      }, bad);
    	
    }, bad, function(){console.log("okay here");}); 
    
});

$("#customerEdit .error").html('').hide();
    
     function validateEdit (){
     	     	
     	var uname = document.getElementById("ecname").value;
     	
     	if(uname=='')
     	
     	{
     		$("#customerEdit .error").html('Please enter customer name.').show();
     	}
     	
else{
	
	doUpdate();
	
}
     	
     	
     }

function editText()

{
	
	        	$( "#ecname" ).textinput({ disabled: false, theme: "a"});
        	$( "#eaddress" ).textinput({ disabled: false, theme: "a" });
        	$( "#eemail" ).textinput({ disabled: false, theme: "a" });
        	$( "#ephone" ).textinput({ disabled: false, theme: "a" });
        	$( "#enotes" ).textinput({ disabled: false, theme: "a" });
        	//$( "#update_customer" ).button({ disabled: false});
	
}

   
    function bad(bd)
    
    {
    	
    	console.log("Error loading customer info ", bd);
    }
    
    function query1(tx1){
        tx1.executeSql('SELECT * FROM Customers order by Name asc',[],querySuccess1,error1);
    }
 
     function querySuccess1(tx1,result1){
     	
        $('#CustomerList').empty();
        var len = result1.rows.length;
for (var i=0; i<len; i++){
var row = result1.rows.item(i);

$('#CustomerList').append('<li data-rowid="'+row['id']+'"><a href="#" class="ul_class"><h3 class="ui-li-heading">'+row['Name']+'</h3><p class="ui-li-desc"><b><u>Email:</b></u> '+row['Email']+'</p><p class="ui-li-desc"><b><u>Address:</b></u> '+row['Address']+'</p>  <input type="hidden" name="cus_id" id="cus_id" value="'+row['id']+'" /> </a></li>');  

    }
    $('#CustomerList').listview().listview("refresh");
    }
    
function openNext()

{
	var ab = $(this).parents("li").data("rowid");
	console.log(ab);
	
}    

function doUpdate()

{
	var nname = document.getElementById('ecname').value;
if(oname!=nname)

{
	
db.transaction(function(tx){
  	
 var uname = document.getElementById("ecname").value;
		
 tx.executeSql('SELECT * FROM Customers where Name="'+uname+'"', [], 

  function(tx,results){

  if (results != null && results.rows != null) { 
  
  var myLen=results.rows.length;

if (myLen>0)

{

$.mobile.changePage("#customerEditExist", { role: "dialog", transition: "flip"});

console.log("I FOUND ONE");

 }

else{

console.log("NO CUSTOMER FOUND");

db.transaction(function(tx){
	
	var cname = document.getElementById("ecname").value;
	var address = document.getElementById("eaddress").value;
	var email = document.getElementById("eemail").value;
	var phone = document.getElementById("ephone").value;
	var notes = document.getElementById("enotes").value;

var query = 'Update Customers set Name="'+cname+'", Address="'+address+'", Email="'+email+'", Phone="'+phone+'", Notes="'+notes+'" where id="'+rowid+'"';

console.log(query);
                 
tx.executeSql('Update Customers set Name="'+cname+'", Address="'+address+'", Email="'+email+'", Phone="'+phone+'", Notes="'+notes+'" where id="'+rowid+'"');

}, errorHandler, function(){
			
			db.transaction(function(transaction)
			
			{
				console.log("I AM HERE ONE");
				
				transaction.executeSql('SELECT * FROM Customers order by Name asc',[], function(transaction, results){
					
					console.log("I AM HERE ONEONE");
					
					if (results != null && results.rows != null)
					{
					
						$('#CustomerList').empty();
						var lens = results.rows.length;
						
						for(var i=0; i<lens; i++)
						
						{
						
						var row = results.rows.item(i);
$('#CustomerList').append('<li data-rowid="'+row['id']+'"><a href="#" class="ul_class"><h3 class="ui-li-heading">'+row['Name']+'</h3><p class="ui-li-desc"><b><u>Email:</b></u> '+row['Email']+'</p><p class="ui-li-desc"><b><u>Address:</b></u> '+row['Address']+'</p>  <input type="hidden" name="cus_id" id="cus_id" value="'+row['id']+'" /> </a></li>');

						}
					$('#CustomerList').listview().listview("refresh");;	
						
						document.getElementById('ecname').value = "";
  						document.getElementById('eaddress').value = "";
  						document.getElementById('eemail').value = "";
  						document.getElementById('ephone').value = "";
  						document.getElementById('enotes').value = "";
  						$("#customerEdit .error").html('').hide();
  	  	
  						$.mobile.changePage("#customerpage", { transition: "flip"});
											
					}
				
					
				}, errorHandler
					
					
					);
				
			});
			
			});

}
}
},errorHandler); },errorHandler, function(){
	
	
	console.log("NOW U SEE ME");	
	
	});

   //return; 
}
	

else{
	
	db.transaction(function(tx){
	
	var cname = document.getElementById("ecname").value;
	var address = document.getElementById("eaddress").value;
	var email = document.getElementById("eemail").value;
	var phone = document.getElementById("ephone").value;
	var notes = document.getElementById("enotes").value;

var query = 'Update Customers set Name="'+cname+'", Address="'+address+'", Email="'+email+'", Phone="'+phone+'", Notes="'+notes+'" where id="'+rowid+'"';

console.log(query);
                 
tx.executeSql('Update Customers set Name="'+cname+'", Address="'+address+'", Email="'+email+'", Phone="'+phone+'", Notes="'+notes+'" where id="'+rowid+'"');

}, errorHandler, function(){
			
			db.transaction(function(transaction)
			
			{
				console.log("I AM HERE ONE");
				
				transaction.executeSql('SELECT * FROM Customers order by Name asc',[], function(transaction, results){
					
					console.log("I AM HERE ONEONE");
					
					if (results != null && results.rows != null)
					{
					
						$('#CustomerList').empty();
						var lens = results.rows.length;
						
						for(var i=0; i<lens; i++)
						
						{
						
						var row = results.rows.item(i);
$('#CustomerList').append('<li data-rowid="'+row['id']+'"><a href="#" class="ul_class"><h3 class="ui-li-heading">'+row['Name']+'</h3><p class="ui-li-desc"><b><u>Email:</b></u> '+row['Email']+'</p><p class="ui-li-desc"><b><u>Address:</b></u> '+row['Address']+'</p>  <input type="hidden" name="cus_id" id="cus_id" value="'+row['id']+'" /> </a></li>');

						}
					$('#CustomerList').listview().listview("refresh");;	
						
						document.getElementById('ecname').value = "";
  						document.getElementById('eaddress').value = "";
  						document.getElementById('eemail').value = "";
  						document.getElementById('ephone').value = "";
  						document.getElementById('enotes').value = "";
  						$("#customerEdit .error").html('').hide();
  	  	
  						$.mobile.changePage("#customerpage", { transition: "flip"});
											
					}
				
					
				}, errorHandler
					
					
					);
				
			});
			
});
	
}	
	
}
