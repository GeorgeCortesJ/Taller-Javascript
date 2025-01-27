//Obtener elementos
const contenedorProducto = document.getElementById("contenedorProducto");

let productosCache = null;
function getProductos() {
    if (!productosCache) {
        console.log("productos cargados desde localStorage");
        productosCache = JSON.parse(localStorage.getItem("productos")) || [];
    }
    return productosCache;
}
let productos = getProductos();

//Renderizamos los productos en el catálogo
function renderProductos() {
    contenedorProducto.innerHTML = "";

    productos.forEach((productos, index) => {
        const card = document.createElement("div");
        card.classList.add("col-md-4")

        card.innerHTML = `
        <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${productos.nombre}</h5>
                    <p class="card-text">Precio:${productos.precio}</p>
                    <p class="card-text">Categoría:${productos.categoria}</p>
                </div>
            </div>
        `;
    });

    contenedorProducto.appendChild(card);
}

// Inicializar renderizado
renderProductos();