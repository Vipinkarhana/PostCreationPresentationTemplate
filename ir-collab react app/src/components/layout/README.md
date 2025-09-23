# Layout Components - Navigation and Structure

## 📁 Overview

Layout components provide the consistent navigation and structural elements that appear across all pages of the IR Collab platform. These components handle the global user interface, navigation, and responsive layout behavior.

## 🗂 Component Files

```
layout/
├── Header.tsx              # Top navigation bar
├── Sidebar.tsx             # Left navigation sidebar
├── RightSidebar.tsx        # Right information sidebar
└── README.md               # This documentation
```

## 🏗 Component Specifications

### Header.tsx

**Purpose**: Main navigation bar with search, notifications, and user controls

#### Props Interface

```typescript
interface HeaderProps {
  user?: {
    name: string;
    avatar: string;
    notifications?: number;
  };
}
```

#### Key Features

- **Search Functionality**: Global search input with search icon
- **Navigation Links**: Quick access to main sections
- **Notifications**: Badge with unread count
- **User Menu**: Profile access and settings
- **Responsive Design**: Mobile-friendly navigation

#### Implementation Details

```typescript
const Header = ({ user }: HeaderProps) => {
  // Search state management
  const [searchQuery, setSearchQuery] = useState("");

  // Responsive navigation
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Navigation content */}
    </header>
  );
};
```

#### Styling Features

- **Sticky Positioning**: Remains at top when scrolling
- **High Z-Index**: Stays above other content
- **Clean Border**: Subtle border for visual separation
- **Responsive Layout**: Adapts to different screen sizes

### Sidebar.tsx

**Purpose**: Left navigation menu with main application sections

#### Props Interface

```typescript
// Currently no props - navigation is static
// Future: active route highlighting, user permissions
```

#### Navigation Structure

- **Feeds**: Home/main feed (active by default)
- **Network**: Researcher connections
- **Projects**: Project management
- **Messages**: Communication hub
- **Ecosystem**: Resources and tools

#### Key Features

- **Icon Integration**: SVG icons for each navigation item
- **Active State**: Visual indication of current page
- **Responsive Behavior**: Hidden on mobile (`hidden lg:block`)
- **Hover Effects**: Interactive feedback on navigation items

#### Implementation Details

```typescript
const Sidebar = () => {
  const navigationItems = [
    { name: "Feeds", href: "/feeds", icon: "HomeIcon", active: true },
    { name: "Network", href: "/network", icon: "UsersIcon", active: false },
    // ... other items
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200">
      {/* Navigation menu */}
    </aside>
  );
};
```

#### Styling Features

- **Fixed Width**: 256px (w-64) consistent width
- **Full Height**: h-screen for full viewport height
- **Border Separation**: Right border for visual distinction
- **Hover Animations**: Smooth transitions on interaction

### RightSidebar.tsx

**Purpose**: Secondary information panel with trending content and suggestions

#### Props Interface

```typescript
// Currently no props - content is static
// Future: dynamic trending topics, personalized suggestions
```

#### Content Sections

- **Trending Topics**: Popular research areas and discussions
- **Suggested Connections**: Recommended researchers to connect with
- **Recent Activity**: Updates from network
- **Quick Actions**: Shortcuts to common tasks

#### Key Features

- **Dynamic Content**: Placeholder for trending and suggested content
- **Responsive Design**: Hidden on smaller screens (`hidden xl:block`)
- **Card-Based Layout**: Organized content sections
- **Interactive Elements**: Clickable suggestions and topics

#### Implementation Details

```typescript
const RightSidebar = () => {
  // Future: dynamic content loading
  const trendingTopics = [
    "Machine Learning",
    "Climate Research",
    "Biotechnology",
    // ... more topics
  ];

  return (
    <aside className="w-80 h-screen bg-gray-50 p-6">
      {/* Trending and suggestions content */}
    </aside>
  );
};
```

#### Styling Features

- **Wider Layout**: 320px (w-80) for content display
- **Light Background**: Gray-50 for visual distinction
- **Padding**: Consistent spacing throughout
- **Card Sections**: Organized content blocks

## 🎨 Design System

### Layout Grid

```
┌─────────────────────────────────────────────────────────┐
│                      Header (Fixed)                     │
├─────────────┬─────────────────────────┬─────────────────┤
│   Sidebar   │      Main Content       │   RightSidebar  │
│  (w-64)     │       (flex-1)          │     (w-80)      │
│             │                         │                 │
│             │                         │                 │
└─────────────┴─────────────────────────┴─────────────────┘
```

