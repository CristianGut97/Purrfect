const productos = [
  {
    id: "01",
    titulo: "Rascador de carton corrugado",
    Imagen: "./PurrfectShop/Item1-Rascador.png",
    categoria: {
      nombre: "Juguetes",
      id: "Juguetes",
    },
    precio: 12000,
  },
  {
    id: "02",
    titulo: "Juguete interactivo con plumas",
    Imagen: "./PurrfectShop/jugueteplumas.jpg",
    categoria: {
      nombre: "Juguetes",
      id: "Juguetes",
    },
    precio: 17000,
  },
  {
    id: "03",
    titulo: "Fuente de agua automatica",
    Imagen: "./PurrfectShop/fuete item 3.webp",
    categoria: {
      nombre: "Varios",
      id: "Varios",
    },
    precio: 28000,
  },
  {
    id: "04",
    titulo: "Cama cueva",
    Imagen: "./PurrfectShop/camacueva.jpg",
    categoria: {
      nombre: "Varios",
      id: "Varios",
    },
    precio: 24000,
  },
  {
    id: "05",
    titulo: "Arenero cerrado con filtro",
    Imagen: "./PurrfectShop/arenero2.webp",
    categoria: {
      nombre: "Varios",
      id: "Varios",
    },
    precio: 39000,
  },
  {
    id: "06",
    titulo: "Torre de juegos",
    Imagen: "./PurrfectShop/torre_gato6.jpg",
    categoria: {
      nombre: "Juguetes",
      id: "Juguetes",
    },
    precio: 198000,
  },
  {
    id: "07",
    titulo: "Transportadora plegable",
    Imagen: "./PurrfectShop/portaPlegable.jpg",
    categoria: {
      nombre: "Varios",
      id: "Varios",
    },
    precio: 34000,
  },
  {
    id: "08",
    titulo: "Dispositivo laser automatico",
    Imagen: "./PurrfectShop/laser item 8.jpg",
    categoria: {
      nombre: "Juguetes",
      id: "Juguetes",
    },
    precio: 21000,
  },
  {
    id: "09",
    titulo: "Collar antipulgas natural",
    Imagen: "./PurrfectShop/collar9.webp",
    categoria: {
      nombre: "Varios",
      id: "Varios",
    },
    precio: 11000,
  },
];

//Elementos del DOM
const contenedorProductos = document.querySelector("#contenedorProductos");
const BotonesCategorias = document.querySelectorAll(".botonCategoria");
const tituloPrincipal = document.querySelector("#tituloPrincipal");
let botonesAgregar = document.querySelectorAll(".productoAgregar");
const numeroCarrito = document.querySelector("#numeroCarrito");
const gatoMilu = document.querySelector("#gatoMilu");
const gatoCoco = document.querySelector("#gatoCoco");
const gatoMia = document.querySelector("#gatoMia");
const gatoSora = document.querySelector("#gatoSora");


function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";

  productosElegidos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img
              class="productoImagen"
              src="${producto.Imagen}" alt="${producto.titulo}">
            <div class="productoDetalles">
              <h3 class="productoTitulo">${producto.titulo}</h3>
              <p class="productoPrecio">${producto.precio}</p>
              <button class="productoAgregar" id= "${producto.id}">agregar</button>
            </div>
        `;

    contenedorProductos.append(div);
  });

  actualizarBotonesAgregar();
}

cargarProductos(productos);

BotonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    BotonesCategorias.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "Todos") {
      const productoCategoria = productos.find(
        (producto) => producto.categoria.id === e.currentTarget.id
      );

      tituloPrincipal.innerText = productoCategoria.categoria.id;
      const productosBoton = productos.filter(
        (producto) => producto.categoria.id === e.currentTarget.id
      );

      cargarProductos(productosBoton);
    } else {
      tituloPrincipal.innerText = "Todos los productos";
      cargarProductos(productos);
    }
  });
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".productoAgregar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}
let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productosEnCarrito");

if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumeroCarrito();
} else {
  productosEnCarrito = [];
}

function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(
    (producto) => producto.id === idBoton
  );

  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === idBoton
    );
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }
  actualizarNumeroCarrito();

  localStorage.setItem(
    "productosEnCarrito",
    JSON.stringify(productosEnCarrito)
  );
}

function actualizarNumeroCarrito() {
  let nuevoNumeroCarrito = productosEnCarrito.reduce(
    (acumulador, producto) => acumulador + producto.cantidad,
    0
  );
  numeroCarrito.innerText = nuevoNumeroCarrito;
}

gatoMilu.addEventListener("click", () => {
  alert("Milu (Ragdoll): Los gatos Ragdoll son conocidos por su carácter relajado y dócil. Se despatan cuando los levantas, es decir, se dejan caer como un muñeco de trapo, lo que les da su nombre de ragdoll (muñeca de trapo).");
});

gatoCoco.addEventListener("click", () => {
  alert("Coco (Maine Coon): Los Maine Coons son una de las razas más grandes de gatos domésticos, y sus orejas están decoradas con mechones de pelo, lo que les da una apariencia aún más imponente. Son muy sociables y pueden aprender trucos como los perros.");
});

gatoMia.addEventListener("click", () => {
  alert("Mia (Siamés): Los gatos Siameses son muy vocales y a menudo se comunican con sus dueños mediante un maullido característico y fuerte. Son conocidos por su lealtad y suelen seguir a sus humanos por toda la casa.");
});

gatoSora.addEventListener("click", () => {
  alert("Sora (Siberiano): El gato Siberiano es famoso por su pelo largo y denso, adaptado a climas fríos. Además, tienen una habilidad única para saltar grandes distancias, gracias a sus poderosas patas traseras.");
});

