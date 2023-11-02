document.addEventListener("DOMContentLoaded", () => {

    buscarID();
    eliminarUser();
    nuevoUser();

});

const url = "https://65423647f0b8287df1ffb4a9.mockapi.io/users"

let results = document.getElementById('results');

function mostrarDatos() {
    results.textContent = '';
    fetch(url)
        .then(resp => resp.json())
        .then(data => {

            data.forEach(element => {
                let li = document.createElement('li');
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
    let input = document.getElementById('inputGet1Id');

    buscar.addEventListener('click', () => {
        console.log('hiciste click')
        results.innerText = ''

        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                let resBusqueda = data.find((element) => element.id == input.value)

                if (resBusqueda) {
                    let li = document.createElement('li');
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
            })
    })
}


function nuevoUser() {
    // post 

    let agregar = document.getElementById("btnPost");

    agregar.addEventListener("click", () => {

        let name = document.getElementById("inputPostNombre").value;
        let lastname = document.getElementById("inputPostApellido").value;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                lastname: lastname
            })
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                mostrarDatos();
            })

    });

}

function modificarUser() {
    // put
    let modificar = document.getElementById("btnPut");
    let modInput = document.getElementById("inputPutId").value;
    modificar.addEventListener("click", () => {

    });
}

function eliminarUser() {
    // delete
    let borrar = document.getElementById("btnDelete");
    let delInput = document.getElementById("inputDelete")
    console.log(delInput.value)
    borrar.addEventListener("click", () => {
        fetch(url + "/" + delInput.value, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }

        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                mostrarDatos();
            })

    });

}





