
document.addEventListener("deviceready", onDeviceReady, false);
var db = window.openDatabase("Invoice_Craft", "1.0", "InvoiceCraft  Database", 200000); //will create database Dummy_DB or open it
	
	function onDeviceReady()
	
	{
		db.transaction(populateFind, errorFind, loginFound);
		
	}
	
	function populateFind(tx) 
	{
        tx.executeSql('CREATE TABLE IF NOT EXISTS iLogin (id INTEGER PRIMARY KEY AUTOINCREMENT, FIRSTNAME TEXT NOT NULL, LASTNAME TEXT NOT NULL, Username TEXT NOT NULL, Password TEXT NOT NULL, Status TEXT NOT NULL)');
    //tx.executeSql('Drop table iLogin');
    }
	
    
   	function errorFind(err) {
        console.log("Error verigying login existence: "+err);
    }
 
function loginFound(){

db.transaction(function(tx){
  		
tx.executeSql('SELECT * FROM iLogin WHERE Status="LOGGED IN" ', [], 

function(tx,results){

if (results != null && results.rows != null) 

{ 
  
var myLen=results.rows.length;

if (myLen>0)

{

$.mobile.changePage("#homePage");

console.log("I FOUND ONE LOGIN");

 }

else{

console.log("NO LOGIN FOUND");

$.mobile.changePage("#indexPage");
 
}
}
},errorFind);
  });
}
     