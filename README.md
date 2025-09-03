# Beincom - Feature-Rich Social Media Platform

A modern, feature-rich social media web application built with Next.js, React.js, and TypeScript. This application integrates with the JSONPlaceholder API to provide a comprehensive social networking experience with authentication, commenting, search, and more.

<img width="700" height="845" alt="image" src="https://github.com/user-attachments/assets/860821bd-1c1c-4103-bcba-98374bd9ac71" />

## 🚀 Features

### ✅ Authentication System

- **User Registration & Login**: Complete sign-up and sign-in functionality
- **OAuth Integration**: Support for Google, Facebook, and Twitter authentication
- **Session Management**: Persistent user sessions with localStorage
- **Protected Routes**: Only authenticated users can access post details

### ✅ Social Media Features

- **Post Management**: View, search, and interact with posts
- **Commenting System**: Add comments to posts (authenticated users only)
- **User Profiles**: User information and avatar management
- **Community Features**: Community-based post organization

### ✅ Search & Filtering

- **Advanced Search**: Search posts by title or content
- **Sorting Options**: Sort posts by ID or title (ascending/descending)
- **Real-time Results**: Instant search results with debouncing

### ✅ User Experience

- **Responsive Design**: Fully responsive design for all devices
- **Modern UI/UX**: Beautiful interface inspired by Beincom design
- **Pagination**: Efficient post loading with pagination
- **Loading States**: Smooth loading experiences throughout the app

### ✅ Technical Features

- **React Query**: Efficient server state management and caching
- **TypeScript**: Full type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **Custom Hooks**: Reusable logic for common operations
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **State Management**: React Query (TanStack Query)
- **Authentication**: Custom authentication system with OAuth simulation
- **API Integration**: JSONPlaceholder REST API
- **Testing**: Jest, React Testing Library
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── posts/             # Post detail pages
│   ├── search/            # Search results page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard page
├── components/             # Reusable components
│   ├── auth/              # Authentication components
│   ├── layout/            # Layout components
│   └── posts/             # Post-related components
├── contexts/               # React contexts
├── hooks/                  # Custom hooks
├── lib/                    # Utility libraries
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

The application includes a complete authentication system:

### Demo Accounts

- **Email**: `john@example.com` (any password works in demo)
- **Email**: `jane@example.com` (any password works in demo)
- **Email**: `bob@example.com` (any password works in demo)

### OAuth Providers

- Google, Facebook, and Twitter integration (simulated)
- Automatic user creation and login

## 📱 Features Walkthrough

### 1. Dashboard

- Welcome message with user's name
- Quick action buttons (Quick Post, Write Article, Create Series)
- Airdrop banner with promotional content
- Content tabs (Explore, Following, Saved)
- Post feed with pagination

### 2. Post Management

- View all posts with pagination
- Search posts by title or content
- Sort posts by ID or title
- Click "Read More" to view full post

### 3. Post Details

- Full post content display
- Comment section for authenticated users
- Add new comments
- View all comments for the post

### 4. Search Functionality

- Search bar in header and dedicated search page
- Real-time search results
- Search suggestions for no results
- Maintains search state and pagination

### 5. User Experience

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

### Tailwind CSS

The application uses Tailwind CSS with custom configuration in `tailwind.config.ts`.

### TypeScript

Full TypeScript support with strict type checking enabled.

## 📊 Performance Features

- **React Query**: Efficient data fetching and caching
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js image optimization
- **Bundle Analysis**: Built-in bundle analyzer
- **Lazy Loading**: Components loaded on demand

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deployment Options

- **Vercel**: Recommended for Next.js applications
- **Netlify**: Static site deployment
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

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

**Built with ❤️ using Next.js and React**
