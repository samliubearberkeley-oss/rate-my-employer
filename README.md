# Rate My Employer

A modern web application that allows employees to anonymously rate and review their employers, including company details and boss ratings.

## Features

- 🔐 **Authentication**: Sign up/Sign in with email/password or Google OAuth
- ⭐ **Rate Employers**: Submit reviews with company name, boss name, and 1-5 star ratings
- 📝 **Review Text**: Optional detailed review text
- 📱 **Responsive Design**: Modern, mobile-friendly UI
- 🚀 **Real-time Updates**: Reviews are instantly displayed
- 💾 **Backend-as-a-Service**: Powered by InsForge

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: InsForge (Backend-as-a-Service)
- **Routing**: React Router DOM
- **Authentication**: InsForge Auth (Email/Password + Google OAuth)
- **Database**: PostgreSQL (via InsForge)
- **Styling**: Custom CSS with modern design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd rme
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
rme/
├── src/
│   ├── components/
│   │   └── Navbar.jsx          # Navigation component
│   ├── contexts/
│   │   └── AuthContext.jsx     # Authentication context
│   ├── lib/
│   │   └── insforge.js         # InsForge client setup
│   ├── pages/
│   │   ├── Login.jsx           # Login/Signup page
│   │   ├── Reviews.jsx         # Reviews listing page
│   │   └── SubmitReview.jsx    # Submit review form
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # Main styles
│   ├── index.css               # Global styles
│   └── main.jsx                # Entry point
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Database Schema

### reviews table
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to users)
- `company_name`: Text
- `boss_name`: Text
- `rating`: Integer (1-5)
- `review_text`: Text (Optional)
- `created_at`: Timestamp
- `updated_at`: Timestamp

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Breakdown

### Authentication
- Email/Password registration and login
- Google OAuth integration
- Persistent sessions
- Protected routes

### Review Submission
- Company name input
- Boss name input
- 1-5 star rating with interactive slider
- Optional detailed review text
- Form validation

### Review Display
- Grid layout of all reviews
- Star ratings visualization
- Reviewer information
- Timestamp display
- Responsive cards

## Backend Setup (InsForge)

The backend is automatically configured with:
- Google OAuth provider (shared key)
- PostgreSQL database with reviews table
- Row-level security
- Automatic user profile creation

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License
