# India Explorer - Travel Tracking App

## Overview

India Explorer is a single-user, local-first React Native mobile application for tracking visits to Indian beaches and mountains. Built with Expo, it provides a native experience across iOS, Android, and web platforms. The app allows users to browse destinations, mark them as visited, add personal notes, manage favorites, and view travel statistics through a clean, modern interface with dark mode support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Platform & Framework
- **React Native with Expo SDK 54**: Cross-platform mobile development framework
- **New Architecture Enabled**: Uses React Native's new architecture for improved performance
- **React 19.1**: Latest React with React Compiler experimental features enabled
- **TypeScript**: Type-safe codebase with strict mode enabled

### Navigation Architecture
**Tab-based Navigation** with three primary flows:
- Bottom tab navigator using `@react-navigation/bottom-tabs` with native stack navigators for each tab
- iOS uses BlurView for translucent tab bar; Android uses solid background
- Three main tabs: Beaches, Mountains, and Profile
- Each tab has its own navigation stack for detail views

**Decision rationale**: Tab navigation provides familiar mobile UX patterns. Stack navigators within tabs allow deep linking and proper back navigation while maintaining tab state.

### State Management
**Local-first with AsyncStorage**: No remote state or authentication
- All data persisted locally using `@react-native-async-storage/async-storage`
- State managed via React hooks (useState, useEffect, useCallback)
- Data includes: visited destinations, user profile (name, avatar), notes, favorites

**Decision rationale**: Single-user app with no backend needs simplified architecture. AsyncStorage provides reliable cross-platform local persistence without external dependencies.

### UI/UX Architecture

**Theme System**:
- Custom theme implementation with light/dark mode support
- Theme hook (`useTheme`) provides consistent colors, spacing, typography across app
- Automatic theme detection via system preferences
- Centralized design tokens in `constants/theme.ts`

**Animation Framework**:
- `react-native-reanimated` for performant animations
- Spring-based interactions (button presses, checkbox toggles, card interactions)
- Consistent animation configuration across components

**Component Architecture**:
- Themed components (ThemedText, ThemedView) for automatic theme application
- Screen wrapper components (ScreenScrollView, ScreenFlatList, ScreenKeyboardAwareScrollView) handle safe areas and keyboard avoidance
- Reusable UI components: DestinationCard, FilterChip, SearchBar, CheckBox, StatCard, AvatarSelector

**Screen Layout Pattern**:
- Transparent headers with blur effects on iOS
- Content insets calculated via `useScreenInsets` hook (accounts for header, tab bar, safe areas)
- Consistent spacing using design tokens

**Decision rationale**: Custom theming provides full design control without third-party UI library constraints. Reanimated offers native performance for smooth animations. Screen wrappers centralize complex safe area/keyboard logic.

### Data Architecture

**Static Data**:
- Beach and mountain destinations stored in TypeScript files (`data/destinations.ts`)
- Detailed destination information in `data/destinationDetails.ts`
- Type-safe interfaces for Beach, Mountain, Region, State

**User Data Storage**:
- Visited destinations tracked as Set<string> of IDs
- User profile (name, avatar index)
- Notes stored with timestamps
- Favorites list

**Storage Pattern**:
- Utility functions in `utils/storage.ts` abstract AsyncStorage operations
- Error handling for storage failures
- Data serialization/deserialization handled centrally

**Decision rationale**: Static destination data in code enables offline-first experience and fast load times. Centralized storage utilities provide consistent error handling and make migration to alternative storage easier if needed.

### Error Handling
- Error boundary component catches React errors
- Development mode shows detailed error modal
- Production mode shows user-friendly error screen with app restart option
- Console logging for debugging

### Platform-Specific Considerations
- **iOS**: Blur effects, translucent headers, native gestures
- **Android**: Edge-to-edge display, solid backgrounds, material design patterns
- **Web**: Fallback for keyboard-aware scroll view, static rendering support for color scheme

### Build & Development
- Babel configured with module resolver for @ path aliases
- ESLint with Expo config and Prettier integration
- TypeScript with strict mode and path mappings
- Expo development server with Replit-specific proxy configuration

## External Dependencies

### Core Framework Dependencies
- **Expo SDK 54**: Platform-agnostic APIs for native features
- **React Navigation 7**: Navigation library with bottom tabs and native stack navigators
- **@react-navigation/elements**: Header utilities

### UI & Interaction
- **react-native-reanimated**: High-performance animations
- **react-native-gesture-handler**: Native gesture recognition
- **react-native-safe-area-context**: Safe area management
- **react-native-keyboard-controller**: Advanced keyboard handling
- **expo-blur**: Blur effects for iOS
- **expo-haptics**: Haptic feedback

### Storage & Assets
- **@react-native-async-storage/async-storage**: Local key-value storage
- **expo-image**: Optimized image component
- **@expo/vector-icons**: Icon library (Feather icons used extensively)

### Platform Features
- **expo-status-bar**: Status bar customization
- **expo-system-ui**: System UI configuration
- **expo-web-browser**: In-app browser
- **expo-linking**: Deep linking support
- **expo-splash-screen**: Splash screen management

### Development Tools
- **TypeScript**: Static typing
- **ESLint**: Code linting with Expo and Prettier configs
- **Prettier**: Code formatting
- **babel-plugin-module-resolver**: Import path aliasing

### Platform Compatibility
- Supports iOS, Android, and Web platforms
- Web-specific fallbacks for native-only features (keyboard handling, blur effects)
- Conditional rendering based on Platform.OS where needed