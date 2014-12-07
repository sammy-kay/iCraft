
document.addEventListener("deviceready", onDeviceReady, false);
var db = window.openDatabase("Invoice_Craft", "1.0", "InvoiceCraft  Database", 200000); //will create database Dummy_DB or open it
	
	var pictureSource='';
	var destinationType='';
	
	function onDeviceReady()
	
	{
$("#loadPicture").on("click", function(e) {
		e.preventDefault();
		navigator.camera.getPicture(gotPic, failHandler, 
			{quality:50, destinationType:navigator.camera.DestinationType.DATA_URL,
			 sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY});
	});
	}
	
	function gotPic(data) {
		console.log('got here');
		var myImage = document.getElementById('myImage');
		myImage.src = data;
		//$("#takePicBtn").text("Picture Taken!").button("refresh");
	}
	
	function failHandler(e) {
		alert("ErrorFromC" +e);
		console.log(e.toString());
	}