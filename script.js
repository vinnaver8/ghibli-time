const apiKey = '68f0ff0cd109906c3922d43fba45e3fe'; // get one from openweathermap.org

navigator.geolocation.getCurrentPosition(success => {
  const lat = success.coords.latitude;
  const lon = success.coords.longitude;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      const weather = data.weather[0].main.toLowerCase(); // e.g. "clear", "rain", "snow"
      const hour = new Date().getHours();
      let timeOfDay = '';

      if (hour >= 5 && hour < 10) {
        timeOfDay = 'morning';
      } else if (hour >= 10 && hour < 17) {
        timeOfDay = 'noon';
      } else if (hour >= 17 && hour < 20) {
        timeOfDay = 'evening';
      } else {
        timeOfDay = 'night';
      }

      let backgroundImage = `assets/${timeOfDay}.jpg`;

      if (weather.includes('snow') && ['morning', 'evening', 'night'].includes(timeOfDay)) {
        backgroundImage = `assets/${timeOfDay}-snow.jpg`;
      } else if (weather.includes('rain') && ['morning', 'evening', 'night'].includes(timeOfDay)) {
        backgroundImage = `assets/${timeOfDay}-rain.jpg`;
      }

      document.body.style.backgroundImage = `url('${backgroundImage}')`;
    });
});
