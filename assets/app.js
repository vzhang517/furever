 $(document).ready(function() {
    $('select').material_select();

$("#submit").click(function(event){
	event.preventDefault();
var breed = $('#breed').val();
console.log(breed);
var age = $("#age").val();
console.log(age);
var size = $("#size").val();
console.log(size);
var gender = $("#gender").val();
console.log(gender);
var zipcode = $("#location").val();
console.log(zipcode);
var api_key = '96d7e760e6cf087c0470a585636831ff';

 

var queryURL= "http://api.petfinder.com/pet.find?";


queryURL += $.param({
	// 'breed': breed,
	'format': 'json',
	'key': api_key,
	'animal': "dog",
	'sex': gender,
	'location': zipcode, 
	'age': age,

	'size': size 
	
	 
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
});

 
  });



