console.log("here");
$(document).ready( function() {
  var loader_gif = $("#loader");
  loader_gif.hide();


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
       // url: "commentsss.txt",
       url: "static/comments.txt",
       context: $("#comments"),
       // data: data,
       success: function( r, status ) {
           response = r;
           console.log(r);
           console.log(status);
           $(this).html(response);
       },
       // error: function(jqXHR, status, error) {
       error: function(jq, status, error) {
         console.log(jq);
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
      var term = $("#search").val()
      /*
      $.get( "http://localhost:1234/test", { 'term': term, 'name': "ali", "age": 9},
         function( response, status ) {
           console.log(response);
           // console.log(status);
         }, "json"); */
      // loader_gif.show();            
      $.ajax({
        url: "query_title",
        data: { title: term },
        dataType: "json",
        beforeSend: function() {
          loader_gif.show();
          console.log("beforeSend");
        },
        complete: function() {
          loader_gif.hide();
        },
        success: function( data ) {
          var results = $("#results");
          results.empty();
          if (data.status == "ok") {
            if (data.heros.length == 0) {
              results.html("No Hero found");
            }
            else {
              var ul = $("<ul>");
              data.heros.forEach(function(hero) {
                var h4 = $("<h5>")
                var li1 = $("<li>")
                var li2 = $("<li>")
                var li3 = $("<li>")
                var li4 = $("<li>")
                var li5 = $("<li>")
                var li6 = $("<li>")

                var c_name = hero.Champion
                var str1 = "Ability1 :" + hero.ability1
                var str2 = "Ability2 :" + hero.ability2
                var str3 = "Ability3 :" + hero.ability3
                var str4 = "Ability4 :" + hero.ability4
                var str5 = "Ability5 :" + hero.ability5

                var str = "Features ==> Meta : "+ hero.features.meta +" Ban Rate : "
                         + hero.features.ban + " Win Rate : "+ hero.features.win + " IP : "+ hero.features.IP + " RP : "+ hero.features.RP + " Popularity : "+ hero.features.popularity
               // var cover = $("<img>");
               // cover.attr("src", "static/cover_imgs/" + book.img);
               // cover.attr("width", "70px");
                h4.html(c_name);
                li1.html(str1);
                li2.html(str2);
                li3.html(str3);
                li4.html(str4);
                li5.html(str5);
                li6.html(str);

                //li.prepend(cover);
                ul.append(h4);
                ul.append(li1);
                ul.append(li2);
                ul.append(li3);
                ul.append(li4);
                ul.append(li5);
                ul.append(li6);
              })
              //result.append(h4);
              results.append(ul);
            }
          }
          else {
            results.html("Something bad happened");
          }
          console.log(data);
        },
      })   
          
  })     
}) // document.ready









