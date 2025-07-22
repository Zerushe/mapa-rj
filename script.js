// CONFIGURAÇÃO DO FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyA9xgwD8SnOFyYsZzrBVtznLG0snBuq-z0",
    authDomain: "mapa-rj-cepaint.firebaseapp.com",
    databaseURL: "https://mapa-rj-cepaint-default-rtdb.firebaseio.com",
    projectId: "mapa-rj-cepaint",
    storageBucket: "mapa-rj-cepaint.firebasestorage.app",
    messagingSenderId: "425577312736",
    appId: "1:425577312736:web:17295efe9f25af77ce7b85",
    measurementId: "G-7KH68VF781"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  
  // MAPA
  const mapa = L.map('map').setView([-22.9, -43.4], 11);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Mapa © OpenStreetMap'
  }).addTo(mapa);
  
  // ÁREAS
  const areas = {
    "Sulacap": { coords: [[[-22.8939, -43.3983], [-22.9148, -43.3967], [-22.9113, -43.3660], [-22.8884, -43.3746], [-22.8910, -43.3858], [-22.8939, -43.3983]]]},
    "Valqueire": { coords: [[[-22.8814, -43.3726], [-22.8833, -43.3726], [-22.8945, -43.3698], [-22.9043, -43.3673], [-22.9017, -43.3474], [-22.8814, -43.3502], [-22.8814, -43.3726]]]},
    "Taquara": { coords: [[[-22.9172, -43.3944], [-22.9374, -43.3912], [-22.9387, -43.3674], [-22.9155, -43.3650], [-22.9172, -43.3944]]]},
    "Barra": { coords: [[[-22.8669, -43.4849], [-22.8849, -43.4819], [-22.8893, -43.4446], [-22.8669, -43.4434], [-22.8669, -43.4849]]]},
    "Recreio": { coords: [[[-22.9885, -43.3794], [-23.0068, -43.3797], [-23.0043, -43.3475], [-22.9885, -43.3510], [-22.9885, -43.3794]]]},
    "Bangu": { coords: [[[-23.0089, -43.4937], [-23.0290, -43.4931], [-23.0195, -43.4349], [-23.0040, -43.4423], [-23.0089, -43.4937]]]},
    "Deodoro": { coords: [[[-22.8373, -43.4022], [-22.8630, -43.3966], [-22.8570, -43.3661], [-22.8351, -43.3755], [-22.8373, -43.4022]]]},
    "Anchieta": { coords: [[[-22.8137, -43.4136], [-22.8370, -43.4101], [-22.8319, -43.3769], [-22.8121, -43.3828], [-22.8137, -43.4136]]]},
    "Galeão": { coords: [[[-22.8113, -43.2627], [-22.8306, -43.2441], [-22.8180, -43.2211], [-22.7981, -43.2072], [-22.7903, -43.2347], [-22.8113, -43.2627]]]},
    "Campo Grande": { coords: [[[-22.8935, -43.5812], [-22.9176, -43.5766], [-22.9115, -43.5395], [-22.8900, -43.5421], [-22.8935, -43.5812]]]}
  };
  
  // RENDERIZAR ÁREAS E HABILITAR CLIQUE
  for (const [nomeArea, dados] of Object.entries(areas)) {
    const poligono = L.polygon(dados.coords, {
      color: 'blue',
      fillOpacity: 0.4
    }).addTo(mapa);
  
    poligono.bindTooltip(nomeArea, { permanent: false, direction: "center" });
  
    poligono.on('click', () => {
      const nome = document.getElementById('nome').value.trim();
      if (nome === "") {
        alert("Digite seu nome antes de clicar.");
        return;
      }
  
      const referencia = db.ref(`votos/${nomeArea}`);
      referencia.push(nome); // Salva no Firebase
  
      document.getElementById('nome').value = "";
      alert(`${nome} registrado em ${nomeArea}`);
    });
  }
  
  // ATUALIZA O RESUMO AO VIVO
  function atualizarResumo() {
    const lista = document.getElementById('resumo');
    lista.innerHTML = "";
  
    db.ref('votos').on('value', (snapshot) => {
      const dados = snapshot.val() || {};
      lista.innerHTML = "";
  
      for (const [area, nomes] of Object.entries(dados)) {
        const nomesArray = Object.values(nomes);
        const item = document.createElement('li');
        item.innerHTML = `<strong>${area}</strong>: ${nomesArray.length} pessoa(s) - [${nomesArray.join(', ')}]`;
        lista.appendChild(item);
      }
    });
  }
  
  atualizarResumo();
