//Obtener elementos
const contenedorProducto = document.getElementById("contenedorProducto");
const modalEditar = document.getElementById("modalEditar");
const editarForm = document.getElementById("editar-form");
const editarNombre = document.getElementById("editar-nombre");
const editarPrecio = document.getElementById("editar-precio");
const editarCantidad = document.getElementById("editar-cantidad");
const editarCategoria = document.getElementById("editar-categoria");

let productosCache = null;
function getProductos() {
    if (!productosCache) {
        console.log("productos cargados desde localStorage");
        productosCache = JSON.parse(localStorage.getItem("productos")) || [];
    }
    return productosCache;
}
let productos = getProductos();
let productoSeleccionado = null; // Variable para almacenar el indice del producto seleccionado

//Renderizamos los productos en el catálogo
function renderProductos() {
    contenedorProducto.innerHTML = "";

    const productosXcategoria = productos.reduce((acc, producto) => {
        if (!acc[producto.categoria]) {
            acc[producto.categoria] = [];
        }
        acc[producto.categoria].push(producto);
        return acc;
    }, {});

    for (const categoria in productosXcategoria) {
        const categoriaHeader = document.createElement("h1");
        categoriaHeader.textContent = categoria;
        contenedorProducto.appendChild(categoriaHeader);

        productosXcategoria[categoria].forEach((producto, index) => {
            const card = document.createElement("div");
            card.classList.add("col-md-4")

            card.innerHTML = `
                <div class="card">
                    <div class="card-body text-center">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Precio: ${producto.precio}</p>
                        <p class="card-text">Cantidad: ${producto.cantidad}</p>
                        <p class="card-text">Categoría: ${producto.categoria}</p>
                        <button class="btn btn-warning btn-editar" data-index="${index}">Editar</button>
                        <button class="btn btn-danger btn-eliminar" data-index="${index}">Eliminar</button>
                    </div>
                </div>
            `;

            // Agregar evento para editar
            card.querySelector(".btn-editar").addEventListener("click", () => {
                productoSeleccionado = index;
                editarNombre.value = producto.nombre;
                editarPrecio.value = producto.precio;
                editarCantidad.value = producto.cantidad;
                editarCategoria.value = producto.categoria;

                // Mostrar el formulario de edición
                const modal = new bootstrap.Modal(modalEditar);
                modal.show();
            })

            // Agregar evento para eliminar
            card.querySelector(".btn-eliminar").addEventListener("click", () => {
                if (confirm(`¿Estás seguro de eliminar el producto "${producto.nombre}"?`)) {
                    getProductos().splice(index, 1);
                    localStorage.setItem("prodcutos", JSON.stringify(getProductos()));
                    renderProductos();
                }
            })

            contenedorProducto.appendChild(card);
        });
    }
}

// Guardar cambios en el producto
editarForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Obtener los valores detro del form ya actualizados
    const nombre = editarNombre.value.trim();
    const precio = editarPrecio.value.trim();
    const cantidad = editarCantidad.value.trim();
    const categoria = editarCategoria.value.trim();

    // Actualizar el producto seleccionado
    getProductos()[productoSeleccionado] = { nombre, precio, cantidad, categoria };
    localStorage.setItem("productos", JSON.stringify(getProductos()));

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(modalEditar);
    modal.hide();
    renderProductos();

    alert("Producto actualizado correctamente");
})

// Inicializar renderizado
renderProductos();