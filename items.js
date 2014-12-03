
document.addEventListener("deviceready", onDeviceReady, false);
var db = window.openDatabase("Invoice_Craft", "1.0", "InvoiceCraft  Database", 200000); //will create database Dummy_DB or open it
var oname='';
var rowid='';
	
	function onDeviceReady()
	
	{
		db.transaction(populateItems, errorItems, itemsPopulated);
		
		document.getElementById('update_items').addEventListener('click', validateItemsEdit, false);
		
	}
	
	function populateItems(tx) 
	{
        tx.executeSql('CREATE TABLE IF NOT EXISTS Items (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Description TEXT NOT NULL, Type TEXT NOT NULL, Price float)');
        //tx.executeSql('Insert into Items(Name, Description, Type, Price)  values("Samsung Galaxy Note 4", "Smartphone", "Goods", "120000")');
        //tx.executeSql('Insert into Items(Name, Description, Type, Price)  values("Iphone 6", "Smartphone", "Goods", "170000")');
        //tx.executeSql('Insert into Items(Name, Description, Type, Price)  values("Iphone 6 Plus", "Smartphone", "Goods", "220000")');
        //tx.executeSql('Insert into Items(Name, Description, Type, Price)  values("Maintenace of M++ [Premier Hospital]", "Maintenance of Hospital Management Software", "Service", "2750000")');
    //tx.executeSql('Drop table iLogin');
    }
	
    
   	function errorItems(err) {
        console.log("SQL ERROR: "+err);
    }
    
function itemsPopulated(){
	     
        
       db.transaction(function(tx1){
       	
       	       	tx1.executeSql('SELECT * FROM Items order by Name asc',[], function(tx1, result1){
        	
        	$('#ItemsList').empty();
        var len = result1.rows.length;
for (var i=0; i<len; i++){
var row = result1.rows.item(i);

$('#ItemsList').append('<li data-rowid="'+row['id']+'"><a href="#" class="items_class"><h3 class="ui-li-heading topic">'+row['Name']+'</h3><p class="ui-li-desc"><b><u>Desc.</b></u> '+row['Description']+'</p><p class="ui-li-desc"><b><u>Type:</b></u> '+row['Type']+' , <b><u>Price:</b></u> '+ row['Price']+'</p></a></li>');  

    }
    $('#ItemsList').listview().listview("refresh");
        	
        }, errorItems);

       	
       }, errorItems, goodFind);
       
      }
       	
 function goodFind()
 
 {
 console.log("GOOD FIND");	
 document.getElementById('save_items').addEventListener('click', validateItems, false);
 
 }
 
$("#itemsRegistration .error").html('').hide();
    
     function validateItems (){
     	     	
     	var uname = document.getElementById("iname").value;
     	var cadd = document.getElementById("iprice").value;
     	
     	if(uname==''||cadd=='')
     	
     	{
     		$("#itemRegistration .error").html('Please enter item name and price').show();
     	}
     	
		else{
	
	saveItems();
	
}
     	
     	
     }
 
function saveItems(){

  db.transaction(function(tx){
  	
  var uname = document.getElementById("iname").value;
		
 tx.executeSql('SELECT * FROM Items where Name="'+uname+'"', [], 

  function(tx,results){

  if (results != null && results.rows != null) { 
  
  var myLen=results.rows.length;

if (myLen>0)

{

//$.mobile.changePage("#itemExist", { role: "dialog", transition: "flip"});

$( "#itemExist" ).popup( "open" );

 }

else{

db.transaction(function(tx){
	
	var iname = document.getElementById("iname").value;
	var idesc = document.getElementById("idesc").value;
	var iprice = document.getElementById("iprice").value;
	var itype = document.getElementById("itype").value;
                 
                 var query='INSERT INTO Items(Name, Description, Type, Price) VALUES ("'+iname +'", "'+idesc+'", "'+itype+'", "'+ iprice+'")';
                 console.log(query);
                 
tx.executeSql('INSERT INTO Items(Name, Description, Type, Price) VALUES ("'+iname +'", "'+idesc+'", "'+itype+'", "'+ iprice+'")');

}, errorItems, function(){
			
			db.transaction(function(transaction)
			
			{
				console.log("I AM HERE ONE");
				
				transaction.executeSql('SELECT * FROM Items order by Name asc',[], function(transaction, results){
					
					if (results != null && results.rows != null)
					{
					
						$('#ItemsList').empty();
						var lens = results.rows.length;
						
						for(var i=0; i<lens; i++)
						
						{
						
						var row = results.rows.item(i);
$('#ItemsList').append('<li data-rowid="'+row['id']+'"><a href="#" class="items_class"><h3 class="ui-li-heading topic">'+row['Name']+'</h3><p class="ui-li-desc"><b><u>Desc.</b></u> '+row['Description']+'</p><p class="ui-li-desc"><b><u>Type:</b></u> '+row['Type']+' , <b><u>Price:</b></u> '+ row['Price']+'</p></a></li>');

						}
					$('#ItemsList').listview().listview("refresh");;	
						
						document.getElementById('iname').value = "";
  						document.getElementById('iprice').value = "";
  						document.getElementById('idesc').value = "";

  						$("#itemRegistration .error").html('').hide();
  	  	
  						$.mobile.changePage("#itemsPage", { transition: "flip"});
											
					}
				
					
				}, errorItems
					
					
					);
				
			});
			
			});

}
}
},errorItems); },errorItems, function(){
	
	
	console.log("NOW U SEE ME");	
	
	});

   //return; 
}


