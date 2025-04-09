async function setBackgroundImage() {
  const hour = new Date().getHours();
  let timeOfDay;

  if (hour >= 5 && hour < 12) timeOfDay = 'morning';
  else if (hour >= 12 && hour < 16) timeOfDay = 'noon';
  else if (hour >= 16 && hour < 20) timeOfDay = 'evening';
  else timeOfDay = 'night';

  let weather = 'clear';

  try {
    const response = await fetch('https://wttr.in/?format=%C');
    const condition = await response.text();

    if (condition.toLowerCase().includes('snow')) weather = 'snow';
    else if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('drizzle')) weather = 'rain';

  } catch (err) {
    console.warn('Weather fetch failed:', err);
  }

  let bgFile = `assets/${timeOfDay}${weather !== 'clear' ? '-' + weather : ''}.jpg`;
  document.body.style.backgroundImage = `url('${bgFile}')`;
}

setBackgroundImage();
