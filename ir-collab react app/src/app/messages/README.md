# Messages Page - Research Communication Hub

## 📁 Overview

The messages page provides a comprehensive communication platform for researchers to engage in direct messaging, group discussions, and project-specific conversations. It facilitates seamless collaboration through real-time messaging and organized conversation threads.

## 🗂 File Structure

```
messages/
├── page.tsx                # Messages page implementation
└── README.md               # This documentation
```

## 🔄 Current Status

**Implementation Status**: 🚧 Placeholder - Ready for Development
**Priority**: Medium (Phase 2 implementation target)

### page.tsx

**Current State**: Basic placeholder with layout structure
**Type**: Static component (will need to become client-side with real-time features)

```typescript
// Current placeholder implementation
export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header user={sampleUser} />
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main className="flex-1 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6">
            <h1>Messages - Coming Soon</h1>
            <p>Real-time communication and collaboration hub.</p>
          </div>
        </main>
        <div className="hidden xl:block">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
```

## 🎯 Planned Features

### Core Messaging

- **Direct Messages**: One-on-one conversations with researchers
- **Group Conversations**: Multi-participant discussions
- **Project Channels**: Project-specific communication threads
- **Research Groups**: Field-specific discussion groups
- **Message Search**: Full-text search across all conversations

### Advanced Communication

- **File Sharing**: Share research documents, data, and media
- **Voice Messages**: Audio message recording and playback
- **Video Calls**: Integrated video conferencing
- **Screen Sharing**: Share research findings and presentations
- **Message Reactions**: React to messages with emojis

### Real-time Features

- **Live Typing Indicators**: See when others are typing
- **Online Status**: Real-time presence indicators
- **Push Notifications**: Instant message notifications
- **Message Read Receipts**: Track message delivery and reading
- **Auto-save Drafts**: Automatically save message drafts

## 🏗 Proposed Implementation

### Component Structure

```
messages/
├── page.tsx                # Main messages page
└── components/             # Message-specific components
    ├── ConversationList.tsx # List of all conversations
    ├── MessageThread.tsx   # Individual conversation thread
    ├── MessageInput.tsx    # Message composition interface
    ├── MessageBubble.tsx   # Individual message display
    ├── UserPresence.tsx    # Online status indicators
    ├── FileUpload.tsx      # File attachment handling
    ├── SearchMessages.tsx  # Message search interface
    ├── GroupSettings.tsx   # Group conversation management
    └── VideoCall.tsx       # Video calling interface
```

### Data Models

```typescript
interface Conversation {
  id: string;
  type: "direct" | "group" | "project" | "research-group";
  name?: string; // For group conversations
  participants: Participant[];
  lastMessage: Message;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  projectId?: string; // If linked to a project
  researchField?: string; // For research group conversations
  createdAt: string;
  updatedAt: string;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: "text" | "file" | "image" | "audio" | "video" | "system";
  attachments?: Attachment[];
  replyTo?: string; // Message ID this is replying to
  reactions: Reaction[];
  isEdited: boolean;
  isDeleted: boolean;
  timestamp: string;
  readBy: ReadStatus[];
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  role?: "admin" | "member" | "guest";
  isOnline: boolean;
  lastSeen: string;
  joinedAt: string;
  permissions: string[];
}

interface Attachment {
  id: string;
  name: string;
  type: "document" | "image" | "video" | "audio" | "data";
  size: number;
  url: string;
  thumbnail?: string;
  uploadedAt: string;
}

interface Reaction {
  emoji: string;
  users: string[];
  count: number;
}

interface ReadStatus {
  userId: string;
  readAt: string;
}
```

### Page Layout Design

```
┌─────────────────────────────────────────────────────────┐
│                      Header                             │
├─────────────┬─────────────────────────┬─────────────────┤
│   Sidebar   │      Messages Hub       │   RightSidebar  │
│             │ ┌─────────┬─────────────┐ │                 │
│ Navigation  │ │Convs.   │  Messages   │ │ Active Users    │
│             │ │List     │  Thread     │ │ ┌─────────────┐ │
│             │ │┌───────┐│ ┌─────────┐ │ │ │ Dr. Smith   │ │
│             │ ││ Chat1 ││ │Message 1│ │ │ │ ● Online    │ │
│             │ │└───────┘│ └─────────┘ │ │ └─────────────┘ │
│             │ │┌───────┐│ ┌─────────┐ │ │ ┌─────────────┐ │
│             │ ││ Chat2 ││ │Message 2│ │ │ │ Dr. Jones   │ │
│             │ │└───────┘│ └─────────┘ │ │ │ ○ Away      │ │
│             │ │┌───────┐│ ┌─────────┐ │ │ └─────────────┘ │
│             │ ││ Chat3 ││ │Message 3│ │ │                 │
│             │ │└───────┘│ └─────────┘ │ │ Quick Actions   │
│             │ │         │ ┌─────────┐ │ │ - New Group     │
│             │ │         │ │Input Box│ │ │ - Start Call    │
│             │ │         │ └─────────┘ │ │ - Share Screen  │
└─────────────┴─────────┴─┴─────────────┴─┴─────────────────┘
```

