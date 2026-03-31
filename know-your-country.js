const countries = [
    {
      name: "India",
      flag: "https://flagcdn.com/w320/in.png",
      fact: "🛁 India has a spa just for elephants!"
    },
    {
      name: "Japan",
      flag: "https://flagcdn.com/w320/jp.png",
      fact: "🍣 Japan has cafés run entirely by robots!"
    },
    {
      name: "Brazil",
      flag: "https://flagcdn.com/w320/br.png",
      fact: "🚴 Inmates can reduce sentences by biking!"
    },
    {
      name: "Australia",
      flag: "https://flagcdn.com/w320/au.png",
      fact: "🦘 Kangaroos outnumber people by millions!"
    },
    {
      name: "Canada",
      flag: "https://flagcdn.com/w320/ca.png",
      fact: "❄️ Canada has a polar bear jail!"
    },
    {
      name: "South Korea",
      flag: "https://flagcdn.com/w320/kr.png",
      fact: "📱 There's a TV channel for dogs!"
    },
    {
      name: "Italy",
      flag: "https://flagcdn.com/w320/it.png",
      fact: "🍕 Pizza was invented in Naples in 1889!"
    },
    {
      name: "Egypt",
      flag: "https://flagcdn.com/w320/eg.png",
      fact: "🏺 Egyptians used moldy bread to heal wounds!"
    },
    {
      name: "Iceland",
      flag: "https://flagcdn.com/w320/is.png",
      fact: "🔥 Iceland has no mosquitoes at all!"
    },
    {
      name: "Thailand",
      flag: "https://flagcdn.com/w320/th.png",
      fact: "🐘 Elephants are considered sacred here!"
    },
    {
      name: "Netherlands",
      flag: "https://flagcdn.com/w320/nl.png",
      fact: "🚲 There are more bikes than people!"
    },
    {
      name: "Mexico",
      flag: "https://flagcdn.com/w320/mx.png",
      fact: "💀 Mexico celebrates Day of the Dead!"
    },
    {
      name: "Norway",
      flag: "https://flagcdn.com/w320/no.png",
      fact: "🎁 Norway gives a Christmas tree to the UK every year!"
    },
    {
      name: "New Zealand",
      flag: "https://flagcdn.com/w320/nz.png",
      fact: "🐑 Sheep outnumber people 5 to 1!"
    },
    {
        name: "Norway",
        flag: "https://flagcdn.com/w320/no.png",
        fact: "In Norway, it's illegal to spay or neuter your dog without a specific reason!"
      }

  ];
  
  const cardContainer = document.getElementById('card-container');
  
  countries.forEach(country => {
    const card = document.createElement('div');
    card.className = 'card';
  
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="${country.flag}" alt="${country.name} Flag">
          <h3>${country.name}</h3>
        </div>
        <div class="card-back">
          <p>${country.fact}</p>
        </div>
      </div>
    `;
  
    cardContainer.appendChild(card);
  });
  

 