# WeatherWise 🌤️

WeatherWise is an intuitive weather application that provides real-time weather information and forecasts with a clean, modern interface. Built with React and deployed on Azure Static Web Apps, it offers a responsive design and seamless user experience across all devices.

[![Azure Static Web Apps CI/CD](https://github.com/ser4ph22/weatherwise/actions/workflows/azure-static-web-apps-ashy-ground-09fe62010.yml/badge.svg)](https://github.com/ser4ph22/weatherwise/actions/workflows/azure-static-web-apps-ashy-ground-09fe62010.yml)

## Features ✨

- **Real-time Weather Data**: Get current weather conditions for any location
- **Location Search**: Find weather information by city name, postal code, or coordinates
- **Favorites System**: Save and quickly access your preferred locations
- **Temperature Units**: Toggle between Celsius and Fahrenheit
- **Detailed Metrics**: View comprehensive weather data including:
  - Temperature and "Feels Like" temperature
  - Humidity levels
  - Wind speed and direction
  - Precipitation
  - UV Index
  - Cloud cover
  - Atmospheric pressure

## Tech Stack 🛠️

- **Frontend**: React 18.2.0 with Vite
- **Styling**: TailwindCSS 3.4.1
- **Routing**: React Router DOM 6.20.0
- **Package Management**: pnpm 9.x
- **Hosting**: Azure Static Web Apps
- **CI/CD**: GitHub Actions
- **API**: WeatherAPI.com

## Getting Started 🚀

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ser4ph22/weatherwise.git
cd weatherwise
```

2. Install dependencies:
```bash
pnpm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables:
```env
VITE_WEATHER_API_KEY=your_api_key_here
VITE_WEATHER_API_BASE_URL=https://api.weatherapi.com/v1
VITE_STORAGE_URL=your_storage_url
```

5. Start development server:
```bash
pnpm dev
```

## Development 👩‍💻👨‍💻

### Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm preview`: Preview production build
- `pnpm run clean`: Clean installation files

### Project Structure

```
weatherwise/
├── src/
│   ├── components/      # React components
│   ├── contexts/        # React contexts
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Page components
│   ├── services/       # API services
│   └── utils/          # Utility functions
├── public/             # Static assets
└── ...configuration files
```

## Deployment 🌐

The application is automatically deployed to Azure Static Web Apps through GitHub Actions. The deployment process is triggered on pushes to the `deployment` branch.

### Build Optimizations

- Chunk splitting for vendor modules
- Build size optimization for Azure Static Web Apps
- Asset compression and optimization
- Deployment size verification

## Security 🔒

- Secure API key handling
- Content Security Policy headers
- CORS configuration
- Environment variable protection

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Plans 🎯

- Weather forecast visualization
- Historical weather data
- Weather alerts system
- Enhanced mobile experience
- Offline support
- Multiple theme options

## Version History 📝

- **0.1.0** (November 10, 2024)
  - Initial release
  - Core weather tracking functionality
  - Favorites system
  - Temperature unit conversion
  - Azure Static Web Apps deployment

## Support 💬

For support, please open an issue in the GitHub repository.

## License 📄

This project is private and confidential. All rights reserved.

---

Created with ❤️ by ser4ph22