## 🔧 Technical Implementation Plan

### Phase 1: Basic Messaging

```typescript
"use client";

const MessagesPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // WebSocket connection for real-time messaging
  useEffect(() => {
    const ws = new WebSocket("wss://api.ircollab.com/messages");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "new_message") {
        setMessages((prev) => [...prev, data.message]);
      }
    };

    return () => ws.close();
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      conversationId: selectedConversation.id,
      senderId: currentUser.id,
      content: newMessage,
      type: "text",
      reactions: [],
      isEdited: false,
      isDeleted: false,
      timestamp: new Date().toISOString(),
      readBy: [],
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Send to WebSocket
    // ws.send(JSON.stringify({ type: 'send_message', message }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header user={currentUser} />
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main className="flex-1 min-h-screen">
          <div className="h-full flex">
            {/* Conversations List */}
            <div className="w-80 bg-white border-r border-gray-200">
              <ConversationList
                conversations={conversations}
                selectedConversation={selectedConversation}
                onConversationSelect={setSelectedConversation}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            {/* Message Thread */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  <MessageThreadHeader conversation={selectedConversation} />
                  <MessageThread
                    messages={messages}
                    currentUserId={currentUser.id}
                  />
                  <MessageInput
                    value={newMessage}
                    onChange={setNewMessage}
                    onSend={sendMessage}
                    isTyping={isTyping}
                  />
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-gray-500">
                      Choose a conversation to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        <div className="hidden xl:block">
          <MessagesSidebar
            activeUsers={activeUsers}
            onStartNewConversation={handleStartNewConversation}
          />
        </div>
      </div>
    </div>
  );
};
```

### Phase 2: Advanced Features

- **File Attachments**: Drag-and-drop file sharing with preview
- **Message Threading**: Reply to specific messages
- **Group Management**: Create and manage group conversations
- **Video Integration**: WebRTC-based video calling
- **Message History**: Infinite scroll with message loading

### Phase 3: Real-time & Integration

- **WebSocket Integration**: Full real-time messaging
- **Push Notifications**: Browser and mobile notifications
- **Project Integration**: Link conversations to projects
- **Calendar Integration**: Schedule meetings from conversations
- **External Integrations**: Slack, Discord, Teams connectivity

## 🎨 Design Guidelines

### Visual Elements

- **Conversation List**: Clean list with avatars and message previews
- **Message Bubbles**: Distinct styling for sent/received messages
- **Typing Indicators**: Animated typing status display
- **File Previews**: Inline preview for images and documents
- **Status Indicators**: Online/offline status with timestamps

### Color Themes

```typescript
const messageThemes = {
  primary: "from-purple-500 via-pink-500 to-red-500",
  sent: "bg-blue-500 text-white",
  received: "bg-gray-100 text-gray-900",
  system: "bg-yellow-50 text-yellow-800 border-yellow-200",
  unread: "bg-blue-50 border-l-4 border-blue-500",
  online: "bg-green-500",
  away: "bg-yellow-500",
  offline: "bg-gray-400",
};
```

### Responsive Behavior

- **Mobile**: Single column view with conversation list overlay
- **Tablet**: Two-column layout (conversations + messages)
- **Desktop**: Three-column layout with sidebar
- **Touch Gestures**: Swipe actions for mobile interactions

## 📋 Sample Data Structure

### Mock Conversations

```typescript
const sampleConversations = [
  {
    id: "1",
    type: "direct",
    participants: [
      {
        id: "1",
        name: "Dr. Sarah Chen",
        avatar: "/api/placeholder/40/40",
        isOnline: true,
        lastSeen: "2024-09-23T10:30:00Z",
      },
    ],
    lastMessage: {
      id: "msg1",
      content: "Thanks for sharing the research data! I'll review it today.",
      timestamp: "2024-09-23T10:30:00Z",
      senderId: "1",
    },
    unreadCount: 2,
    isPinned: true,
    isMuted: false,
    createdAt: "2024-09-20T08:00:00Z",
  },
  {
    id: "2",
    type: "group",
    name: "AI Ethics Research Group",
    participants: [
      {
        id: "2",
        name: "Dr. Michael Johnson",
        avatar: "/api/placeholder/40/40",
        role: "admin",
        isOnline: false,
        lastSeen: "2024-09-23T09:15:00Z",
      },
      {
        id: "3",
        name: "Dr. Lisa Wang",
        avatar: "/api/placeholder/40/40",
        role: "member",
        isOnline: true,
        lastSeen: "2024-09-23T10:45:00Z",
      },
    ],
    lastMessage: {
      id: "msg2",
      content: "Let's schedule our next meeting for Thursday",
      timestamp: "2024-09-23T09:45:00Z",
      senderId: "3",
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    createdAt: "2024-09-15T14:00:00Z",
  },
];
```

