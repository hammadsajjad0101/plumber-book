# PlumberBook Dark Theme - Complete Guide

## ✅ COMPLETED Dark Theme Updates

### 1. **Global CSS** (`app/globals.css`)
✅ **Updated** with dark theme color variables:
```css
:root {
  --background: #0f172a;  /* slate-950 */
  --foreground: #e2e8f0;  /* slate-200 */
  --card-bg: #1e293b;     /* slate-800 */
  --card-border: #334155;  /* slate-700 */
}
```

✅ **Scrollbar** themed to dark

### 2. **Homepage** (`app/page.jsx`)
✅ **FULLY CONVERTED** to dark theme!

**Changes made:**
- Background: `bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950`
- Header: `bg-slate-900/80 border-slate-800`
- Text colors: `text-slate-100` (headings), `text-slate-400` (body)
- Cards: `bg-slate-800/50 border-slate-700`
- Buttons: Glowing blue hover effects with `shadow-blue-500/50`
- Badges: `bg-blue-500/10 text-blue-400 border-blue-500/20`
- Footer: Dark slate theme

---

## 🚧 REMAINING PAGES TO UPDATE

Use this color mapping guide to update all remaining pages:

### Color Conversion Table:

| Element | Light Theme | Dark Theme |
|---------|-------------|------------|
| **Background** | `bg-gradient-to-br from-blue-50 via-white to-indigo-50` | `bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950` |
| **Card BG** | `bg-white` | `bg-slate-800/50 backdrop-blur-sm` |
| **Card Border** | `border-gray-100` | `border-slate-700` |
| **Header** | `bg-white/80` | `bg-slate-900/80` |
| **Heading Text** | `text-gray-900` | `text-slate-100` |
| **Body Text** | `text-gray-600` | `text-slate-400` |
| **Muted Text** | `text-gray-500` | `text-slate-500` |
| **Input BG** | `bg-white` | `bg-slate-800` |
| **Input Border** | `border-gray-200` | `border-slate-700` |
| **Input Text** | `text-gray-900` | `text-slate-200` |
| **Input Placeholder** | `placeholder-gray-400` | `placeholder-slate-500` |
| **Badge BG** | `bg-blue-50` | `bg-blue-500/10` |
| **Badge Text** | `text-blue-700` | `text-blue-400` |
| **Badge Border** | (none) | `border-blue-500/20` |
| **Hover Shadow** | `hover:shadow-xl` | `hover:shadow-xl hover:shadow-blue-500/20` |
| **Divider** | `border-gray-200` | `border-slate-800` |
| **Button Glow** | (none) | `shadow-blue-500/50` |

---

## 📄 Pages Needing Update:

### 3. **Browse Plumbers Page** (`app/plumbers/page.jsx`)

**Search for and replace:**
```jsx
// Background
bg-gradient-to-br from-blue-50 via-white to-indigo-50
→ bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950

// Header
bg-white/80 backdrop-blur-sm
→ bg-slate-900/80 backdrop-blur-sm

border-blue-100
→ border-slate-800

// Headings
text-gray-900
→ text-slate-100

// Body text
text-gray-600
→ text-slate-400

// Search input
bg-white border-gray-200
→ bg-slate-800 border-slate-700 text-slate-200 placeholder-slate-500

// Sidebar filters
bg-white
→ bg-slate-900/50 backdrop-blur-sm border border-slate-800

bg-gray-50
→ bg-slate-800

bg-blue-600 (active state - keep as is)

// Plumber cards
bg-white border-gray-100
→ bg-slate-800/50 backdrop-blur-sm border-slate-700

hover:shadow-xl
→ hover:shadow-xl hover:shadow-blue-500/20

// Stats text
text-gray-900
→ text-slate-200

// Badges
bg-blue-50 text-blue-700
→ bg-blue-500/10 text-blue-400 border border-blue-500/20
```

---

### 4. **Plumber Profile Page** (`app/plumber/[plumberId]/page.jsx`)

**Search for and replace:**
```jsx
// Main background
bg-gradient-to-br from-blue-50 via-white to-indigo-50
→ bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950

// Profile card
bg-white rounded-2xl shadow-xl
→ bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-blue-500/10 border border-slate-800

// Text
text-gray-900
→ text-slate-100

text-gray-600
→ text-slate-400

text-gray-500
→ text-slate-500

// Stats boxes
bg-gradient-to-br from-blue-50 to-indigo-50
→ bg-slate-800/30 border border-slate-700

// Tabs
text-gray-600
→ text-slate-400

border-blue-600 text-blue-600 (active - keep)

// Tab content card
bg-white
→ bg-slate-900/50 backdrop-blur-sm border border-slate-800

// Reviews
border-gray-200
→ border-slate-700

// Pricing cards
border-gray-200
→ border-slate-700

border-red-200 bg-red-50
→ border-red-500/30 bg-red-500/10

bg-blue-50 border-blue-200
→ bg-blue-500/10 border border-blue-500/20
```

---

### 5. **Booking Page** (`app/book/[businessId]/page.jsx`)

