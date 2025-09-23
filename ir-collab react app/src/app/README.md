# App Directory - Next.js App Router Pages

## 📁 Overview

This directory contains all the pages and layouts for the IR Collab platform using Next.js 15's App Router. Each subdirectory represents a route in the application.

## 🗂 Directory Structure

```
app/
├── layout.tsx              # Root layout (wraps all pages)
├── page.tsx                # Home page (redirects to /feeds)
├── globals.css             # Global CSS styles with Tailwind directives
├── feeds/                  # Home feeds page
│   └── page.tsx           # Main feeds implementation
├── network/                # Network & connections page
│   └── page.tsx           # Network page (placeholder)
├── projects/               # Projects management page
│   └── page.tsx           # Projects page (placeholder)
├── messages/               # Messages & chat page
│   └── page.tsx           # Messages page (placeholder)
└── ecosystem/              # Ecosystem & resources page
    └── page.tsx           # Ecosystem page (placeholder)
```

## 🔧 File Specifications

### layout.tsx

**Purpose**: Root layout component that wraps all pages
**Features**:

- HTML document structure
- Metadata configuration
- Font loading (Inter font family)
- Global styling application
- Consistent layout across all pages

**Key Implementations**:

```typescript
export const metadata: Metadata = {
  title: "IR Collab",
  description: "Research Collaboration Platform",
};
```

### page.tsx (Root)

**Purpose**: Home page that redirects users to the main feeds
**Functionality**:

- Automatic redirect to `/feeds`
- Entry point for the application
- SEO-friendly homepage structure

### globals.css

**Purpose**: Global styles and Tailwind CSS configuration
**Includes**:

- Tailwind CSS directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)
- Custom CSS overrides
- Global font and styling configurations

## 📄 Page Implementations

### ✅ feeds/page.tsx (COMPLETED)

**Status**: Fully implemented with all features
**Features**:

- Client-side component with state management
- Post creation with presentation builder
- Real-time feed updates
- Sample posts with presentation data
- Full integration with all components

**Key Components Used**:

- `CreatePost` - Post creation with presentations
- `PostCard` - Individual post display
- `FeedControls` - Feed filtering and controls
- `Header`, `Sidebar`, `RightSidebar` - Layout components

**State Management**:

```typescript
const [posts, setPosts] = useState(samplePosts);
const handlePostCreated = (newPost: any) => {
  setPosts([newPost, ...posts]);
};
```

### 🔄 network/page.tsx (PLACEHOLDER)

**Status**: Basic placeholder awaiting implementation
**Intended Features**:

- Researcher network and connections
- Profile discovery
- Connection requests and management
- Research interest matching
- Collaboration opportunities

**Current Implementation**: Static placeholder with basic layout

### 🔄 projects/page.tsx (PLACEHOLDER)

**Status**: Basic placeholder awaiting implementation
**Intended Features**:

- Project management dashboard
- Team collaboration tools
- Project timeline and milestones
- Resource allocation
- Progress tracking

**Current Implementation**: Static placeholder with basic layout

### 🔄 messages/page.tsx (PLACEHOLDER)

**Status**: Basic placeholder awaiting implementation
**Intended Features**:

- Real-time messaging system
- Discussion threads
- File sharing in conversations
- Group messaging for projects
- Message search and filtering

**Current Implementation**: Static placeholder with basic layout

### 🔄 ecosystem/page.tsx (PLACEHOLDER)

**Status**: Basic placeholder awaiting implementation
**Intended Features**:

- Research tools marketplace
- Resource discovery
- Service provider listings
- Equipment sharing
- Funding opportunity listings

**Current Implementation**: Static placeholder with basic layout

## 🛠 Development Guidelines

### Adding New Pages

1. Create new directory under `app/`
2. Add `page.tsx` file in the directory
3. Follow the established pattern:

   ```typescript
   "use client"; // If state/interactivity needed
   import Layout components

   export default function PageName() {
     return (
       <div>
         <Header />
         <div className="flex">
           <Sidebar />
           <main>{/* Page content */}</main>
           <RightSidebar />
         </div>
       </div>
     );
   }
   ```

### Component Integration

- Use existing layout components (`Header`, `Sidebar`, `RightSidebar`)
- Follow Tailwind CSS patterns established in feeds page
- Maintain responsive design principles
- Use TypeScript interfaces for all props and state

### Routing Patterns

- File-based routing: `/app/route-name/page.tsx` → `/route-name`
- No need for manual route configuration
- Automatic code splitting per route
- SEO-friendly URL structure

## 🎨 Design Consistency

### Layout Pattern

All pages should follow this structure:

```typescript
<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
  <Header user={sampleUser} />
  <div className="flex">
    <div className="hidden lg:block">
      <Sidebar />
    </div>
    <main className="flex-1 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6">
        {/* Page-specific content */}
      </div>
    </main>
    <div className="hidden xl:block">
      <RightSidebar />
    </div>
  </div>
</div>
```

### Styling Guidelines

- Use gradient backgrounds for visual appeal
- Maintain consistent spacing with Tailwind classes
- Responsive breakpoints: `lg:` for desktop, `xl:` for wide screens
- Follow the color theme system established in feeds

## 📋 Implementation Priority

### Phase 1 (Next Sprint)

1. **Network Page**: Implement researcher connections and discovery
2. **Projects Page**: Basic project management features

### Phase 2 (Future Sprints)

3. **Messages Page**: Real-time messaging system
4. **Ecosystem Page**: Resource and tool discovery

### Phase 3 (Advanced Features)

5. Enhanced features for all pages
6. Advanced integrations and real-time features
7. Mobile app considerations

## 🔄 Migration Notes

**From Static to Dynamic**: All placeholder pages are ready for implementation
**State Management**: Consider global state management (Redux/Zustand) when pages become more complex
**API Integration**: Pages are structured to easily integrate with backend APIs
**Authentication**: Layout includes user context, ready for auth implementation

---

**For Developers**: Start with the feeds page implementation as a reference pattern, then implement other pages following the same structure and design principles.
