//Obtener la referencia al elemento
var btnActualizar = document.getElementById('btnActualizar')
var btnGuardar = document.getElementById('btnGuardar')

//Agregar un event listener para cada click
btnActualizar.addEventListener('click', actualizar);
btnGuardar.addEventListener('click', guardar);

  function guardar()
  {
    var first_name =document.getElementById('first_name').value;
    var last_name =document.getElementById('last_name').value;
    var email =document.getElementById('email').value;
    var phone_number =document.getElementById('phone_number').value;

    var data = new FormData();

    data.append('first_name', first_name);
    data.append('last_name', last_name);
    data.append('email', email);
    data.append('phone_number', phone_number);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200)
        {
          var response = JSON.parse(this.responseText);
          if (response.status == 'error'){
            alert(response.errors[0]);
          }
        else {
          actualizar();
          document.getElementById('first_name').value = "";
          document.getElementById('last_name').value = "";
          document.getElementById('email').value = "";
          document.getElementById('phone_number').value = "";
          }
        }
      };
    xhttp.open("POST", "http://nyc.pixan.io/ajax/public/api/students", true);
    xhttp.send(data);
  }
  function actualizar()
  {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
          //alert(this.responseText);

          // se agrego todo esto
          var response = JSON.parse(this.responseText);
          if(response.status == "ok")
          {
            document.getElementsByTagName('tbody')[0].innerHTML = "";
            response.students.forEach(function(student)
            {
              //var html = "<tr><td>"
              //+student.id
              //+"<tr><td>"
              //+student.first_name
              //+"<tr><td>"
              //+student.last_name
              //+"<tr><td>"
              //+<button class=eliminar type=button>eliminar </button>
              //+"<tr><td>"
              var row = document.createElement("tr");
              var idCell = document.createElement("td");
              var firstNameCell = document.createElement("td");
              var lastNameCell = document.createElement("td");
              var deleteButtonCell = document.createElement("td");
              var deleteButton = document.createElement("button");
              deleteButton.className = "Eliminar";

              var idText = document.createTextNode(student.id);
              var firstNameText = document.createTextNode(student.first_name);
              var lastNameText = document.createTextNode(student.last_name)
              var deleteButtonText = document.createTextNode("Eliminar")

              idCell.appendChild(idText);
              firstNameCell.appendChild(firstNameText);
              lastNameCell.appendChild(lastNameText);

              deleteButton.appendChild(deleteButtonText);
              deleteButtonCell.appendChild(deleteButton);

              row.appendChild(idCell);
              row.appendChild(firstNameCell);
              row.appendChild(lastNameCell);
              row.appendChild(deleteButtonCell);

              document.getElementsByTagName('tbody')[0].appendChild(row);
            });
            var botonesEliminar = document.getElementsByClassName('Eliminar');
            for(var i=0; i<botonesEliminar.length;i++)
            {
              botonesEliminar[i].addEventListener('click', eliminarUsuario(response.students[i]));
            }
          }
        }
    };
    xhttp.open("GET", "http://nyc.pixan.io/ajax/public/api/students", true);
    xhttp.send();
  }

  function eliminarUsuario(student)
  {
    //console.log('estoy creando la función para eliminar el usuario'+student.id);
    return function(event)
    {
      //alert('hola');
      //var data = new FormData();
      //data.append('_method', 'DELETE')
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function()
      {
        if (this.readyState == 4 && this.status == 200)
        {
          event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
        }
      };
      xhr.open("DELETE", "http://nyc.pixan.io/ajax/public/api/students/"+student.id, true);
      xhr.send();
    }
  }
