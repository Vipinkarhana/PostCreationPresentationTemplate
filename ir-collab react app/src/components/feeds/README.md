# Feed Components - Post Creation and Display System

## 📁 Overview

Feed components handle the core functionality of the research collaboration platform: creating, displaying, and interacting with research posts. This includes a sophisticated presentation builder, multi-type post system, and interactive feed display.

## 🗂 Component Files

```
feeds/
├── CreatePost.tsx          # Advanced post creation with presentation builder
├── PostCard.tsx            # Individual post display with presentation preview
├── FeedControls.tsx        # Feed filtering and control mechanisms
└── README.md               # This documentation
```

## 🏗 Component Specifications

### CreatePost.tsx

**Purpose**: Comprehensive post creation system with integrated presentation builder

#### Props Interface

```typescript
interface CreatePostProps {
  onPostCreated?: (post: any) => void;
}
```

#### Key Features

- **8 Post Types**: Research Paper, Question, Collaboration, Announcement, Discussion, Dataset, Funding, Publication
- **Canva-Inspired Templates**: Colorful, themed templates for each post type
- **Presentation Builder**: 6 layout types with professional slide creation
- **Auto-Generated Templates**: Smart templates based on post type selection
- **Rich Text Content**: Advanced post content creation
- **Tag System**: Dynamic tag selection and management
- **Collaboration Tools**: Collaborator invitation system

#### Post Type System

```typescript
const postTypes = [
  {
    id: "research",
    label: "Research Paper",
    icon: "🔬",
    theme: {
      gradient: "from-blue-500 via-blue-600 to-indigo-700",
      accent: "border-blue-400 bg-blue-50",
      text: "text-blue-900",
    },
    template: "Research-specific template content...",
  },
  // ... 7 other post types
];
```

#### Presentation Builder Features

- **6 Layout Types**:

  - `title-content`: Title with content block
  - `split-view`: Two-column layout
  - `full-image`: Image-focused layout
  - `bullet-points`: Bulleted list format
  - `chart-focus`: Data visualization layout
  - `quote-highlight`: Quote and citation format

- **Auto-Generation**: Smart templates for each post type with pre-filled content
- **Large Preview**: Cinema-quality slide preview mode
- **Interactive Editing**: Real-time slide editing and preview
- **Slide Management**: Add, remove, duplicate, and reorder slides

#### State Management

```typescript
// Post creation state
const [postContent, setPostContent] = useState("");
const [selectedPostType, setSelectedPostType] = useState("research");
const [selectedTags, setSelectedTags] = useState<string[]>([]);

// Presentation state
const [presentationSlides, setPresentationSlides] = useState([...]);
const [presentationTitle, setPresentationTitle] = useState("");
const [attachedPresentation, setAttachedPresentation] = useState<any>(null);
const [showPresentationMode, setShowPresentationMode] = useState(false);
```

#### Technical Implementation

- **Client-Side Component**: Uses `"use client"` directive
- **TypeScript**: Fully typed with comprehensive interfaces
- **Form Handling**: Advanced form submission with validation
- **Error Handling**: Try-catch blocks for presentation generation
- **State Reset**: Comprehensive form reset after submission

### PostCard.tsx

**Purpose**: Display individual posts with presentation previews and interactions

#### Props Interface

```typescript
interface PostProps {
  post: {
    id: string;
    type: "project" | "case-study" | "research" | "discussion" | "milestone";
    author: {
      name: string;
      title: string;
      avatar: string;
      isOnline?: boolean;
    };
    timestamp: string;
    content: string;
    tags?: string[];
    attachments?: Array<{
      type: "image" | "file" | "link";
      name: string;
      url: string;
    }>;
    presentation?: {
      title: string;
      slides: Array<SlideData>;
    };
    metrics: {
      likes: number;
      comments: number;
      shares: number;
      views: number;
    };
    isLiked?: boolean;
    isBookmarked?: boolean;
  };
}
```

#### Key Features

- **Post Header**: Author info, timestamps, post type badges
- **Content Display**: Rich text content with formatting
- **Tag System**: Interactive hashtag display
- **Attachment Handling**: File, image, and link attachments
- **Presentation Preview**: Advanced presentation display system
- **Interaction Buttons**: Like, comment, share, bookmark functionality
- **Comments Section**: Expandable comment thread

#### Presentation Display System

```typescript
{
  post.presentation && (
    <div className="mb-4">
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-4">
        {/* Presentation Header */}
        <div className="flex items-center justify-between mb-3">
          <h3>{post.presentation.title}</h3>
          <span>{post.presentation.slides.length} slides</span>
        </div>

        {/* Slide Preview */}
        <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100">
          {/* First slide preview */}
        </div>

        {/* Slide Navigation */}
        <div className="flex items-center justify-between">
          {/* Navigation dots and controls */}
        </div>
      </div>
    </div>
  );
}
```

#### Interaction System

- **Like Functionality**: Toggle like state with visual feedback
- **Comment System**: Expandable comment thread with input
- **Share Options**: Share button with future integration points
- **Bookmark Feature**: Save posts for later reference
- **Responsive Actions**: Mobile-friendly interaction buttons

### FeedControls.tsx

**Purpose**: Feed filtering, sorting, and control mechanisms

#### Key Features

- **Filter Options**: Filter by post type, author, date range
- **Sort Mechanisms**: Sort by newest, trending, most liked
- **View Options**: Different feed view modes
- **Search Integration**: Search within feed content
- **Live Updates**: Real-time feed refresh controls

