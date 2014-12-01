// JavaScript Document

document.addEventListener("deviceready", onDeviceReady, false);
var db = window.openDatabase("Invoice_Craft", "1.0", "InvoiceCraft  Database", 200000); //will create database Dummy_DB or open it
	
	function onDeviceReady()
	
	{
		db.transaction(populateDB, errorCB, successCB);
		
	}
	
	function populateDB(tx) 
	{
        tx.executeSql('CREATE TABLE IF NOT EXISTS iLogin (id INTEGER PRIMARY KEY AUTOINCREMENT, FIRSTNAME TEXT NOT NULL, LASTNAME TEXT NOT NULL, Username TEXT NOT NULL, Password TEXT NOT NULL ,Status TEXT NOT NULL)');
    }
	
	function errorCB(err) {
        alert("Error processing SQL: "+err);
    }
    
   	function errorSave(err) {
        alert("Error completing registration: "+err);
        console.log(err);
    }
 
    //function will be called when process succeed
    function successCB() {
        console.log("CONNECTION MADE");
        document.getElementById('saveUser').addEventListener('click', validateRegistration, false);
    }
    
    $("#register .error").html('').hide();
    
     function validateRegistration (){
     	
		var fname = document.getElementById("firstname").value;
		var lname = document.getElementById("lastname").value;
		var uname = document.getElementById("username").value;
		var upass = document.getElementById("password").value;
     	
     	if(fname==''||lname==''||uname==''||upass=='')
     	
     	{
     		$("#register .error").html('Please fill in all the textboxes to register.').show();
     	}
     	
else{
	
	saveData();
	
}
     	
     	
     }
    
    function successSave() {
        
        //alert("You have successfully registered");
        
        $.mobile.changePage( "#homePage", {transition: "slide"} );
    }
    
    	function populateSave(tx) 
	{
        
        var fname = document.getElementById("firstname").value;
		var lname = document.getElementById("lastname").value;
		var uname = document.getElementById("username").value;
		var upass = document.getElementById("password").value;
        
        
        tx.executeSql('INSERT INTO iLogin(FIRSTNAME, LASTNAME, Username, Password, Status) VALUES ("'+fname +'", "'+lname+'", "'+uname+'", "'+ upass+'", "LOGGED IN")');
    }
    
    function saveData()
    
    {
  
   db.transaction(populateSave, errorSave, successSave); 	
   
    }
  
