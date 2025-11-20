# Tech Stack & Build System

## Core Technologies
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5.x
- **Styling**: CSS Modules with CSS Variables
- **State Management**: React Context + useReducer pattern
- **Data Storage**: LocalStorage for persistence
- **Testing**: Jest with ts-jest preset
- **Linting**: ESLint with TypeScript and React plugins

## Development Dependencies
- TypeScript 5.2+ for type safety
- Vite React plugin for fast development
- ESLint for code quality
- Jest for unit testing

## Path Aliases
The project uses path aliases configured in both Vite and TypeScript:
- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@services/*` → `src/services/*`
- `@types/*` → `src/types/*`
- `@data/*` → `src/data/*`
- `@styles/*` → `src/styles/*`

## Common Commands

### Development
```bash
npm run dev          # Start development server on port 3000
npm run build        # Build for production (TypeScript + Vite)
npm run preview      # Preview production build
```

### Code Quality
```bash
npm run lint         # Run ESLint with TypeScript rules
npm run test         # Run Jest tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate test coverage report
```

## CSS Modules Configuration
- Uses camelCase convention for class names
- Scoped naming: `[name]__[local]___[hash:base64:5]`
- CSS Variables for theming support

## Build Configuration
- Output directory: `dist/`
- Source maps enabled for debugging
- Development server auto-opens browser