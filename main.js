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
      
      <div class="location-section">
        <p class="venue">Panda BBQ</p>
        <p class="address">453 Lê Trọng Tấn, Sơn Kỳ, Tân Phú</p>
      </div>
    </div>
  </div>
`
