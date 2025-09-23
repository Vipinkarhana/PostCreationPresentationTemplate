# UI Components - Reusable Interface Elements

## 📁 Overview

This directory is prepared for reusable UI components that will be used across the IR Collab platform. These components will provide consistent interface elements and interaction patterns throughout the application.

## 🗂 Planned Directory Structure

```
ui/
├── Button/                 # Button component with variants
│   ├── Button.tsx         # Main button component
│   ├── ButtonGroup.tsx    # Button group component
│   └── index.ts           # Export barrel
├── Input/                  # Form input components
│   ├── TextInput.tsx      # Text input field
│   ├── TextArea.tsx       # Multi-line text input
│   ├── Select.tsx         # Dropdown select
│   └── index.ts           # Export barrel
├── Modal/                  # Dialog and overlay components
│   ├── Modal.tsx          # Base modal component
│   ├── Dialog.tsx         # Dialog variant
│   ├── Overlay.tsx        # Background overlay
│   └── index.ts           # Export barrel
├── Card/                   # Generic card components
│   ├── Card.tsx           # Base card component
│   ├── CardHeader.tsx     # Card header section
│   ├── CardBody.tsx       # Card body section
│   └── index.ts           # Export barrel
├── Badge/                  # Status and label badges
│   ├── Badge.tsx          # Badge component
│   ├── StatusBadge.tsx    # Status indicator badge
│   └── index.ts           # Export barrel
├── Loading/                # Loading states and spinners
│   ├── Spinner.tsx        # Loading spinner
│   ├── Skeleton.tsx       # Skeleton loader
│   ├── ProgressBar.tsx    # Progress indicator
│   └── index.ts           # Export barrel
├── Notification/           # Toast and alert components
│   ├── Toast.tsx          # Toast notification
│   ├── Alert.tsx          # Alert message
│   └── index.ts           # Export barrel
└── README.md               # This documentation
```

## 🎨 Design System Principles

### Component Design Guidelines

- **Consistency**: All components follow the same design patterns
- **Accessibility**: WCAG compliant with proper ARIA attributes
- **Responsiveness**: Mobile-first responsive design
- **Themability**: Support for the established gradient theme system
- **Composability**: Components can be combined to create complex UIs

### Design Tokens

```typescript
// Color system based on existing themes
const colors = {
  primary: {
    50: "#eff6ff",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    600: "#4b5563",
    900: "#111827",
  },
  // Gradient themes from post types
  gradients: {
    research: "from-blue-500 via-blue-600 to-indigo-700",
    collaboration: "from-green-500 via-teal-500 to-cyan-600",
    // ... other themes
  },
};
```

### Typography Scale

```typescript
const typography = {
  sizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
  },
  weights: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
};
```

## 🔧 Component Specifications

### Button Component

**Purpose**: Reusable button with multiple variants and states

#### Planned Interface

```typescript
interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  theme?: "research" | "collaboration" | "announcement" | string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}
```

#### Planned Variants

- **Primary**: Main action buttons with gradient backgrounds
- **Secondary**: Secondary actions with solid colors
- **Outline**: Border-only buttons for subtle actions
- **Ghost**: Text-only buttons for minimal interface
- **Danger**: Red-themed buttons for destructive actions

### Input Components

**Purpose**: Form input components with consistent styling

#### Planned Components

- **TextInput**: Single-line text input with validation
- **TextArea**: Multi-line text input for longer content
- **Select**: Dropdown selection with search capability
- **Checkbox**: Checkbox input with custom styling
- **Radio**: Radio button groups with proper grouping

#### Planned Interface

```typescript
interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  helperText?: string;
}
```

### Modal System

**Purpose**: Dialog and overlay system for complex interactions

#### Planned Components

- **Modal**: Base modal with backdrop and positioning
- **Dialog**: Confirmation and form dialogs
- **Drawer**: Side panel for navigation or forms
- **Popover**: Contextual content display

