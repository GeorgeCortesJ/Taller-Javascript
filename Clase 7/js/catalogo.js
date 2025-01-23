// Obtener elementos
const productList = document.getElementById("product-list");
const editModalElement = document.getElementById("editModal");
const editForm = document.getElementById("edit-form");
const editName = document.getElementById("edit-name");
const editPrice = document.getElementById("edit-price");
const editCategory = document.getElementById("edit-category");


let productosCache = null;
function getProductos() {
    if (!productosCache) {
        console.log("Productos cargados desde localStorage");
        productosCache = JSON.parse(localStorage.getItem("productos")) || [];
    }
    return productosCache;
}
let productos = getProductos();
let productoSeleccionado = null; // Para identificar el producto a editar

// Renderizar productos en el catálogo
function renderProductos() {
    productList.innerHTML = "";

    productos.forEach((producto, index) => {
        const card = document.createElement("div");
        card.classList.add("col-md-4");

        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <p class="card-text">Categoría: ${producto.categoria}</p>
                    <button class="btn btn-warning btn-edit" data-index="${index}">Editar</button>
                    <button class="btn btn-danger btn-delete" data-index="${index}">Eliminar</button>
                </div>
            </div>
        `;

        // Botón Editar
        card.querySelector(".btn-edit").addEventListener("click", () => {
            productoSeleccionado = index;
            editName.value = producto.nombre;
            editPrice.value = producto.precio;
            editCategory.value = producto.categoria;

            // Mostrar modal
            const editModal = new bootstrap.Modal(editModalElement);
            editModal.show();
        });

        // Botón Eliminar
        card.querySelector(".btn-delete").addEventListener("click", () => {
            if (confirm(`¿Estás seguro de eliminar el producto "${producto.nombre}"?`)) {
                getProductos().splice(index, 1);
                localStorage.setItem("productos", JSON.stringify(getProductos()));
                renderProductos();
            }
        });

        productList.appendChild(card);
    });
}

// Guardar cambios al editar un producto
editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Actualizar el producto
    const nombre = editName.value.trim();
    const precio = editPrice.value.trim();
    const categoria = editCategory.value.trim();

    getProductos()[productoSeleccionado] = { nombre, precio, categoria };
    localStorage.setItem("productos", JSON.stringify(getProductos()));

    // Ocultar modal y recargar la lista de productos
    const editModal = bootstrap.Modal.getInstance(editModalElement);
    editModal.hide();
    renderProductos();

    alert("Producto actualizado correctamente.");
});

// Inicializar renderizado
renderProductos();
