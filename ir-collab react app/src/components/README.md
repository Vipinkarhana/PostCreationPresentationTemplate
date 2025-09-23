# Components Directory - Reusable React Components

## 📁 Overview

This directory contains all reusable React components organized by functionality. Components are built with TypeScript, Tailwind CSS, and follow modern React patterns with hooks.

## 🗂 Directory Structure

```
components/
├── layout/                 # Layout and navigation components
│   ├── Header.tsx         # Top navigation bar
│   ├── Sidebar.tsx        # Left navigation sidebar
│   ├── RightSidebar.tsx   # Right information sidebar
│   └── README.md          # Layout components documentation
├── feeds/                  # Feed-related components
│   ├── CreatePost.tsx     # Post creation with presentation builder
│   ├── PostCard.tsx       # Individual post display
│   ├── FeedControls.tsx   # Feed filtering and controls
│   └── README.md          # Feed components documentation
└── ui/                     # Reusable UI components (future)
    └── README.md          # UI components documentation
```

## 🏗 Component Architecture

### Design Principles

- **Single Responsibility**: Each component has one clear purpose
- **Reusability**: Components can be used across multiple pages
- **Type Safety**: All components use TypeScript interfaces
- **Responsive Design**: Mobile-first responsive approach
- **Accessibility**: Following WCAG guidelines where applicable

### Component Patterns

#### 1. Interface Definition

```typescript
interface ComponentProps {
  // Required props
  requiredProp: string;
  // Optional props with defaults
  optionalProp?: boolean;
  // Callback functions
  onAction?: (data: any) => void;
}
```

#### 2. Component Structure

```typescript
const Component = ({
  requiredProp,
  optionalProp = false,
  onAction,
}: ComponentProps) => {
  // State management
  const [state, setState] = useState(initialValue);

  // Event handlers
  const handleEvent = () => {
    // Logic here
    onAction?.(data);
  };

  // Render
  return <div className="tailwind-classes">{/* Component JSX */}</div>;
};

export default Component;
```

#### 3. Export Pattern

```typescript
export default ComponentName;
// Named exports for utilities if needed
export { helperFunction, constants };
```

## 📦 Component Categories

### Layout Components (`layout/`)

**Purpose**: Provide consistent layout structure across all pages
**Characteristics**:

- Fixed positioning and responsive behavior
- Navigation and user interface elements
- Global state management (user info, notifications)
- Consistent styling and branding

**Dependencies**: Shared across all pages

### Feed Components (`feeds/`)

**Purpose**: Handle all feed-related functionality
**Characteristics**:

- Post creation and display
- User interactions (likes, comments, shares)
- Presentation system integration
- Real-time updates and state management

**Dependencies**: Used primarily in feeds page, may be reused in other pages

### UI Components (`ui/`)

**Purpose**: Reusable interface elements (future implementation)
**Intended Components**:

- Buttons with different variants
- Input fields and form elements
- Modal dialogs and overlays
- Loading states and spinners
- Notification systems

**Status**: Directory created for future expansion

## 🔧 Technical Specifications

### State Management

- **Local State**: React `useState` for component-specific state
- **Prop Drilling**: For simple parent-child communication
- **Callback Functions**: For child-to-parent communication
- **Future**: Consider global state management for complex cross-component state

### Styling Approach

- **Tailwind CSS**: Utility-first styling approach
- **Responsive Design**: Mobile-first with `lg:` and `xl:` breakpoints
- **Gradient Themes**: Consistent color themes across components
- **Hover Effects**: Smooth transitions and interactive feedback

### Performance Considerations

- **React.memo**: For components that re-render frequently
- **useMemo/useCallback**: For expensive calculations or callback stability
- **Code Splitting**: Components are automatically split by Next.js
- **Lazy Loading**: Consider for heavy components in the future

## 🎨 Design System Integration

### Color Themes

Components use the established gradient theme system:

```typescript
const themes = {
  research: "from-blue-500 via-blue-600 to-indigo-700",
  question: "from-purple-500 via-pink-500 to-red-500",
  collaboration: "from-green-500 via-teal-500 to-cyan-600",
  // ... other themes
};
```

### Spacing and Layout

- **Consistent Spacing**: Using Tailwind's spacing scale (p-4, m-6, etc.)
- **Grid System**: CSS Grid and Flexbox for layout
- **Responsive Containers**: `max-w-4xl mx-auto` pattern for content width
- **Consistent Borders**: Rounded corners and shadow system

### Typography

- **Font Family**: Inter font loaded globally
- **Font Weights**: Consistent use of `font-medium`, `font-semibold`, `font-bold`
- **Text Sizing**: Responsive text sizes with appropriate line heights
- **Color Hierarchy**: Gray-900 for primary text, gray-600 for secondary

## 🛠 Development Workflow

### Adding New Components

1. **Create Component File**

   ```bash
   # In appropriate directory
   touch ComponentName.tsx
   ```

2. **Define Interface**

   ```typescript
   interface ComponentNameProps {
     // Define all props
   }
   ```

3. **Implement Component**

   ```typescript
   const ComponentName = (props: ComponentNameProps) => {
     // Implementation
   };
   ```

4. **Export and Document**
   ```typescript
   export default ComponentName;
   // Add to README if needed
   ```

### Testing Components

- **Visual Testing**: Test in development server
- **Responsive Testing**: Check mobile, tablet, desktop views
- **Interaction Testing**: Verify all interactive elements
- **TypeScript Validation**: Ensure no type errors

### Component Documentation

- **Props Interface**: Document all props with comments
- **Usage Examples**: Include in component README
- **Dependencies**: List any external dependencies
- **Known Issues**: Document any limitations or bugs

## 📋 Current Implementation Status

### ✅ Completed Components

#### Layout Components

- **Header**: Full navigation with search, notifications, user menu
- **Sidebar**: Navigation menu with active state management
- **RightSidebar**: Trending topics, suggested connections

#### Feed Components

- **CreatePost**: Complete post creation with 8 post types
- **PostCard**: Full post display with interactions and presentations
- **FeedControls**: Filtering, sorting, and feed management

### 🔄 Future Components

#### UI Components (Planned)

- **Button**: Reusable button with variants
- **Input**: Form input components
- **Modal**: Dialog and overlay system
- **Card**: Generic card component
- **Badge**: Status and label badges

#### Feature Components (Planned)

- **NetworkCard**: For network page connections
- **ProjectCard**: For project management
- **MessageThread**: For messaging system
- **ResourceCard**: For ecosystem resources

## 🎯 Best Practices

### Component Design

- **Keep Components Small**: Single responsibility principle
- **Use TypeScript**: Always define interfaces for props
- **Handle Edge Cases**: Consider loading, error, and empty states
- **Accessibility**: Include proper ARIA labels and keyboard navigation

### State Management

- **Local State First**: Use component state when possible
- **Lift State Up**: Move state to parent when shared between siblings
- **Avoid Prop Drilling**: Consider context or state management libraries for deep hierarchies

### Performance

- **Minimize Re-renders**: Use React.memo for expensive components
- **Optimize Images**: Use Next.js Image component when applicable
- **Bundle Size**: Keep component dependencies minimal

### Code Quality

- **Consistent Naming**: Use descriptive component and prop names
- **Error Boundaries**: Implement error handling for robust components
- **Documentation**: Update README files when adding new components

---

**For New Developers**: Start by examining the existing components in `layout/` and `feeds/` directories to understand the established patterns, then follow the same structure for new components.
