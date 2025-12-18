# PlumberBook - Modern Booking Management UI

A beautiful, modern frontend-only UI for PlumberBook booking management system built with Next.js 14, React, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Beautiful gradient-based UI with smooth animations
- **Interactive Calendar**: Cal.com-style date/time picker with visual selection
- **Image Upload**: Customers can upload up to 5 photos of their plumbing issue
- **Fully Responsive**: Mobile-first design that works on all devices
- **3-Step Booking Flow**: Visual calendar → Time slots → Customer details + Photos
- **Plumber Dashboard**: Interactive dashboard to manage all bookings
- **Authentication Pages**: Login and signup pages with modern design
- **Status Management**: Easy booking status updates (Pending, Confirmed, Completed, Cancelled)
- **Smooth Animations**: Custom CSS animations and transitions
- **No Backend Required**: Pure frontend implementation for UI demonstration

## 📄 Pages

### Public Pages
- **Homepage** (`/`) - Landing page with features and CTA
- **Booking Form** (`/book/[businessId]`) - Customer booking interface
- **Login** (`/login`) - Plumber login page
- **Signup** (`/signup`) - Business registration page
- **Pricing** (`/pricing`) - Pricing plans and FAQ

### Protected Pages
- **Dashboard** (`/dashboard`) - Plumber booking management dashboard

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📱 Pages Overview

### 1. Homepage (/)
- Hero section with business value proposition
- Feature cards showcasing key features
- "How It Works" section
- Call-to-action sections
- Footer with links

### 2. Booking Form (/book/demo)
- **Interactive Calendar Interface** (Cal.com-style)
- 3-step booking process:
  1. Select date from visual calendar
  2. Choose time from available slots
  3. Enter customer details + Upload photos
- **Image Upload**: Upload up to 5 photos (5MB each) of the issue
- Real-time phone number formatting
- Progress indicator showing current step
- Smooth step transitions
- Image preview with remove option
- Success confirmation screen with booking details
- Mobile-optimized calendar view

### 3. Dashboard (/dashboard)
- Statistics cards (Total, Pending, Confirmed, Completed)
- Filter buttons (All, Today, Pending, Confirmed, Completed)
- Booking cards with full customer details
- Clickable phone numbers (opens dialer)
- Clickable email addresses (opens email client)
- Clickable addresses (opens Google Maps)
- Status update buttons
- Color-coded status badges

## 🎨 Color Scheme

- **Primary Blue**: `#2563eb` (Blue-600)
- **Secondary Indigo**: `#4f46e5` (Indigo-600)
- **Success Green**: `#10b981` (Green-500)
- **Warning Yellow**: `#f59e0b` (Yellow-500)
- **Danger Red**: `#ef4444` (Red-500)
- **Background**: Gradient from blue-50 to indigo-50

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript (JSX)
- **Styling**: Tailwind CSS 4
- **Fonts**: Geist Sans & Geist Mono
- **Icons**: Unicode emojis and SVG icons

## 📦 Project Structure

```
plumber/
├── app/
│   ├── book/
│   │   └── [businessId]/
│   │       └── page.jsx          # Booking form
│   ├── login/
│   │   └── page.jsx              # Login page
│   ├── signup/
│   │   └── page.jsx              # Signup page
│   ├── dashboard/
│   │   └── page.jsx              # Dashboard
│   ├── pricing/
│   │   └── page.jsx              # Pricing page
│   ├── layout.jsx                # Root layout
│   ├── page.jsx                  # Homepage
│   └── globals.css               # Global styles with animations
├── public/                       # Static assets
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🎭 Animation Classes

Custom animation classes available:
- `.animate-fade-in` - Fade in with upward motion
- `.animate-scale-in` - Scale in animation
- `.animate-slide-in-left` - Slide in from left
- `.animate-slide-in-right` - Slide in from right

## 📱 Mobile Optimization

- All pages are fully responsive
- Touch-friendly button sizes (44x44px minimum)
- Mobile-optimized form inputs
- Swipe-friendly booking cards
- Collapsible navigation on mobile
- Optimized font sizes for mobile reading

## 📝 Notes

- This is a UI-only implementation (no backend)
- All form submissions are simulated with setTimeout
- Phone numbers are formatted automatically
- Date inputs prevent past dates
- Status updates are instant (local state)

## 🚀 Deployment

Build for production:

```bash
npm run build
npm start
```

Deploy to Vercel:
```bash
vercel deploy
```

---

**Ready to build!** 🚀
