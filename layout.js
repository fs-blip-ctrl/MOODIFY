// ===== HEADER =====
const headerHTML = `
<header class="app-header">
  <nav class="navbar-unique">
    <div class="navbar-wrap">
      <a href="#" class="navbar-logo">🌟 MOODIFYY</a>
      <ul class="navbar-links">
        <li><a href="#fun">Fun</a></li>
        <li><a href="#game">Game</a></li>
        <li><a href="#country">Country</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </div>
  </nav>
</header>
`;

// ===== FOOTER =====
const footerHTML = `
<footer class="app-footer">
  <p>✨ <strong>MOODIFYY</strong> — your dose of style & fun! ✨   💡 Created with 💪 by <strong>FATIMAH</strong>
</p>
  <p>🌐 Explore • 🎨 Create • 🚀 Enjoy</p>
</footer>
`;

// Inject into page
document.addEventListener("DOMContentLoaded", () => {
  const headerDiv = document.getElementById("header");
  const footerDiv = document.getElementById("footer");
  if (headerDiv) headerDiv.innerHTML = headerHTML;
  if (footerDiv) footerDiv.innerHTML = footerHTML;
});
