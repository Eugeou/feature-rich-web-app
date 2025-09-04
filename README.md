# Beincom - Feature-Rich Social Media Platform

A modern, feature-rich social media web application built with Next.js 14, React 18, and TypeScript. This application provides a comprehensive social networking experience with authentication, commenting, search, community features, and responsive design for all devices.

## 🌐 Live Demo

**[🚀 Click here to visit the live website](https://feature-rich-web-app.vercel.app/)**

<img width="700" height="845" alt="image" src="https://github.com/user-attachments/assets/860821bd-1c1c-4103-bcba-98374bd9ac71" />

## 🚀 Features

### ✅ Authentication System

- **User Registration & Login**: Complete sign-up and sign-in functionality with email/password
- **Password Protection**: Secure authentication with required passwords
- **Session Management**: Persistent user sessions with localStorage
- **Protected Routes**: Only authenticated users can access post details and comments
- **Profile Management**: Update user profile information and avatar

### ✅ Social Media Features

- **Post Management**: View, search, and interact with posts
- **Commenting System**: Add comments to posts (authenticated users only)
- **User Profiles**: User information and avatar management
- **Community Features**: Community-based post organization with verification badges

### ✅ Search & Filtering

- **Advanced Search**: Search posts by title or content
- **Sorting Options**: Sort posts by ID or title (ascending/descending)
- **Real-time Results**: Instant search results with proper error handling

### ✅ Responsive Design

- **Mobile-First**: Optimized for mobile devices with responsive breakpoints
- **Cross-Device**: Works perfectly on mobile, tablet, and desktop
- **Touch-Friendly**: Mobile-optimized navigation and interactions
- **Modern UI/UX**: Beautiful interface with smooth animations

### ✅ Technical Features

- **React Query**: Efficient server state management and caching
- **TypeScript**: Full type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework with responsive utilities
- **Custom Hooks**: Reusable logic for common operations
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with responsive design utilities
- **State Management**: React Query (TanStack Query)
- **Authentication**: Custom authentication system with password protection
- **API Integration**: JSONPlaceholder REST API
- **Icons**: Lucide React
- **Responsive**: Mobile-first design with Tailwind breakpoints

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 app directory
│   ├── auth/              # Authentication pages
│   ├── communities/        # Community pages
│   ├── posts/             # Post detail pages
│   ├── search/            # Search results page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard page
├── components/             # Reusable components
│   ├── auth/              # Authentication components
│   ├── communities/        # Community components
│   ├── layout/            # Layout components (Header, Sidebar)
│   └── posts/             # Post-related components
├── contexts/               # React contexts (AuthContext)
├── data/                   # Static data (users, communities, categories)
├── helper/                 # Helper utilities
├── hooks/                  # Custom hooks
├── lib/                    # Utility libraries (auth, api, utils)
├── providers/              # App providers
└── types/                  # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd feature-rich-web-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## 🔐 Authentication

The application includes a complete authentication system with password protection:

### Demo Accounts (Email + Password Required)

| Email              | Password | Name        |
| ------------------ | -------- | ----------- |
| `john@example.com` | `123Abc` | John Doe    |
| `jane@example.com` | `123Abc` | Jane Smith  |
| `bob@example.com`  | `123Abc` | Bob Johnson |

### Authentication Features

- **Password Required**: All demo accounts require the password `123Abc`
- **Secure Login**: Email and password validation
- **Session Persistence**: Login state maintained across browser sessions
- **Profile Updates**: Users can update their profile information

## 📱 Features Walkthrough

### 1. Dashboard

- Welcome message with user's name
- Quick action buttons (Quick Post, Write Article, Create Series)
- Airdrop banner with promotional content
- Content tabs (Explore, Following, Saved)
- Post feed with pagination
- Responsive grid layouts for all screen sizes

### 2. Post Management

- View all posts with pagination
- Search posts by title or content
- Sort posts by ID or title (ascending/descending)
- Click "Read More" to view full post
- Responsive post cards for mobile and desktop

### 3. Post Details

- Full post content display
- Comment section for authenticated users
- Add new comments with user authentication
- View all comments for the post
- Responsive layout for all devices

### 4. Search Functionality

- Search bar in header and dedicated search page
- Real-time search results
- Search suggestions for no results
- Maintains search state and pagination
- Mobile-optimized search interface

### 5. Community Features

- Responsive design for all screen sizes
- Loading states and error handling
- Smooth transitions and animations
- Modern, clean interface

## 🧪 Testing

The application includes comprehensive testing:

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

- **Components**: LoginForm, PostCard, and more
- **Utilities**: Date formatting, text truncation, class merging
- **Hooks**: Custom hooks for data fetching
- **Integration**: End-to-end user flows

### Testing Technologies

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **jsdom**: DOM environment for testing

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
```

### 6. Responsive Design

- **Mobile (< 640px)**: Single column layouts, compact spacing
- **Tablet (640px - 1024px)**: 2-3 column grids, medium spacing
- **Desktop (1024px+)**: Full sidebar navigation, 3-4 column grids
- **Mobile Menu**: Hamburger menu with overlay navigation
- **Collapsible Sidebar**: Desktop sidebar with collapse functionality

## 🎨 Design System

### Responsive Breakpoints

- **`sm:`** - Small devices (640px+)
- **`md:`** - Medium devices (768px+)
- **`lg:`** - Large devices (1024px+)
- **`xl:`** - Extra large devices (1280px+)

### Color Scheme

- **Primary**: Purple (#7C3AED)
- **Secondary**: Blue (#3B82F6)
- **Accent**: Yellow (#F59E0B)
- **Neutral**: Gray scale (#F9FAFB to #111827)

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deployment Options

- **Vercel**: Recommended for Next.js applications (currently deployed)
- **Netlify**: Static site deployment
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment

## 🙏 Acknowledgments

- **JSONPlaceholder**: For providing the free fake API
- **Beincom**: For design inspiration
- **Next.js Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework
- **React Query**: For efficient server state management

## 📞 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built to test using Next.js 14, React 18, and TypeScript**
