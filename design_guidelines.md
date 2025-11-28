# Design Guidelines: Indian Travel Tracker

## Architecture Decisions

### Authentication
**No authentication required.** This is a single-user, local-first utility app for personal travel tracking. However, include a **Profile/Settings screen** with:
- User-customizable avatar (generate 3 preset avatars with Indian travel theme: backpacker, mountain climber, beach explorer)
- Display name field (default: "Traveler")
- App preferences: dark/light theme toggle, compact/comfortable list view

### Navigation Structure
**Tab Navigation** (3 tabs):
1. **Beaches** - List of all Indian beaches with visit tracking
2. **Mountains** - List of all trekkable mountains in India with visit tracking
3. **Profile** - User settings and travel statistics

Each feature tab uses a navigation stack for detail views.

## Screen Specifications

### Tab 1: Beaches Screen
**Purpose:** Browse and track visits to Indian beaches

**Layout:**
- **Header:** Transparent default navigation header with title "Beaches"
  - Left: Filter icon button (opens filter modal)
  - Right: Search icon button (opens search bar overlay)
- **Main Content:** ScrollView with vertical card list
  - Top inset: headerHeight + Spacing.xl
  - Bottom inset: tabBarHeight + Spacing.xl
- **Components:**
  - Filter chips row (horizontal scroll): "All", "Western Coast", "Eastern Coast", state names
  - Destination cards (each card contains):
    - Beach name (headline font)
    - State and region (caption)
    - Checkbox (right-aligned, unchecked/checked states)
    - Subtle divider between cards

**Filter Modal:**
- Native modal presentation
- Header: "Filter Beaches" with close button
- Grouped sections: Regions, States
- Radio buttons for single-selection within regions
- Multi-select checkboxes for states
- Apply/Clear buttons at bottom (above keyboard safe area)

### Tab 2: Mountains Screen
**Purpose:** Browse and track visits to trekkable mountains

**Layout:** Identical structure to Beaches screen
- Header title: "Mountains"
- Filter chips: "All", "Himalayas", "Western Ghats", "Eastern Ghats", "North India", state names
- Same card layout and filter modal pattern

### Tab 3: Profile Screen
**Purpose:** User customization and travel progress overview

**Layout:**
- **Header:** Transparent with title "Profile"
- **Main Content:** ScrollView
  - Top inset: headerHeight + Spacing.xl
  - Bottom inset: tabBarHeight + Spacing.xl
- **Components:**
  - Avatar selection (3 preset circular avatars in horizontal row)
  - Name input field
  - Statistics cards:
    - Total beaches visited / Total beaches
    - Total mountains visited / Total mountains
    - Progress bars with percentage
  - Settings section:
    - Theme toggle (dark/light)
    - List view preference (compact/comfortable)
    - Clear all progress (with confirmation alert)

## Design System

### Color Palette
- **Primary:** Vibrant teal (#14B8A6) - evokes ocean and adventure
- **Secondary:** Warm amber (#F59E0B) - represents mountain sunrise
- **Background:** 
  - Light: #FFFFFF
  - Dark: #111827
- **Surface:** 
  - Light: #F9FAFB
  - Dark: #1F2937
- **Text:**
  - Primary: #111827 (light mode), #F9FAFB (dark mode)
  - Secondary: #6B7280
- **Success:** #10B981 (for checked items)
- **Border:** #E5E7EB (light mode), #374151 (dark mode)

### Typography
- **Headline (Destination names):** SF Pro Display, 18pt, Semibold
- **Body (Region/State info):** SF Pro Text, 14pt, Regular
- **Caption:** SF Pro Text, 12pt, Regular, Secondary color
- **Tab Labels:** SF Pro Text, 11pt, Medium

### Visual Design
- **Icons:** Use Feather icons from @expo/vector-icons
  - Filter: filter icon
  - Search: search icon
  - Checkboxes: Use square outline when unchecked, check-square filled with success color when checked
  - Tabs: map icon (Beaches), mountain icon (Mountains), user icon (Profile)
  
- **Cards:**
  - White background (light mode), #1F2937 (dark mode)
  - Border: 1px solid Border color
  - Border radius: 12px
  - Padding: Spacing.lg (16px)
  - NO drop shadow
  - Press state: Reduce opacity to 0.7

- **Filter Chips:**
  - Inactive: Border color outline, transparent background
  - Active: Primary color background, white text
  - Border radius: 20px
  - Padding: Spacing.sm vertical, Spacing.md horizontal
  - Press feedback: Scale to 0.95

- **Checkboxes:**
  - Size: 24x24px
  - Border width: 2px
  - Unchecked: Border color outline
  - Checked: Success color fill with white checkmark
  - Press feedback: Scale to 0.9

### Assets Required
Generate 3 user avatar presets:
1. Backpacker avatar - illustrated figure with backpack
2. Mountain climber avatar - illustrated figure with climbing gear
3. Beach explorer avatar - illustrated figure with sunhat

Aesthetic: Flat illustration style, warm colors matching the primary/secondary palette, friendly and minimal.

### Accessibility
- All interactive elements minimum 44x44pt touch target
- Support dynamic type scaling
- VoiceOver labels for all icons and checkboxes
- Sufficient color contrast (4.5:1 for text)
- Checkbox state announced clearly ("Visited" / "Not visited")