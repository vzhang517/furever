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

                console.log(queryURL);
                var results = response.response;
                console.log(results);

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
                    var dogOptions = [];
                    var dogName = currentPet.name.$t;
                    var dogSize = currentPet.size.$t;
                    var dogAge = currentPet.age.$t;
                    // Contact Info
                    var addressOne;
                    var addressTwo;
                    var city;
                    var email;
                    var phone;
                    var state;
                    var zip;

                    //console log options
                    console.log("Name of dog: " + currentPet.name.$t);
                    console.log("Size of dog: " + currentPet.size.$t);




                    var thearrayOfDogPhotos = currentPet.media.photos.photo;
                    for (var i = 0; i < thearrayOfDogPhotos.length; i++) {
                        if (thearrayOfDogPhotos[i].hasOwnProperty('$t')) {
                            var dogPhotosToPush = thearrayOfDogPhotos[i].$t;
                            dogPicArray.push(dogPhotosToPush);

                        }
                    }
                    console.log("Dog Pic Array: " + JSON.stringify(dogPicArray));


                    //////////////// Contact info pulled here (under forEach function) and assigned to relevant variable if key ($t) exists/////////    
                    /////////////////// If key does not exist then variable is assigned a "No ... provided" message////

                    if (currentPet.contact.address1.hasOwnProperty('$t')) {
                        addressOne = currentPet.contact.address1.$t;
                    } else
                        addressOne = "No address provided.";

                    if (currentPet.contact.address2.hasOwnProperty('$t')) {
                        addressTwo = currentPet.contact.address2.$t;
                    } else
                        addressTwo = "No address provided.";

                    if (currentPet.contact.city.hasOwnProperty('$t')) {
                        city = currentPet.contact.city.$t;
                    } else
                        city = "No city provided.";

                    if (currentPet.contact.email.hasOwnProperty('$t')) {
                        email = currentPet.contact.email.$t;
                    } else
                        email = "No email address provided.";

                    if (currentPet.contact.phone.hasOwnProperty('$t')) {
                        phone = currentPet.contact.phone.$t;
                    } else
                        phone = "No phone number provided.";

                    if (currentPet.contact.state.hasOwnProperty('$t')) {
                        state = currentPet.contact.state.$t;
                    } else
                        state = "No state provided.";

                    if (currentPet.contact.zip.hasOwnProperty('$t')) {
                        zip = currentPet.contact.zip.$t;
                    } else
                        zip = "No zipcode provided.";

                    //console log contact info
                    console.log("addressOne: " + addressOne);
                    console.log("addressTwo: " + addressTwo);
                    console.log("city: " + city);
                    console.log("email: " + email);
                    console.log("phone: " + phone);
                    console.log("state: " + state);
                    console.log("zip: " + zip);


                    var theNextArrayOfNope = currentPet.options;
                    console.log(theNextArrayOfNope);
                    var optionsArray = (theNextArrayOfNope.option);
                    console.log(optionsArray);

                    if (optionsArray === Array) {
                        optionsArray.forEach(function(currentOption) {
                            dogOptions.push(currentOption.$t);
                            console.log("Info about dog: " + currentOption.$t);
                        });


                    } else if (optionsArray !== undefined) {
                        console.log(optionsArray.$t);
                    }



                    var newDog = new Dog(dogName, dogOptions, dogPicArray, dogSize, dogAge);
                    console.log(newDog);
                    dogResultsArray.push(newDog);
                });
            } else {
                Materialize.toast('No results, please modify search.', 3000);
            }
            console.log(dogResultsArray);
        });

    });

});