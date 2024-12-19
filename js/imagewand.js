const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let points = []; // To store trace points
let tempImage = null; // To store the uploaded image

// Handle Upload Button Click
document.getElementById('uploadButton').addEventListener('click', () => {
  document.getElementById('fileInput').click();
});

// Handle File Input Change (Upload Image)
document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    const img = new Image();

    img.onload = () => {
      tempImage = img;

      // Resize canvas to match the image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the uploaded image onto the canvas
      ctx.drawImage(img, 0, 0);
    };

    img.src = URL.createObjectURL(file);
  }
});

// Start Drawing the Trace
canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  isDrawing = true;
  points = [{ x, y }]; // Start a new trace
});

// Continue Drawing the Trace
canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  points.push({ x, y });

  // Redraw the image and trace
  if (tempImage) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempImage, 0, 0); // Redraw the image
  }

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.stroke();
});

// End the Trace
canvas.addEventListener('mouseup', () => {
  isDrawing = false;

  // Automatically close the shape if not closed
  const start = points[0];
  const end = points[points.length - 1];
  const distance = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
  );

  if (distance > 10) {
    points.push(start); // Close the shape by connecting to the start point
  }

  // Draw the closed shape
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();
  ctx.strokeStyle = 'blue';
  ctx.stroke();

  // Select pixels inside the shape
  selectPixelsInsideShape();
});

// Function to Select Pixels Inside the Shape
function selectPixelsInsideShape() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Use the path to determine which pixels are inside
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      if (ctx.isPointInPath(x, y)) {
        const index = (y * canvas.width + x) * 4; // RGBA format
        // Highlight the pixel inside the shape (optional)
        data[index] = 255; // Red
        data[index + 1] = 0; // Green
        data[index + 2] = 0; // Blue
        data[index + 3] = 255; // Alpha
      }
    }
  }

  // Update the canvas with the modified image data
  ctx.putImageData(imageData, 0, 0);
}
