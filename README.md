# Task Tracker Application

A full-stack task management application built for the Brew Full-Stack Developer Internship assignment. This application allows users to create, manage, and organize their personal tasks with authentication, filtering, and search capabilities.

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Next.js, Express, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Express** - Fast, unopinionated web framework
- **Bun** - Runtime environment
- **Drizzle** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Authentication** - Better-Auth with email/password and Google OAuth
- **PWA** - Progressive Web App support
- **Biome** - Linting and formatting
- **Husky** - Git hooks for code quality

## Tech Stack Rationale

### Frontend: Next.js with React
- **Next.js** was chosen for its server-side rendering capabilities, excellent developer experience, and built-in optimizations
- Provides seamless integration between frontend and backend in a monorepo structure
- Strong TypeScript support and modern React patterns
- Excellent performance out of the box with automatic code splitting

### Backend: Express with Node.js/Bun
- **Express** provides a lightweight, flexible framework for building REST APIs
- **Bun** runtime offers faster startup times and better performance compared to Node.js
- Simple middleware architecture makes authentication and error handling straightforward
- Well-established ecosystem with extensive middleware support

### Database: PostgreSQL with Drizzle ORM
- **PostgreSQL** is a robust, production-ready relational database
- **Drizzle ORM** provides type-safe database queries with excellent TypeScript integration
- Schema migrations are version-controlled and easy to manage
- Supports complex queries needed for filtering and searching tasks

### Authentication: Better-Auth
- Modern authentication library with built-in support for email/password and OAuth providers
- Handles session management, password hashing, and security best practices automatically
- Type-safe API that integrates well with TypeScript
- Supports both traditional and social authentication methods

### UI: TailwindCSS + shadcn/ui
- **TailwindCSS** enables rapid UI development with utility classes
- **shadcn/ui** provides accessible, customizable React components
- Responsive design is built-in with Tailwind's mobile-first approach
- Dark mode support for better user experience

## Assumptions

1. **Database**: Assumes PostgreSQL is available either locally or via a cloud provider (Supabase, Neon, etc.)
2. **Environment Variables**: All sensitive configuration is stored in environment variables
3. **OAuth Setup**: Google OAuth credentials are obtained from Google Cloud Console
4. **Deployment**: Application can be deployed to platforms supporting Node.js/Bun (Vercel, Railway, Render, etc.)
5. **Browser Support**: Modern browsers with ES6+ support
6. **User Experience**: Users understand basic task management concepts (create, edit, delete, filter)

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- PostgreSQL database (local or cloud-hosted)
- pnpm package manager (`npm install -g pnpm`)
- Google Cloud Console account (for OAuth setup)

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install dependencies:**
```bash
pnpm install
```

### Environment Setup

1. **Create environment files:**

   Create `apps/server/.env`:
   ```env
   # Database Configuration
   DATABASE_URL=postgresql://user:password@localhost:5432/task_tracker

   # Better Auth Configuration
   BETTER_AUTH_URL=http://localhost:3000
   CORS_ORIGIN=http://localhost:3001

   # Google OAuth Configuration
   # Get these from Google Cloud Console: https://console.cloud.google.com/
   # 1. Create a new project or select existing one
   # 2. Enable Google+ API
   # 3. Go to Credentials > Create Credentials > OAuth 2.0 Client ID
   # 4. Set authorized redirect URIs to: {BETTER_AUTH_URL}/api/auth/callback/google
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here

   # Server Port (optional, defaults to 3000)
   PORT=3000
   ```

   Create `apps/web/.env.local`:
   ```env
   # Backend API URL
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

2. **Set up Google OAuth:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Navigate to Credentials > Create Credentials > OAuth 2.0 Client ID
   - Set application type to "Web application"
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   - Copy the Client ID and Client Secret to your `.env` file

### Database Setup

1. **Create a PostgreSQL database** (locally or use a cloud provider like Supabase, Neon, or Railway)

2. **Update the `DATABASE_URL`** in `apps/server/.env` with your database connection string

3. **Apply the schema to your database:**
```bash
pnpm run db:push
```

This will create all necessary tables (users, sessions, tasks, etc.) in your database.

### Running the Application

**Start both frontend and backend:**
```bash
pnpm run dev
```

This will start:
- Backend API server at [http://localhost:3000](http://localhost:3000)
- Frontend web application at [http://localhost:3001](http://localhost:3001)

**Or run them separately:**
```bash
# Backend only
pnpm run dev:server

# Frontend only
pnpm run dev:web
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.







## Project Structure

```
task-tracker-app/
├── apps/
│   ├── web/         # Frontend application (Next.js)
│   └── server/      # Backend API (Express)
├── packages/
│   ├── api/         # API layer / business logic
│   ├── auth/        # Authentication configuration & logic
│   └── db/          # Database schema & queries
```

## Available Scripts