#### Planned Interface

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  children: React.ReactNode;
}
```

### Card System

**Purpose**: Generic container components for content organization

#### Planned Features

- **Flexible Layout**: Header, body, footer sections
- **Themeable**: Support for gradient themes
- **Interactive**: Hover states and click handling
- **Responsive**: Adaptive sizing and spacing

### Loading Components

**Purpose**: Loading states and progress indicators

#### Planned Components

- **Spinner**: Animated loading spinner
- **Skeleton**: Content placeholder during loading
- **ProgressBar**: Linear progress indicator
- **LoadingOverlay**: Full-screen loading state

## 🛠 Implementation Plan

### Phase 1: Core Components

1. **Button**: Primary, secondary, outline variants
2. **Input**: TextInput and TextArea
3. **Card**: Basic card with header and body
4. **Loading**: Spinner and skeleton loaders

### Phase 2: Advanced Components

1. **Modal**: Full modal system with variants
2. **Badge**: Status and label badges
3. **Select**: Dropdown with search
4. **Notification**: Toast and alert system

### Phase 3: Complex Components

1. **DataTable**: Table with sorting and filtering
2. **DatePicker**: Date selection component
3. **ImageUpload**: File upload with preview
4. **RichTextEditor**: Advanced text editing

## 🎯 Usage Patterns

### Component Composition

```typescript
// Example: Using multiple UI components together
import { Button, Modal, Input, Card } from "@/components/ui";

const CreateProjectModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <Card>
        <Input
          label="Project Name"
          placeholder="Enter project name"
          value={projectName}
          onChange={setProjectName}
        />
        <Button variant="primary" theme="collaboration" onClick={handleCreate}>
          Create Project
        </Button>
      </Card>
    </Modal>
  );
};
```

### Theme Integration

```typescript
// Using gradient themes from post types
<Button
  variant="primary"
  theme="research"
  className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700"
>
  Research Action
</Button>
```

## 📋 Development Guidelines

### Component Structure

```typescript
// Standard component structure
interface ComponentProps {
  // Props definition
}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ prop1, prop2, ...rest }, ref) => {
    // Component logic

    return (
      <element ref={ref} {...rest}>
        {/* Component JSX */}
      </element>
    );
  }
);

Component.displayName = "Component";

export default Component;
```

### Export Pattern

```typescript
// index.ts in each component directory
export { default as Button } from "./Button";
export { default as ButtonGroup } from "./ButtonGroup";
export type { ButtonProps, ButtonGroupProps } from "./types";
```

### Testing Strategy

- **Unit Tests**: Jest and React Testing Library
- **Visual Tests**: Storybook for component documentation
- **Accessibility Tests**: Automated a11y testing
- **Integration Tests**: Component interaction testing

## 🔄 Future Integration

### With Existing Components

- **Replace inline buttons** in CreatePost and PostCard with Button component
- **Standardize inputs** across all forms
- **Consistent modals** for all dialog interactions
- **Unified card design** for posts and other content

### API Integration

- **Loading states** during API calls
- **Error handling** with notification components
- **Form validation** with input error states
- **Success feedback** with toast notifications

## 🎨 Storybook Integration

### Planned Documentation

```typescript
// Button.stories.tsx example
export default {
  title: "UI/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: "Reusable button component with multiple variants",
      },
    },
  },
};

export const Primary = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const WithGradientTheme = {
  args: {
    variant: "primary",
    theme: "research",
    children: "Research Button",
  },
};
```

## 📞 Getting Started

### For Implementation

1. **Choose a component** from Phase 1 to implement first
2. **Follow the interface design** outlined above
3. **Use existing theme system** from the feeds components
4. **Implement accessibility features** from the start
5. **Add TypeScript types** for all props and variants
6. **Create usage examples** in the component documentation

### For Usage

1. **Import from ui directory**: `import { Button } from '@/components/ui'`
2. **Follow established patterns** from existing component usage
3. **Use TypeScript types** for proper autocomplete and validation
4. **Refer to documentation** for component-specific guidelines

---

**Status**: Directory prepared for implementation  
**Priority**: Implement core components (Button, Input, Card, Loading) first  
**Integration**: Replace existing inline components with standardized UI components
