# Attendify - Attendance Management System

## Introduction

Attendify is a modern web application designed to efficiently manage attendance tracking. Built with Next.js and React,
the system provides a user-friendly interface with comprehensive features for monitoring student/employee participation.

## Key Features

- **User Authentication**: Secure login/registration
- **Intuitive Dashboard**: Overview of attendance data
- **Attendance Management**: Create, edit, and track attendance information
- **Statistical Reports**: Data analysis with visual charts (Recharts)
- **User-Friendly Interface**: Modern design with Tailwind CSS and Radix UI
- **Multi-Device Experience**: Compatible across various screen sizes

## Technologies Used

- **Frontend**: Next.js 15.3.4, React 19.0.0
- **State Management**: Zustand
- **UI Components**:
    - Radix UI (Checkbox, Dropdown, Dialog, etc.)
    - Tailwind CSS
    - Lucide React (Icons)

- **Forms & Validation**: React Hook Form
- **HTTP Client**: Axios
- **Dates & Time**: date-fns
- **Data Tables**: TanStack Table
- **Charts**: Recharts
- **Notifications**: React Toastify

## Installation

``` bash
# Clone repository
git clone https://github.com/your-username/attendify-frontend.git

# Navigate to project directory
cd attendify-frontend

# Install dependencies
npm install

# Start development environment
npm run dev
```

## Project Structure

``` 
attendify-frontend/
├── public/                 # Static resources
├── src/                    # Source code
│   ├── app/                # Next.js app router
│   │   ├── (auth)/         # Authentication related routes
│   │   └── (dashboard)/    # Dashboard routes
│   ├── components/         # React components
│   ├── lib/                # Libraries and utilities
│   ├── stores/             # State management (Zustand)
│   ├── services/           # API services
│   ├── types/              # TypeScript type definitions
│   ├── helpers/            # Helper functions
│   ├── middleware.ts       # Next.js middleware
│   └── axiosInstance.ts    # Axios configuration
├── .eslintrc.js            # ESLint configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Scripts

- `npm run dev` - Start development environment with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Run the built application
- `npm run lint` - Check for errors with ESLint

## System Requirements

- Node.js 18.x or higher
- npm 9.x or higher

## Contributing

We welcome all contributions! Please read the [contribution guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the [MIT License](LICENSE).
Developed by [nhdhieuu](https://github.com/nhdhieuu) © 2025
