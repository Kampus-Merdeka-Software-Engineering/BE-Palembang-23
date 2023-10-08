        // membuat dropdown menu profile


        let subMenu = document.getElementById("subMenu");


        function toggleMenu() {
            subMenu.classList.toggle("open-menu");
        }


// membuat pindah page setelas isi form


document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the form data
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var moveDate = document.getElementById("moveDate").value;
    var addressHome = document.getElementById("addressHome").value;
    var destinationAddress = document.getElementById("destinationAddress").value;
    var totalAnimal = document.getElementById("totalAnimal").value;
    var name1 = document.getElementById("name1").value;
    var type1 = document.getElementById("type1").value;
    var gender1 = document.getElementById("gender1").value;
    var Weight1 = document.getElementById("Weight1").value;
    var name2 = document.getElementById("name2").value;
    var type2 = document.getElementById("type2").value;
    var gender2 = document.getElementById("gender2").value;
    var Weight2 = document.getElementById("Weight2").value;
    var message = document.getElementById("message").value;

    // Redirect to another page
    var destination = "thankyouAfter.html";
    window.location.href = "thankyouAfter.html"
});