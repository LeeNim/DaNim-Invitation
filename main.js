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
        <h2 class="pre-title">xin mời đến với sinh nhật của</h2>
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
      
      <div class="guest-input-section">
        <input type="text" class="guest-name-input" id="guestInput" placeholder="Bạn tên là..." />
        <span class="guest-name-final" id="guestFinal"></span>
      </div>
      
      <div class="location-section">
        <p class="venue">Panda BBQ</p>
        <p class="address">453 Lê Trọng Tấn, Sơn Kỳ, Tân Phú</p>
      </div>

      <div class="dress-code-section">
        <h3 class="dress-code-title">Dress Code</h3>
        <p class="dress-code-desc">
          Hãy chọn 1 nhân vật hoạt hình để hóa trang<br/>
          & giải thích vì sao bạn chọn nhân vật đó nhé! ✨
        </p>
      </div>
    </div>
  </div>
`

// --- Handle Guest Name Input Interaction ---
const guestInput = document.getElementById('guestInput');
const guestFinal = document.getElementById('guestFinal');

guestInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter' && this.value.trim() !== '') {
    const name = this.value.trim();

    // Hide input with a fade-out effect and show text
    this.classList.add('hidden');

    setTimeout(() => {
      this.style.display = 'none';

      // Prepare the final text
      guestFinal.textContent = `Dành riêng cho ${name}`;
      guestFinal.style.display = 'block';

      // Trigger reflow to start opacity transition
      void guestFinal.offsetWidth;
      guestFinal.classList.add('visible');
    }, 300); // 300ms matches the transition duration usually set in CSS
  }
});