#### Implementation Details

```typescript
const FeedControls = () => {
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showLiveUpdates, setShowLiveUpdates] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      {/* Filter and sort controls */}
    </div>
  );
};
```

## 🎨 Design System Integration

### Color Theme System

Each post type has its own gradient theme:

```typescript
const themes = {
  research: "from-blue-500 via-blue-600 to-indigo-700",
  question: "from-purple-500 via-pink-500 to-red-500",
  collaboration: "from-green-500 via-teal-500 to-cyan-600",
  announcement: "from-yellow-400 via-orange-500 to-red-500",
  discussion: "from-pink-400 via-purple-500 to-indigo-600",
  dataset: "from-cyan-400 via-blue-500 to-indigo-600",
  funding: "from-orange-400 via-red-500 to-pink-600",
  publication: "from-indigo-400 via-purple-500 to-pink-600",
};
```

### Visual Hierarchy

- **Post Cards**: White background with subtle shadows
- **Presentation Previews**: Gradient backgrounds with professional styling
- **Interactive Elements**: Hover effects and smooth transitions
- **Typography**: Consistent font weights and sizing
- **Spacing**: Uniform padding and margin system

## 🔧 Technical Architecture

### State Management Pattern

```typescript
// Parent component (feeds page)
const [posts, setPosts] = useState(samplePosts);

const handlePostCreated = (newPost: any) => {
  setPosts([newPost, ...posts]);
};

// Child component (CreatePost)
<CreatePost onPostCreated={handlePostCreated} />;

// Render posts
{
  posts.map((post) => <PostCard key={post.id} post={post} />);
}
```

### Data Flow

1. **Post Creation**: CreatePost → onPostCreated callback → Parent state update
2. **Feed Display**: Parent state → PostCard props → Individual post rendering
3. **Interactions**: PostCard local state → Future API integration points

### Performance Optimizations

- **React.memo**: Prevent unnecessary re-renders of PostCard
- **Key Props**: Proper key usage for list rendering
- **State Batching**: Efficient state updates
- **Image Optimization**: Placeholder images with proper sizing

## 🛠 Advanced Features

### Presentation System

```typescript
const generateAutoPresentation = (postTypeId: string) => {
  const templates = {
    research: {
      title: "Research Paper Presentation",
      slides: [
        {
          id: 1,
          title: "Research Overview",
          content: "Present your research with clear structure",
          layout: "title-content",
          bulletPoints: [
            "Key findings",
            "Methodology",
            "Results",
            "Conclusions",
          ],
        },
        // ... more slides
      ],
    },
    // ... other post type templates
  };

  return templates[postTypeId] || defaultTemplate;
};
```

### Template System

- **Smart Generation**: Context-aware templates based on post type
- **Professional Layouts**: Research-focused slide layouts
- **Customizable Content**: Editable templates with placeholder content
- **Visual Consistency**: Matching theme colors and styling

### Real-Time Features

- **Live Post Creation**: Immediate feed updates
- **Interactive Comments**: Expandable comment threads
- **Dynamic Metrics**: Like counts and interaction tracking
- **Status Indicators**: Online status and activity indicators

## 📋 Usage Examples

### Basic Post Creation

```typescript
// In feeds page
const [posts, setPosts] = useState([]);

const handleNewPost = (post: any) => {
  setPosts((prevPosts) => [post, ...prevPosts]);
};

return (
  <div>
    <CreatePost onPostCreated={handleNewPost} />
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  </div>
);
```

### Post with Presentation

```typescript
const samplePost = {
  id: "1",
  type: "research",
  author: { name: "Dr. Smith", title: "Researcher", avatar: "..." },
  content: "Research findings...",
  presentation: {
    title: "Research Presentation",
    slides: [
      {
        id: 1,
        title: "Overview",
        content: "Research overview content",
        layout: "title-content",
        bulletPoints: ["Point 1", "Point 2"],
      },
    ],
  },
  metrics: { likes: 10, comments: 5, shares: 2, views: 50 },
};
```

## 🔄 Future Enhancements

### Planned Features

1. **Real-Time Collaboration**: Live editing of presentations
2. **Advanced Media**: Video and audio embedding
3. **Export Options**: PDF and PowerPoint export
4. **Template Marketplace**: User-created templates
5. **Analytics**: Post performance tracking
6. **Mobile App**: React Native implementation

### Integration Points

- **Backend API**: RESTful API for post CRUD operations
- **WebSocket**: Real-time updates and notifications
- **File Storage**: Cloud storage for media attachments
- **Search Engine**: Full-text search capabilities
- **Analytics Service**: User engagement tracking

## 🎯 Development Guidelines

### Adding New Post Types

1. **Update postTypes array** in CreatePost.tsx
2. **Add theme configuration** with gradient and colors
3. **Create auto-template** in generateAutoPresentation function
4. **Update PostCard** type definitions if needed

### Customizing Presentation Layouts

1. **Add new layout type** to slide interface
2. **Implement rendering logic** in presentation builder
3. **Add to auto-generation** templates
4. **Update preview components** in PostCard

### Performance Best Practices

- **Memoize expensive calculations** in presentation rendering
- **Optimize image loading** with Next.js Image component
- **Implement virtual scrolling** for large feeds
- **Use skeleton loaders** for better UX during loading

---

**For Developers**: The feed system is the core of the platform. Understanding these components is essential for extending functionality and maintaining code quality. Follow the established patterns for post types, presentation layouts, and interaction systems.
