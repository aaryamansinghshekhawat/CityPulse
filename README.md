# CityPulse

A modern city management and citizen engagement platform built with Next.js 15 and Tailwind CSS.

## Features

- **Citizen Portal**: Report issues, track progress, and stay informed
- **Authority Dashboard**: Manage city operations and coordinate projects
- **Real-time Updates**: Instant notifications and live tracking
- **Responsive Design**: Mobile-first approach with modern UI/UX

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Components**: Modular, reusable component architecture

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/             # Reusable components
│   ├── ui/                # Basic UI components
│   │   ├── Button.tsx     # Button component
│   │   ├── Card.tsx       # Card component
│   │   └── index.ts       # UI exports
│   ├── layout/            # Layout components
│   │   ├── Navigation.tsx # Navigation bar
│   │   ├── Footer.tsx     # Footer component
│   │   └── index.ts       # Layout exports
│   └── sections/          # Page sections
│       ├── Hero.tsx       # Hero section
│       ├── Features.tsx   # Features section
│       ├── UserTypes.tsx  # User types section
│       ├── CTA.tsx        # Call-to-action section
│       └── index.ts       # Section exports
└── lib/                   # Utility functions
    └── utils.ts           # Common utilities
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Component Usage

### Button Component
```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="lg" href="/signup">
  Get Started
</Button>
```

### Card Component
```tsx
import { Card } from '@/components/ui';

<Card className="p-8">
  <h3>Title</h3>
  <p>Content</p>
</Card>
```

## Design System

- **Color Palette**: Professional grey theme (gray-50 to gray-900)
- **Typography**: Geist font family for excellent readability
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Components**: Modular design with consistent styling patterns

## Features

### For Citizens
- Report city issues and concerns
- Track progress of reported issues
- Receive real-time updates

### For Authorities
- Manage and respond to citizen reports
- Coordinate city projects and initiatives
- Access comprehensive analytics and reports

## Contributing

1. Follow the established component structure
2. Use TypeScript for type safety
3. Maintain consistent styling with Tailwind CSS
4. Keep components simple and focused

## License

This project is private and proprietary.
