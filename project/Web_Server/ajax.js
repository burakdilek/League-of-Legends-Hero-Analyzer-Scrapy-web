console.log("here");
$(document).ready( function() {
  $("#loadComments").click(function(event) {
     var response = null;
     /*
     $.get( "commentsss.txt", function( r, status ) {
       response = r;
       console.log(r);
       console.log(status);
       $("#comments").html(response);
     }, "text");
     console.log(response);
     */
     $.ajax({
       url: "commentsss.txt",
       context: $("#comments"),
       // data: data,
       success: function( r, status ) {
           response = r;
           console.log(r);
           console.log(status);
           $(this).html(response);
       },
       // error: function(jqXHR, status, error) {
       error: function(jqXHR, status, error) {
         console.log(jqXHR);
         // console.log(status);
         console.log(error);
       },
       complete: function() {
         console.log("completed");
       },
       dataType: "text"
     });
  })
  $("#searchButton").click(function(event) {
      $.get( "http://localhost:1234", function( response, status ) {
           console.log(response);
           console.log(status);
         });
  })     
}) // document.ready









