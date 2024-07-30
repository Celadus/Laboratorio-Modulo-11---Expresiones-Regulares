import { urlImagenes } from "./extraer.helper";

const areaTexto = document.getElementById("textarea");
const ExtraerTexto = document.getElementById("boton");
const contenedorResultado = document.getElementById("resultado");
const contenedorImagenes = document.getElementById("resultadoImagenes");

export function extraerDatos() {
  if (ExtraerTexto && ExtraerTexto instanceof HTMLButtonElement) {
    ExtraerTexto.addEventListener("click", () => {
      if (areaTexto && areaTexto instanceof HTMLTextAreaElement) {
        const textoHtml = areaTexto.value;
        const resultado = urlImagenes(textoHtml);
        pintarResultado(resultado);
        pintarImagenes(resultado);
      }
    });
  }
}

const pintarResultado = (texto: string[]) => {
  if (contenedorResultado && contenedorResultado instanceof HTMLElement) {
    // Limpiar el resultado para no repetir al darle al boton
    contenedorResultado.innerHTML = "";
    texto.forEach((url: string) => {
      const pUrl = document.createElement("p");
      pUrl.classList.add("url");
      pUrl.innerHTML = url;

      contenedorResultado?.appendChild(pUrl);
    });
  }
};

const pintarImagenes = (urls: string[]) => {
  if (contenedorImagenes && contenedorImagenes instanceof HTMLElement) {
    // Limpiar el resultado para no repetir al darle al boton
    contenedorImagenes.innerHTML = "";
    urls.forEach((url: string) => {
      const img = document.createElement("img");
      img.src = url;
      img.alt = "Imagen cargada";
      img.style.height = "auto";

      contenedorImagenes?.appendChild(img);
    });
  }
};
