// Questions and Options
const questions = [
    {
      question: "🌞 What's your vibe on a Sunday morning?",
      options: [
        "😴 Sleeping like a queen",
        "🧽 Cleaning till I drop",
        "📺 Binging every single show",
        "🤣 Meme dive till night"
      ]
    },
    {
      question: "🍴 Someone stole your food! What's your reaction?",
      options: [
        "😢 Silently judge and cry",
        "🕵️‍♀️ Hunt the food thief",
        "😐 Pretend I'm not hurt",
        "🧠 Plan perfect food revenge"
      ]
    },
    {
      question: "🎉 What do you do at a party?",
      options: [
        "💃 Dancing without any shame",
        "🥨 Quietly near the snacks",
        "😂 Telling jokes too loud",
        "🤣 Laughing at everything dumb"
      ]
    },
    {
      question: "🦸‍♂️ Which dream superpower would you choose?",
      options: [
        "🔥 Roast people with eyes",
        "🕶️ Disappear without saying bye",
        "🛏️ Teleport into bed",
        "🧼 Clean rooms with thoughts"
      ]
    },
    {
      question: "🕰️ What do you do when the alarm rings?",
      options: [
        "🔁 Snooze till it's illegal",
        "🤖 Wake up like a robot",
        "👀 Stare at ceiling blankly",
        "😴 Sleep again without care"
      ]
    }
  ];
  
  // Result Mapping (simplified and random)
  const results = [
    {
      name: "Fluffy Pillow 🛏️",
      description: "You're comfort, chaos, and coziness all wrapped into one!",
      gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWdwamtxdGxhOTNhNm14enFhanp3N3RoajQyaTFqZHdkZng4bjFpZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JXxXCGysOsclVSxSpe/giphy.gif"
    },
    {
      name: "Microwave Master 🍲",
      description: "Fast, efficient, and a little unpredictable. Classic you!",
      gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2c4N2U1enZyYXppNHdlZjd1c2p3eXJpajR3aTJyazE5cDhpbzMycSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FxaQN9priZFrW/giphy.gif"
    },
    {
      name: "Meme Fridge ❄️",
      description: "Cool outside, wild inside. You're always full of surprises.",
      gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2RicjJrZ3o2a3h4YTU1cHZ5dTI1cXFjZjU2M3R3b3Nic214ZWY1bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/A6aHBCFqlE0Rq/giphy.gif"
    },
    {
      name: "Vacuum Queen 🧹",
      description: "You're all about control and peace... or noise and panic.",
      gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExam9lb3Z2bmF6dHJqc2pxNGltNWNpd29obm1kYWwwcXEwOXV5b3ZpYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iAn1Wh7Fdnh6rKg4Tq/giphy.gif"
    }
  ];
  
  let currentQuestion = 0;
  let answerCounts = [0, 0, 0, 0]; // One counter per result type
  
  // DOM Elements
  const questionText = document.getElementById("question-text");
  const optionButtons = document.querySelectorAll(".option-btn");
  const resultBox = document.getElementById("result-box");
  const resultText = document.getElementById("result-text");
  const nextBtn = document.getElementById("next-btn");
  
  // Load first question
  function loadQuestion() {
    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    q.options.forEach((opt, i) => {
      optionButtons[i].textContent = opt;
      optionButtons[i].disabled = false;
      optionButtons[i].classList.remove("selected");
    });
  }
  
  function selectOption(index) {
    optionButtons.forEach(btn => btn.classList.remove("selected"));
    optionButtons[index].classList.add("selected");
    answerCounts[index] += 1;
    nextBtn.disabled = false;
  }
  
  function nextQuestion() {
    currentQuestion++;
    nextBtn.disabled = true;
  
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    document.getElementById("question-box").style.display = "none";
    nextBtn.style.display = "none";
    resultBox.style.display = "block";
  
    const maxIndex = answerCounts.indexOf(Math.max(...answerCounts));
    const result = results[maxIndex];
  
    resultText.innerHTML = `
      <strong>${result.name}</strong><br>
      <p>${result.description}</p>
      <img src="${result.gif}" alt="Result GIF" style="max-width: 100%; height: auto; margin-top: 10px;">
    `;
  }
  
  function restartQuiz() {
    currentQuestion = 0;
    answerCounts = [0, 0, 0, 0];
    resultBox.style.display = "none";
    document.getElementById("question-box").style.display = "block";
    nextBtn.style.display = "inline-block";
    loadQuestion();
  }
  
  loadQuestion();
  nextBtn.disabled = true;
  