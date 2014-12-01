
document.addEventListener("deviceready", onDeviceReady, false);
var db = window.openDatabase("Invoice_Craft", "1.0", "InvoiceCraft  Database", 200000); //will create database Dummy_DB or open it
	
	function onDeviceReady()
	
	{
		db.transaction(populateDB1, errorCB1, successCB1);
		
		//document.addEventListener('backbutton', onBack, false);
	}
	
	/*
	
	function onBack(){
        //If the current page is index page then exit other wise navigate to index page
        if($.mobile.activePage.is('#homePage')){
            navigator.app.exitApp();
        }
        else{
            
        }
    }
    */ 
	
	function populateDB1(tx) 
	{
        tx.executeSql('CREATE TABLE IF NOT EXISTS iLogin (id INTEGER PRIMARY KEY AUTOINCREMENT, FIRSTNAME TEXT NOT NULL, LASTNAME TEXT NOT NULL, Username TEXT NOT NULL, Password TEXT NOT NULL, Status TEXT NOT NULL)');
    }
	
	function errorCB1(err) {
        alert("Error processing SQL: "+err);
    }
    
   	function errorSave1(err) {
        alert("Error verigying login details: "+err);
        console.log(err);
    }
 
    //function will be called when process succeed
    function successCB1() {
        console.log("CONNECTION MADE");
    }
    
    function successSave1(result) {
        
        //alert("You have successfully registered");
        
        //$.mobile.changePage( "dialogreg.html", { role: "dialog", transition: "slidedown"} );
        
    }
    
    	function populateSave1(tx) 
	{
        
		var uname = document.getElementById("uid").value;
		var upass = document.getElementById("pwd").value;
		
       var x="SELECT * FROM iLogin WHERE Username='"+uname+"' AND Password='"+upass+"' ";  
       
        tx.executeSql(x,[],function(tx,result){
          if (result.rows.length > 0){

db.transaction(function(tx1){
	
	tx1.executeSql('Update iLogin set Status="LOGGED IN"');
	
} ,errorSave1, function(){
	
	document.getElementById('uid').value = "";
  	document.getElementById('pwd').value = "";
	
	$.mobile.changePage("#homePage", {transition: "slide"});});
           // $.mobile.changePage("#homePage", {transition: "slide"});
            
          }else{
            $.mobile.changePage("#invalidLogin", { role: "dialog", transition: "flip"});
          }
    });
		
    }
    
        function verifyLogin()
    
    {
  
   db.transaction(populateSave1, errorSave1, successSave1); 	
   
    }
    
    function Logout_NOW()
    
    {
    	
    	db.transaction(function(tx){
    		
    		tx.executeSql('Update iLogin set Status="LOGGED OUT"');
    		
    	}, errorSave1, function(){
    		
    		console.log("I HAPPENED");
    		
    		$.mobile.changePage("#indexPage", {transition: "flip"});
    		
    	});
    	
    }
    
   