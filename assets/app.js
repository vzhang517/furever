

var queryURL= "http://api.petfinder.com/pet.find?format=json&key=96d7e760e6cf087c0470a585636831ff&location=78723&animal=dog"



$.ajax({
          url: queryURL,
          method: "GET"
        })
.done(function(response) {
          console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.response;
      });

  $(document).ready(function() {
    $('select').material_select();
  });