function displayName() {
  document.getElementById("cambiar-nombre").classList.add('active');
  document.getElementById("cambiar-contraseña").classList.remove('active');
  document.getElementById("cambiar-password").style.display = "none";
  document.getElementById("cambiar-name").style.removeProperty("display");
}

function displayPassword() {
  document.getElementById("cambiar-contraseña").classList.add('active');
  document.getElementById("cambiar-nombre").classList.remove('active');
  document.getElementById("cambiar-name").style.display = "none";
  document.getElementById("cambiar-password").style.removeProperty("display");
}
