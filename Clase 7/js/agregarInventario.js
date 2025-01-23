// Obtener elementos
const productForm = document.getElementById("product-form");

// Evento al enviar el formulario
productForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Obtener valores del formulario
    const nombre = document.getElementById("product-name").value.trim();
    const precio = document.getElementById("product-price").value.trim();
    const categoria = document.getElementById("product-category").value.trim();

    // Obtener productos almacenados en localStorage
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    // Verificar si el producto ya existe
    const existe = productos.some((p) => p.nombre.toLowerCase() === nombre.toLowerCase());
    if (existe) {
        alert("El producto ya existe en el inventario.");
        return;
    }

    // Crear producto
    const producto = { nombre, precio, categoria };

    // Agregar producto al almacenamiento
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));

    // Mostrar alerta de éxito
    alert("Producto agregado correctamente.");

    // Limpiar formulario
    productForm.reset();
});
