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
    viewportWidth = 300;
    boundaryWidth = 450;
  } else {
    viewportWidth = window.innerWidth * 0.8;
    boundaryWidth = window.innerWidth * 0.9;
  }
  var height = viewportWidth;

  croppieInstance.destroy();
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

// Add 1px movement buttons
function addMovementButtons() {
  var directions = ['up', 'down', 'left', 'right'];
  directions.forEach(function(direction) {
    var button = document.createElement('button');
    button.innerHTML = 'Move 1px ' + direction;
    button.addEventListener('click', function() {
      moveCroppie(direction);
    });
    document.body.appendChild(button);
  });
}

// Move Croppie 1px in the specified direction
function moveCroppie(direction) {
  var shift = { x: 0, y: 0 };
  switch (direction) {
    case 'up': shift.y = -1; break;
    case 'down': shift.y = 1; break;
    case 'left': shift.x = -1; break;
    case 'right': shift.x = 1; break;
  }
  var currentPos = croppieInstance.get();
  croppieInstance.set({
    x: currentPos.points[0] + shift.x,
    y: currentPos.points[1] + shift.y
  });
}

// Initialize movement buttons
addMovementButtons();
