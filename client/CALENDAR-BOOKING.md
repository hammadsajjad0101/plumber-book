# Calendar Booking System

## 🗓️ Interactive Calendar Booking Interface

The booking page now features a **Cal.com-inspired** calendar interface with a modern, step-by-step booking flow.

---

## 📋 Booking Flow (3 Steps)

### **Step 1: Select Date & Time**

#### Left Panel - Calendar View
- **Interactive Monthly Calendar**
  - Shows current month with proper day alignment
  - Past dates are hidden/disabled
  - Only future dates are clickable
  - Selected date highlighted in blue
  - Hover effects on available dates
  - Smooth scale animations on selection

#### Right Panel - Time Slots
- **Available Time Slots**
  - Only shows after date is selected
  - 30-minute intervals from 8 AM to 6 PM
  - Scrollable list of time buttons
  - Selected time highlighted in blue
  - Hover effects on all slots
  - Scale animations on selection

#### Continue Button
- Appears at bottom after both date and time are selected
- Disabled until selections are complete
- Smooth transition to Step 2

---

### **Step 2: Enter Your Details**

#### Selected Date/Time Display
- Shows selected date and time in a badge
- "Change date/time" link to go back to Step 1
- Smooth transition between steps

#### Form Fields
1. **Full Name** (Required)
   - Text input
   - Validation: Minimum 2 characters

2. **Phone Number** (Required)
   - Auto-formats as (XXX) XXX-XXXX
   - Real-time formatting while typing
   - Validation: 10 digits required

3. **Email** (Optional)
   - Email format validation
   - Optional field

4. **Service Address** (Required)
   - Where the service is needed
   - Full address input

5. **Service Type** (Required)
   - Dropdown selection
   - Options: Emergency Repair, Routine Maintenance, Installation, Inspection, Drain Cleaning, Water Heater Service, Other

6. **Job Description** (Optional)
   - Textarea for additional details
   - Resizable input

#### Submit Button
- "Confirm Booking" button
- Shows loading spinner during submission
- Disabled while submitting

---

### **Step 3: Success Confirmation**

#### Success Screen Features
- ✓ Large green checkmark icon
- "Booking Confirmed!" heading
- Thank you message with customer name
- Summary card showing:
  - Service type
  - Full date (formatted: "Monday, December 1, 2025")
  - Time slot
  - Phone number
- SMS confirmation notice
- "Book Another Appointment" button
- Back to home link

---

## 🎨 Design Features

### Visual Design
- **Two-column layout** for calendar and time slots (desktop)
- **Stacked layout** on mobile devices
- **Progress indicator** showing current step
- **Color-coded status**:
  - Step 1: Blue circle
  - Step 2: Blue circle (after Step 1 complete)
  - Completed steps show checkmark

### Animations
- **Calendar dates**: Scale up on hover
- **Time slots**: Scale effect on hover and selection
- **Step transitions**: Smooth fade between steps
- **Success screen**: Scale-in animation
- **Loading states**: Spinning loader

### Interactive Elements
- **Calendar cells**:
  - Gray background for available dates
  - Blue background for selected date
  - Invisible for unavailable/past dates
  - Shadow effect on selection

- **Time slots**:
  - Gray background for available times
  - Blue background for selected time
  - Hover effects on all buttons

- **Buttons**:
  - Gradient blue/indigo on primary actions
  - Disabled state when validation fails
  - Smooth scale animations

---

## 📱 Mobile Responsive

### Mobile Optimizations
- Calendar and time slots **stack vertically** on mobile
- **Full-width buttons** for easy tapping
- **Larger touch targets** (minimum 44x44px)
- **Scrollable time list** on smaller screens
- **Sticky header** for easy navigation
- Progress steps simplified on mobile (numbers only)

### Breakpoints
- **Desktop** (lg): Two-column layout
- **Tablet** (md): Adjusted spacing
- **Mobile** (sm): Single column, stacked layout

---

## 🔄 User Flow Example

