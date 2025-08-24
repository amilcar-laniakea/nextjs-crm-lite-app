# Next.js CRM Lite App

![CI](https://github.com/amilcar-laniakea/nextjs-crm-lite-app/workflows/CI/badge.svg)

A modern CRM (Customer Relationship Management) lite application built with
Next.js 13.5, featuring authentication, dashboard, and a comprehensive UI
component library.

## 🚀 Features

- **Authentication System**: Complete JWT-based authentication with secure
  cookie storage
- **Dashboard**: Protected dashboard with user session management
- **UI Components**: 40+ reusable components based on shadcn/ui
- **Modern Stack**: Built with Next.js 13.5, TypeScript, and Tailwind CSS
- **Code Quality**: ESLint, Prettier, Husky, and automated CI/CD
- **Responsive Design**: Mobile-first approach with modern UI/UX

## 🛠️ Technologies Used

### Frontend

- **Next.js 13.5** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React 18** - User interface library
- **React Hook Form** - Form validation and management
- **Zod** - Schema validation
- **React Query** - Data fetching and state management

### UI Components

- **Radix UI** - Headless UI components
- **shadcn/ui** - Beautiful and accessible components
- **Lucide React** - Icon library
- **Next Themes** - Theme switching support
- **Recharts** - Chart library for data visualization

### Authentication & Security

- **JWT (jsonwebtoken)** - Token-based authentication
- **Secure Cookies** - Session management
- **Dicebear** - Avatar generation

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit code checking
- **Commitlint** - Conventional commit messages

### CI/CD

- **GitHub Actions** - Automated testing and deployment
- **Artifact caching** - Optimized build processes

## 📁 Project Structure

```
nextjs-crm-lite-app/
├── .github/                    # GitHub configuration
│   ├── workflows/
│   │   └── ci.yml             # CI/CD pipeline
│   └── CODEOWNERS             # Repository governance
├── .husky/                     # Git hooks
│   ├── commit-msg             # Commit message validation
│   └── pre-commit             # Pre-commit checks
├── .vscode/                    # VS Code settings
│   └── settings.json          # Editor configuration
├── public/                     # Static assets
│   ├── favicon.ico
│   ├── next.svg
│   └── vercel.svg
├── src/                        # Source code
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   │   ├── layout.tsx     # Auth layout
│   │   │   ├── sign-in/
│   │   │   │   └── page.tsx   # Sign-in page
│   │   │   └── sign-up/
│   │   │       └── page.tsx   # Sign-up page
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   │   ├── layout.tsx     # Dashboard layout
│   │   │   ├── page.tsx       # Dashboard home
│   │   │   └── clients/
│   │   │       └── page.tsx   # Clients management
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── favicon.ico        # App icon
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI component library (40+ components)
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── table.tsx
│   │   │   └── ... (and many more)
│   │   └── generated-avatar.tsx
│   ├── hooks/                 # Custom React hooks
│   │   ├── query-provider.tsx # React Query setup
│   │   ├── use-auth.tsx       # Authentication hook
│   │   └── use-mobile.tsx     # Mobile detection hook
│   ├── lib/                   # Utility libraries
│   │   ├── api.ts            # Client-side API functions
│   │   ├── server-api.ts     # Server-side API functions
│   │   └── utils.ts          # Utility functions
│   └── modules/              # Feature-based modules
│       ├── auth/             # Authentication module
│       │   └── ui/
│       │       └── views/
│       │           ├── sign-in-view.tsx
│       │           └── sign-up-view.tsx
│       ├── dashboard/        # Dashboard module
│       │   └── ui/
│       │       └── components/
│       │           ├── dashboard-navbar.tsx
│       │           ├── dashboard-sidebar.tsx
│       │           └── dashboard-user-button.tsx
│       └── home/             # Home module
│           └── ui/
│               └── views/
│                   └── home-view.tsx
├── .eslintignore              # ESLint ignore patterns
├── .eslintrc.json             # ESLint configuration
├── .gitignore                 # Git ignore patterns
├── .prettierignore            # Prettier ignore patterns
├── .prettierrc                # Prettier configuration
├── CHANGELOG.md               # Project changelog
├── commitlint.config.js       # Commit message rules
├── components.json            # shadcn/ui configuration
├── next.config.js             # Next.js configuration
├── package.json               # Dependencies and scripts
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or **yarn** or **pnpm**
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/amilcar-laniakea/nextjs-crm-lite-app.git
   cd nextjs-crm-lite-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env file in the root directory
   touch .env
   ```

   Add the following environment variables:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1
   ```

4. **Set up Git hooks (for development)**
   ```bash
   npm run prepare
   ```

### Development

1. **Start the development server**

   ```bash
   npm run start:dev
   ```

   The application will be available at
   [http://localhost:4001](http://localhost:4001)

2. **Build for production**

   ```bash
   npm run build
   ```

3. **Start production server**
   ```bash
   npm start
   ```

### Available Scripts

| Script                 | Description                           |
| ---------------------- | ------------------------------------- |
| `npm run start:dev`    | Start development server on port 4001 |
| `npm run build`        | Build the application for production  |
| `npm start`            | Start the production server           |
| `npm run lint`         | Run ESLint to check code quality      |
| `npm run lint:fix`     | Fix ESLint issues automatically       |
| `npm run format`       | Format code with Prettier             |
| `npm run format:check` | Check if code is properly formatted   |

## 🔧 Development Workflow

### Code Quality

- **Pre-commit hooks** automatically run linting and formatting
- **Commit message validation** enforces conventional commits
- **CI/CD pipeline** runs tests and builds on every push/PR

### Conventional Commits

This project uses conventional commits. Examples:

```bash
feat: add user authentication system
fix: resolve login redirect issue
docs: update README with setup instructions
style: format code with prettier
refactor: reorganize component structure
```

### Git Workflow

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes following the code quality standards
3. Commit using conventional commit format
4. Push and create a Pull Request

## 🏗️ Architecture

### Feature-based Structure

The project follows a feature-based architecture with modules for different
functionalities:

- **Authentication**: Sign-in/sign-up with JWT tokens
- **Dashboard**: Protected routes with user session management
- **UI Components**: Reusable component library
- **Hooks**: Custom React hooks for common functionality

### Authentication Flow

1. User signs in with email/password
2. JWT token is stored in secure HTTP-only cookies
3. Server-side session validation on protected routes
4. Automatic token refresh and expiration handling

## 🎨 UI Components

The project includes 40+ UI components based on shadcn/ui:

- **Layout**: Sidebar, Navigation, Breadcrumbs
- **Forms**: Input, Textarea, Select, Checkbox, Radio
- **Feedback**: Alert, Toast, Progress, Skeleton
- **Overlay**: Dialog, Sheet, Popover, Tooltip
- **Data Display**: Table, Card, Avatar, Badge
- **Navigation**: Tabs, Pagination, Command
- **Charts**: Various chart components for data visualization

## 📱 Responsive Design

- Mobile-first approach
- Responsive breakpoints using Tailwind CSS
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **HTTP-only Cookies**: Prevent XSS attacks
- **CSRF Protection**: Same-site cookie policy
- **Input Validation**: Zod schema validation
- **Type Safety**: Full TypeScript implementation

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Other Platforms

The application can be deployed to any platform that supports Node.js:

- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the code quality standards
4. Write meaningful commit messages
5. Create a Pull Request

## 📄 License

This project is private and proprietary.

## 🐛 Issues & Support

If you encounter any issues or need support, please create an issue in the
GitHub repository.

---

Built with ❤️ by [Amilcar Barahona](https://github.com/amilcar-laniakea)
