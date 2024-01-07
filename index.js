// Declare variables for Croppie instance and element
var croppieElement = document.getElementById('croppie');
var croppieInstance = null;
var buttonContainer = document.getElementById('button-container');

// Function to initialize or update Croppie instance
function updateCroppieSize() {
  var viewportWidth, viewportHeight, boundaryWidth, boundaryHeight;
  if (window.innerWidth > 1200) {
    viewportWidth = 300;
    viewportHeight = 300; // ビューポートの高さ
    boundaryWidth = 450;
    boundaryHeight = 450; // バウンダリーの高さ
  } else {
    viewportWidth = window.innerWidth * 0.8;
    viewportHeight = window.innerWidth * 0.8; // ビューポートの高さを動的に調整
    boundaryWidth = window.innerWidth * 0.9;
    boundaryHeight = window.innerWidth * 0.9; // バウンダリーの高さを動的に調整
  }

  // Destroy existing instance if it exists
  if (croppieInstance) {
    croppieInstance.destroy();
  }

  // Initialize a new Croppie instance with updated size
  croppieInstance = new Croppie(croppieElement, {
    viewport: { width: viewportWidth, height: viewportHeight, type: 'circle' },
    boundary: { width: boundaryWidth, height: boundaryHeight }
  });

  // Adjust button container position based on the boundary size
  buttonContainer.style.top = (150 + boundaryHeight + 15) + 'px'; // boundaryの下のスペースを設定

  // Bind placeholder image to the new instance
  croppieInstance.bind({
    url: "https://raw.githubusercontent.com/ik2i03/cropp/main/IMG_0313.PNG"
  });
}

// Listen for window resize events and page load to update Croppie size
window.addEventListener('resize', updateCroppieSize);
document.addEventListener('DOMContentLoaded', updateCroppieSize);

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
  if (!croppieInstance) return;

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
