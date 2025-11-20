# Project Structure & Organization

## Root Directory Structure
```
├── src/                    # Main source code
├── .kiro/                  # Kiro configuration and specs
├── 001/                    # Legacy/prototype version
├── node_modules/           # Dependencies
├── dist/                   # Build output (generated)
├── package.json            # Project dependencies and scripts
├── vite.config.ts          # Vite build configuration
├── tsconfig.json           # TypeScript configuration
├── jest.config.js          # Jest testing configuration
├── .eslintrc.cjs           # ESLint rules
└── README.md               # Project documentation
```

## Source Code Organization (`src/`)
```
src/
├── components/             # React components
├── services/              # Business logic and API services
├── types/                 # TypeScript type definitions
├── data/                  # Static data (tarot cards, spreads)
├── styles/                # CSS modules and global styles
├── App.tsx                # Main application component
├── main.tsx               # Application entry point
└── setupTests.ts          # Jest test setup
```

## Naming Conventions
- **Files**: Use PascalCase for React components (`TarotCard.tsx`)
- **Directories**: Use camelCase (`components/`, `services/`)
- **CSS Modules**: Use camelCase for class names
- **Types**: Use PascalCase with descriptive names (`TarotCard`, `SpreadLayout`)

## Component Organization
- Place related components in subdirectories under `components/`
- Co-locate component-specific styles as `.module.css` files
- Use index files for clean imports when appropriate

## Service Layer
- Business logic goes in `services/` directory
- Each service should have a clear, single responsibility
- Include corresponding test files in `__tests__/` subdirectories

## Data Management
- Static tarot data stored in `data/` directory
- Separate files for different data types (cards, spreads, etc.)
- Export data through index files for clean imports

## Testing Structure
- Test files use `.test.ts` or `.test.tsx` extensions
- Place tests in `__tests__/` directories within relevant modules
- Follow the same directory structure as source code