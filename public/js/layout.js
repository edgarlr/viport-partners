var notifications_var = document.getElementById("notifications");

/*Notificaciones*/
function openNotifications() {
  notifications_var.style.width = "20%";
}
function closeNotifications() {
  notifications_var.style.width = "0";
}

function showDropdownNew() {
  document.getElementById("newplace-dropdown").classList.toggle("show");
  console.log("hola");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropdown-mini')) {
    console.log("hola 2");
    var dropdowns = document.getElementsByClassName("dropdown-mini-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
