window.onload = function () {
  const mapa = document.getElementById("mapa");
  const latitudeInput = document.getElementById("latitude");
  const longitudeInput = document.getElementById("longitude");

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      latitudeInput.value = latitude;
      longitudeInput.value = longitude;
      mapa.innerHTML = `<iframe
        width="100%" height="200"
        src="https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed"
        frameborder="0"></iframe>`;
    }, () => {
      mapa.innerText = "Não foi possível obter sua localização.";
    });
  }

  const historico = JSON.parse(localStorage.getItem("denuncias")) || [];
  const ul = document.getElementById("historico");

  function atualizarHistorico() {
    ul.innerHTML = "";
    historico.forEach((denuncia, index) => {
      ul.innerHTML += `<li><strong>Local:</strong> (${denuncia.lat.toFixed(4)}, ${denuncia.lng.toFixed(4)})<br>
      <strong>Descrição:</strong> ${denuncia.desc}</li>`;
    });
  }

  atualizarHistorico();

  document.getElementById("denunciaForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const desc = document.getElementById("descricao").value || "(sem descrição)";
    const lat = parseFloat(latitudeInput.value);
    const lng = parseFloat(longitudeInput.value);

    historico.push({ desc, lat, lng });
    localStorage.setItem("denuncias", JSON.stringify(historico));
    atualizarHistorico();

    alert("Denúncia registrada com sucesso!");
    this.reset();
  });
};