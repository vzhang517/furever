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
                    var dogOptions=[];
                    var dogName=currentPet.name.$t;
                    var dogSize=currentPet.size.$t;
                    var dogAge=currentPet.age.$t;
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

                

                    if(currentPet.media.photos !== undefined){
                    var thearrayOfDogPhotos = currentPet.media.photos.photo;
                    for (var i = 0; i < thearrayOfDogPhotos.length; i++) {
                        
                        var dogPhotosToPush = thearrayOfDogPhotos[i].$t;
                        dogPicArray.push(dogPhotosToPush);

                                  
                    }
                }
                console.log("Dog Pic Array: " + JSON.stringify(dogPicArray)); 


   //////////////// Contact info pulled here and assigned to variables if it exists/////////    

                    if(currentPet.contact.address1.$t !== "undefined"){
                        addressOne = currentPet.contact.address1.$t;
                    }
                    if(currentPet.contact.address2.$t !== "undefined"){
                        addressTwo = currentPet.contact.address2.$t;
                    }
                    if(currentPet.contact.city.$t){
                        city = currentPet.contact.city.$t;
                    }
                    if(currentPet.contact.email.$t){
                        email = currentPet.contact.email.$t;
                    }
                    if(currentPet.contact.phone.$t){
                        phone = currentPet.contact.phone.$t;
                    }
                    if(currentPet.contact.city.$t){
                        state = currentPet.contact.state.$t;
                    }
                    if(currentPet.contact.zip.$t){
                        zip = currentPet.contact.zip.$t;
                    };

                    //console log contact info
                    console.log("addressOne: " + addressOne);
                    console.log("addressTwo: " + addressTwo);
                    console.log("city: " + city);
                    console.log("email: " + email);
                    console.log("phone: " + phone);
                    console.log("state: " + state);
                    console.log("zip: " + zip);
  
                    
                    // var hugeArray = bigAssResponseJSON.allPets;

                    // hugeArray.forEach(function(currentObject){
                    //     checkContactInfo(currentObject);
                    // });       


                    var theNextArrayOfNope = currentPet.options;
                    console.log(theNextArrayOfNope);
                    var optionsArray = (theNextArrayOfNope.option);
                    console.log(optionsArray);
                    
                        if(optionsArray===Array){
                           optionsArray.forEach(function(currentOption) {
                            dogOptions.push(currentOption.$t);
                            console.log("Info about dog: " + currentOption.$t);
                          });
                          

                        }else if(optionsArray !== undefined){
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

