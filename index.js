// Initialize Croppie instance and bind placeholder image
var croppieElement = document.getElementById('croppie');
var croppieInstance = new Croppie(croppieElement, {
  viewport: { width: 200, height: 200, type: 'circle' },
  boundary: { width: 300, height: 300 }
});
updateCroppieSize();  // Adjust size on initial load

// Update Croppie size based on window size
function updateCroppieSize() {
  var viewportWidth, boundaryWidth;
  if (window.innerWidth > 1200) {
    // デスクトップの場合
    viewportWidth = 300;
    boundaryWidth = 450;
  } else {
    // スマートフォンやタブレットの場合
    viewportWidth = window.innerWidth * 0.8; // 画面幅の80%
    boundaryWidth = window.innerWidth * 0.9; // 画面幅の90%
  }
  var height = viewportWidth;  // 正方形のため、幅と高さを同じに設定

  croppieInstance.destroy(); // 既存のインスタンスを破棄
  croppieInstance = new Croppie(croppieElement, { // 新しいサイズでインスタンスを生成
    viewport: { width: viewportWidth, height: height, type: 'circle' },
    boundary: { width: boundaryWidth, height: boundaryWidth }
  });
  croppieInstance.bind({ // 画像を再バインド
    url: "https://raw.githubusercontent.com/ik2i03/cropp/main/IMG_0313.PNG"
  });
}

// Listen for window resize events
window.addEventListener('resize', updateCroppieSize);

// Image upload event
document.getElementById('upload').addEventListener('change', function () {
  var reader = new FileReader();
  reader.onload = function (e) {
    croppieInstance.bind({
      url: e.target.result
    });
  };
  reader.readAsDataURL(this.files[0]);
});

// Download button click event
document.getElementById('download').addEventListener('click', function () {
  // Show loading indicator during download
  document.getElementById('loader').style.display = 'block';

  croppieInstance.result({
    type: 'blob',
    size: 'original',
    quality: 1,
    format: 'png'
  }).then(function (blob) {
    // Download process
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'cropped_image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }).finally(function() {
    // Hide loading indicator after download
    document.getElementById('loader').style.display = 'none';
  });
});

// 1px単位での微調整機能
function moveCroppie(x, y) {
  var transform = Transform.parse(croppieInstance.elements.preview.style.transform);
  transform.x += x;
  transform.y += y;
  var newCss = {};
  newCss.transform = transform.toString();
  css(croppieInstance.elements.preview, newCss);
}

// ボタンイベントリスナー
document.getElementById('move-left').addEventListener('click', () => moveCroppie(-1, 0));
document.getElementById('move-right').addEventListener('click', () => moveCroppie(1, 0));
document.getElementById('move-up').addEventListener('click', () => moveCroppie(0, -1));
document.getElementById('move-down').addEventListener('click', () => moveCroppie(0, 1));

