// Initialize Croppie instance and bind placeholder image
var croppieElement = document.getElementById('croppie');
var croppieInstance = new Croppie(croppieElement, {
  viewport: { width: 200, height: 200, type: 'circle' },
  boundary: { width: 300, height: 300 }
});
updateCroppieSize();  // Adjust size on initial load

// Update Croppie size based on window size
function updateCroppieSize() {
  var width = window.innerWidth > 1200 ? 300 : (window.innerWidth / 4);
  var height = width;
  croppieInstance.destroy(); // Destroy the existing instance
  croppieInstance = new Croppie(croppieElement, { // Create a new instance with updated size
    viewport: { width: width, height: height, type: 'circle' },
    boundary: { width: width * 1.5, height: height * 1.5 }
  });
  croppieInstance.bind({ // Rebind the image
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
