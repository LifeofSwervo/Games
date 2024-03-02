const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//console.log("Hello World!");

canvas.width = innerWidth;
canvas.height = innerHeight;

function animate() {
  requestAnimationFrame(animate);
  console.log("Hello World!");
  c.clearRect(0, 0, canvas.width, canvas.height);
}