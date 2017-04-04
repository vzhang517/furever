$(document).ready(function() {
    $('select').material_select();
    $('.tooltipped').tooltip({
        delay: 50
    });

    $("#submit").click(function(event) {
        event.preventDefault();

        var breed = $('#breed').val();
        var age = $("#age").val();
        var size = $("#size").val();
        var gender = $("#gender").val();
        var zipcode = $("#location").val();
        var api_key = '96d7e760e6cf087c0470a585636831ff';
        var queryURL = "http://api.petfinder.com/pet.find?";

        var dogResultsArray = [];

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
            'size': size,
            'count': 5
        }, true);
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET",
            crossDomain: true,
            dataType: "jsonp"
        }).done(function(response) {
            if (response.petfinder.pets) {	
                var results = response.response;
                console.log(queryURL);
                var theArrayOfNope = response.petfinder.pets.pet;
                console.log(theArrayOfNope);

                // Constructor for dog objects to collect individual info
                var Dog = function(name, options, pics, size, age, address1, address2, city, email, phone, state, zip) {

                    this.name = name;
                    this.options = options;
                    this.pics = pics;
                    this.size = size;
                    this.age = age;
                    this.address1 = address1;
                    this.address1 = address1;
                    this.city = city;
                    this.email = email;
                    this.phone = phone;
                    this.state = state;
                    this.zip = zip;
                };

                theArrayOfNope.forEach(function(currentPet) {
                    var dogPicArray = [];
                    var dogOptions = [];
                    var dogName = currentPet.name.$t;
                    var dogSize = currentPet.size.$t;
                    var dogAge = currentPet.age.$t;
                    // Contact Info
                    var address1;
                    var address2;
                    var city;
                    var email;
                    var phone;
                    var state;
                    var zip;

                    //console log options
                    console.log("Name of dog: " + currentPet.name.$t);
                    console.log("Size of dog: " + currentPet.size.$t);

                	if (currentPet.media.hasOwnProperty("photos"))  {
                		var thearrayOfDogPhotos = currentPet.media.photos.photo;
                    	for (var i = 0; i < thearrayOfDogPhotos.length; i++) {
                        	if (thearrayOfDogPhotos[i].hasOwnProperty('$t') && (thearrayOfDogPhotos[i]['@size'] === "x")) {
                            	var dogPhotosToPush = thearrayOfDogPhotos[i].$t;
                           	 	dogPicArray.push(dogPhotosToPush);
                        	}
                    	}
                	} else {
                    dogPicArray.push("assets/images/plane-dog.jpg");
               		}
                    console.log("Dog Pic Array: " + JSON.stringify(dogPicArray));
                    //////////////// Contact info pulled here (under forEach function) and assigned to relevant variable if key ($t) exists/////////    
                    /////////////////// If key does not exist then variable is assigned a "Not provided" message////

                    if (currentPet.contact.address1.hasOwnProperty('$t')) {
                        address1 = currentPet.contact.address1.$t;
                    } else
                        address1 = "Not provided.";

                    if (currentPet.contact.address2.hasOwnProperty('$t')) {
                        address2 = currentPet.contact.address2.$t;
                    } else
                        address2 = "Not provided.";

                    if (currentPet.contact.city.hasOwnProperty('$t')) {
                        city = currentPet.contact.city.$t;
                    } else
                        city = "Not provided.";

                    if (currentPet.contact.email.hasOwnProperty('$t')) {
                        email = currentPet.contact.email.$t;
                    } else
                        email = "Not provided.";

                    if (currentPet.contact.phone.hasOwnProperty('$t')) {
                        phone = currentPet.contact.phone.$t;
                    } else
                        phone = "Not provided.";

                    if (currentPet.contact.state.hasOwnProperty('$t')) {
                        state = currentPet.contact.state.$t;
                    } else
                        state = "Not provided.";

                    if (currentPet.contact.zip.hasOwnProperty('$t')) {
                        zip = currentPet.contact.zip.$t;
                    } else
                        zip = "Not provided.";

                    //console log contact info
                    console.log("address1: " + address1);
                    console.log("address2: " + address2);
                    console.log("city: " + city);
                    console.log("email: " + email);
                    console.log("phone: " + phone);
                    console.log("state: " + state);
                    console.log("zip: " + zip);


                    var theNextArrayOfNope = currentPet.options;
                    
                    var optionsArray = (theNextArrayOfNope.option);

                    // console options
                    console.log(theNextArrayOfNope);
                    console.log(optionsArray);

                    // check to see if options is an array (hence having more than one option), if so iterate through
                    // if(theNextArrayOfNope.hasOwnProperty("options")){
                        
                    if(Array.isArray(optionsArray)){
                    optionsArray.forEach(function(currentOption) {
                        dogOptions.push(currentOption.$t);
                        console.log("Info about dog: " + currentOption.$t);
                    });
                    // if not an array, and also not undefined (empty), just display value found in object
                    }else if(optionsArray != undefined){
                        dogOptions.push(optionsArray.$t)
                    }
                    // create a new dog object for every pet and their info using the Dog constructor
                    var newDog = new Dog(dogName, dogOptions, dogPicArray, dogSize, dogAge, address1, address2, city, email, phone, state, zip);
                    dogResultsArray.push(newDog);
                });
				// on click submit, hide search page and show results page
            	$("#search").css("display", "none");
  				$("#resultsPage").css("display", "inline"); 
  				//create a card for each dog 
  				dogResultsArray.forEach(function (dog, index, dogs) {
			        $("#cards").append("<li class='item'><div class='card sticky-action col s4 results'><div class='card-image waves-effect waves-block waves-light'><img class='activator' src='"+dog.pics[0]+"'></div><div class='card-content'><span class='card-title activator grey-text text-darken-4'>"+dog.name+"</span><p>"+dog.age+" // "+dog.size+"</p></div><div class='card-reveal'><span class='card-title grey-text text-darken-4'>"+dog.name+"</span><p>"+dog.address1+"<br>"+dog.city+", "+dog.state+" "+dog.zip+"<br>"+dog.email+"</p></div></div></li>");
			        //add class 'current' to first li of div id cards
			    }); $('#cards li:first').addClass('current');
            } else {
                Materialize.toast('No results, please modify search.', 3000);
            }
 		});
  	});
	//button functions 
  	$("#newSearch").click(function(event){
	  	event.preventDefault();
	  	$("#search").css("display", "inline");
	  	$("#resultsPage").css("display", "none");
	});

  	$("#favorites").click(function(event){
	  	event.preventDefault();
	  	$("#favoritesPage").css("display", "inline");
	  	$("#resultsPage").css("display", "none");
	  	$(".favorited").css("display","inline");
	});

  	$("#results").click(function(event){
	  	event.preventDefault();
	  	$("#favoritesPage").css("display", "none");
	  	$("#resultsPage").css("display", "inline");
	});  	
}); 



