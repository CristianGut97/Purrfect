let productosEnCarrito = localStorage.getItem("productosEnCarrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

//Elementos del DOM
const contenedorCarritoVacio = document.querySelector("#carritoVacio");
const contenedorCarritoProductos = document.querySelector("#carritoProductos");
const contenedorCarritoAcciones = document.querySelector("#carritoAcciones");
const contenedorCarritoComprado = document.querySelector("#carritoComprado");
let botonesEliminar = document.querySelectorAll(".carritoProductoEliminar");
const botonVaciar = document.querySelector("#carritoAccionesVaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carritoAccionesComprar");

function cargarProductosCarrito() {
  if (productosEnCarrito && productosEnCarrito.length > 0) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carritoProducto");
      div.innerHTML = `
              <img class="carritoProductoImagen" src="${producto.Imagen}" />
              <div class="carritoProductoTitulo">
                <small>Titulo</small>
                <h3>${producto.titulo}</h3> 
              </div>
              <div class="carritoProductoCantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
              </div>
              <div class="carritoProdcutoPrecio">
                <small>Precio</small>
                <p>${producto.precio}</p>
              </div>
              <div class="carritoProductoSubtotal">
                <small>Subtotal</small>
                <p>${producto.precio * producto.cantidad}</p>
              </div>
              <button class="carritoProductoEliminar" id="${producto.id}">
                <i class="bi bi-recycle"></i>
              </button>
    `;
      contenedorCarritoProductos.append(div);
    });
  } else {
    //carrito vacio
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
  }
  actualizarBotonesEliminar();
  actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
  botonesEliminar = document.querySelectorAll(".carritoProductoEliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  const idBoton = e.currentTarget.id;
  const producto = productosEnCarrito.find(prod => prod.id === idBoton);

  if (producto && producto.cantidad > 1) {
    producto.cantidad--; 
    console.log("Cantidad reducida en 1");
  } else {

    const index = productosEnCarrito.findIndex(prod => prod.id === idBoton);
    if (index !== -1) {
      productosEnCarrito.splice(index, 1);
    }
  }

  
  localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
  cargarProductosCarrito();
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
  productosEnCarrito.length = 0;
  localStorage.setItem(
    "productosEnCarrito",
    JSON.stringify(productosEnCarrito)
  );
  cargarProductosCarrito();
}

function actualizarTotal() {
  const totalCalculado = productosEnCarrito.reduce(
    (acumularor, producto) => acumularor + producto.precio * producto.cantidad,
    0
  );
  total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
  productosEnCarrito.length = 0;
  localStorage.setItem(
    "productosEnCarrito",
    JSON.stringify(productosEnCarrito)
  );

  contenedorCarritoVacio.classList.add("disabled");
  contenedorCarritoProductos.classList.add("disabled");
  contenedorCarritoAcciones.classList.add("disabled");
  contenedorCarritoComprado.classList.remove("disabled");
}
