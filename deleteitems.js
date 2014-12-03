$( document ).on( "pagecreate", "#itemsPage", function() {
	
	var rowid='';
	
	$(document).on("swipeleft swiperight", ".items_class", function(){
   rowid = $(this).parents("li").data("rowid");
    //call your update code
    console.log(rowid);
 });
	
    // Swipe to remove list item
    $( document ).on( "swipeleft", "#ItemsList li", function( event ) {
        var listitem = $( this ),
            // These are the classnames used for the CSS transition
            dir = event.type === "swipeleft" ? "left" : "right",
            // Check if the browser supports the transform (3D) CSS transition
            transition = $.support.cssTransform3d ? dir : false;
            confirmAndDelete( listitem, transition );

    });
    // If it's not a touch device...
    if ( ! $.mobile.support.touch ) {
        // Remove the class that is used to hide the delete button on touch devices
        $( "#ItemsList" ).removeClass( "touch" );
        // Click delete split-button to remove list item
        $( ".delete" ).on( "click", function() {
            var listitem = $( this ).parent( "li" );
            confirmAndDelete( listitem );
        });
    }
    function confirmAndDelete( listitem, transition ) {
        // Highlight the list item that will be removed
        listitem.children( ".ui-btn" ).addClass( "ui-btn-active" );
        // Inject topic in confirmation popup after removing any previous injected topics
        $( "#confirm .topic" ).remove();
        listitem.find( ".topic" ).clone().insertAfter( "#question" );
        // Show the confirmation popup
        $( "#confirm" ).popup( "open" );
        // Proceed when the user confirms
        $( "#confirm #yes" ).on( "click", function() {
                                   // ...the list item will be removed

db.transaction(
	
	function(tx){
		
		tx.executeSql('Delete from Items where id="'+rowid+'"', [], function(){     
			                   
						listitem.remove();
						console.log("rowid");
                        $( "#ItemsList" ).listview( "refresh" ).find( ".border-bottom" ).removeClass( "border-bottom" );
console.log("DELETED");
}, errorDelete);
		
	}, errorDelete, iDeleted);});
                    
                    
        // Remove active state and unbind when the cancel button is clicked
        $( "#confirm #cancel" ).on( "click", function() {
            listitem.children( ".ui-btn" ).removeClass( "ui-btn-active" );
            $( "#confirm #yes" ).off();
        });
    }
});

function errorDelete(err)

{
	
	console.log("Error Deleting Item: "+err);
}

function iDeleted()

{
	
	console.log("Item Deleted");
}
