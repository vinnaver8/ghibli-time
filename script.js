const backgrounds = {
  morning: "assets/morning.jpg",
  afternoon: "assets/afternoon.jpg",
  evening: "assets/evening.jpg",
  night: "assets/night.jpg",
};

let currentMode = "auto";

function setBackgroundByTime() {
  const hour = new Date().getHours();
  let theme = "";

  if (hour >= 5 && hour < 12) theme = "morning";
  else if (hour >= 12 && hour < 18) theme = "afternoon";
  else if (hour >= 18 && hour < 21) theme = "evening";
  else theme = "night";

  document.body.style.backgroundImage = `url(${backgrounds[theme]})`;
  return theme;
}

let manualIndex = 0;
const modes = ["morning", "afternoon", "evening", "night"];

document.getElementById("themeToggle").addEventListener("click", () => {
  currentMode = "manual";
  manualIndex = (manualIndex + 1) % modes.length;
  document.body.style.backgroundImage = `url(${backgrounds[modes[manualIndex]]})`;
});

// Initial automatic background
setBackgroundByTime();
