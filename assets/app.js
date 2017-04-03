$(document).ready(function() {
    $('select').material_select();

    $('.tooltipped').tooltip({
        delay: 50
    });

    $("#submit").click(function(event) {
        event.preventDefault();
       
        var breed = $('#breed').val();
        // console.log(breed);
        var age = $("#age").val();
        // console.log(age);
        var size = $("#size").val();
        // console.log(size);
        var gender = $("#gender").val();
        // console.log(gender);
        var zipcode = $("#location").val();
        // console.log(zipcode);
        var api_key = '96d7e760e6cf087c0470a585636831ff';
        var queryURL = "http://api.petfinder.com/pet.find?";

        var dogResultsArray=[];

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

        }, true);
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET",
            crossDomain: true,
            dataType: "jsonp"
        }).done(function(response) {
            if (response.petfinder.pets) {	
                // console.log(queryURL);
                var results = response.response;
                // console.log(results);
               
                var theArrayOfNope = response.petfinder.pets.pet;
                console.log(theArrayOfNope);

                var Dog = function(name, options, pics, size, age) {
        
                  this.name = name;
                  this.options = options;
                  this.pics = pics;
                  this.size = size;
                  this.age = age;
                };

                theArrayOfNope.forEach(function(currentPet) { 
                    var dogPicArray = [];
                    var dogOptions=[];
                    var dogName=currentPet.name.$t;
                    var dogSize=currentPet.size.$t;
                    var dogAge=currentPet.age.$t;

                    console.log("Name of dog: " + currentPet.name.$t);
                    console.log("Size of dog: " + currentPet.size.$t);

                    if(currentPet.media.photos != undefined){
                    var thearrayOfDogPhotos = currentPet.media.photos.photo;
                    for (var i = 0; i < thearrayOfDogPhotos.length; i++) {
                        
                        var dogPhotosToPush = thearrayOfDogPhotos[i].$t;
                        dogPicArray.push(dogPhotosToPush);
                                   
                    }
                  };

                    console.log("Dog Pic Array: " + JSON.stringify(dogPicArray));

                    var theNextArrayOfNope = currentPet.options;
                    console.log(theNextArrayOfNope);
                    var optionsArray = (theNextArrayOfNope.option);
                    console.log(optionsArray);
                    
                        if(optionsArray===Array){
                           optionsArray.forEach(function(currentOption) {
                            dogOptions.push(currentOption.$t);
                            console.log("Info about dog: " + currentOption.$t);
                          });
                          

                        }else if(optionsArray != undefined){
                          console.log(optionsArray.$t);
                      }
                    
                    

                    var newDog = new Dog(dogName, dogOptions, dogPicArray, dogSize, dogAge);
                    console.log(newDog);
                    dogResultsArray.push(newDog);

					function add(){
					$("#cards").append("<div class='card sticky-action col s4'><div class='card-image waves-effect waves-block waves-light'><img class='activator' src='"+dogPicArray[0]+"'></div><div class='card-content'><span class='card-title activator grey-text text-darken-4'>"+dogName+"</span><p>short description</p></div><div class='card-action'><span><p id='like'>Like</p> <p id='dislike'>Dislike</p></span></div><div class='card-reveal'><span class='card-title grey-text text-darken-4'>Name</span><p>full description</p></div></div>")
					}
					add();
                });

            	$("#search").css("display", "none");
  				$("#resultsPage").css("display", "inline");    
            } else {
                Materialize.toast('No results, please modify search.', 3000);
            }

      });
  console.log(dogResultsArray);
  });
  	$("#newSearch").click(function(event){
  	event.preventDefault();
  	$("#search").css("display", "inline");
  	$("#resultsPage").css("display", "none");
  	})

  	$("#favorites").click(function(event){
  	event.preventDefault();
  	$("#favoritesPage").css("display", "inline");
  	$("#resultsPage").css("display", "none");
  	$(".favorited").css("display","inline");
  	})

  	$("#results").click(function(event){
  	event.preventDefault();
  	$("#favoritesPage").css("display", "none");
  	$("#resultsPage").css("display", "inline");
  	})

  	$("#like").click(function(event){
  		event.preventDefault();
		console.log("got  it!");
  	})
});


            


