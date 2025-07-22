const mapa = L.map('map').setView([-22.9, -43.4], 11); // Região do RJ

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Mapa © OpenStreetMap'
}).addTo(mapa);

// === Bairros definidos com coordenadas ===

const areas = {
  "Sulacap": {
    coords: [[
      [-22.89392939877881, -43.39837792837761],
      [-22.914883314839585, -43.396754970445386],
      [-22.911301704004572, -43.36601553368703],
      [-22.88842759437452, -43.37462955578397],
      [-22.891003763547488, -43.38588033110614],
      [-22.89392939877881, -43.39837792837761]
    ]],
    nomes: []
  },
  "Valqueire": {
    coords: [[
      [-22.881441855325562, -43.3726802952018],
      [-22.883352946417077, -43.3726802952018],
      [-22.894570413471364, -43.369846272402235],
      [-22.90437509273403, -43.36735298890703],
      [-22.901745998274478, -43.34742715052988],
      [-22.881441855325562, -43.3502275199435],
      [-22.881441855325562, -43.3726802952018]
    ]],
    nomes: []
  },
  "Taquara": {
    coords: [[
      [-22.91722635393448, -43.39448773885229],
      [-22.93743863503029, -43.39121176949914],
      [-22.938757879421004, -43.36740497276472],
      [-22.91552107253166, -43.36500638970324],
      [-22.91722635393448, -43.39448773885229]
    ]],
    nomes: []
  },
  "Barra": {
    coords: [[
      [-22.86697274252255, -43.48492808082668],
      [-22.884988045253493, -43.48194631369532],
      [-22.889382421956057, -43.4446648832095],
      [-22.86697274252255, -43.4434890773224],
      [-22.86697274252255, -43.48492808082668]
    ]],
    nomes: []
  },
  "Recreio": {
    coords: [[
      [-22.988583054154617, -43.37945375582376],
      [-23.006800885524314, -43.37974997703182],
      [-23.004346921220318, -43.34756021862273],
      [-22.988581726043776, -43.35109699415386],
      [-22.988583054154617, -43.37945375582376]
    ]],
    nomes: []
  },
  "Bangu": {
    coords: [[
      [-23.008973879166902, -43.49377040786172],
      [-23.029084447104836, -43.493170357816325],
      [-23.019580727919575, -43.43499017610378],
      [-23.0040737175448, -43.44236832524919],
      [-23.008973879166902, -43.49377040786172]
    ]],
    nomes: []
  },
  "Deodoro": {
    coords: [[
      [-22.837348045400034, -43.40221940319324],
      [-22.863021065923235, -43.396642646418655],
      [-22.857069640616558, -43.3661189917556],
      [-22.83516980889908, -43.375514880034416],
      [-22.837348045400034, -43.40221940319324]
    ]],
    nomes: []
  },
  "Anchieta": {
    coords: [[
      [-22.813798460604957, -43.413658818786644],
      [-22.837090025099073, -43.41013851833148],
      [-22.831937542086763, -43.376992988021755],
      [-22.81216876018236, -43.382843642905016],
      [-22.813798460604957, -43.413658818786644]
    ]],
    nomes: []
  }
};

// === Renderiza os polígonos no mapa ===

for (const [nomeArea, dados] of Object.entries(areas)) {
  const poligono = L.polygon(dados.coords, {
    color: 'blue',
    fillOpacity: 0.4
  }).addTo(mapa);

  // Mostra o nome ao passar o mouse
  poligono.bindTooltip(nomeArea, { permanent: false, direction: "center" });

  // Clicou na área
  poligono.on('click', () => {
    const nomePessoa = document.getElementById('nome').value.trim();
    if (nomePessoa === "") {
      alert("Digite seu nome antes de clicar.");
      return;
    }
    areas[nomeArea].nomes.push(nomePessoa);
    atualizarResumo();
    alert(`${nomePessoa} registrado em ${nomeArea}`);
    document.getElementById('nome').value = "";
  });
}

// === Atualiza o resumo abaixo do mapa ===

function atualizarResumo() {
  const lista = document.getElementById('resumo');
  lista.innerHTML = "";
  for (const [area, dados] of Object.entries(areas)) {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${area}</strong>: ${dados.nomes.length} pessoa(s) - [${dados.nomes.join(', ')}]`;
    lista.appendChild(item);
  }
}