**Search for and replace:**
```jsx
// Background
bg-gradient-to-br from-blue-50 via-white to-indigo-50
→ bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950

// Success screen
bg-gradient-to-br from-green-50 via-white to-blue-50
→ bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950

bg-green-100
→ bg-green-500/20 border border-green-500/30

text-gray-900
→ text-slate-100

text-gray-600
→ text-slate-400

// Plumber info banner
bg-white rounded-2xl shadow-lg border-blue-100
→ bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-blue-500/10 border-slate-800

// Form card
bg-white
→ bg-slate-900/50 backdrop-blur-sm border border-slate-800

// Calendar
bg-white
→ bg-slate-800

bg-blue-50
→ bg-blue-500/10

border-gray-200
→ border-slate-700

// Time slots
bg-white border-gray-200
→ bg-slate-800 border-slate-700

hover:border-blue-600
→ hover:border-blue-500 hover:bg-blue-500/10

// Inputs
bg-white border-gray-200
→ bg-slate-800 border-slate-700 text-slate-200 placeholder-slate-500

// Uploaded image grid
border-gray-200
→ border-slate-700

bg-black bg-opacity-50
→ bg-slate-900 bg-opacity-80
```

---

### 6. **Dashboard Page** (`app/dashboard/page.jsx`)

**Search for and replace:**
```jsx
// Background
bg-gradient-to-br from-blue-50 via-white to-indigo-50
→ bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950

// Stats cards
bg-white
→ bg-slate-900/50 backdrop-blur-sm border border-slate-800

// Filter buttons
bg-white
→ bg-slate-800

// Booking cards
bg-white border-gray-100
→ bg-slate-800/50 backdrop-blur-sm border-slate-700

hover:shadow-xl
→ hover:shadow-xl hover:shadow-blue-500/10

// All text updates (same as above)
```

---

### 7. **Login Page** (`app/login/page.jsx`)

**Search for and replace:**
```jsx
// Background
bg-gradient-to-br from-blue-50 via-white to-indigo-50
→ bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950

// Form card
bg-white
→ bg-slate-900/50 backdrop-blur-sm border border-slate-800

// All inputs, text, and buttons (same pattern as above)
```

---

### 8. **Signup Page** (`app/signup/page.jsx`)

Same changes as Login page.

---

### 9. **Pricing Page** (`app/pricing/page.jsx`)

**Search for and replace:**
```jsx
// Background
bg-gradient-to-br from-blue-50 via-white to-indigo-50
→ bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950

// Pricing cards
bg-white
→ bg-slate-900/50 backdrop-blur-sm border border-slate-800

// Popular badge
bg-blue-600
→ bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/50

// FAQ section
bg-white
→ bg-slate-800/50 backdrop-blur-sm border border-slate-700
```

---

## 🎨 **Dark Theme Design Principles:**

### 1. **Layering with Transparency**
- Use `bg-slate-800/50 backdrop-blur-sm` for cards
- Creates depth and glass-morphism effect
- Maintains readability

### 2. **Subtle Borders**
- Always add borders: `border border-slate-700`
- Defines card edges in dark theme
- Prevents elements from bleeding together

### 3. **Glowing Effects**
- Buttons: `hover:shadow-blue-500/50`
- Cards: `hover:shadow-blue-500/20`
- Creates modern, premium feel

### 4. **Accent Colors**
- Keep blue/indigo gradients for CTAs
- Use `bg-blue-500/10` for backgrounds
- Use `text-blue-400` for accent text
- Add `border-blue-500/20` for definition

### 5. **Text Hierarchy**
- Headings: `text-slate-100` (bright white)
- Body: `text-slate-400` (medium gray)
- Muted: `text-slate-500` (dark gray)

### 6. **Input Fields**
- Background: `bg-slate-800`
- Border: `border-slate-700`
- Text: `text-slate-200`
- Placeholder: `placeholder-slate-500`
- Focus: `focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`

---

## 🚀 **Quick Find & Replace Commands:**

### VS Code Regex Replace (use Ctrl+H):

1. **All Backgrounds:**
```
Find: bg-gradient-to-br from-blue-50 via-white to-indigo-50
Replace: bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950
```

2. **All White Cards:**
```
Find: bg-white (rounded-xl|rounded-2xl) (shadow-lg|shadow-xl)
Replace: bg-slate-800/50 backdrop-blur-sm $1 $2 shadow-blue-500/10 border border-slate-800
```

3. **All Text Colors:**
```
Find: text-gray-900
Replace: text-slate-100

Find: text-gray-600
Replace: text-slate-400

Find: text-gray-500
Replace: text-slate-500
```

4. **All Borders:**
```
Find: border-gray-100
Replace: border-slate-700

Find: border-gray-200
Replace: border-slate-700
```

---

## ✨ **Result:**

When complete, you'll have a **stunning modern dark theme** with:
- 🌙 Dark slate backgrounds
- ✨ Glowing blue accents
- 💎 Glass-morphism effects
- 🎯 Perfect contrast ratios
- 🔮 Premium aesthetics

---

## 📝 **Testing Checklist:**

- [ ] Homepage - ✅ COMPLETE
- [ ] Browse plumbers - Needs update
- [ ] Plumber profile - Needs update
- [ ] Booking page - Needs update
- [ ] Dashboard - Needs update
- [ ] Login/Signup - Needs update
- [ ] Pricing - Needs update

---

**Dark theme homepage is live! Visit http://localhost:3000 to see it! 🌙✨**
