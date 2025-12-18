# Hero Section Design

## Updated Hero with Images & Animations

The hero section now features a stunning dashboard analytics image from Unsplash with floating animated elements.

### Main Components:

#### 1. **Main Dashboard Image**
- **Image Source**: Unsplash dashboard analytics photo
- **Features**:
  - Rounded corners (rounded-2xl)
  - White border (4px)
  - Shadow effect (shadow-2xl)
  - Scale-in animation on load
  - Gradient overlay from bottom

#### 2. **Floating Notification Card** (Top Right)
- **Animation**: Slides in from right
- **Content**:
  - Green checkmark icon in circle
  - "New Booking!" heading
  - Customer name and time
- **Position**: Absolute, top-right corner
- **Background**: White with shadow
- **Border**: Subtle gray border

#### 3. **Floating Stats Card** (Bottom Left)
- **Animation**: Slides in from left
- **Content**:
  - Gradient blue/indigo box with number "24"
  - "This Month" label
  - "Bookings" text
- **Position**: Absolute, bottom-left corner
- **Background**: White with shadow

#### 4. **Floating Calendar Icon** (Top Left)
- **Animation**:
  - Fades in after 0.5s delay
  - Then continuously floats up and down (3s cycle)
- **Features**:
  - Blue gradient background
  - White calendar SVG icon
  - Subtle shadow
- **Motion**: Smooth floating animation

#### 5. **Background Glow**
- **Effect**: Blurred gradient blob
- **Colors**: Blue to indigo
- **Animation**: Pulsing opacity
- **Purpose**: Create depth and visual interest

---

## Animation Timeline:

```
0.0s → Main image scales in
0.0s → Right notification slides in
0.0s → Left stats card slides in
0.5s → Calendar icon fades in
1.0s → Calendar starts floating animation (infinite)
```

---

## Technical Details:

### CSS Classes Used:
- `animate-scale-in` - Main image entrance
- `animate-slide-in-right` - Right notification
- `animate-slide-in-left` - Left stats card
- `animate-float` - Calendar floating motion
- `animate-pulse` - Background glow

### Positioning:
- Main container: `relative`
- All floating elements: `absolute`
- Coordinates use negative values for overlap effect

### Responsive Design:
- Image automatically adjusts to container width
- Floating cards stack on mobile
- Animations work on all screen sizes

---

## Color Palette:

- **Main Image Border**: White (#ffffff)
- **Notification Card**:
  - Background: White
  - Icon BG: Green-100
  - Text: Gray-900, Gray-500
- **Stats Card**:
  - Number Box: Blue-500 to Indigo-500 gradient
  - Background: White
  - Text: Gray-900, Gray-500
- **Calendar Icon**:
  - Background: Blue-600
  - Icon: White
- **Background Glow**: Blue-400 to Indigo-400

---

## Image Source:

Using Unsplash for high-quality, royalty-free dashboard images:
- URL: `https://images.unsplash.com/photo-1551288049-bebda4e38f71`
- Parameters: `w=800&h=600&fit=crop`
- Subject: Dashboard analytics/charts
- Style: Modern, professional

---

## Why This Works:

1. **Professional Look**: Real dashboard image shows the product
2. **Engaging Animations**: Captures attention without being overwhelming
3. **Contextual Cards**: Show actual use cases (bookings, notifications)
4. **Depth & Dimension**: Layered elements create visual hierarchy
5. **Modern Aesthetic**: Gradients, shadows, and smooth motion
6. **Clear Value Prop**: Visitors immediately understand the product

---

## Alternative Image Options:

You can replace the main image with any of these Unsplash images:

### Dashboard/Analytics:
- `photo-1551288049-bebda4e38f71` - Charts & graphs (current)
- `photo-1460925895917-afdab827c52f` - Website analytics
- `photo-1504868584819-f8e8b4b6d7e3` - Business dashboard

### Plumbing/Tools:
- `photo-1607472586893-edb57bdc0e39` - Plumber at work
- `photo-1621905252472-178fdd180f9f` - Plumbing tools
- `photo-1585704032915-c3400ca199e7` - Professional plumber

### Mobile/App Interface:
- `photo-1512941937669-90a1b58e7e9c` - Mobile app mockup
- `photo-1555421689-491a97ff2040` - Phone in hand
- `photo-1563986768609-322da13575f3` - App interface

---

## Customization Tips:

1. **Change Image**: Replace the `src` URL with any image
2. **Adjust Cards**: Modify text in floating cards
3. **Change Colors**: Update gradient colors in stats card
4. **Speed**: Adjust animation duration (currently 0.6s, 3s)
5. **Positioning**: Move cards by changing top/left values

---

**Result**: A stunning, animated hero section that immediately communicates value and engages visitors! 🎨✨
