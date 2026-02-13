# Simple Chatbot UI

A modern, responsive chatbot interface built with Next.js and React. This project demonstrates clean component architecture, thoughtful UX design, and frontend best practices.

## Features

- 💬 **Chat Interface** - Clean, modern chat UI with message history
- 🎨 **Visual Distinction** - Clear differentiation between user and bot messages
- ⏱️ **Timestamps** - Message timestamps for conversation context
- 💾 **Persistent Storage** - Chat history saved to localStorage
- ⌨️ **Keyboard Support** - Enter to send, Shift+Enter for new lines
- 🔄 **Typing Indicator** - Visual feedback when bot is "typing"
- 🗑️ **Clear Chat** - Reset conversation with a single click
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎯 **Rule-Based Replies** - Intelligent pattern matching for contextual responses
- 🌐 **API Integration** - Optional advice API integration with graceful fallback

## Setup Steps

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

```bash
npm run build
npm start
```

## Component / Architecture Decisions

### Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── ChatLayout.tsx   # Main layout wrapper
│   ├── MessageList.tsx  # Scrollable message container
│   ├── MessageBubble.tsx # Individual message display
│   ├── ChatInput.tsx    # Input field with send button
│   └── TypingIndicator.tsx # Bot typing animation
├── lib/                 # Utilities and shared code
│   ├── types.ts         # TypeScript type definitions
│   ├── constants.ts     # Application constants
│   └── utils.ts         # Helper functions
└── page.tsx             # Main page component (state management)
```

### Component Architecture

#### **ChatLayout** (`components/ChatLayout.tsx`)
- **Purpose**: Main container component providing consistent layout structure
- **Responsibilities**: 
  - Header with title and metadata
  - Footer with instructions
  - Clear chat button integration
- **Design Decision**: Separated layout concerns from chat logic for better reusability

#### **MessageList** (`components/MessageList.tsx`)
- **Purpose**: Manages scrollable message container
- **Responsibilities**:
  - Auto-scroll to latest message
  - Empty state handling
  - Message rendering orchestration
- **Design Decision**: Uses `useRef` and `useEffect` for scroll management, ensuring smooth UX

#### **MessageBubble** (`components/MessageBubble.tsx`)
- **Purpose**: Individual message display component
- **Responsibilities**:
  - Visual distinction between user/bot messages
  - Timestamp formatting
  - Multi-line message support
- **Design Decision**: Self-contained component with clear prop interface for maximum reusability

#### **ChatInput** (`components/ChatInput.tsx`)
- **Purpose**: User input handling
- **Responsibilities**:
  - Text input with auto-resize
  - Keyboard shortcuts (Enter to send, Shift+Enter for new line)
  - Send button with disabled states
- **Design Decision**: Controlled component pattern for predictable state management

#### **TypingIndicator** (`components/TypingIndicator.tsx`)
- **Purpose**: Visual feedback during bot response
- **Design Decision**: Separate component for clean separation of concerns

### State Management

- **Pattern**: React hooks (`useState`, `useEffect`) for local state
- **Storage**: Browser localStorage for persistence
- **State Location**: Main page component (`page.tsx`) manages all chat state
- **Rationale**: Simple state management without external libraries, keeping the project lightweight

### Type Safety

- **TypeScript**: Full type coverage for all components and utilities
- **Shared Types**: Centralized in `lib/types.ts` for consistency
- **Benefits**: Catch errors at compile-time, better IDE support, self-documenting code

### Code Organization

- **Separation of Concerns**: UI components separate from business logic
- **Utility Functions**: Reusable functions extracted to `lib/utils.ts`
- **Constants**: Configuration values centralized in `lib/constants.ts`
- **Single Responsibility**: Each component has one clear purpose

## UX Considerations

### Visual Design

- **Color Scheme**: Dark theme with emerald accents for user messages, slate tones for bot messages
- **Visual Hierarchy**: Clear distinction between user (emerald) and bot (slate) messages
- **Spacing**: Consistent padding and margins using Tailwind's spacing scale
- **Typography**: Clear font sizes and weights for readability

### User Feedback

- **Typing Indicator**: Shows animated dots when bot is processing
- **Disabled States**: Send button and input disabled during bot response to prevent duplicate sends
- **Empty States**: Helpful message when no conversation exists
- **Loading States**: Simulated delay with typing indicator for realistic feel

### Accessibility

- **ARIA Labels**: Proper labels for screen readers (`aria-label` on sections)
- **Keyboard Navigation**: Full keyboard support (Enter to send, Tab navigation)
- **Focus States**: Visible focus rings on interactive elements
- **Semantic HTML**: Proper use of `<section>`, `<button>`, and other semantic elements

### Responsive Design

- **Mobile-First**: Designed to work on small screens
- **Breakpoints**: Uses Tailwind's `sm:` breakpoint for desktop enhancements
- **Touch Targets**: Adequate button sizes for mobile interaction
- **Text Scaling**: Responsive text sizes that adapt to screen size

### Micro-Interactions

- **Hover Effects**: Subtle lift animation on message bubbles
- **Transitions**: Smooth color transitions on buttons
- **Focus States**: Clear visual feedback on focused inputs
- **Button States**: Visual feedback for disabled, hover, and active states

### Persistence

- **localStorage**: Chat history persists across browser sessions
- **Clear Functionality**: Easy reset with clear chat button
- **Welcome Message**: Default message on first load or after clearing

### Performance

- **Auto-Scroll Optimization**: Efficient scroll management using refs
- **Debounced Storage**: Messages saved to localStorage on change
- **Component Memoization**: Potential for optimization if needed (not currently implemented due to simplicity)

## Any API Used (if applicable)

### Advice Slip API

**Endpoint**: `https://api.adviceslip.com/advice`

**Usage**:
- Triggered when user messages start with "advice" or "tip"
- Provides dynamic, randomized advice responses
- Free, no authentication required

**Implementation Details**:
- Located in `lib/utils.ts` as `maybeGetAdvice()` function
- Uses native `fetch` API with `cache: "no-store"` for fresh responses
- Graceful error handling: falls back to rule-based reply if API fails
- Handles network errors, rate limits, and invalid responses

**Error Handling**:
```typescript
// Falls back to rule-based response if:
// - Network request fails
// - API returns non-200 status
// - Response format is invalid
// - Rate limits are hit
```

**Example Usage**:
- User types: "advice about productivity"
- Bot fetches random advice from API
- If successful: displays formatted advice
- If failed: shows fallback message explaining the issue

**Why This API?**:
- Free tier with no API key required
- Simple JSON response format
- Reliable and fast
- Demonstrates frontend-only API integration pattern

## Technologies Used

- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **ESLint** - Code linting

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- localStorage support required
- ES6+ JavaScript features

## Future Enhancements

Potential improvements (not implemented):
- Dark/light mode toggle
- Message search functionality
- Export chat history
- Multiple conversation threads
- Rich media support (images, links)
- Voice input/output

## License

This project is private and created for demonstration purposes.
