// Initialize Croppie instance and bind placeholder image
var croppieInstance = new Croppie(document.getElementById('croppie'), {
  viewport: { width: 270, height: 270 },
  boundary: { width: 350, height: 350 }
});
croppieInstance.bind({
  url: "https://raw.githubusercontent.com/ik2i03/cropp/main/IMG_0313.PNG"
});

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
