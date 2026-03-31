const snippets = [
    { country: "India", flag: "https://flagcdn.com/w320/in.png", language: "Hindi", audio: "AUDIO/indd.mp3" },
    { country: "Japan", flag: "https://flagcdn.com/w320/jp.png", language: "Japanese", audio: "AUDIO/JAP.mp3" },
    { country: "Brazil", flag: "https://flagcdn.com/w320/br.png", language: "Portuguese", audio: "AUDIO/BR.mp3" },
    { country: "Australia", flag: "https://flagcdn.com/w320/au.png", language: "English", audio: "AUDIO/AUS.mp3" },
    { country: "Canada", flag: "https://flagcdn.com/w320/ca.png", language: "English & French", audio: "AUDIO/CAN.mp3" },
    { country: "South Korea", flag: "https://flagcdn.com/w320/kr.png", language: "Korean", audio: "AUDIO/SK.mp3" },
    { country: "Italy", flag: "https://flagcdn.com/w320/it.png", language: "Italian", audio: "AUDIO/ITALY.mp3" },
    { country: "Egypt", flag: "https://flagcdn.com/w320/eg.png", language: "Arabic", audio: "AUDIO/EGY.mp3" },
    { country: "Iceland", flag: "https://flagcdn.com/w320/is.png", language: "Icelandic", audio: "AUDIO/ICELAND.mp3" },
    { country: "Thailand", flag: "https://flagcdn.com/w320/th.png", language: "Thai", audio: "AUDIO/TH.mp3" },
    { country: "Netherlands", flag: "https://flagcdn.com/w320/nl.png", language: "Dutch", audio: "AUDIO/NETH.mp3" },
    { country: "Mexico", flag: "https://flagcdn.com/w320/mx.png", language: "Spanish", audio: "AUDIO/MEX.mp3" },
    { country: "Norway", flag: "https://flagcdn.com/w320/no.png", language: "Norwegian", audio: "AUDIO/NOR.mp3" },
    { country: "New Zealand", flag: "https://flagcdn.com/w320/nz.png", language: "English & Māori", audio: "AUDIO/NEWZ.mp3" }
  ];
  
  const snippetCardContainer = document.getElementById('snippet-card-container');
  
  snippets.forEach(snippet => {
    const card = document.createElement('div');
    card.className = 'card';
  
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="${snippet.flag}" alt="${snippet.country} Flag">
          <h3>${snippet.country}</h3>
        </div>
        <div class="card-back">
          <p>${snippet.language}</p>
          <button class="audio-btn">🔊 Play Audio</button>
          <audio src="${snippet.audio}"></audio>
        </div>
      </div>
    `;
  
    const audioElement = card.querySelector('audio');
    const playButton = card.querySelector('.audio-btn');
  
    playButton.addEventListener('click', () => {
      audioElement.currentTime = 0; // restart from beginning
      audioElement.play();
    });
  
    snippetCardContainer.appendChild(card);
  });
  