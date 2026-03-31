// fast-type.js — Works with your provided HTML (IDs match exactly)
// Drop this file at: ftc/fast-type.js (to match your <script src="ftc/fast-type.js"></script>)

// ===========================
// Elements (IDs from your HTML)
// ===========================
const elStart = document.getElementById('btn-start');
const elPause = document.getElementById('btn-pause');
const elReset = document.getElementById('btn-reset');
const elNextRound = document.getElementById('btn-next-round');

const elRoundSeconds = document.getElementById('round-seconds');
const elTargetWords = document.getElementById('target-words');
const elWordPack = document.getElementById('word-pack');
const elCustomWords = document.getElementById('custom-words');

const elTimeRemaining = document.getElementById('time-remaining');
const elWpm = document.getElementById('wpm');
const elAccuracy = document.getElementById('accuracy');
const elStreak = document.getElementById('streak');
const elScore = document.getElementById('score');
const elProgress = document.getElementById('progress');

const elPromptText = document.getElementById('prompt-text');
const elInput = document.getElementById('typing-input');
const elFeedback = document.getElementById('feedback');

const elResultDialog = document.getElementById('result-dialog');
const elFinalScore = document.getElementById('final-score');
const elFinalWpm = document.getElementById('final-wpm');
const elFinalAccuracy = document.getElementById('final-accuracy');
const elFinalStreak = document.getElementById('final-streak');
const elResultRank = document.getElementById('result-rank');
const elResultImage = document.getElementById('result-image');
const elResultCaption = document.getElementById('result-caption');

const elHistoryBody = document.getElementById('history-body');
const tplHistoryRow = document.getElementById('tpl-history-row');

// ===========================
// Game state
// ===========================
const state = {
  running: false,
  mode: 'classic', // classic | time-attack | sudden-death
  difficulty: 'easy',
  duration: 60, // seconds (classic)
  targetWords: 50, // (time-attack)
  timeRemaining: 60,
  timerId: null,
  startedAt: null, // Date.now()
  secondsElapsed: 0,

  currentPrompt: '',
  totalTyped: 0,
  totalCorrect: 0,
  streak: 0,
  longestStreak: 0,
  score: 0,
  roundNumber: 0,
};

// ===========================
// Word packs (simple built-ins)
// ===========================
const WORDS = {
  common: ['the','quick','brown','fox','jumps','over','the','lazy','dog','light','code','green','river','book','cloud','tree','music','fast','slow','happy','spark','bright','focus','type','speed'],
  numbers: Array.from({length: 50}, (_,i)=> String(i+1)),
  code: ['function','const','let','var','return','while','for','class','object','array','string','number','boolean','null','undefined','import','export','async','await','promise','lambda','stack','queue','graph','binary','search','sort'],
  quotes: ['stay hungry','carpe diem','less is more','keep moving','never give up','dream big'], // short phrases allowed
};

// ===========================
// Helpers
// ===========================
function qs(name) { return document.querySelector(name); }
function getSelected(name) { return qs(`input[name="${name}"]:checked`).value; }
function nowSec() { return Math.floor((Date.now() - state.startedAt) / 1000); }

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

function difficultyMultiplier() {
  switch (state.difficulty) {
    case 'hard': return 1.6;
    case 'normal': return 1.3;
    default: return 1.0; // easy
  }
}

function getWordList() {
  const pack = elWordPack.value;
  if (pack === 'custom') {
    const raw = elCustomWords.value || '';
    const list = raw
      .split(/[\n,]+/)
      .map(s => s.trim())
      .filter(Boolean);
    return list.length ? list : WORDS.common;
  }
  return WORDS[pack] || WORDS.common;
}

function pickPrompt() {
  const list = getWordList();
  state.currentPrompt = list[Math.floor(Math.random() * list.length)];
  elPromptText.textContent = state.currentPrompt;
}

function updateHUD() {
  // Time
  elTimeRemaining.textContent = clamp(state.timeRemaining, 0, 9999);

  // Accuracy
  const acc = state.totalTyped ? Math.round((state.totalCorrect / state.totalTyped) * 100) : 100;
  elAccuracy.textContent = acc + '%';

  // WPM (words per minute) — based on elapsed time
  const elapsed = Math.max(1, state.secondsElapsed || 1);
  const wpm = Math.round((state.totalCorrect / (elapsed / 60)));
  elWpm.textContent = wpm;

  // Streak & Score
  elStreak.textContent = state.streak;
  elScore.textContent = state.score;

  // Progress bar (classic: time; time-attack: words progress)
  let pct = 0;
  if (state.mode === 'time-attack') {
    pct = state.targetWords ? (state.totalCorrect / state.targetWords) * 100 : 0;
  } else {
    pct = (state.timeRemaining / state.duration) * 100;
  }
  pct = clamp(pct, 0, 100);
  elProgress.style.width = pct + '%';
  elProgress.setAttribute('aria-valuenow', String(Math.round(pct)));
}

function setControls(running) {
  elStart.disabled = running;
  elPause.disabled = !running;
  elReset.disabled = running;
  elNextRound.disabled = running;
  elInput.disabled = !running;
}

function resetRound(keepRoundNumber = false) {
  clearInterval(state.timerId);
  state.mode = getSelected('mode');
  state.difficulty = getSelected('difficulty');
  state.duration = parseInt(elRoundSeconds.value, 10) || 60;
  state.targetWords = parseInt(elTargetWords.value, 10) || 50;

  state.timeRemaining = state.duration;
  state.timerId = null;
  state.startedAt = null;
  state.secondsElapsed = 0;

  state.totalTyped = 0;
  state.totalCorrect = 0;
  state.streak = 0;
  state.longestStreak = 0;
  state.score = 0;

  if (!keepRoundNumber) state.roundNumber = 0;

  elInput.value = '';
  elFeedback.textContent = '';
  elPromptText.textContent = 'Press Start to begin…';

  updateHUD();
  setControls(false);
}

