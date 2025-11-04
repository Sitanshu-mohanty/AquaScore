# AquaScore - AI-Driven Water Quality Dashboard

A modern, real-time water quality monitoring dashboard built with React, Vite, and Tailwind CSS. Designed for environmental ESG analytics and sustainability tracking.

![AquaScore](https://img.shields.io/badge/AquaScore-v1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![Vite](https://img.shields.io/badge/Vite-4.4.5-646cff)

## Features

- 🌊 **Real-time Monitoring**: Live water quality parameter tracking
- 📊 **Interactive Charts**: Historical trend visualization using Recharts
- 🎨 **Modern UI**: Dark theme with smooth animations and glassmorphism
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🚀 **Fast Performance**: Built with Vite for lightning-fast development
- ♻️ **Zero Backend**: Fully client-side with simulated live data

## Monitored Parameters

- **pH Level**: Water acidity/alkalinity (6.5-8.5 optimal)
- **Turbidity**: Water clarity measurement in NTU
- **Temperature**: Water temperature in Celsius

## Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/aquascore.git

# Navigate to project directory
cd aquascore

# Install dependencies
npm install

# Start development server
npm run dev
```

## Building for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Deployment to GitHub Pages

1. Update `vite.config.js` with your repository name:
```js
base: '/your-repo-name/'
```

2. Build the project:
```bash
npm run build
```

3. Deploy the `dist` folder to GitHub Pages using your preferred method (GitHub Actions, manual upload, or gh-pages package)

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Charting library
- **Lucide React** - Icon library

## Project Structure
```
aquascore/
├── src/
│   ├── components/
│   │   └── Dashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Live Demo

Access the dashboard at: [Your GitHub Pages URL]

## Environmental Impact

AquaScore helps organizations monitor water quality for:
- ESG compliance reporting
- Environmental sustainability tracking
- Pollution detection and prevention
- Resource management optimization

## Author

**Sitanshu Sekhar Mohanty**

## License

MIT License - feel free to use this project for your own purposes.

---

Built with ❤️ for environmental sustainability