### Responsive Behavior

- **Mobile (< 1024px)**: Only main content visible
- **Desktop (≥ 1024px)**: Sidebar + main content
- **Wide Screen (≥ 1280px)**: All three columns visible

### Color Scheme

- **Header**: White background with gray border
- **Sidebar**: White background with gray border
- **RightSidebar**: Light gray background
- **Hover States**: Gray-50 to Gray-100 transitions

## 🔧 Technical Implementation

### State Management

- **Local State**: Each component manages its own interaction state
- **No Global State**: Currently no shared state between layout components
- **Future Enhancement**: Consider global state for user preferences, notifications

### Responsive Design

```typescript
// Responsive visibility classes
<div className="hidden lg:block">      {/* Sidebar */}
<div className="flex-1">              {/* Main content - always visible */}
<div className="hidden xl:block">     {/* RightSidebar */}
```

### Accessibility Features

- **Semantic HTML**: Proper use of `<header>`, `<aside>`, `<nav>` elements
- **Keyboard Navigation**: Tab order and focus management
- **ARIA Labels**: Screen reader support for navigation
- **Color Contrast**: Meets WCAG guidelines

## 📱 Responsive Breakpoints

### Mobile (< 1024px)

- Header: Full width, compact navigation
- Sidebar: Hidden
- Main Content: Full width
- RightSidebar: Hidden

### Desktop (1024px - 1279px)

- Header: Full width
- Sidebar: Visible (256px)
- Main Content: Remaining width
- RightSidebar: Hidden

### Wide Screen (≥ 1280px)

- Header: Full width
- Sidebar: Visible (256px)
- Main Content: Flexible width
- RightSidebar: Visible (320px)

## 🛠 Development Guidelines

### Adding Navigation Items

1. **Update Sidebar.tsx**:

   ```typescript
   const navigationItems = [
     // ... existing items
     { name: "New Section", href: "/new-section", icon: "NewIcon" },
   ];
   ```

2. **Add Icon SVG**: Include appropriate icon in the component

3. **Update Active State Logic**: Implement active route detection

### Customizing Layout

- **Header Height**: Modify `h-16` class for different header heights
- **Sidebar Width**: Change `w-64` for different sidebar widths
- **Breakpoints**: Adjust responsive classes for different breakpoints

### Adding User Context

```typescript
// Future implementation for user-specific content
interface UserContextProps {
  user: User;
  permissions: Permission[];
  preferences: UserPreferences;
}
```

## 🔄 Future Enhancements

### Planned Features

1. **Active Route Detection**: Highlight current page in navigation
2. **User Preferences**: Collapsible sidebar, theme selection
3. **Notification System**: Real-time notification management
4. **Search Integration**: Global search with results preview
5. **Mobile Menu**: Hamburger menu for mobile navigation

### Integration Points

- **Authentication**: User context and permissions
- **Real-time Updates**: WebSocket integration for notifications
- **Theme System**: Dark/light mode support
- **Internationalization**: Multi-language support

## 📋 Usage Examples

### Basic Implementation

```typescript
// In any page component
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import RightSidebar from "@/components/layout/RightSidebar";

export default function PageComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header user={currentUser} />
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main className="flex-1 min-h-screen">{/* Page content */}</main>
        <div className="hidden xl:block">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
```

### With Custom User Data

```typescript
const userData = {
  name: "Dr. Sarah Chen",
  avatar: "/api/placeholder/48/48",
  notifications: 3,
};

<Header user={userData} />;
```

## 🎯 Performance Considerations

### Optimization Strategies

- **Static Components**: Layout components are mostly static, minimal re-renders
- **Icon Optimization**: SVG icons are inlined for performance
- **CSS-in-JS**: Tailwind CSS is optimized and purged automatically
- **Responsive Images**: Use Next.js Image component for avatars

### Memory Management

- **No Memory Leaks**: Components properly clean up any event listeners
- **State Cleanup**: Local state is automatically cleaned up on unmount
- **Event Handling**: Efficient event delegation where applicable

---

**For Developers**: These layout components provide the foundation for all pages. Follow the established patterns for consistent user experience and maintain the responsive design principles when making modifications.
