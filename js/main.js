const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnEnsaladas = document.querySelector('.ensaladas');
const btnPastas = document.querySelector('.pasta');
const btnPizza = document.querySelector('.pizza');
const btnPostres = document.querySelector('.postres');
const contenedorPlatillos = document.querySelector('.platillos');

document.addEventListener('DOMContentLoaded', ()=>{
    eventos();
    platillos();
});

const eventos = ()=>{
    menu.addEventListener('click', abrirMenu);
};

const abrirMenu = ()=>{
    navegacion.classList.remove('ocultar');
    botonCerrar();
};

const botonCerrar = ()=>{
    const equisCerrar = document.createElement('p');
    const capaTrasparente = document.createElement('div');
    capaTrasparente.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0)return;
    body.appendChild(capaTrasparente);  
    equisCerrar.textContent = 'X';
    equisCerrar.classList.add('btnCerrar');
    while(navegacion.children[4]){
        navegacion.removeChild(navegacion.children[4]);
    }
    navegacion.appendChild(equisCerrar);
    cerrarMenu(equisCerrar, capaTrasparente);
}

const cerrarMenu = (boton, capaTrasparente)=>{
    boton.addEventListener('click', ()=>{
        navegacion.classList.add('ocultar');
        capaTrasparente.remove(); 
    });
    capaTrasparente.onclick = function(){
        capaTrasparente.remove();
        navegacion.classList.add('ocultar');
    }
}

const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            observer.unobserve(imagen);
        }
    });
});

imagenes.forEach(imagen =>{
    imagen.src = imagen.dataset.src;
    observer.observe(imagen)
});

//filtro para buscar

const platillos = ()=>{
    let platillosArreglo = [];
    const platillos = document.querySelectorAll('.platillo');

    platillos.forEach(platillo => platillosArreglo = [...platillosArreglo, platillo]);

    const ensaladas = platillosArreglo.filter(ensalada => ensalada.getAttribute('data-platillo') === 'ensalada');
    const pastas = platillosArreglo.filter(pasta => pasta.getAttribute('data-platillo') === 'pasta');
    const pizzas = platillosArreglo.filter(pizza => pizza.getAttribute('data-platillo') === 'pizza');
    const postres = platillosArreglo.filter(postre => postre.getAttribute('data-platillo') === 'postres');

    mostrarPlatillos(ensaladas, pastas, pizzas, postres, platillosArreglo);
}

const mostrarPlatillos = (ensaladas, pastas, pizzas, postres, todos)=>{
    btnEnsaladas.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        ensaladas.forEach(ensalada => contenedorPlatillos.appendChild(ensalada));
    });
    btnPastas.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        pastas.forEach(pasta => contenedorPlatillos.appendChild(pasta));
    });
    btnPizza.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        pizzas.forEach(pizza => contenedorPlatillos.appendChild(pizza));
    });
    btnPostres.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        postres.forEach(postre => contenedorPlatillos.appendChild(postre));
    });
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorPlatillos);
        todos.forEach(todo => contenedorPlatillos.appendChild(todo));
    });

}

const limpiarHtml = (contenedor) =>{
    while (contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }

}








