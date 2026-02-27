import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="invitation-wrapper">
    <!-- Corner Decoration Elements -->
    <img src="/flower.png" class="deco flower-top-right" alt="Flower decoration" />
    <img src="/flower.png" class="deco flower-bottom-left" alt="Flower decoration" />
    
    <img src="/pinkfog.png" class="deco fog-top-left" alt="Pink fog decoration" />
    <img src="/pinkfog.png" class="deco fog-bottom-right" alt="Pink fog decoration" />

    <div class="card-content">
      <div class="header-section">
        <h2 class="pre-title" id="preTitle">xin mời đến với sinh nhật của</h2>
      </div>
      
      <div class="names-section">
        <h1 class="main-title">Dany & Tình nhân của cô ấy</h1>
      </div>
      
      <div class="date-section">
        <div class="month">THÁNG 2</div>
        <div class="date-row">
          <div class="day-name">CHỦ NHẬT</div>
          <div class="day-number">28</div>
          <div class="time">LÚC 6 GIỜ TỐI</div>
        </div>
        <div class="year">2026</div>
      </div>
      
      <div class="guest-input-section" id="guestInputSection">
        <input type="text" class="guest-name-input" id="guestInput" placeholder="Bạn tên là..." />
      </div>
      
      <div class="location-section">
        <p class="venue">Panda BBQ</p>
        <p class="address">453 Lê Trọng Tấn, Sơn Kỳ, Tân Phú</p>
      </div>

      <div class="dress-code-section" id="dressCodeSection">
        <h3 class="dress-code-title">Dress Code</h3>
        <p class="dress-code-desc" id="dressCodeDesc">
          <!-- Will be filled by JS -->
        </p>
      </div>
    </div>
  </div>
`

// --- Handle Guest Name Input Interaction ---
const guestInput = document.getElementById('guestInput');
const guestInputSection = document.getElementById('guestInputSection');
const preTitle = document.getElementById('preTitle');
const dressCodeSection = document.getElementById('dressCodeSection');
const dressCodeDesc = document.getElementById('dressCodeDesc');

const defaultMovies = [
  "Toy story", "Minion", "Inside out", "Aladdin", "Shrek",
  "Doremon", "Conan", "How to train your dragon", "Zootopia",
  "Ratatouille", "Super Mario", "Hotel Transylvania", "Up",
  "Lilo & Stitch", "Tarzan", "Boboiboy"
];

function getAvailableMovies() {
  const stored = localStorage.getItem('availableMovies');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('availableMovies', JSON.stringify(defaultMovies));
  return defaultMovies;
}

function assignMovieToGuest(guestName) {
  const lowerName = guestName.toLowerCase();

  // Check if we already have a record for this guest
  const guestRecords = JSON.parse(localStorage.getItem('guestRecords') || '{}');
  if (guestRecords[lowerName]) {
    return guestRecords[lowerName];
  }

  // Pick random from available
  let available = getAvailableMovies();

  // If we run out of movies, reset the pool
  if (available.length === 0) {
    available = [...defaultMovies];
  }

  const randomIndex = Math.floor(Math.random() * available.length);
  const pickedMovie = available[randomIndex];

  // Remove from available and save
  available.splice(randomIndex, 1);
  localStorage.setItem('availableMovies', JSON.stringify(available));

  // Save to guest record
  guestRecords[lowerName] = pickedMovie;
  localStorage.setItem('guestRecords', JSON.stringify(guestRecords));

  return pickedMovie;
}

function checkAndShowGuestState() {
  // If a guest was previously logged in on this browser, 
  // we could automatically restore state here.
  // However, the requirement is to handle this after they input their name.
}

guestInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter' && this.value.trim() !== '') {
    const rawName = this.value.trim();

    // Secret Reset code
    if (rawName === '123123asd') {
      localStorage.removeItem('availableMovies');
      localStorage.removeItem('guestRecords');
      alert('Đã reset toàn bộ dữ liệu Random Movie!');
      this.value = '';
      return;
    }

    // Process movie assignment
    const assignedMovie = assignMovieToGuest(rawName);

    // 1. Smoothly collapse and fade out the input section
    guestInputSection.classList.add('hidden');

    // 2. Fade out and move preTitle up slightly
    preTitle.style.transition = 'all 0.4s ease';
    preTitle.style.opacity = '0';
    preTitle.style.transform = 'translateY(-10px)';

    setTimeout(() => {
      // Update the text for preTitle with block layout for mobile responsiveness
      preTitle.innerHTML = `xin mời <span style="display: block; color: var(--color-pink); font-family: var(--font-script); font-size: 2.8rem; text-transform: none; margin: 5px 0; line-height: 1.2;">${rawName}</span> đến với sinh nhật của`;

      // Bring preTitle back smoothly
      preTitle.style.opacity = '1';
      preTitle.style.transform = 'translateY(0)';

      // Set the dynamic content for dress code
      dressCodeDesc.innerHTML = `Hãy chọn 1 nhân vật trong phim <strong style="color: var(--color-pink); font-family: var(--font-heading); font-size: 1.1rem; letter-spacing: 1px;">🎈 ${assignedMovie.toUpperCase()} 🎈</strong> để hóa trang.<br><span style="font-size: 0.85rem; font-style: italic; opacity: 0.8; display: block; margin-top: 5px;">Mặc sai không được mời dở ráng chịu!</span>`;

      // 3. Smoothly expand and fade in Dress Code
      dressCodeSection.classList.add('visible');
    }, 400); // 400ms matches the fade out duration
  }
});
