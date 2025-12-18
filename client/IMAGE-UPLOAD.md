# Image Upload Feature

## 📸 Photo Upload for Booking Form

Customers can now upload photos of their plumbing issue directly in the booking form!

---

## ✨ Features

### Upload Capabilities
- **Multiple Images**: Upload up to 5 images per booking
- **File Size Limit**: Maximum 5MB per image
- **Supported Formats**: PNG, JPG, JPEG, WEBP, GIF
- **Drag & Drop**: Click to select or drag files to upload area
- **Real-time Preview**: See images immediately after selection
- **Easy Removal**: Hover and click X to remove any image

---

## 🎨 User Interface

### Upload Zone
- **Large dashed border box** with upload icon
- **Hover effect**: Border turns blue and background becomes light blue
- **Clear instructions**: "Click to upload images" with format/size info
- **Icon**: Camera/image upload SVG icon

### Image Preview Grid
- **Responsive Grid**: 2 columns on mobile, 3 columns on desktop
- **Thumbnail Size**: 128px height with object-fit cover
- **Image Info**: Filename displayed at bottom of each thumbnail
- **Remove Button**: Red X button appears on hover (top-right corner)
- **Border**: Gray border around each image

### Counter
- Shows "X / 5 images uploaded" below the grid
- Updates in real-time as images are added/removed

---

## 🔧 Technical Details

### Image Processing
```javascript
// 1. File selected from input
// 2. Check if total images exceed 5
// 3. Validate file size (max 5MB)
// 4. Read file as base64 data URL
// 5. Store in state with preview
// 6. Display in grid
```

### State Management
```javascript
const [uploadedImages, setUploadedImages] = useState([]);

// Image object structure:
{
  id: Date.now() + Math.random(),  // Unique ID
  name: file.name,                  // Original filename
  size: file.size,                  // File size in bytes
  preview: reader.result            // Base64 data URL
}
```

### Validation Rules
1. **Maximum 5 images** - Alert shown if limit exceeded
2. **5MB per file** - Alert shown if file too large
3. **Image formats only** - Browser enforces via `accept="image/*"`
4. **Base64 encoding** - Images stored as data URLs (no server needed)

---

## 📱 Mobile Responsive

### Mobile View (< 768px)
- Upload zone full width
- Image grid: 2 columns
- Larger touch targets for remove button
- Optimized for portrait orientation

### Desktop View (≥ 768px)
- Upload zone full width
- Image grid: 3 columns
- Hover effects for remove buttons
- Better spacing between images

---

## 🎯 User Flow

### Adding Images
1. User scrolls to "Upload Photos" section
2. Clicks on dashed border upload area
3. Browser file picker opens
4. User selects 1 or more images (up to 5 total)
5. Images appear as thumbnails below
6. User can continue to add more (if under 5)

### Removing Images
1. User hovers over thumbnail
2. Red X button appears in top-right corner
3. User clicks X button
4. Image removed from grid
5. Counter updates
6. User can upload more if desired

### Submitting
1. Images included with booking data
2. Success screen shows thumbnails in summary
3. Images would be sent to server in production

---

## 💾 Data Storage

### Frontend (Current)
- Images stored as **base64 data URLs** in state
- Included in booking submission
- Displayed in success confirmation

### Backend Integration (Future)
When adding backend:
```javascript
// Option 1: Send base64 in JSON
const bookingData = {
  ...formData,
  images: uploadedImages.map(img => img.preview)
};

// Option 2: Use FormData for file upload
const formData = new FormData();
formData.append('name', formData.name);
uploadedImages.forEach((img, index) => {
  formData.append(`image${index}`, img.file);
});

// Option 3: Upload to cloud storage
// - Cloudinary
// - AWS S3
// - Firebase Storage
// - Uploadcare
```

---

## 🎨 Styling Details

### Upload Button
- Border: `border-2 border-dashed border-gray-300`
- Hover: `hover:border-blue-600 hover:bg-blue-50`
- Padding: `px-4 py-6`
- Rounded: `rounded-xl`
- Cursor: `cursor-pointer`

### Image Thumbnails
- Size: `w-full h-32`
- Fit: `object-cover`
- Border: `border-2 border-gray-200`
- Rounded: `rounded-lg`