- `pnpm run dev`: Start all applications in development mode
- `pnpm run build`: Build all applications for production
- `pnpm run dev:web`: Start only the web application
- `pnpm run dev:server`: Start only the server
- `pnpm run check-types`: Check TypeScript types across all apps
- `pnpm run db:push`: Push schema changes to database
- `pnpm run db:studio`: Open database studio UI (Drizzle Studio)
- `pnpm run db:generate`: Generate database migrations
- `pnpm run db:migrate`: Run database migrations
- `pnpm run check`: Run Biome formatting and linting
- `cd apps/web && pnpm run generate-pwa-assets`: Generate PWA assets

## Deployment

### Prerequisites for Deployment

1. **Database**: Set up a cloud PostgreSQL database (recommended options):
   - [Supabase](https://supabase.com/) - Free tier available
   - [Neon](https://neon.tech/) - Serverless PostgreSQL
   - [Railway](https://railway.app/) - Easy PostgreSQL setup
   - [Render](https://render.com/) - PostgreSQL service

2. **Environment Variables**: Configure all environment variables in your hosting platform

### Deployment Options

#### Option 1: Vercel (Recommended for Next.js)

**Frontend (Next.js):**
1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables:
   - `NEXT_PUBLIC_SERVER_URL`: Your backend API URL
4. Deploy

**Backend (Express):**
1. Use Vercel Serverless Functions or deploy to:
   - [Railway](https://railway.app/) - Easy deployment with PostgreSQL
   - [Render](https://render.com/) - Free tier available
   - [Fly.io](https://fly.io/) - Global deployment
   - [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)

#### Option 2: Railway (Full Stack)

1. Create a new project on Railway
2. Add PostgreSQL service
3. Add GitHub repository
4. Configure environment variables:
   - `DATABASE_URL`: Provided by Railway PostgreSQL service
   - `BETTER_AUTH_URL`: Your Railway backend URL
   - `CORS_ORIGIN`: Your Railway frontend URL
   - `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret
   - `NEXT_PUBLIC_SERVER_URL`: Your Railway backend URL
5. Deploy both services

#### Option 3: Render

**Backend:**
1. Create a new Web Service
2. Connect your GitHub repository
3. Set build command: `cd apps/server && pnpm install && pnpm build`
4. Set start command: `cd apps/server && pnpm start`
5. Add PostgreSQL database
6. Configure environment variables

**Frontend:**
1. Create a new Static Site
2. Connect your GitHub repository
3. Set build command: `cd apps/web && pnpm install && pnpm build`
4. Set publish directory: `apps/web/.next`
5. Configure environment variables

### Production Environment Variables

Ensure these are set in your hosting platform:

**Backend (`apps/server/.env`):**
- `DATABASE_URL`: Your production PostgreSQL connection string
- `BETTER_AUTH_URL`: Your production backend URL (e.g., `https://api.yourapp.com`)
- `CORS_ORIGIN`: Your production frontend URL (e.g., `https://yourapp.com`)
- `GOOGLE_CLIENT_ID`: Production Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET`: Production Google OAuth Client Secret
- `PORT`: Usually set automatically by hosting platform

**Frontend (`apps/web/.env.local`):**
- `NEXT_PUBLIC_SERVER_URL`: Your production backend URL

### Google OAuth Production Setup

1. In Google Cloud Console, add production redirect URIs:
   - `https://your-backend-url.com/api/auth/callback/google`
2. Update environment variables with production credentials
3. Ensure OAuth consent screen is configured and verified (if required)

### Post-Deployment Checklist

- [ ] Database migrations applied (`pnpm run db:push` or `pnpm run db:migrate`)
- [ ] All environment variables configured
- [ ] Google OAuth redirect URIs updated
- [ ] CORS origins configured correctly
- [ ] HTTPS enabled (required for OAuth)
- [ ] Test authentication (email/password and Google OAuth)
- [ ] Test task CRUD operations
- [ ] Test filtering and search functionality
- [ ] Verify responsive design on mobile devices

## Testing

Run the test suite:
```bash
cd apps/server
pnpm test
```

The application includes unit tests for task management endpoints using Jest.

## Project Structure

```
task-tracker-app/
├── apps/
│   ├── web/              # Frontend application (Next.js)
│   │   ├── src/
│   │   │   ├── app/      # Next.js app router pages
│   │   │   ├── components/  # React components
│   │   │   ├── hooks/    # Custom React hooks
│   │   │   └── lib/      # Utility functions and API clients
│   │   └── public/       # Static assets
│   └── server/           # Backend API (Express)
│       ├── src/
│       │   ├── middlewares/  # Express middlewares
│       │   ├── task/      # Task management routes and logic
│       │   └── types/     # TypeScript type definitions
│       └── tests/         # Test files
├── packages/
│   ├── auth/             # Authentication configuration (Better-Auth)
│   ├── db/               # Database schema and migrations (Drizzle)
│   ├── logger/           # Logging utilities
│   └── config/           # Shared configuration
└── README.md
```

## Security Considerations

- Passwords are hashed using Better-Auth's built-in security
- Input validation using Zod schemas prevents SQL injection and XSS
- CORS is configured to restrict origins
- Session management handled securely by Better-Auth
- Environment variables used for sensitive configuration
- HTTPS required in production for OAuth

## License

This project is created for the Brew Full-Stack Developer Internship assignment.
