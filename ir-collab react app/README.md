# IR Collab - Research Collaboration Platform

## 🔬 Project Overview

IR Collab is a modern research collaboration platform built with Next.js 15, TypeScript, and Tailwind CSS. It enables researchers to share findings, collaborate on projects, and create interactive presentations within a professional academic environment.

## 🚀 Key Features

- **Multi-Type Post System**: 8 specialized post types (Research Paper, Question, Collaboration, Announcement, Discussion, Dataset, Funding, Publication)
- **Interactive Presentations**: Built-in presentation builder with 6 layout types and auto-generated templates
- **Canva-Inspired Design**: Colorful, modern UI with gradient themes and animations
- **Real-Time Collaboration**: Post feeds with commenting, sharing, and interaction features
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🛠 Tech Stack

### Core Technologies

- **Next.js 15.5.3**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React 18**: Modern React with hooks and concurrent features

### Architecture

- **Component-Based**: Modular, reusable components
- **Client-Side State**: React hooks for state management
- **Type Safety**: Comprehensive TypeScript interfaces
- **Responsive Design**: Mobile-first responsive layouts

## 📁 Project Structure

```
ir-collab-react-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── feeds/             # Home feeds page
│   │   ├── network/           # Network/connections page
│   │   ├── projects/          # Projects page
│   │   ├── messages/          # Messages page
│   │   ├── ecosystem/         # Ecosystem page
│   │   └── layout.tsx         # Root layout
│   └── components/            # Reusable components
│       ├── layout/            # Layout components (Header, Sidebar)
│       ├── feeds/             # Feed-related components
│       └── ui/                # UI components (future)
├── public/                    # Static assets
└── README files in each folder # Detailed documentation
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development Server

- **Local**: http://localhost:3000 (or 3001 if 3000 is in use)
- **Network**: Available on local network

## 🎨 Design System

### Post Type Themes

Each post type has its own gradient theme:

- **Research**: Blue to Indigo gradient
- **Question**: Purple to Pink gradient
- **Collaboration**: Green to Teal gradient
- **Announcement**: Yellow to Orange gradient
- **Discussion**: Pink to Purple gradient
- **Dataset**: Cyan to Blue gradient
- **Funding**: Orange to Red gradient
- **Publication**: Indigo to Purple gradient

### Presentation System

- **6 Layout Types**: title-content, split-view, full-image, bullet-points, chart-focus, quote-highlight
- **Auto-Generated Templates**: Smart templates based on post type
- **Interactive Preview**: Cinema-quality slide previews
- **Professional Styling**: Gradient backgrounds and modern animations

## 📋 Current Implementation Status

### ✅ Completed Features

- [x] Home Feeds page with full functionality
- [x] Multi-type post creation system (8 types)
- [x] Interactive presentation builder with 6 layouts
- [x] Auto-generated presentation templates for all post types
- [x] Responsive layout components (Header, Sidebar, RightSidebar)
- [x] Post interaction system (like, comment, share, bookmark)
- [x] Real-time post creation and display in feeds
- [x] Professional post cards with presentation previews

### 🔄 Placeholder Pages (Ready for Implementation)

- [ ] Network/connections page
- [ ] Projects management system
- [ ] Messages/chat functionality
- [ ] Ecosystem marketplace

### 📝 Future Enhancements

- [ ] Real-time collaboration features
- [ ] Advanced search and filtering
- [ ] File upload and management
- [ ] User authentication and profiles
- [ ] API integration and database connectivity
- [ ] Real-time notifications
- [ ] Advanced presentation features

## 🤝 For New Developers

### Quick Start Guide

1. **Read Documentation**: Check README files in each src/ folder
2. **Understand Architecture**: Review component structure and patterns
3. **Run Locally**: `npm install && npm run dev`
4. **Explore Features**: Test post creation and presentation builder
5. **Check Code Patterns**: Follow existing TypeScript and component patterns

### Key Files to Review

- `src/components/feeds/CreatePost.tsx` - Main post creation with presentations
- `src/components/feeds/PostCard.tsx` - Post display with presentation previews
- `src/app/feeds/page.tsx` - Main feeds page implementation
- `src/components/layout/` - Layout components for consistent UI

### Development Guidelines

- **TypeScript**: All components must be properly typed
- **Component Props**: Use interfaces for all prop definitions
- **State Management**: React hooks for local state
- **Styling**: Tailwind CSS with gradient themes
- **Performance**: Consider component optimization and code splitting

## 📞 Documentation Structure

Each folder contains detailed README files:

- `src/app/README.md` - App Router pages and routing
- `src/components/README.md` - Component architecture overview
- `src/components/layout/README.md` - Layout component specifications
- `src/components/feeds/README.md` - Feed system detailed documentation
- `src/components/ui/README.md` - UI component library (future)

## 🎯 Project Goals

**Immediate**: Complete remaining page implementations following the established patterns
**Short-term**: Add real-time features and API integration
**Long-term**: Scale to support large research communities with advanced collaboration tools

---

**Version**: 0.1.0 (Active Development)
**Last Updated**: September 23, 2025
**Team**: Research Collaboration Platform Development

## 🚀 Features

### Current Implementation (Home Feeds)

- **Responsive Header** with navigation, search, and user profile
- **Three-column Layout** with left sidebar, main content, and right sidebar
- **Post Creation** with multiple post types (Project, Case Study, Research, Discussion, Milestone)
- **Feed Controls** with filtering, sorting, and live updates
- **Interactive Post Cards** with likes, comments, shares, and bookmarks
- **Real-time Features** like online status indicators and live updates toggle

### Upcoming Pages

- **Network**: Connect with researchers and build professional networks
- **Projects**: Manage research projects and collaborate with teams
- **Messages**: Real-time communication and discussion threads
- **Ecosystem**: Discover tools, resources, and opportunities

## 🛠️ Technology Stack

- **Frontend**: React 18 with Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons (via inline SVG)
- **Development**: ESLint, Hot reload

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── feeds/             # Home feeds page
│   ├── network/           # Network page
│   ├── projects/          # Projects page
│   ├── messages/          # Messages page
│   ├── ecosystem/         # Ecosystem page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (redirects to feeds)
│   └── globals.css        # Global styles
└── components/            # Reusable React components
    ├── layout/           # Layout components
    │   ├── Header.tsx    # Top navigation bar
    │   ├── Sidebar.tsx   # Left navigation sidebar
    │   └── RightSidebar.tsx # Right info sidebar
    ├── feeds/            # Feed-related components
    │   ├── CreatePost.tsx # Post creation form
    │   ├── FeedControls.tsx # Filter and sort controls
    │   └── PostCard.tsx  # Individual post display
    └── ui/               # Generic UI components (future)
```