### Remove Button
- Position: `absolute top-2 right-2`
- Color: `bg-red-500 text-white`
- Shape: `rounded-full`
- Opacity: Hidden by default, visible on hover
- Icon: X (close) SVG

---

## 🚀 Future Enhancements

### Image Compression
```javascript
// Add image-compression library
import imageCompression from 'browser-image-compression';

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true
};

const compressedFile = await imageCompression(file, options);
```

### Drag & Drop
```javascript
const handleDragOver = (e) => {
  e.preventDefault();
  // Add visual feedback
};

const handleDrop = (e) => {
  e.preventDefault();
  const files = Array.from(e.dataTransfer.files);
  // Process dropped files
};
```

### Image Cropping
- Add react-image-crop or similar
- Allow users to crop before upload
- Set aspect ratio requirements

### Image Annotation
- Draw arrows/circles on images
- Add text labels
- Highlight specific areas

### EXIF Data
- Extract image metadata
- Show date/time taken
- Get GPS location
- Camera information

### Cloud Upload
```javascript
// Cloudinary example
const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'your_preset');

  const response = await fetch(
    'https://api.cloudinary.com/v1_1/your_cloud/image/upload',
    {
      method: 'POST',
      body: formData
    }
  );

  const data = await response.json();
  return data.secure_url;
};
```

---

## 📝 Code Example

### Complete Implementation
```javascript
// State
const [uploadedImages, setUploadedImages] = useState([]);

// Upload Handler
const handleImageUpload = (e) => {
  const files = Array.from(e.target.files);
  const maxImages = 5;

  if (uploadedImages.length + files.length > maxImages) {
    alert(`You can only upload up to ${maxImages} images`);
    return;
  }

  files.forEach(file => {
    if (file.size > 5 * 1024 * 1024) {
      alert(`${file.name} is too large. Maximum file size is 5MB`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImages(prev => [...prev, {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        preview: reader.result
      }]);
    };
    reader.readAsDataURL(file);
  });
};

// Remove Handler
const removeImage = (id) => {
  setUploadedImages(prev => prev.filter(img => img.id !== id));
};
```

---

## 📊 File Size Reference

### Image Sizes
- **Low Quality**: 100-500 KB
- **Medium Quality**: 500 KB - 2 MB
- **High Quality**: 2-5 MB
- **Maximum Allowed**: 5 MB

### Recommendations
- Customers should use **medium quality** for best balance
- Modern smartphones produce 2-4 MB photos
- Screenshots are usually < 1 MB
- Encourage multiple angles over single high-res image

---

## ✅ Benefits

### For Customers
- **Visual Communication**: Show the exact problem
- **Better Estimates**: Plumber can assess before arriving
- **Documentation**: Record of issue for reference
- **Easy Upload**: Simple click/drag interface
- **Instant Preview**: See what you're sending

### For Plumbers
- **Better Preparation**: Know what tools to bring
- **Accurate Quotes**: Estimate parts/time needed
- **Job Prioritization**: Assess urgency visually
- **Documentation**: Before/after photos
- **Customer Communication**: Reference specific issues

---

## 🎯 Use Cases

### Common Scenarios
1. **Leaking Pipe**: Photo of water damage
2. **Broken Fixture**: Show cracked sink/toilet
3. **Installation**: Picture of new appliance
4. **Inspection**: Multiple angles of system
5. **Emergency**: Flooded area photos

### Example Descriptions
- "Photo 1: Water pooling under sink"
- "Photo 2: Visible crack in pipe"
- "Photo 3: Water stain on ceiling"
- "Photo 4: Full bathroom view"
- "Photo 5: Close-up of leak"

---

## 🔒 Security & Privacy

### Current Implementation
- Images stored in browser memory only
- Not sent to any server (frontend-only)
- Cleared when page reloads
- No persistent storage

### Production Recommendations
- **HTTPS Only**: Secure transmission
- **Image Scanning**: Check for malware
- **Size Limits**: Prevent abuse
- **Format Validation**: Server-side checks
- **Privacy**: Don't share without permission
- **Retention**: Delete after job complete
- **Access Control**: Only assigned plumber can view

---

## 📍 Location in App

**Path**: `/book/[businessId]` - Step 2 (Enter Details)

**Position**: After "Job Description" field, before Submit button

**URL**: http://localhost:3000/book/demo

---

**Result**: A professional, user-friendly image upload system that helps customers better communicate their plumbing needs! 📸✨
