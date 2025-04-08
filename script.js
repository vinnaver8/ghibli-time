const hour = new Date().getHours();
let background = "";

if (hour >= 5 && hour < 10) {
  background = "assets/morning.jpg";
} else if (hour >= 10 && hour < 17) {
  background = "assets/noon.jpg";
} else if (hour >= 17 && hour < 20) {
  background = "assets/evening.jpg";
} else {
  background = "assets/night.jpg";
}

document.body.style.backgroundImage = `url('${background}')`;
