document.addEventListener("DOMContentLoaded", () => {
    mostrarDatos()
    buscarID()

});

const url = "https://65423647f0b8287df1ffb4a9.mockapi.io/users"

let results = document.getElementById('results');


function mostrarDatos() {

    fetch(url)
        .then(resp => resp.json())
        .then(data => {

            console.log(data)


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


        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                let resBusqueda = data.find((element) => element.id == input.value)

                for (let pro in obj)
    //             let li = document.createElement('li');
    //             let nombre = element.name;
    //             let apellido = element.lastname;
    //             let id = element.id;
    //             li.innerHTML = `
    //         <li>ID: ${id}</li>
    //         <li>NAME: ${nombre}</li>
    //         <li>LASTNAME: ${apellido}</li>                    
    // `;
    //             results.appendChild(li);



                console.log(resBusqueda)


            })

    })
}


function nuevoUser() {
    // post 
    let agregar = document.getElementById("btnPost");
    let name = document.getElementById("inputPostNombre").value;
    let lastname = document.getElementById("inputPostApellido").value;
    agregar.addEventListener("click", () => {

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
    let delInput = document.getElementById("inputDelete").value;
    borrar.addEventListener("click", () => {
        fetch(`${url}/${delInput}`, {
            method: 'DELETE'
        })
        .then(data => mostrarDatos())
    });
}





