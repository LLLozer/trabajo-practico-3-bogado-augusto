const link = 'https://dragonball-api.com/api/characters?limit=58';
const btnBuscar = document.getElementById("btn-buscar");
const mainContainer = document.getElementById("data-container");
const busquedaInput = document.getElementById("input-busqueda");
const btnLimpiar = document.getElementById("btn-limpiar")
const load = async () => {
    const response = await fetch(link)
    const data = await response.json()
    console.log(data)
}


const loadData = async (link) => {
    try {
        const response = await fetch(link);

        if (!response.ok) {
            throw new error("Ocurrió un error en la API");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};


window.addEventListener("DOMContentLoaded", async () => {
    const data = await loadData(link);
    const dataPersonajes = data.items;
    console.log(dataPersonajes);

    mainContainer.innerHTML = ""
    dataPersonajes.forEach((personaje) => {
        mainContainer.innerHTML += `
          <div class="col-3 pb-2 d-flex justify-content-center" data-id=${personaje.id}>
            <div class="card">
              <img
                class="card-img-top"
                src="${personaje.image}"
              />
              <div class="card-body">
                <h5 class="card-title">${personaje.name}</h5>
                <p class="card-text">${personaje.race} - ${personaje.gender}</p>
                <button class="btn btn-success btn-ver-detalles">Ver más</button>
              </div>
            </div>
          </div>
      `;
    });
});


mainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-ver-detalles")) {
        const cardPadre = e.target.closest(".col-3");
        const id = cardPadre.dataset.id;

        verDetalles(id);
    }
});

btnBuscar.addEventListener("click",  async () => {
    const consulta = busquedaInput.value.trim().toLowerCase();

    if (!consulta) {
        alert("No se encontró a un personaje con ese nombre")
    }

     const personaje = await buscarPersonaje(consulta);
     mainContainer.innerHTML = ""
    personaje.forEach((personaje) => {
        mainContainer.innerHTML += `
          <div class="col-3 pb-2 d-flex justify-content-center" data-id=${personaje.id}>
            <div class="card">
              <img
                class="card-img-top"
                src="${personaje.image}"
              />
              <div class="card-body">
                <h5 class="card-title">${personaje.name}</h5>
                <p class="card-text">${personaje.race} - ${personaje.gender}</p>
                <button class="btn btn-success btn-ver-detalles">Ver más</button>
              </div>
            </div>
          </div>
      `;
    });

})

const buscarPersonaje = async (consulta) => {
    try {
        console.log(`https://dragonball-api.com/api/characters?name=${consulta}`)
        const respuesta = await fetch(`https://dragonball-api.com/api/characters?name=${consulta}`)
        const personaje = await respuesta.json();

        console.log(personaje)
        return personaje
        
    } catch (error) {
        console.log("Error")
    }
}

btnLimpiar.addEventListener("click", async () => {
        const data = await loadData(link);
    const dataPersonajes = data.items;
    console.log(dataPersonajes);

    mainContainer.innerHTML = ""
    dataPersonajes.forEach((personaje) => {
        mainContainer.innerHTML += `
          <div class="col-3 pb-2 d-flex justify-content-center" data-id=${personaje.id}>
            <div class="card">
              <img
                class="card-img-top"
                src="${personaje.image}"
              />
              <div class="card-body">
                <h5 class="card-title">${personaje.name}</h5>
                <p class="card-text">${personaje.race} - ${personaje.gender}</p>
                <button class="btn btn-success btn-ver-detalles">Ver más</button>
              </div>
            </div>
          </div>
      `;
    });
})