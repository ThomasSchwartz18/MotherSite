function toggleNav() {
    var navBar = document.getElementById('nav-bar');
    var content = document.getElementById('content');
    navBar.classList.toggle('active');
    content.classList.toggle('shift');
}
