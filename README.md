# Utkarsh - Enterprise Presentation Engine

A modern, enterprise-grade presentation engine built with React, TypeScript, and Vite. Designed for creating dynamic, interactive presentations with administrative controls and slide management.

## Features

- **Admin Dashboard**: Manage presentations and users with a comprehensive admin interface
- **Dynamic Slide Rendering**: Render slides with various components and layouts
- **User Authentication**: Secure admin login system
- **Responsive Design**: Works seamlessly across devices
- **TypeScript Support**: Full type safety and better development experience
- **Vite Build System**: Fast development and optimized production builds

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules / Tailwind CSS (if configured)
- **State Management**: React Context API
- **Development**: Hot Module Replacement, Fast Refresh

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MrAkshay143/utkarsh.git
   cd utkarsh---enterprise-presentation-engine
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**

   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## Deployment

The application can be run locally and is also deployed online:

- **Local Development**: Run `npm run dev` to start on http://localhost:3000
- **Production Deployment**: Available at https://bidhan.imakshay.in

The app automatically detects the environment (localhost vs production domain) and configures settings accordingly using the `config.ts` file.

## Project Structure

```
├── components/
│   ├── AdminDashboard.tsx    # Main admin interface
│   ├── AdminLogin.tsx        # Authentication component
│   ├── Presentation.tsx      # Presentation viewer
│   ├── SlideComponents.tsx   # Reusable slide components
│   └── SlideRenderer.tsx     # Slide rendering logic
├── context/
│   └── SlideContext.tsx      # State management for slides
├── public/                   # Static assets
├── config.ts                # Dynamic environment configuration
├── App.tsx                  # Main application component
├── index.tsx                # Application entry point
├── constants.tsx            # Application constants
├── types.ts                 # TypeScript type definitions
├── metadata.json            # Application metadata
└── vite.config.ts           # Vite configuration
```

## Usage

### Admin Features

- Login to the admin dashboard
- Create and manage presentations
- Add, edit, and delete slides
- Configure slide components and layouts

### Presentation Mode

- View presentations in full-screen mode
- Navigate through slides
- Interactive elements and animations

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env.local` file in the root directory for environment-specific configurations:

```env
# Add your environment variables here
VITE_API_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please open an issue on GitHub.
