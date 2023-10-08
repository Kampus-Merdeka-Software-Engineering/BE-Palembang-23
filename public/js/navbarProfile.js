
// membuat dropdown menu profile


let subMenu = document.getElementById("subMenu");


function toggleMenu() {
    subMenu.classList.toggle("open-menu");
}




// change page
function showPage(pageNumber) {
    // menyembunikan semua page
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // menampilkan page yang dipilih
    const selectedPage = document.getElementById(`page${pageNumber}`);
    selectedPage.classList.add('active');
}

// pindah ke page 1
showPage(1);



// edit profile
    function changeUsernameAndEmail() {
        // dapatkan value baru dari dorm input
        const newUsername = document.getElementById('username').value;
        const newEmail = document.getElementById('email').value;

        // Update profile-name and profile-email dengan value baru
        document.getElementById('profile-name').textContent = newUsername;
        document.getElementById('profile-email').textContent = newEmail;
    }

    // add event listener
    const editProfileForm = document.getElementById('edit-profile-form');
    editProfileForm.addEventListener('submit', function (event) {
        event.preventDefault();
        changeUsernameAndEmail(); 
        
    });