## 🎨 Component Architecture

### Layout Components

- **Header**: Navigation, search, user profile with notifications
- **Sidebar**: Hierarchical navigation menu with categories
- **RightSidebar**: Trending topics, suggested collaborators, events

### Feed Components

- **CreatePost**: Multi-type post creation with attachments
- **FeedControls**: Filtering, sorting, and view options
- **PostCard**: Rich post display with interactions and comments

### Design Patterns

- **Props-based Data**: All components use props for data (ready for API integration)
- **TypeScript Interfaces**: Strong typing for all data structures
- **State Management**: Local state with useState (ready for global state)
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## 🚀 Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **Open Browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔄 Migration Progress

### ✅ Completed

- [x] Project setup with Next.js, TypeScript, Tailwind
- [x] Component architecture and structure
- [x] Header with navigation and search
- [x] Three-column responsive layout
- [x] Left sidebar with navigation categories
- [x] Right sidebar with trending topics and suggestions
- [x] Post creation with multiple types
- [x] Feed controls with filtering and sorting
- [x] Rich post cards with interactions
- [x] Routing structure for all pages
- [x] TypeScript interfaces for all data structures

### 🔄 Next Steps

1. **API Integration Preparation**

   - Create service layer for API calls
   - Implement global state management (React Context or Zustand)
   - Add loading states and error handling

2. **Network Page Implementation**

   - Researcher profiles and connections
   - Connection requests and suggestions
   - Search and filter researchers

3. **Enhanced Features**
   - Real-time notifications
   - File upload functionality
   - Advanced search capabilities
   - User authentication

## 📊 Best Practices Implemented

### Code Organization

- **Component Isolation**: Each component has a single responsibility
- **Type Safety**: Comprehensive TypeScript interfaces
- **Consistent Naming**: Clear, descriptive component and prop names
- **Folder Structure**: Logical grouping by feature and functionality

### Performance

- **Server Components**: Using Next.js App Router with React Server Components
- **Responsive Images**: Placeholder system ready for optimized images
- **Code Splitting**: Automatic with Next.js routing

### Accessibility

- **Semantic HTML**: Proper use of semantic elements
- **Keyboard Navigation**: Focus states and interactive elements
- **Screen Reader Friendly**: Descriptive alt texts and ARIA labels

## 🔮 Future Enhancements

### Technical

- State management (React Context/Zustand)
- API integration with loading states
- Real-time updates with WebSocket
- Image optimization and upload
- Progressive Web App (PWA) features

### Features

- Advanced search and filtering
- File sharing and collaboration tools
- Video conferencing integration
- Publication management
- Analytics dashboard

## 📄 License

This project is part of a research collaboration platform migration from HTML/CSS to React.

---

**Next Step**: Ready to implement the Network page! The foundation is solid and all components are reusable. We can now focus on building individual page features while maintaining the consistent layout and design system.
