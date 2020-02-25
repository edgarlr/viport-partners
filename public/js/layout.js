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
}

window.onclick = function(event) {
  if (!event.target.matches('.dropdown-mini')) {
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

/*Desplegar Tarjetas*/

function desplegarBtn() {
  document.getElementById('btn-desplegar').classList.toggle("rotate-180");
  document.getElementById('tarjeta-desplegada').classList.toggle("display-none")
}

function addInputTel() {
  let tel_input = document.createElement('input');
  let input_number = document.getElementById('input-tel').getElementsByTagName('input').length;
  tel_input.setAttribute("type", "tel");
  tel_input.setAttribute("placeholder", "Telefono "+ input_number);
  tel_input.setAttribute("class", "form-input-add");
  tel_input.setAttribute("name", "telefono_"+input_number);
  tel_input.setAttribute("id", "telefono-"+input_number);

  document.getElementById('input-tel').appendChild(tel_input);

  let delete_btn = document.createElement('button');
  delete_btn.setAttribute("class", "delete-input-btn");
  delete_btn.setAttribute("type", "button");
  delete_btn.setAttribute("onclick", "deleteInputTel("+input_number+")");
  delete_btn.setAttribute("id", "tel-btn-"+input_number);

  let icon_delete_btn = document.createElement('i');
  icon_delete_btn.setAttribute("class", "icon-gray icon-salir")

  delete_btn.appendChild(icon_delete_btn);

  //input  hidden value
  let input_hidden_tel = document.getElementById('input-tel').getElementsByClassName('form-input-add').length
  document.getElementById('iterador-telefono').value = input_hidden_tel

  document.getElementById('input-tel').appendChild(delete_btn);
}

function addInputWeb() {
  let web_input = document.createElement('input');
  let input_number = document.getElementById('input-web').getElementsByTagName('input').length;
  web_input.setAttribute("type", "text");
  web_input.setAttribute("placeholder", "Sitio web "+ input_number);
  web_input.setAttribute("class", "form-input-add");
  web_input.setAttribute("name", "website_"+input_number);
  web_input.setAttribute("id", "website-"+input_number);

  document.getElementById('input-web').appendChild(web_input);

  let delete_btn = document.createElement('button');
  delete_btn.setAttribute("class", "delete-input-btn");
  delete_btn.setAttribute("type", "button");
  delete_btn.setAttribute("onclick", "deleteInputWeb("+input_number+")");
  delete_btn.setAttribute("id", "website-btn-"+input_number);

  let icon_delete_btn = document.createElement('i');
  icon_delete_btn.setAttribute("class", "icon-gray icon-salir")

  delete_btn.appendChild(icon_delete_btn);

  //input  hidden value
  let input_hidden_web = document.getElementById('input-web').getElementsByClassName('form-input-add').length
  document.getElementById('iterador-web').value = input_hidden_web

  document.getElementById('input-web').appendChild(delete_btn);
}

function deleteInputWeb(id) {
  document.getElementById("website-"+id).remove();
  document.getElementById("website-btn-"+id).remove();
  //input  hidden value
  let input_hidden_web = document.getElementById('input-web').getElementsByClassName('form-input-add').length
  document.getElementById('iterador-web').value = input_hidden_web

}

function deleteInputTel(id) {
  document.getElementById("telefono-"+id).remove();
  document.getElementById("tel-btn-"+id).remove();
  //input  hidden value
  let input_hidden_tel = document.getElementById('input-tel').getElementsByClassName('form-input-add').length;
  document.getElementById('iterador-telefono').value = input_hidden_tel

}

function crearConsejo() {
  var div_container = document.createElement("div");
  let div_number = document.getElementById('consejo_div').getElementsByClassName('consejo_container').length+1;
  div_container.setAttribute("class", "consejo_container");
  div_container.setAttribute("id", "consejo_container_"+div_number);
  let div_for_insert = document.getElementById('consejo_div');
  div_for_insert.insertBefore(div_container, div_for_insert.lastChild);

  let container = document.getElementById('consejo_container_'+div_number);
  //Text
  let text = document.createElement('h3');
  text.innerHTML = 'Consejo '+ div_number;
  container.appendChild(text);
  //icon Eliminar
  let btn = document.createElement('button');
  btn.setAttribute('class', 'delete-input-btn');
  btn.setAttribute('type', 'button');
  btn.setAttribute('onclick', 'deleteConsejo('+div_number+')');
  let icon = document.createElement('i');
  icon.setAttribute('class', 'icon-gray icon-salir');
  btn.appendChild(icon);
  document.getElementById('consejo_container_'+div_number).appendChild(btn);
  //create div for title
  let div_title = document.createElement("div");
  div_title.setAttribute('id', 'div_title_'+div_number);
  container.appendChild(div_title);
  //create label for title
  let label_title = document.createElement('label');
  label_title.setAttribute('for', 'title_consejo_'+div_number);
  label_title.innerHTML = 'Consejo'
  document.getElementById('div_title_'+div_number).appendChild(label_title);
  //create input for title
  let input_title = document.createElement('textarea');
  input_title.setAttribute('id', "title_consejo_"+div_number);
  input_title.setAttribute('name', "title_consejo_"+div_number);
  input_title.setAttribute('class', 'form-textarea');
  input_title.setAttribute('required', 'true');
  input_title.setAttribute('placeholder', 'Ej. No lleves mochila pues el lugar no cuenta con paquetería y no permiten entrar con bultos.');
  document.getElementById('div_title_'+div_number).appendChild(input_title);
  //contardor
  document.getElementById('iterador-consejos').value = div_number;

}

function deleteConsejo(number) {
  document.getElementById('consejo_container_'+number).remove();
  //contardor
  let div_number = document.getElementById('consejo_div').getElementsByClassName('consejo_container').length
  document.getElementById('iterador-consejos').value = div_number;
}


//Función para dar valor a input hidden

function setHiddenInputValue() {
  let input_hidden_tel = document.getElementById('input-tel').getElementsByClassName('form-input-add').length
  document.getElementById('iterador-telefono').value = input_hidden_tel

  let input_hidden_web = document.getElementById('input-web').getElementsByClassName('form-input-add').length
  document.getElementById('iterador-web').value = input_hidden_web
}
