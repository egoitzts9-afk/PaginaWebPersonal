// Elementos del menú móvil
const botonMenu = document.querySelector(".boton-menu");
const navegacion = document.querySelector(".navegacion");
const enlacesNavegacion = document.querySelectorAll(
  ".navegacion a"
);

// Cierra el menú móvil
function cerrarMenu() {
  botonMenu.setAttribute("aria-expanded", "false");
  navegacion.classList.remove("abierta");
  document.body.classList.remove("menu-abierto");
}

// Abre o cierra el menú al pulsar el botón
botonMenu.addEventListener("click", function () {
  const menuEstaAbierto =
    botonMenu.getAttribute("aria-expanded") === "true";

  botonMenu.setAttribute(
    "aria-expanded",
    String(!menuEstaAbierto)
  );

  navegacion.classList.toggle(
    "abierta",
    !menuEstaAbierto
  );

  document.body.classList.toggle(
    "menu-abierto",
    !menuEstaAbierto
  );
});

// Cierra el menú cuando se pulsa un enlace
enlacesNavegacion.forEach(function (enlace) {
  enlace.addEventListener("click", cerrarMenu);
});

// Cierra el menú al pulsar la tecla Escape
document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape") {
    cerrarMenu();
  }
});

// Cierra el menú si la pantalla pasa a ser grande
window.addEventListener("resize", function () {
  if (window.innerWidth >= 768) {
    cerrarMenu();
  }
});

// Año automático del pie de página
const elementoAnio = document.getElementById("anio");

elementoAnio.textContent = new Date().getFullYear();

// Marca el enlace correspondiente a la sección visible
const secciones = document.querySelectorAll(
  "main section[id]"
);

const enlacesSecciones = document.querySelectorAll(
  '.navegacion__enlace[href^="#"]'
);

const observador = new IntersectionObserver(
  function (entradas) {
    const seccionVisible = entradas
      .filter(function (entrada) {
        return entrada.isIntersecting;
      })
      .sort(function (entradaA, entradaB) {
        return (
          entradaB.intersectionRatio -
          entradaA.intersectionRatio
        );
      })[0];

    if (!seccionVisible) {
      return;
    }

    enlacesSecciones.forEach(function (enlace) {
      const destino = enlace.getAttribute("href");
      const seccionActual =
        "#" + seccionVisible.target.id;

      enlace.classList.toggle(
        "activo",
        destino === seccionActual
      );
    });
  },
  {
    rootMargin: "-30% 0px -60%",
    threshold: [0, 0.1, 0.5]
  }
);

secciones.forEach(function (seccion) {
  observador.observe(seccion);
});
