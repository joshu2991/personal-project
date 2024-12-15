# 3D Weather Visualization

A dynamic weather visualization project that combines Three.js for 3D graphics with real-time weather data from Open-Meteo API. Features an interactive 3D entrance animation and detailed weather information display.

## 🌟 Features

- 3D interactive entrance animation using Three.js
- Real-time weather data visualization
- Location-based weather information
- Hourly and daily weather forecasts
- Dynamic weather-based background changes
- Interactive temperature graph
- City search functionality with autocomplete

## 🚀 Technologies Used

- Three.js for 3D graphics
- GSAP for animations
- Open-Meteo API for weather data
- Radar.io for geocoding
- Chart.js for temperature visualization
- Vite as build tool

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v12 or higher)
- npm (usually comes with Node.js)

## ⚙️ Installation

1. Clone the repository

2. Navigate to the project directory:
cd 3d-weather-visualization

3. Install dependencies:
npm install

4. Create a `.env` file in the root directory and add your Radar.io API key:
VITE_WEATHER_API_KEY=your_radar_io_api_key

5. Start the development server:
npm run dev

## 🔑 API Keys

This project uses the Radar.io API for geocoding. You'll need to:
1. Sign up at [Radar.io](https://radar.io/)
2. Get your API key
3. Add it to your `.env` file

## 🛠️ Building for Production

To create a production build:
npm run build

To preview the production build:
npm run preview

## 📖 Usage

1. Upon loading, the application displays a 3D interactive entrance animation
2. Click the enter button to access the weather interface
3. Allow location access for automatic local weather display
4. Use the search bar to look up weather in different cities
5. View hourly and daily forecasts
6. Interact with the temperature graph for detailed information

## 🎨 Customization

You can customize the weather visualization by:
- Modifying the 3D animation parameters in `main.js`
- Adjusting the weather codes and corresponding images in `weather_api.js`
- Changing the graph styling in `meteo_graph.js`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👏 Acknowledgments

- [Three.js](https://threejs.org/) for 3D graphics
- [Open-Meteo](https://open-meteo.com/) for weather data
- [Radar.io](https://radar.io/) for geocoding services
- [GSAP](https://greensock.com/gsap/) for animations

## 📧 Contact

José Trueba - [joshu2991@hotmail.com](mailto:joshu2991@hotmail.com)

Project Link: [https://github.com/joshu2991/3d-weather-visualization](https://github.com/joshu2991/3d-weather-visualization)
