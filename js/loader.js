//Pantalla de carga (pato)
function loader() {
  document.querySelector(".loader-container").classList.add("fade-out");
}

function fadeOut() {
  setInterval(loader, 1500);
}

window.onload = fadeOut();