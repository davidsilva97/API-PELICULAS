//Hacer que los botones cambien de pagina

let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click",() =>{
    if(pagina <1000){
        pagina+=1;
        cargarPeliculas();
    }else{
        alert("Ya no hay mas paginas")
    }
    
})

btnAnterior.addEventListener("click",() =>{
    if(pagina===1){
        alert("No puedes retroceder, estas en la primera pagina")
    } else{
        pagina-=1;
        cargarPeliculas();
    }
})

//Funcion para cargar las peliculas una vez que inicie nuestro documento 
const cargarPeliculas =async ()=>{
    //para trabajar con funciones asincronas tenemos que usar try catch para ver si hay algun error
    try {
        const respuesta =await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=b82fa3192c72a3b0c70a2dbda3281b8a&language=es-MX&page=${pagina}`); //Hacemos la peticion y fetch nos devuelve una promesa (estamos haciedno una peticion y tenemos que esperaer que acabe para hacer algo), y usamos await para que cuando acabe pase a la sigueinte linea 
        //ponemos &language=es-MX para obtener la informacion en español mexico
        console.log(respuesta);

        //Hacemos la comprobacion si la respuesta es correcta y no tenemos algun error en el codigo de status
        if(respuesta.status === 200){
            //metodo json es asincrono y nos sirve apra poder acceder a la iunformacion en formato json
        const datos = await respuesta.json(); //la variable data contiene el objeto de las peliculas
        console.log(datos.results); //Nos muestra el arreglo de las peliculas

        let peliculas = ``;

        datos.results.forEach(pelicula => {
            //por cada pelicula yo quiero acceder a pelicula.title osea el titulo de cada pelicula
            console.log(pelicula.title);
            peliculas += `
            <div class="pelicula">
                <img class="poster" src = "https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"/>
                <h3 class="titulo">${pelicula.title}</h3>
            </div>
            `

        });
        document.getElementById("contenedor").innerHTML = peliculas;


        } else if(respuesta.status === 401){
            console.log("Pusiste la llave incorrecta");
        }else if(respuesta.status === 404){
            console.log("La pelicula que buscas no existe");
        }else{
            console.log("Hubo un error y no sabemos que paso");
        }
        
    } catch (error) {
        console.log(error);
    }

    
}

cargarPeliculas();