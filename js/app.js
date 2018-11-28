//Obtener la referencia al elemento
var btnActualizar = document.getElementById('btnActualizar')

//Agregar un event listener para cada click
btnActualizar.addEventListener('click', actualizar);

function actualizar()
{
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200){
        alert(this.responseText);
      }
  };
  xhttp.open("GET", "http://nyc.pixan.io/ajax/public/api/students", true);
  xhttp.send();

}
