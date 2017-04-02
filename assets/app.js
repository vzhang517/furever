$(document).ready(function() {
    $('select').material_select();
    $('.tooltipped').tooltip({
        delay: 50
    });

    $("#submit").click(function(event) {
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
        var queryURL = "http://api.petfinder.com/pet.find?";

        if (zipcode === "") {
            Materialize.toast('Location is required!', 3000);
        }

        queryURL += $.param({
            'breed': breed,
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
            dataType: "jsonp",
        }).done(function(response) {
            if (response.petfinder.pets) {	
                console.log(queryURL);
                var results = response.response;
                console.log(response);
                console.log(response.petfinder.pets.pet);
                var theArrayOfNope = response.petfinder.pets.pet;

                theArrayOfNope.forEach(function(currentPet) { 
                    var dogPicArray = [];
                    console.log("Name of dog: " + currentPet.name.$t);
                    console.log("Size of dog: " + currentPet.size.$t);

                    var thearrayOfDogPhotos = currentPet.media.photos.photo;
                    for (var i = 0; i < thearrayOfDogPhotos.length; i++) {
                        
                        var dogPhotosToPush = thearrayOfDogPhotos[i].$t;
                        dogPicArray.push(dogPhotosToPush);
                                   
                    }

                    console.log("Dog Pic Array: " + JSON.stringify(dogPicArray));

                    var theNextArrayOfNope = currentPet.options;
                    console.log(theNextArrayOfNope);
                    var optionsArray = (theNextArrayOfNope.option);
                    optionsArray.forEach(function() {
                        optionsArray.forEach(function(currentOption) {
                            console.log("Info about dog: " + currentOption.$t);
                        });
                    });
                });
            } else {
                Materialize.toast('No results, please modify search.', 3000);
            }
      });
  });
  	$("#newSearch").click(function(event){
  	event.preventDefault();
  	$("#search").css("display", "inline");
  	$("#results").css("display", "none");
  	})

});


