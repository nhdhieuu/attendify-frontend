# 🎯 Attendify - Smart Attendance Management System

<div align="center">

![Attendify Logo](https://img.shields.io/badge/Attendify-Attendance%20Management-blue?style=for-the-badge&logo=calendar&logoColor=white)

**A modern, intuitive web application for efficient attendance tracking and management**

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Latest-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[🚀 Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>

---

## ✨ Overview

Attendify revolutionizes attendance management with a sleek, modern interface built on cutting-edge web technologies.
Whether you're managing students or employees, Attendify provides comprehensive tracking capabilities with powerful
analytics and reporting features.

### 🎨 Key Highlights

- 🔐 **Secure Authentication** - Robust login/registration system
- 📊 **Interactive Dashboard** - Real-time attendance overview with stunning visualizations
- ⚡ **Smart Management** - Create, edit, and track attendance with ease
- 📈 **Advanced Analytics** - Detailed statistical reports with beautiful charts
- 🎯 **Modern UI/UX** - Sleek design powered by Tailwind CSS and Radix UI
- 📱 **Responsive Design** - Perfect experience across all devices

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="33%">

### 🎨 Frontend

- **Next.js** `15.3.4` - React framework
- **React** `19.0.0` - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Component primitives

</td>
<td valign="top" width="33%">

### 📊 State & Data

- **Zustand** - State management
- **React Hook Form** - Form handling
- **TanStack Table** - Data tables
- **Axios** - HTTP client
- **date-fns** - Date utilities

</td>
<td valign="top" width="33%">

### 📈 Visualization & UX

- **Recharts** - Interactive charts
- **Lucide React** - Beautiful icons
- **React Toastify** - Notifications
- **Radix Dialog** - Modal system
- **Responsive Design** - Mobile-first

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** `18.x` or higher
- **npm** `9.x` or higher

### Installation Steps

```bash
# 📥 Clone the repository
git clone https://github.com/your-username/attendify-frontend.git

# 📂 Navigate to project directory
cd attendify-frontend

# 📦 Install dependencies
npm install

# 🔥 Start development server
npm run dev
```

> 🎉 **Success!** Your application will be running at `http://localhost:3000`

---

## 📁 Project Architecture

```
📦 attendify-frontend/
├── 🌐 public/                 # Static assets & resources
├── 📱 src/                    # Application source code
│   ├── 🏠 app/                # Next.js App Router
│   │   ├── 🔐 (auth)/         # Authentication routes
│   │   └── 📊 (dashboard)/    # Dashboard & main routes
│   ├── 🧩 components/         # Reusable React components
│   ├── 📚 lib/                # Utilities & configurations
│   ├── 🗃️ stores/             # Zustand state stores
│   ├── 🌐 services/           # API service layer
│   ├── 📝 types/              # TypeScript definitions
│   ├── 🔧 helpers/            # Helper functions
│   ├── 🛡️ middleware.ts       # Next.js middleware
│   └── 🌐 axiosInstance.ts    # HTTP client config
├── ⚙️ Configuration Files
│   ├── 📋 .eslintrc.js        # Code linting rules
│   ├── ⚡ next.config.ts      # Next.js configuration
│   ├── 🎨 tailwind.config.js  # Tailwind CSS setup
│   └── 📘 tsconfig.json       # TypeScript config
└── 📄 package.json            # Dependencies & scripts
```

---

## 🔧 Available Scripts

| Command | Description                                | Usage           |
|---------|--------------------------------------------|-----------------|
| `dev`   | 🔥 Start development server with Turbopack | `npm run dev`   |
| `build` | 🏗️ Build optimized production bundle      | `npm run build` |
| `start` | 🚀 Run production server                   | `npm run start` |
| `lint`  | 🔍 Check code quality with ESLint          | `npm run lint`  |

---

## 🌟 Features in Detail

<details>
<summary><strong>🔐 Authentication System</strong></summary>

- Secure user registration and login
- JWT token-based authentication
- Password reset functionality
- Role-based access control

</details>

<details>
<summary><strong>📊 Dashboard Analytics</strong></summary>

- Real-time attendance statistics
- Interactive charts and graphs
- Attendance trend analysis
- Export capabilities for reports

</details>

<details>
<summary><strong>👥 User Management</strong></summary>

- Add/edit student or employee profiles
- Bulk import functionality
- Advanced search and filtering
- Profile photo management

</details>

<details>
<summary><strong>📱 Mobile Experience</strong></summary>

- Fully responsive design
- Touch-optimized interface
- Offline capability (coming soon)
- Progressive Web App features

</details>

---

## 🤝 Contributing

We love contributions! Here's how you can help make Attendify even better:

1. **🍴 Fork** the repository
2. **🌿 Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **💾 Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **📤 Push** to the branch (`git push origin feature/AmazingFeature`)
5. **🔄 Open** a Pull Request

### 📋 Development Guidelines

- Follow TypeScript best practices
- Maintain consistent code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License & Credits

<div align="center">

**MIT License** © 2025

Crafted with ❤️ by [nhdhieuu](https://github.com/nhdhieuu)

---

### 🙏 Acknowledgments

Thanks to all the amazing open-source projects that make Attendify possible!

[⭐ Star this repo](https://github.com/nhdhieuu/attendify-frontend) • [🐛 Report Issues](https://github.com/nhdhieuu/attendify-frontend/issues) • [💬 Discussions](https://github.com/nhdhieuu/attendify-frontend/discussions)

</div>

---

<div align="center">
<sub>Built with modern web technologies for the future of attendance management</sub>
</div>