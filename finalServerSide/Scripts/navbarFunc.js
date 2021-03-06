function navBarVisability() {
    /*$('#navBar').html= createNavBar();*/
    if (localStorage.user != null) {
        user = JSON.parse(localStorage["user"]);
        $("#userName").text("  Hello " + user.FirstName + " " + user.LastName);
        document.getElementById("signUp").style.visibility = "hidden";
        document.getElementById("login").style.visibility = "hidden";
        document.getElementById("editUser").style.visibility = "visibility";
        document.getElementById("exit").style.visibility = "visibility";
        if (localStorage.profileSrc != undefined)
            userProfile = JSON.parse(localStorage.profileSrc);
        else
            userProfile = "https://image.ibb.co/jw55Ex/def_face.jpg";
        $('#profile').html(`<img id="profileImg" style="height:50px; width:40px; border-radius: 25px; margin-right: 8px;" src="` + userProfile + `"/>`);

        if (user.FirstName == "Administrator") {
            document.getElementById("admin").style.visibility = "visibility";
        }
        else {
            document.getElementById("admin").style.visibility = "hidden";
        }
    }
    else {
        document.getElementById("signUp").style.visibility = "visibility";
        document.getElementById("login").style.visibility = "visibility";
        document.getElementById("editUser").style.visibility = "hidden";
        document.getElementById("exit").style.visibility = "hidden";
        document.getElementById("admin").style.visibility = "hidden";
        document.getElementById("view").style.visibility = "hidden";
    }
}

function exitFunc() {
    localStorage.clear();
    document.location = 'insert_signup.html';
    document.getElementById("pForm").reset();
}

//let searchInput = 'search_input';
//function signUpClick() {
//    document.location = 'insert_signup.html';
//    document.getElementById('modalBox').style.display = 'block';

//    $("#pForm").submit(submit); // bind the submit event to a function called addUser
//    var autocomplete;
//    autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
//        types: ['geocode'],

//    });
//    google.maps.event.addListener(autocomplete, 'place_changed', function () {
//        var near_place = autocomplete.getPlace();
//        document.getElementById('loc_lat').value = near_place.geometry.location.lat();
//        document.getElementById('loc_long').value = near_place.geometry.location.lng();
//    });

//    $('#passwordTB, #confirmPasswordTB').on('keyup', function () {
//        if ($('#passwordTB').val() == $('#confirmPasswordTB').val()) {
//            $('#message').html('Passwords are Matching').css('color', 'green');
//        } else
//            $('#message').html('Passwords are Not Matching').css('color', 'red');
//    });
//}
