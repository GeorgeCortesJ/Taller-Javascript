const formProducto = document.getElementById("formProducto");

//Evento que guarda los productos
formProducto.addEventListener("submit", (event) => {
    event.preventDefault();

    //Obtener los valores detro del form
    const nombre = document.getElementById("nombreProducto").value.trim();
    const precio = document.getElementById("precioProducto").value.trim();
    const cantidad = document.getElementById("cantidadProducto").value.trim();

    //Obtener la categoría del producto no la posicion
    const categoriaSeleccionada = document.getElementById("categoriaProducto");
    const categoria = categoriaSeleccionada.options[categoriaSeleccionada.selectedIndex].text.trim();

    //Validar que los campos no estén vacíos
    if (!nombre || !precio || !cantidad || !categoria) {
        alert("Todos los campos son obligatorios!");
        return;
    }

    //Obtener los productos almacenados en el local Storage
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    // Verificar si el producto existe
    const existe = productos.some((p) => p.nombre.toLowerCase() === nombre.toLowerCase());
    if (existe) {
        alert("El producto ya existe en el catálogo!")
        return;
    }

    // Objeto Producto
    const producto = { nombre, precio, cantidad, categoria }

    //Agregamos el objeto al almacenamiento
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));

    //Alerta de que todo salió bien
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto agregado correctamente',
        timer: 1500
    });

    //Limpiar el form
    formProducto.reset();

    console.log(localStorage.getItem("productos"));
});