
var breed = "german";
var age = "adult";
var size = "medium";
var gender = "female";
var zipcode = 78723;
var api_key = '96d7e760e6cf087c0470a585636831ff';
 

var queryURL= "http://api.petfinder.com/pet.find?";


queryURL += $.param({
	// 'breed': breed,
	'format': 'json',
	'key': api_key,
	'animal': "dog",
	'sex': "F",
	'location': zipcode, 
	'age': "adult",

	'size': "M"
	
	 
});
$.ajax({
          url: queryURL,
          method: "GET",
          crossDomain: true,
          dataType: "jsonp"
        })
.done(function(response) {
          console.log(queryURL);

          console.log(response);
          console.log(response.petfinder.pets.pet);
          var theArrayOfNope = response.petfinder.pets.pet;
          theArrayOfNope.forEach(function(currentPet){
          	console.log(currentPet.name.$t);
          });
          // storing the data from the AJAX request in the results variable
          var results = response.response;
      });

  $(document).ready(function() {
    $('select').material_select();
  });

