document.addEventListener("DOMContentLoaded", () => {
  buscarID();
  eliminarUser();
  nuevoUser();
  modificarUser();
});


const url = "https://65423647f0b8287df1ffb4a9.mockapi.io/users";
let results = document.getElementById("results");

function mostrarDatos() {
  results.textContent = "";
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((element) => {
        let li = document.createElement("li");
        let nombre = element.name;
        let apellido = element.lastname;
        let id = element.id;
        li.innerHTML = `
            <li>ID: ${id}</li>
            <li>NAME: ${nombre}</li>
            <li>LASTNAME: ${apellido}</li>                    
        `;
        results.appendChild(li);
      });
    });
}

function buscarID() {
  let buscar = document.getElementById("btnGet1");
  let input = document.getElementById("inputGet1Id");
  let results = document.getElementById("results");

  buscar.addEventListener("click", () => {
    console.log("hiciste click");
    results.innerText = "";

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (input.value === "") {
          mostrarDatos();
        } else {
          let resBusqueda = data.find((element) => element.id == input.value);
          let li = document.createElement("li");
          let nombre = resBusqueda.name;
          let apellido = resBusqueda.lastname;
          let id = resBusqueda.id;
          li.innerHTML = `
                        <li>ID: ${id}</li>
                        <li>NAME: ${nombre}</li>
                        <li>LASTNAME: ${apellido}</li>
                    `;
          results.appendChild(li);
        }
      });
  });
}

function nuevoUser() {
  let agregar = document.getElementById("btnPost");

  agregar.addEventListener("click", () => {
    let name = document.getElementById("inputPostNombre").value;
    let lastname = document.getElementById("inputPostApellido").value;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        lastname: lastname,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        mostrarDatos();
      });
  });
}

function modificarUser() {
  let modificar = document.getElementById("btnPut");
  let modInput = document.getElementById("inputPutId");
  let guardar = document.getElementById("guardar");
  let nombre = document.getElementById("name");
  let apellido = document.getElementById("lastname");

  modificar.addEventListener("click", () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        resBusqueda = data.find((element) => element.id == modInput.value);

        nombre.value = resBusqueda.name;
        apellido.value = resBusqueda.lastname;

        $("#modal").modal("show");
      });
  });

  guardar.addEventListener("click", () => {
    let datosActualizados = {
      name: nombre.value,
      lastname: apellido.value,
    };

    fetch(url + "/" + resBusqueda.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosActualizados),
    })
      .then((resp) => resp.json())
      .then((data) => {
        mostrarDatos();
      });

    $("#modal").modal("hide");
  });
}

function eliminarUser() {
  let borrar = document.getElementById("btnDelete");
  let delInput = document.getElementById("inputDelete");
  
  console.log(delInput.value);
  borrar.addEventListener("click", () => {
    fetch(url + "/" + delInput.value, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        mostrarDatos();
      });
  });
}
