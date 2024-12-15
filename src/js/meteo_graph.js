const apiUrl = `https://api.open-meteo.com/v1/forecast`;
const params = new URLSearchParams({
  latitude: '52.52',
  longitude: '13.41',
  current: 'temperature_2m',
  hourly: 'temperature_2m',
  timezone: 'America/Los_Angeles',
  forecast_days: '1'
});

var chart;
const canvas = document.getElementById('weatherChart');
const ctx = canvas.getContext('2d');

document.addEventListener('DOMContentLoaded', () => {

  canvas.width = 600;
  canvas.height = 150;

  if (!ctx) {
    console.error('Canvas not loaded');
    return;
  }
  
  createGraph(params);

});

async function createGraph(params){
  await fetch(`${apiUrl}?${params}`)
  .then(response => response.json())
  .then(data => {

    if(chart){
      chart.destroy();
    }

    const hourly = data.hourly;
    const temperatures = hourly.temperature_2m;
    const chartData = temperatures;
    const chartLabels = hourly.time.map(time => {
      return time.split("T")[1];
    })

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [{
          label: '',
          data: chartData,
          borderColor: 'rgba(255, 124, 0, 1)',
          backgroundColor: 'rgba(255, 124, 0, 2)',
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false 
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Temperature (°C)'
            }
          }
        }
      }
    });
  })
  .catch(error => console.error('Error fetching weather data:', error));
}

export { createGraph };