```
1. Customer visits /book/demo
   ↓
2. Sees calendar for current month
   ↓
3. Clicks on December 15
   ↓
4. Time slots appear on right
   ↓
5. Selects "2:00 PM"
   ↓
6. Clicks "Continue to Details →"
   ↓
7. Form appears with selected date/time shown
   ↓
8. Fills in: Name, Phone, Address, Service Type
   ↓
9. Clicks "Confirm Booking"
   ↓
10. Sees loading spinner (2 seconds)
    ↓
11. Success screen appears
    ↓
12. Can book another or go home
```

---

## ⚙️ Technical Implementation

### State Management
```javascript
const [step, setStep] = useState(1);           // Current step (1-3)
const [selectedDate, setSelectedDate] = useState(null);   // Selected date object
const [selectedTime, setSelectedTime] = useState(null);   // Selected time string
const [formData, setFormData] = useState({...});          // Form fields
```

### Calendar Generation
- **Dynamic calendar** based on current month
- **Automatic date filtering** (only future dates)
- **Proper day alignment** (starts on correct weekday)
- **Empty cells** for days before month starts

### Date Formatting
- Input date: `Date` object
- Display: "Monday, December 1, 2025"
- Storage: ISO format ready

---

## 🎯 Key Features

### ✅ User Experience
- **Visual date selection** (no date input field)
- **Clear time slot selection** (no dropdown)
- **Progress indication** (always know where you are)
- **Easy navigation** (can go back to change date/time)
- **Real-time validation** (immediate feedback)
- **Loading states** (smooth transitions)

### ✅ Accessibility
- Keyboard navigation supported
- Screen reader friendly
- High contrast design
- Large touch targets
- Clear visual feedback

### ✅ Performance
- Fast rendering
- Smooth animations
- No external API calls needed
- All client-side validation
- Instant UI updates

---

## 🚀 Future Enhancements (Optional)

If you want to integrate with a real calendar API:

### Cal.com Integration
```javascript
// Install Cal.com embed
npm install @calcom/embed-react

// Use in component
import Cal from "@calcom/embed-react";

<Cal
  calLink="your-username/30min"
  config={{
    theme: 'light',
    hideEventTypeDetails: false
  }}
/>
```

### Google Calendar API
- Sync bookings to Google Calendar
- Check real-time availability
- Send calendar invites

### Calendly Integration
- Embed Calendly widget
- Use Calendly API for bookings
- Webhook for notifications

### Acuity Scheduling
- Embed scheduling widget
- Custom branding options
- Payment integration

---

## 📝 Customization Options

### Change Time Slots
```javascript
const timeSlots = [
  '7:00 AM', '7:30 AM', // Add morning slots
  // ... existing slots
  '7:00 PM', '7:30 PM'  // Add evening slots
];
```

### Change Calendar Range
```javascript
// Show next 2 months instead of current month
const generateCalendarDates = (monthOffset = 0) => {
  const today = new Date();
  const targetMonth = today.getMonth() + monthOffset;
  // ... rest of logic
};
```

### Add Unavailable Dates
```javascript
const unavailableDates = ['2025-12-25', '2025-01-01']; // Christmas, New Year

// In calendar generation
if (unavailableDates.includes(date.toISOString().split('T')[0])) {
  dates.push(null); // Make unavailable
}
```

### Add Price Display
```javascript
const servicePrices = {
  'Emergency Repair': '$150',
  'Routine Maintenance': '$75',
  // ...
};

// Show price when service selected
{formData.serviceType && (
  <p className="text-sm text-gray-600">
    Price: {servicePrices[formData.serviceType]}
  </p>
)}
```

---

## 🎨 Color Customization

Want to change the theme colors? Update these classes:

### Primary Color (Blue → Your Color)
Replace:
- `bg-blue-600` → `bg-your-color-600`
- `text-blue-600` → `text-your-color-600`
- `border-blue-600` → `border-your-color-600`
- `from-blue-600 to-indigo-600` → `from-your-color-600 to-your-color-700`

---

## ✨ Result

**A beautiful, modern, Cal.com-style booking interface that's:**
- ✅ Fully functional (no backend needed)
- ✅ Mobile-responsive
- ✅ Animated and smooth
- ✅ Easy to use
- ✅ Professional looking
- ✅ Ready for production (just add backend)

---

**Visit http://localhost:3000/book/demo to see it in action!** 🎉
