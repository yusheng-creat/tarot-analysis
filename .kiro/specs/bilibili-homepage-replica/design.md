# Design Document

## Overview

The Bilibili homepage replica will be implemented as a single-page HTML application that faithfully recreates the visual design and user experience of Bilibili's desktop homepage. The design emphasizes video content discovery through a clean, card-based layout with Bilibili's signature pink branding and rounded design elements.

## Architecture

### Technology Stack
- **HTML5**: Semantic markup structure
- **Tailwind CSS**: Utility-first CSS framework via CDN
- **Vanilla JavaScript**: Interactive functionality and dynamic content
- **Font Awesome**: Icon library via CDN
- **Unsplash API**: Real images for video thumbnails

### Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│                    Fixed Navigation Bar                      │
├─────────────────────────────────────────────────────────────┤
│                    Hero Carousel Section                     │
├─────────────────────────────────────────────────────────────┤
│                  Category Navigation Tabs                    │
├─────────────────────────────────────────────────────────────┤
│  Main Content Grid              │      Sidebar              │
│  ┌─────┐ ┌─────┐ ┌─────┐       │  ┌─────────────────────┐   │
│  │Video│ │Video│ │Video│       │  │   Recommended       │   │
│  │Card │ │Card │ │Card │       │  │   Content           │   │
│  └─────┘ └─────┘ └─────┘       │  └─────────────────────┘   │
│  ┌─────┐ ┌─────┐ ┌─────┐       │  ┌─────────────────────┐   │
│  │Video│ │Video│ │Video│       │  │   Trending Topics   │   │
│  │Card │ │Card │ │Card │       │  └─────────────────────┘   │
│  └─────┘ └─────┘ └─────┘       │                           │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Navigation Component
**Purpose**: Fixed top navigation with search and category links

**Structure**:
- Logo area with Bilibili branding
- Search bar with pink accent styling
- Category navigation links (首页, 动画, 番剧, 国创, etc.)
- User area (login/profile placeholder)

**Styling**:
- Background: White with subtle shadow
- Primary color: #FB7299 (Bilibili pink)
- Height: 64px
- z-index: 50 for fixed positioning

### 2. Hero Carousel Component
**Purpose**: Featured content showcase

**Structure**:
- Image carousel with navigation dots
- Overlay text with video titles and descriptions
- Auto-rotation functionality
- Manual navigation controls

**Styling**:
- Height: 320px
- Rounded corners: 12px
- Gradient overlay for text readability

### 3. Category Tabs Component
**Purpose**: Content filtering and navigation

**Structure**:
- Horizontal tab list
- Active state indicator
- Smooth transition animations

**Styling**:
- Active tab: Pink background (#FB7299)
- Inactive tabs: Gray background with hover effects
- Rounded pill design

### 4. Video Card Component
**Purpose**: Individual video display unit

**Structure**:
```html
<div class="video-card">
  <div class="thumbnail-container">
    <img src="unsplash-image" alt="video-thumbnail">
    <div class="duration-badge">10:24</div>
  </div>
  <div class="video-info">
    <h3 class="video-title">Video Title</h3>
    <div class="uploader-info">
      <img class="avatar" src="avatar-url">
      <span class="uploader-name">UP主名称</span>
    </div>
    <div class="video-stats">
      <span class="views">1.2万播放</span>
      <span class="comments">234弹幕</span>
    </div>
  </div>
</div>
```

**Styling**:
- Card shadow: subtle drop shadow
- Hover effect: scale(1.02) and increased shadow
- Rounded corners: 8px
- Aspect ratio: 16:9 for thumbnails

### 5. Sidebar Component
**Purpose**: Recommended content and trending topics

**Structure**:
- Recommended videos section
- Trending topics section
- Live streaming section (optional)

**Styling**:
- Width: 300px
- Sticky positioning
- Card-based layout with spacing

## Data Models

### Video Data Model
```javascript
const videoData = {
  id: string,
  title: string,
  thumbnail: string, // Unsplash URL
  duration: string, // "MM:SS" format
  uploader: {
    name: string,
    avatar: string,
    verified: boolean
  },
  stats: {
    views: number,
    comments: number,
    likes: number
  },
  category: string,
  uploadDate: Date
}
```

### Category Data Model
```javascript
const categoryData = {
  id: string,
  name: string,
  icon: string, // Font Awesome class
  active: boolean
}
```

## Error Handling

### Image Loading
- Implement fallback images for failed Unsplash requests
- Use lazy loading for performance optimization
- Provide loading states with skeleton screens

### API Failures
- Graceful degradation when external resources fail
- Local fallback data for demonstration purposes
- Error boundaries for JavaScript functionality

### Responsive Breakpoints
- Desktop: 1440px and above
- Tablet: 768px - 1439px
- Mobile: Below 768px

## Testing Strategy

### Visual Testing
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Responsive design validation across device sizes
- Color contrast accessibility checks

### Functional Testing
- Navigation interactions
- Hover effects and animations
- Search functionality (UI only)
- Category switching
- Carousel navigation

### Performance Testing
- Image loading optimization
- CSS and JavaScript minification consideration
- Lighthouse performance audit

## Implementation Notes

### Color Palette
- Primary: #FB7299 (Bilibili Pink)
- Secondary: #00A1D6 (Bilibili Blue)
- Background: #F4F5F7
- Text Primary: #18191C
- Text Secondary: #9499A0
- Border: #E3E5E7

### Typography
- Font Family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- Headings: 16px-24px range
- Body text: 14px
- Small text: 12px

### Animations
- Hover transitions: 200ms ease-in-out
- Card scaling: transform scale(1.02)
- Color transitions: 150ms ease
- Carousel transitions: 500ms ease-in-out

### Accessibility Considerations
- Semantic HTML structure
- Alt text for all images
- Keyboard navigation support
- ARIA labels for interactive elements
- Color contrast compliance (WCAG AA)