$(document).on("click", ".items_class", function(){
   rowid = $(this).parents("li").data("rowid");
    //call your update code
    console.log(rowid);
    
    db.transaction(function(tx){
    	
    	
	tx.executeSql('SELECT * from Items where id= ?',[rowid], function(tx, results){
        	
        	var row = results.rows.item(0);       	
        	
        	console.log("i did here");
        	
        	$( "#einame" ).textinput({ disabled: true, theme: "b"});
        	$( "#eiprice" ).textinput({ disabled: true, theme: "b" });
        	$( "#eidesc" ).textinput({ disabled: true, theme: "b" });
        	$( "eitype" ).listview({ disabled: true, theme: "b" });
        	
        	        	
        	oname = row['Name'];
        	
        	console.log(oname);
        	
        	$( "#einame" ).val( oname );
        	$( "#eidesc" ).val( row['Description'] );
        	$( "#eiprice" ).val( row['Price'] );
        	$( "eitype" ).val( row['Type'] );
        	       	
        	$.mobile.changePage("#itemsEdit", { transition: "slide"});
        	
      }, errorItems);
    	
    }, bad, function(){}); 
    
 });

function editTextItems()

{
	
	       	$( "#einame" ).textinput({ disabled: false, theme: "a"});
        	$( "#eitype" ).listview({ disabled: false, theme: "a" });
        	$( "#eiprice" ).textinput({ disabled: false, theme: "a" });
        	$( "#eidesc" ).textinput({ disabled: false, theme: "a" });
        	
}

$("#itemsEdit .error").html('').hide();
    
     function validateItemsEdit (){
     	     	
     	var uname = document.getElementById("einame").value;
     	var cname = document.getElementById("eiprice").value;
     	
     	if(uname==''||cname=='')
     	
     	{
     		$("#itemsEdit .error").html('Please enter item name and price').show();
     	}
     	
else{
	
	doUpdateItems();
	
}
}

function doUpdateItems()

{
var nname = document.getElementById('einame').value;

if(oname!=nname)

{
	
db.transaction(function(tx){
  	
 var uname = document.getElementById("einame").value;
		
 tx.executeSql('SELECT * FROM Items where Name="'+uname+'"', [], 

  function(tx,results){

  if (results != null && results.rows != null) { 
  
  var myLen=results.rows.length;

if (myLen>0)

{

//$.mobile.changePage("#itemsEditExist", { role: "dialog", transition: "flip"});

$( "#itemsEditExist" ).popup( "open" );


 }

else{

db.transaction(function(tx){
	
	var cname = document.getElementById("einame").value;
	var desc = document.getElementById("eidesc").value;
	var type = document.getElementById("eitype").value;
	var price = document.getElementById("eiprice").value;
                
tx.executeSql('Update Items set Name="'+cname+'", Description="'+desc+'", Price="'+price+'", Type="'+type+'" where id="'+rowid+'"');

}, errorItems, function(){
			
			db.transaction(function(transaction)
			
			{			
				transaction.executeSql('SELECT * FROM Items order by Name asc',[], function(transaction, results){
									
					if (results != null && results.rows != null)
					{
					
						$('#ItemsList').empty();
						var lens = results.rows.length;
						
						for(var i=0; i<lens; i++)
						
						{
						
						var row = results.rows.item(i);

$('#ItemsList').append('<li data-rowid="'+row['id']+'"><a href="#" class="items_class"><h3 class="ui-li-heading topic">'+row['Name']+'</h3><p class="ui-li-desc"><b><u>Desc.</b></u> '+row['Description']+'</p><p class="ui-li-desc"><b><u>Type:</b></u> '+row['Type']+' , <b><u>Price:</b></u> '+ row['Price']+'</p></a></li>');

						}
					$('#ItemsList').listview().listview("refresh");;	
						
						document.getElementById('einame').value = "";
  						document.getElementById('eiprice').value = "";
  						document.getElementById('eitype').value = "";
  						document.getElementById('eidesc').value = "";
						
  						$("#itemsEdit .error").html('').hide();
  	  	
  						$.mobile.changePage("#itemsPage", { transition: "flip"});
											
					}
				
					
				}, errorItems
					
					
					);
				
			});
			
			});

}
}
},errorItems); },errorItems, function(){
		
	
	});

   //return; 
}
	

else{
	
	db.transaction(function(tx){
		
	var cname = document.getElementById("einame").value;
	var desc = document.getElementById("eidesc").value;
	var type = document.getElementById("eitype").value;
	var price = document.getElementById("eiprice").value;
                
tx.executeSql('Update Items set Name="'+cname+'", Description="'+desc+'", Price="'+price+'", Type="'+type+'" where id="'+rowid+'"');

}, errorItems, function(){
			
			db.transaction(function(transaction)
			
			{
				
				transaction.executeSql('SELECT * FROM Items order by Name asc',[], function(transaction, results){
					
					
					if (results != null && results.rows != null)
					{
					
						$('#ItemsList').empty();
						var lens = results.rows.length;
						
						for(var i=0; i<lens; i++)
						
						{
						
						var row = results.rows.item(i);
$('#ItemsList').append('<li data-rowid="'+row['id']+'"><a href="#" class="items_class"><h3 class="ui-li-heading topic">'+row['Name']+'</h3><p class="ui-li-desc"><b><u>Desc.</b></u> '+row['Description']+'</p><p class="ui-li-desc"><b><u>Type:</b></u> '+row['Type']+' , <b><u>Price:</b></u> '+ row['Price']+'</p></a></li>');

						}
					$('#ItemsList').listview().listview("refresh");
					
						document.getElementById('einame').value = "";
  						document.getElementById('eiprice').value = "";
  						document.getElementById('eitype').value = "";
  						document.getElementById('eidesc').value = "";
						
  						$("#itemsEdit .error").html('').hide();
  	  	
  						$.mobile.changePage("#itemsPage", { transition: "flip"});
											
					}
				
					
				}, errorItems
					
					
					);
				
			});
			
});
	
}	
	
}