function startRound() {
  if (state.running) return;
  resetRound(true);
  state.running = true;
  state.startedAt = Date.now();
  setControls(true);
  pickPrompt();
  elInput.focus();

  state.timerId = setInterval(() => {
    state.secondsElapsed = nowSec();
    if (state.mode !== 'time-attack') {
      state.timeRemaining = state.duration - state.secondsElapsed;
      if (state.timeRemaining <= 0) {
        state.timeRemaining = 0;
        updateHUD();
        return endRound();
      }
    }
    updateHUD();
  }, 1000);
}

function pauseRound() {
  if (!state.running) return;
  clearInterval(state.timerId);
  state.timerId = null;
  state.running = false;
  setControls(false);
}

function endRound(reason = 'time') {
  clearInterval(state.timerId);
  state.timerId = null;
  state.running = false;
  setControls(false);

  // Final HUD refresh
  state.secondsElapsed = nowSec();
  updateHUD();

  // Rank & image from hidden score tiers
  const tier = pickScoreTier(state.score);
  elFinalScore.textContent = state.score;
  elFinalWpm.textContent = elWpm.textContent;
  elFinalAccuracy.textContent = elAccuracy.textContent;
  elFinalStreak.textContent = state.longestStreak;
  elResultRank.textContent = tier.label || '—';
  if (tier.image) elResultImage.src = tier.image;
  elResultCaption.textContent = tier.label || 'Keep going!';

  appendHistoryRow(tier.label || '—');

  try { elResultDialog.showModal(); } catch (_) { /* dialog unsupported */ }
}

function pickScoreTier(score) {
  const tiers = document.querySelectorAll('#score-tiers .tier');
  for (const t of tiers) {
    const min = parseInt(t.dataset.min, 10);
    const max = parseInt(t.dataset.max, 10);
    if (score >= min && score <= max) {
      return { label: t.dataset.label, image: t.dataset.image };
    }
  }
  return { label: 'Unranked', image: '' };
}

function appendHistoryRow(rankLabel) {
  const clone = tplHistoryRow.content.cloneNode(true);
  state.roundNumber += 1;
  clone.querySelector('.h-index').textContent = state.roundNumber;
  clone.querySelector('.h-mode').textContent = state.mode;
  clone.querySelector('.h-difficulty').textContent = state.difficulty;
  clone.querySelector('.h-wpm').textContent = elWpm.textContent;
  clone.querySelector('.h-accuracy').textContent = elAccuracy.textContent;
  clone.querySelector('.h-score').textContent = state.score;
  clone.querySelector('.h-rank').textContent = rankLabel;
  clone.querySelector('.h-when').textContent = new Date().toLocaleString();
  elHistoryBody.prepend(clone);
}

// ===========================
// Typing logic
// ===========================
function normalize(s) { return s.trim().toLowerCase(); }

function acceptWord() {
  const typedRaw = elInput.value;
  const typed = normalize(typedRaw);
  const target = normalize(state.currentPrompt);

  if (!typed) return; // ignore empty

  state.totalTyped += 1;

  if (typed === target) {
    // Score & streak with difficulty multiplier
    const base = 10;
    const bonus = Math.round(base * difficultyMultiplier());
    state.score += bonus;
    state.streak += 1;
    state.totalCorrect += 1;
    state.longestStreak = Math.max(state.longestStreak, state.streak);
    elFeedback.textContent = '✓';
  } else {
    state.streak = 0;
    elFeedback.textContent = '✗';

    if (state.mode === 'sudden-death') {
      updateHUD();
      return endRound('mistake');
    }
  }

  // Time-attack completion
  if (state.mode === 'time-attack' && state.totalCorrect >= state.targetWords) {
    updateHUD();
    return endRound('target');
  }

  // Prepare next word
  elInput.value = '';
  pickPrompt();
  // update HUD (accuracy/WPM)
  state.secondsElapsed = nowSec();
  if (state.mode !== 'time-attack') state.timeRemaining = Math.max(0, state.duration - state.secondsElapsed);
  updateHUD();
}

// Accept on Space OR Enter (no newlines in textarea)
elInput.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    if (state.running) acceptWord();
  }
});

// ===========================
// Controls
// ===========================
elStart.addEventListener('click', startRound);
elPause.addEventListener('click', pauseRound);
elReset.addEventListener('click', () => resetRound(false));
elNextRound.addEventListener('click', startRound);

// Dialog buttons
const elBtnPlayAgain = document.getElementById('btn-play-again');
const elBtnShare = document.getElementById('btn-share');
const elBtnClose = document.getElementById('btn-close');

if (elBtnPlayAgain) elBtnPlayAgain.addEventListener('click', () => { try { elResultDialog.close(); } catch(_){} startRound(); });
if (elBtnClose) elBtnClose.addEventListener('click', () => { try { elResultDialog.close(); } catch(_){} });
if (elBtnShare) elBtnShare.addEventListener('click', async () => {
  const text = `TypeFast Result — Score: ${state.score}, WPM: ${elWpm.textContent}, Acc: ${elAccuracy.textContent}, Rank: ${elResultRank.textContent}`;
  if (navigator.share) {
    try { await navigator.share({ text }); } catch(_){}
  } else if (navigator.clipboard) {
    try { await navigator.clipboard.writeText(text); alert('Result copied to clipboard!'); } catch(_){}
  } else {
    alert(text);
  }
});

// ===========================
// Init
// ===========================
resetRound(false);
