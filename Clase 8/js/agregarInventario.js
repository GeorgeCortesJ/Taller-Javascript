const formProducto = document.getElementById("formProducto");

//Evento que guarda los productos
formProducto.addEventListener("submit", (event) => {
    event.preventDefault();

    //Obtener los valores detro del form
    const nombre = document.getElementById("nombreProducto").value.trim();
    const precio = document.getElementById("precioProducto").value.trim();
    const categoria = document.getElementById("categoriaProducto").value.trim();

    //Obtener los productos almacenados en el local Storage
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    // Verificar si el producto existe
    const existe = productos.some((p) => p.nombre.toLowerCase() === nombre.toLowerCase());
    if (existe) {
        alert("El producto ya existe en el catálogo!")
        return;
    }

    // Objeto Producto
    const producto = { nombre, precio, categoria }

    //Agregamos el objeto al almacenamiento
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));

    //Alerta de que todo salió bien
    alert("El producto se ha agregado de manera exitosa!");

    //Limpiar el form
    formProducto.reset();

    console.log(localStorage.getItem("productos"));
});