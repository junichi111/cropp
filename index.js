// Initialize Croppie instance and bind placeholder image
var croppieElement = document.getElementById('croppie');
var croppieInstance;
initializeCroppie();  // 初期化関数を呼び出す

function initializeCroppie() {
  croppieInstance = new Croppie(croppieElement, {
    viewport: { width: 200, height: 200, type: 'circle' },
    boundary: { width: 300, height: 300 }
  });
  croppieInstance.bind({
    url: "https://raw.githubusercontent.com/ik2i03/cropp/main/IMG_0313.PNG"
  });
}

// Update Croppie size based on window size
function updateCroppieSize() {
  var viewportWidth, boundaryWidth;
  if (window.innerWidth > 1200) {
    viewportWidth = 300;
    boundaryWidth = 450;
  } else {
    viewportWidth = window.innerWidth * 0.8;
    boundaryWidth = window.innerWidth * 0.9;
  }
  var height = viewportWidth;

  if (croppieInstance) {
    croppieInstance.destroy(); // Destroy existing instance
  }
  croppieInstance = new Croppie(croppieElement, {
    viewport: { width: viewportWidth, height: height, type: 'circle' },
    boundary: { width: boundaryWidth, height: boundaryWidth }
  });
  croppieInstance.bind({
    url: "https://raw.githubusercontent.com/ik2i03/cropp/main/IMG_0313.PNG"
  });
}

// Listen for window resize events
window.addEventListener('resize', updateCroppieSize);

// Image upload event
document.getElementById('upload').addEventListener('change', function () {
  var reader = new FileReader();
  reader.onload = function (e) {
    if (croppieInstance) {
      croppieInstance.bind({
        url: e.target.result
      });
    }
  };
  reader.readAsDataURL(this.files[0]);
});

// Download button click event
document.getElementById('download').addEventListener('click', function () {
  if (!croppieInstance) return;  // インスタンスが存在しない場合は何もしない

  document.getElementById('loader').style.display = 'block';
  croppieInstance.result({
    type: 'blob',
    size: 'original',
    quality: 1,
    format: 'png'
  }).then(function (blob) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'cropped_image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }).finally(function() {
    document.getElementById('loader').style.display = 'none';
  });
});
