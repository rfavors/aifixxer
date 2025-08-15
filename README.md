# A.I. Fixxer

A.I. Fixxer is an AI-powered code security and performance analysis platform that helps developers secure their AI-generated code, detect vulnerabilities, optimize performance, and ensure code quality.

## Features

- 🔒 **Security Analysis** - Detect vulnerabilities and security issues in your code
- ⚡ **Performance Optimization** - Identify and fix performance bottlenecks
- 📊 **Code Quality** - Ensure code quality with comprehensive analysis
- 🚀 **Launch Readiness** - Get your code production-ready
- 📁 **File Upload** - Support for multiple code file formats
- 📈 **Interactive Dashboard** - Real-time scanning and detailed reports
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Charts**: Recharts
- **File Upload**: React Dropzone
- **Code Highlighting**: Prism.js

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (for containerized deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AICodeChecker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## Docker Deployment

### Using Docker

1. **Build the Docker image**
   ```bash
   npm run docker:build
   ```

2. **Run the container**
   ```bash
   npm run docker:run
   ```

### Using Docker Compose

1. **Start the application**
   ```bash
   npm run docker:compose
   ```

2. **Stop the application**
   ```bash
   npm run docker:stop
   ```

## Coolify Deployment

### Prerequisites

- Coolify instance running
- Git repository with your code
- Domain name (optional)

### Deployment Steps

1. **Login to your Coolify dashboard**

2. **Create a new project**
   - Click "New Project"
   - Choose "Git Repository"
   - Connect your repository

3. **Configure the application**
   - **Build Pack**: Docker
   - **Dockerfile**: `./Dockerfile`
   - **Port**: `3000`
   - **Health Check**: `/` (HTTP GET)

4. **Environment Variables** (Optional)
   ```
   NODE_ENV=production
   PORT=3000
   HOSTNAME=0.0.0.0
   NEXT_TELEMETRY_DISABLED=1
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Access your application via the provided URL

### Coolify Configuration File

Create a `coolify.json` in your repository root:

```json
{
  "name": "ai-fixxer",
  "type": "docker",
  "dockerfile": "./Dockerfile",
  "port": 3000,
  "healthcheck": {
    "path": "/",
    "interval": 30,
    "timeout": 10,
    "retries": 3
  },
  "environment": {
    "NODE_ENV": "production",
    "PORT": "3000",
    "HOSTNAME": "0.0.0.0"
  }
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run Docker container
- `npm run docker:compose` - Start with Docker Compose
- `npm run docker:stop` - Stop Docker Compose
- `npm run deploy:build` - Build and create Docker image
- `npm run health-check` - Check application health

## Project Structure

```
AICodeChecker/
├── app/
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── Features.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Pricing.tsx
│   │   └── UploadSection.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── Dockerfile
├── docker-compose.yml
├── next.config.js
├── package.json
├── tailwind.config.js
└── README.md
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

### Next.js Configuration

The application is configured for:
- Standalone output for Docker
- Image optimization
- Compression
- SWC minification
- Telemetry disabled

## Health Checks

The application includes health check endpoints:
- **HTTP**: `GET /` - Returns 200 if healthy
- **Docker**: Built-in health check with curl

## Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: Optimized with Next.js automatic code splitting
- **Images**: Optimized with Next.js Image component
- **Fonts**: Optimized with Next.js Font optimization

## Security

- **HTTPS**: Enforced in production
- **Headers**: Security headers configured
- **Dependencies**: Regularly updated
- **Secrets**: Environment variables for sensitive data

## Monitoring

- **Health Checks**: Built-in health monitoring
- **Logs**: Structured logging with timestamps
- **Metrics**: Performance metrics available

## Support

- **Email**: raymond@thegeektrepreneur.com
- **Phone**: 866-358-3662

## License

MIT License - see LICENSE file for details.

---

**A.I. Fixxer** - Secure your AI-generated code with confidence! 🚀