### Mock Messages

```typescript
const sampleMessages = [
  {
    id: "msg1",
    conversationId: "1",
    senderId: "1",
    content:
      "Hi! I wanted to discuss our collaboration on the ML healthcare project.",
    type: "text",
    reactions: [{ emoji: "👍", users: ["2"], count: 1 }],
    isEdited: false,
    isDeleted: false,
    timestamp: "2024-09-23T10:00:00Z",
    readBy: [{ userId: "2", readAt: "2024-09-23T10:01:00Z" }],
  },
  {
    id: "msg2",
    conversationId: "1",
    senderId: "2",
    content: "Absolutely! I've attached the preliminary data analysis.",
    type: "text",
    attachments: [
      {
        id: "att1",
        name: "ML_Analysis_Preliminary.pdf",
        type: "document",
        size: 2048576,
        url: "/files/ML_Analysis_Preliminary.pdf",
        uploadedAt: "2024-09-23T10:15:00Z",
      },
    ],
    reactions: [],
    isEdited: false,
    isDeleted: false,
    timestamp: "2024-09-23T10:15:00Z",
    readBy: [],
  },
];
```

## 🛠 Development Roadmap

### Immediate Tasks (Phase 1)

1. **Convert to Client Component**: Add real-time state management
2. **Create ConversationList Component**: Design conversation display
3. **Implement MessageThread Component**: Message display and threading
4. **Add MessageInput Component**: Message composition interface
5. **Create Sample Data**: Comprehensive mock conversation data

### Short-term Goals (Phase 2)

1. **File Attachments**: Drag-and-drop file sharing
2. **Message Search**: Full-text search across conversations
3. **Group Management**: Create and manage group conversations
4. **Real-time Features**: WebSocket integration for live messaging
5. **Mobile Optimization**: Touch-friendly messaging interface

### Long-term Vision (Phase 3)

1. **Video Calling**: WebRTC-based video conferencing
2. **Voice Messages**: Audio recording and playback
3. **Screen Sharing**: Share research findings in real-time
4. **External Integrations**: Connect with popular messaging platforms
5. **Advanced Search**: AI-powered conversation search and insights

## 🔗 Integration Points

### With Existing System

- **User Profiles**: Integration with researcher profiles
- **Projects**: Link conversations to specific projects
- **Network**: Start conversations from network connections
- **Feeds**: Share messages to public feeds

### Real-time Infrastructure

- **WebSocket Server**: Real-time message delivery
- **Push Notifications**: Browser and mobile notifications
- **Presence System**: Track user online status
- **Message Queue**: Handle high-volume messaging
- **File Storage**: Cloud storage for attachments

## 🎯 Success Metrics

### Communication KPIs

- **Message Volume**: Daily/weekly message counts
- **Response Time**: Average time to respond to messages
- **Active Conversations**: Number of ongoing conversations
- **File Sharing**: Frequency of document and data sharing
- **Group Participation**: Engagement in group conversations

### User Engagement

- **Daily Active Users**: Regular messaging platform usage
- **Conversation Retention**: Long-term conversation activity
- **Feature Adoption**: Usage of advanced messaging features
- **Cross-platform Usage**: Desktop vs mobile messaging patterns
- **Integration Usage**: Use of project and network integrations

## 🔒 Security & Privacy

### Security Features

- **End-to-End Encryption**: Secure message transmission
- **Message Retention**: Configurable message history retention
- **Access Controls**: Permission-based conversation access
- **Audit Logging**: Track message and file access
- **Data Export**: Allow users to export their message data

### Privacy Controls

- **Message Deletion**: Delete messages for all participants
- **Conversation Muting**: Disable notifications for conversations
- **Blocking**: Block unwanted contacts
- **Privacy Settings**: Control who can message you
- **Data Anonymization**: Remove personal data on request

---

**Next Steps for Implementation**:

1. Design and implement the conversation list interface
2. Create the message thread component with real-time capabilities
3. Add file attachment and sharing functionality
4. Implement WebSocket integration for real-time messaging
5. Test thoroughly across different devices and screen sizes

**Estimated Development Time**: 4-5 weeks for Phase 1 implementation
**Dependencies**: WebSocket infrastructure, file storage system, user authentication
