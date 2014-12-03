document.addEventListener("deviceready", onDeviceReady, false);
var db = window.openDatabase("Invoice_Craft", "1.0", "InvoiceCraft  Database", 200000); //will create database Dummy_DB or open it
var a='';
 //function will be called when device ready
    function onDeviceReady(){
        db.transaction(customerTable1, errornew, successnew);
    }
 
    //create table
    function customerTable1(tx1) {
        tx1.executeSql('CREATE TABLE IF NOT EXISTS Customers (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Address TEXT NOT NULL, Phone TEXT NOT NULL, Email TEXT NOT NULL, Notes TEXT, Status TEXT NOT NULL, Balance FLOAT)');
                   }
 
    //function will be called when an error occurred
    function errornew(err1) {
        alert("Error processing SQL: "+err1);
        console.log("SQL Error "+err1);
    }
 
    //function will be called when process succeed
    function successnew() {

        console.log("CLIST OPENED");
        document.getElementById('save_customer').addEventListener('click', validateNow, false);
        
    }
    

    
    $("#customerRegistration .error").html('').hide();
    
     function validateNow (){
     	     	
     	var uname = document.getElementById("cname").value;
     	var cadd = document.getElementById("address").value;
     	
     	if(uname=='')
     	
     	{
     		$("#customerRegistration .error").html('Please enter customer name.').show();
     	}
     	
else{
	
	saveCompany();
	
}
     	
     	
     }
    
   
    
  function saveCompany(){
  /*sql start*/

  /*sqlite code for dynamic Emp list*/
  db.transaction(function(tx){
  	
  var uname = document.getElementById("cname").value;
		
 tx.executeSql('SELECT * FROM Customers where Name="'+uname+'"', [], 

  function(tx,results){

  if (results != null && results.rows != null) { 
  
  var myLen=results.rows.length;

if (myLen>0)

{

//$.mobile.changePage("#customerExist", { role: "dialog", transition: "flip"});

$( "#customerExist" ).popup( "open" );

console.log("I FOUND ONE");

 }

else{

console.log("NO CUSTOMER FOUND");

db.transaction(function(tx){
	
	var cname = document.getElementById("cname").value;
	var address = document.getElementById("address").value;
	var email = document.getElementById("email").value;
	var phone = document.getElementById("phone").value;
	var notes = document.getElementById("notes").value;
                 
tx.executeSql('INSERT INTO Customers(Name, Address, Email, Phone, Notes, Status, Balance) VALUES ("'+cname +'", "'+address+'", "'+email+'", "'+ phone+'", "'+notes+'", "Active", "0" )');

console.log("I SAVED IT");

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
						
						document.getElementById('cname').value = "";
  						document.getElementById('address').value = "";
  						document.getElementById('email').value = "";
  						document.getElementById('phone').value = "";
  						document.getElementById('notes').value = "";
  						$("#customerRegistration .error").html('').hide();
  	  	
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
    
   function nullHandler()
   
   {
   	
   	console.log("null handler");
   }
   
   function errorHandler(err)
   
   {
   	
   	console.log("error Message "+err+" error code "+err.code);
   	
   }
   
 
  function savedData()
  
  {
  	console.log("I saved a record");
  	document.getElementById('cname').value = "";
  	document.getElementById('address').value = "";
  	document.getElementById('email').value = "";
  	document.getElementById('phone').value = "";
  	document.getElementById('notes').value = "";
  	
  	$.mobile.changePage("#customerpage", { transition: "flip"});
  }