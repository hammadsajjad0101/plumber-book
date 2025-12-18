# PlumberBook Backend API Documentation

## Table of Contents
1. [Overview](#overview)
2. [Authentication APIs](#authentication-apis)
3. [User Management APIs](#user-management-apis)
4. [Plumber Management APIs](#plumber-management-apis)
5. [Booking Management APIs](#booking-management-apis)
6. [Payment APIs](#payment-apis)
7. [Review & Rating APIs](#review--rating-apis)
8. [Analytics APIs](#analytics-apis)
9. [Notification APIs](#notification-apis)
10. [File Upload APIs](#file-upload-apis)
11. [Search & Filter APIs](#search--filter-apis)
12. [Dashboard APIs](#dashboard-apis)
13. [Database Schema](#database-schema)
14. [Third-Party Integrations](#third-party-integrations)

---

## Overview

**Base URL**: `https://api.plumberbook.com/v1`

**Authentication**: JWT Bearer Token (except for public endpoints)

**Request Header**:
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Standard Response Format**:
```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "timestamp": "2025-12-03T10:30:00Z"
}
```

**Error Response Format**:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  },
  "timestamp": "2025-12-03T10:30:00Z"
}
```

---

## Authentication APIs

### 1. Register User
**Endpoint**: `POST /auth/register`
**Access**: Public
**Description**: Register a new customer account

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "fullName": "John Doe",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "Austin",
    "state": "TX",
    "zipCode": "78701"
  }
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "userId": "usr_abc123",
    "email": "user@example.com",
    "fullName": "John Doe",
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 3600
  },
  "message": "Registration successful"
}
```

---

### 2. Register Plumber
**Endpoint**: `POST /auth/register/plumber`
**Access**: Public
**Description**: Register a new plumber account

**Request Body**:
```json
{
  "email": "plumber@example.com",
  "password": "securePassword123",
  "fullName": "Mike Johnson",
  "phone": "+1234567890",
  "businessName": "Johnson Plumbing",
  "licenseNumber": "PL-12345",
  "yearsExperience": 10,
  "specialties": ["Emergency Repairs", "Installations"],
  "serviceAreas": ["Austin", "Round Rock"],
  "hourlyRate": 85,
  "availability": {
    "monday": { "start": "08:00", "end": "18:00" },
    "tuesday": { "start": "08:00", "end": "18:00" }
  }
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "plumberId": "plm_xyz789",
    "email": "plumber@example.com",
    "fullName": "Mike Johnson",
    "status": "pending_verification",
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  },
  "message": "Registration successful. Account pending verification."
}
```

---

### 3. Login
**Endpoint**: `POST /auth/login`
**Access**: Public
**Description**: Login with email and password

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "userId": "usr_abc123",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "customer",
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 3600
  }
}
```

---

### 4. Refresh Token
**Endpoint**: `POST /auth/refresh`
**Access**: Public
**Description**: Get new access token using refresh token

**Request Body**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 3600
  }
}
```

---

### 5. Logout
**Endpoint**: `POST /auth/logout`
**Access**: Protected
**Description**: Invalidate current session

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 6. Forgot Password
**Endpoint**: `POST /auth/forgot-password`
**Access**: Public
**Description**: Send password reset email

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

---

### 7. Reset Password
**Endpoint**: `POST /auth/reset-password`
**Access**: Public
**Description**: Reset password with token

**Request Body**:
```json
{
  "token": "reset_token_abc123",
  "newPassword": "newSecurePassword123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

---

## User Management APIs

### 8. Get User Profile
**Endpoint**: `GET /users/me`
**Access**: Protected
**Description**: Get current user profile

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "userId": "usr_abc123",
    "email": "user@example.com",
    "fullName": "John Doe",
    "phone": "+1234567890",
    "profileImage": "https://cdn.plumberbook.com/profiles/usr_abc123.jpg",
    "address": {
      "street": "123 Main St",
      "city": "Austin",
      "state": "TX",
      "zipCode": "78701"
    },
    "createdAt": "2025-01-15T10:30:00Z",
    "totalBookings": 12,
    "memberSince": "2025-01-15"
  }
}
```

---

### 9. Update User Profile
**Endpoint**: `PUT /users/me`
**Access**: Protected
**Description**: Update user profile

**Request Body**:
```json
{
  "fullName": "John M. Doe",
  "phone": "+1234567891",
  "address": {
    "street": "456 Oak Ave",
    "city": "Austin",
    "state": "TX",
    "zipCode": "78702"
  }
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "userId": "usr_abc123",
    "fullName": "John M. Doe",
    "phone": "+1234567891",
    "address": { ... }
  },
  "message": "Profile updated successfully"
}
```

---

### 10. Change Password
**Endpoint**: `PUT /users/me/password`
**Access**: Protected
**Description**: Change user password

**Request Body**:
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newSecurePassword123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### 11. Delete Account
**Endpoint**: `DELETE /users/me`
**Access**: Protected
**Description**: Delete user account

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

---

## Plumber Management APIs

### 12. Get All Plumbers (Public)
**Endpoint**: `GET /plumbers`
**Access**: Public
**Description**: Get list of verified plumbers with filters

**Query Parameters**:
- `page` (default: 1)
- `limit` (default: 12)
- `specialty` (e.g., "Emergency Repairs")
- `city` (e.g., "Austin")
- `minRating` (e.g., 4.5)
- `maxRate` (e.g., 100)
- `availability` (e.g., "today")
- `sortBy` (e.g., "rating", "price", "experience")

**Example**: `GET /plumbers?city=Austin&specialty=Emergency Repairs&minRating=4.5&sortBy=rating`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "plumbers": [
      {
        "plumberId": "plm_xyz789",
        "fullName": "Mike Johnson",
        "businessName": "Johnson Plumbing",
        "profileImage": "https://cdn.plumberbook.com/plumbers/plm_xyz789.jpg",
        "rating": 4.9,
        "totalReviews": 127,
        "yearsExperience": 10,
        "specialties": ["Emergency Repairs", "Installations"],
        "hourlyRate": 85,
        "serviceAreas": ["Austin", "Round Rock"],
        "verified": true,
        "availableToday": true,
        "responseTime": "15 mins"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalPlumbers": 58,
      "hasNext": true,
      "hasPrevious": false
    }
  }
}
```

---

### 13. Get Plumber Details
**Endpoint**: `GET /plumbers/:plumberId`
**Access**: Public
**Description**: Get detailed plumber profile

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "plumberId": "plm_xyz789",
    "fullName": "Mike Johnson",
    "businessName": "Johnson Plumbing",
    "email": "mike@johnsonplumbing.com",
    "phone": "+1234567890",
    "profileImage": "https://cdn.plumberbook.com/plumbers/plm_xyz789.jpg",
    "bio": "Professional plumber with 10+ years experience...",
    "licenseNumber": "PL-12345",
    "verified": true,
    "rating": 4.9,
    "totalReviews": 127,
    "totalJobs": 543,
    "yearsExperience": 10,
    "specialties": ["Emergency Repairs", "Installations", "Drain Cleaning"],
    "serviceAreas": ["Austin", "Round Rock", "Cedar Park"],
    "hourlyRate": 85,
    "availability": {
      "monday": { "start": "08:00", "end": "18:00", "available": true },
      "tuesday": { "start": "08:00", "end": "18:00", "available": true }
    },
    "certifications": [
      {
        "name": "Master Plumber License",
        "issuedBy": "Texas State Board",
        "issuedDate": "2015-03-15"
      }
    ],
    "gallery": [
      "https://cdn.plumberbook.com/gallery/plm_xyz789_1.jpg",
      "https://cdn.plumberbook.com/gallery/plm_xyz789_2.jpg"
    ],
    "reviews": [
      {
        "reviewId": "rev_123",
        "customerName": "Sarah M.",
        "rating": 5,
        "comment": "Excellent service! Very professional.",
        "date": "2025-11-28T14:30:00Z"
      }
    ],
    "memberSince": "2020-01-15"
  }
}
```

---

### 14. Update Plumber Profile
**Endpoint**: `PUT /plumbers/me`
**Access**: Protected (Plumber only)
**Description**: Update plumber profile

**Request Body**:
```json
{
  "bio": "Updated professional bio...",
  "hourlyRate": 90,
  "specialties": ["Emergency Repairs", "Installations", "Drain Cleaning"],
  "serviceAreas": ["Austin", "Round Rock", "Cedar Park"],
  "availability": {
    "monday": { "start": "08:00", "end": "18:00" }
  }
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": { ... },
  "message": "Profile updated successfully"
}
```

---

### 15. Get Plumber Dashboard Stats
**Endpoint**: `GET /plumbers/me/stats`
**Access**: Protected (Plumber only)
**Description**: Get plumber dashboard statistics

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "totalEarnings": 34500,
    "pendingPayouts": 2800,
    "totalBookings": 227,
    "completedJobs": 215,
    "cancelledJobs": 12,
    "averageRating": 4.9,
    "totalReviews": 127,
    "responseTime": "22 min",
    "completionRate": 96,
    "repeatCustomers": 68,
    "upcomingBookings": 8,
    "todayBookings": 3
  }
}
```

---

### 16. Toggle Availability
**Endpoint**: `PUT /plumbers/me/availability`
**Access**: Protected (Plumber only)
**Description**: Toggle online/offline status

**Request Body**:
```json
{
  "available": false,
  "reason": "On vacation until Dec 10"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "available": false,
    "unavailableUntil": "2025-12-10T00:00:00Z"
  },
  "message": "Availability updated"
}
```

---

## Booking Management APIs

### 17. Create Booking
**Endpoint**: `POST /bookings`
**Access**: Protected (Customer only)
**Description**: Create a new booking

**Request Body**:
```json
{
  "plumberId": "plm_xyz789",
  "serviceType": "Emergency Repair",
  "scheduledDate": "2025-12-05",
  "scheduledTime": "14:00",
  "estimatedDuration": 2,
  "address": {
    "street": "123 Main St",
    "city": "Austin",
    "state": "TX",
    "zipCode": "78701"
  },
  "description": "Kitchen sink is leaking heavily",
  "urgency": "high",
  "images": [
    "https://cdn.plumberbook.com/bookings/img1.jpg"
  ],
  "contactPhone": "+1234567890"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "bookingId": "bkg_abc123",
    "plumberId": "plm_xyz789",
    "plumberName": "Mike Johnson",
    "customerId": "usr_abc123",
    "serviceType": "Emergency Repair",
    "status": "pending",
    "scheduledDate": "2025-12-05",
    "scheduledTime": "14:00",
    "estimatedCost": 170,
    "address": { ... },
    "description": "Kitchen sink is leaking heavily",
    "createdAt": "2025-12-03T10:30:00Z"
  },
  "message": "Booking created successfully"
}
```

---

### 18. Get Booking Details
**Endpoint**: `GET /bookings/:bookingId`
**Access**: Protected
**Description**: Get booking details

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "bookingId": "bkg_abc123",
    "status": "confirmed",
    "customer": {
      "userId": "usr_abc123",
      "fullName": "John Doe",
      "phone": "+1234567890",
      "profileImage": "..."
    },
    "plumber": {
      "plumberId": "plm_xyz789",
      "fullName": "Mike Johnson",
      "businessName": "Johnson Plumbing",
      "phone": "+1234567890",
      "profileImage": "...",
      "rating": 4.9
    },
    "serviceType": "Emergency Repair",
    "scheduledDate": "2025-12-05",
    "scheduledTime": "14:00",
    "estimatedDuration": 2,
    "address": { ... },
    "description": "Kitchen sink is leaking heavily",
    "images": ["..."],
    "estimatedCost": 170,
    "actualCost": null,
    "paymentStatus": "pending",
    "createdAt": "2025-12-03T10:30:00Z",
    "updatedAt": "2025-12-03T11:00:00Z",
    "timeline": [
      {
        "status": "created",
        "timestamp": "2025-12-03T10:30:00Z",
        "note": "Booking created"
      },
      {
        "status": "confirmed",
        "timestamp": "2025-12-03T11:00:00Z",
        "note": "Plumber confirmed the booking"
      }
    ]
  }
}
```

---

### 19. Get User Bookings
**Endpoint**: `GET /bookings`
**Access**: Protected
**Description**: Get all bookings for current user

**Query Parameters**:
- `status` (pending, confirmed, in_progress, completed, cancelled)
- `page` (default: 1)
- `limit` (default: 10)

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "bookings": [
      {
        "bookingId": "bkg_abc123",
        "plumberName": "Mike Johnson",
        "serviceType": "Emergency Repair",
        "status": "confirmed",
        "scheduledDate": "2025-12-05",
        "scheduledTime": "14:00",
        "estimatedCost": 170,
        "createdAt": "2025-12-03T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalBookings": 28
    }
  }
}
```

---

### 20. Update Booking Status
**Endpoint**: `PUT /bookings/:bookingId/status`
**Access**: Protected
**Description**: Update booking status (plumber or customer)

**Request Body**:
```json
{
  "status": "confirmed",
  "note": "I will arrive 15 minutes early"
}
```

**Allowed Status Transitions**:
- Customer: `pending` → `cancelled`
- Plumber: `pending` → `confirmed` | `rejected`
- Plumber: `confirmed` → `in_progress`
- Plumber: `in_progress` → `completed`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "bookingId": "bkg_abc123",
    "status": "confirmed",
    "updatedAt": "2025-12-03T11:00:00Z"
  },
  "message": "Booking status updated"
}
```

---

### 21. Cancel Booking
**Endpoint**: `DELETE /bookings/:bookingId`
**Access**: Protected
**Description**: Cancel a booking

**Request Body**:
```json
{
  "reason": "Customer no longer needs service",
  "cancellationFee": 0
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "bookingId": "bkg_abc123",
    "status": "cancelled",
    "refundAmount": 0,
    "cancellationFee": 0
  },
  "message": "Booking cancelled successfully"
}
```

---

### 22. Reschedule Booking
**Endpoint**: `PUT /bookings/:bookingId/reschedule`
**Access**: Protected
**Description**: Reschedule a booking

**Request Body**:
```json
{
  "newDate": "2025-12-06",
  "newTime": "10:00",
  "reason": "Emergency came up"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "bookingId": "bkg_abc123",
    "scheduledDate": "2025-12-06",
    "scheduledTime": "10:00"
  },
  "message": "Booking rescheduled successfully"
}
```

---

## Payment APIs

### 23. Create Payment Intent
**Endpoint**: `POST /payments/intent`
**Access**: Protected
**Description**: Create Stripe payment intent for booking

**Request Body**:
```json
{
  "bookingId": "bkg_abc123",
  "amount": 170
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "clientSecret": "pi_abc123_secret_xyz",
    "paymentIntentId": "pi_abc123",
    "amount": 170,
    "currency": "usd"
  }
}
```

---

### 24. Confirm Payment
**Endpoint**: `POST /payments/confirm`
**Access**: Protected
**Description**: Confirm payment after Stripe processing

**Request Body**:
```json
{
  "bookingId": "bkg_abc123",
  "paymentIntentId": "pi_abc123",
  "paymentMethodId": "pm_abc123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "paymentId": "pay_abc123",
    "bookingId": "bkg_abc123",
    "amount": 170,
    "status": "succeeded",
    "receiptUrl": "https://stripe.com/receipts/..."
  },
  "message": "Payment successful"
}
```

---

### 25. Get Payment History
**Endpoint**: `GET /payments`
**Access**: Protected
**Description**: Get payment history for user

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "payments": [
      {
        "paymentId": "pay_abc123",
        "bookingId": "bkg_abc123",
        "amount": 170,
        "status": "succeeded",
        "method": "card",
        "receiptUrl": "...",
        "createdAt": "2025-12-05T16:30:00Z"
      }
    ],
    "totalSpent": 2340
  }
}
```

---

### 26. Request Refund
**Endpoint**: `POST /payments/:paymentId/refund`
**Access**: Protected
**Description**: Request refund for a payment

**Request Body**:
```json
{
  "reason": "Service not completed as expected",
  "amount": 170
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "refundId": "ref_abc123",
    "paymentId": "pay_abc123",
    "amount": 170,
    "status": "pending"
  },
  "message": "Refund request submitted"
}
```

---

### 27. Get Plumber Earnings
**Endpoint**: `GET /payments/plumber/earnings`
**Access**: Protected (Plumber only)
**Description**: Get plumber earnings breakdown

**Query Parameters**:
- `startDate` (e.g., "2025-01-01")
- `endDate` (e.g., "2025-12-31")

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "totalEarnings": 34500,
    "paidOut": 31700,
    "pending": 2800,
    "platformFee": 3450,
    "netEarnings": 31050,
    "monthlyBreakdown": [
      {
        "month": "2025-01",
        "earnings": 4200,
        "jobs": 28
      }
    ]
  }
}
```

---

### 28. Request Payout
**Endpoint**: `POST /payments/plumber/payout`
**Access**: Protected (Plumber only)
**Description**: Request payout to bank account

**Request Body**:
```json
{
  "amount": 2800,
  "bankAccountId": "ba_abc123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "payoutId": "po_abc123",
    "amount": 2800,
    "status": "pending",
    "estimatedArrival": "2025-12-06"
  },
  "message": "Payout requested successfully"
}
```

---

## Review & Rating APIs

### 29. Create Review
**Endpoint**: `POST /reviews`
**Access**: Protected (Customer only)
**Description**: Leave a review for completed booking

**Request Body**:
```json
{
  "bookingId": "bkg_abc123",
  "plumberId": "plm_xyz789",
  "rating": 5,
  "comment": "Excellent service! Very professional and quick.",
  "categories": {
    "professionalism": 5,
    "quality": 5,
    "punctuality": 5,
    "communication": 5
  }
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "reviewId": "rev_abc123",
    "bookingId": "bkg_abc123",
    "plumberId": "plm_xyz789",
    "customerId": "usr_abc123",
    "customerName": "John Doe",
    "rating": 5,
    "comment": "Excellent service! Very professional and quick.",
    "createdAt": "2025-12-05T18:00:00Z"
  },
  "message": "Review submitted successfully"
}
```

---

### 30. Get Plumber Reviews
**Endpoint**: `GET /plumbers/:plumberId/reviews`
**Access**: Public
**Description**: Get all reviews for a plumber

**Query Parameters**:
- `page` (default: 1)
- `limit` (default: 10)
- `minRating` (e.g., 4)

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "reviewId": "rev_abc123",
        "customerName": "John Doe",
        "customerImage": "...",
        "rating": 5,
        "comment": "Excellent service!",
        "categories": {
          "professionalism": 5,
          "quality": 5,
          "punctuality": 5,
          "communication": 5
        },
        "createdAt": "2025-12-05T18:00:00Z",
        "helpful": 12
      }
    ],
    "summary": {
      "averageRating": 4.9,
      "totalReviews": 127,
      "ratingDistribution": {
        "5": 98,
        "4": 22,
        "3": 5,
        "2": 1,
        "1": 1
      }
    },
    "pagination": {
      "currentPage": 1,
      "totalPages": 13
    }
  }
}
```

---

### 31. Update Review
**Endpoint**: `PUT /reviews/:reviewId`
**Access**: Protected (Review author only)
**Description**: Update existing review

**Request Body**:
```json
{
  "rating": 4,
  "comment": "Updated: Good service overall."
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": { ... },
  "message": "Review updated successfully"
}
```

---

### 32. Delete Review
**Endpoint**: `DELETE /reviews/:reviewId`
**Access**: Protected (Review author only)
**Description**: Delete a review

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Review deleted successfully"
}
```

---

### 33. Mark Review Helpful
**Endpoint**: `POST /reviews/:reviewId/helpful`
**Access**: Protected
**Description**: Mark a review as helpful

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "reviewId": "rev_abc123",
    "helpfulCount": 13
  }
}
```

---

## Analytics APIs

### 34. Get Customer Analytics
**Endpoint**: `GET /analytics/customer`
**Access**: Protected (Customer only)
**Description**: Get customer usage analytics

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "totalBookings": 12,
    "totalSpent": 2340,
    "averageRating": 4.8,
    "favoriteServices": ["Emergency Repair", "Installations"],
    "monthlySpending": [
      { "month": "Nov", "amount": 450 },
      { "month": "Dec", "amount": 340 }
    ]
  }
}
```

---

### 35. Get Plumber Analytics
**Endpoint**: `GET /analytics/plumber`
**Access**: Protected (Plumber only)
**Description**: Get plumber business analytics

**Query Parameters**:
- `period` (week, month, year, custom)
- `startDate`
- `endDate`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "revenueData": [
      { "month": "Jan", "revenue": 4200, "bookings": 28 },
      { "month": "Feb", "revenue": 3800, "bookings": 24 }
    ],
    "serviceDistribution": [
      { "name": "Emergency Repairs", "value": 35, "color": "#ef4444" },
      { "name": "Installations", "value": 25, "color": "#3b82f6" }
    ],
    "weeklyBookings": [
      { "day": "Mon", "bookings": 8 },
      { "day": "Tue", "bookings": 12 }
    ],
    "performanceMetrics": {
      "responseTime": 22,
      "completionRate": 96,
      "customerRating": 4.9,
      "repeatCustomers": 68
    },
    "topCustomers": [
      {
        "customerId": "usr_abc123",
        "name": "John Doe",
        "totalBookings": 5,
        "totalSpent": 850
      }
    ]
  }
}
```

---

### 36. Get Platform Analytics (Admin)
**Endpoint**: `GET /analytics/platform`
**Access**: Protected (Admin only)
**Description**: Get platform-wide analytics

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "totalUsers": 1247,
    "totalPlumbers": 89,
    "totalBookings": 3542,
    "totalRevenue": 425300,
    "averageBookingValue": 120,
    "growthRate": 12.5,
    "topCities": [
      { "city": "Austin", "bookings": 842 },
      { "city": "Dallas", "bookings": 634 }
    ],
    "popularServices": [
      { "service": "Emergency Repair", "count": 1247 }
    ]
  }
}
```

---

## Notification APIs

### 37. Get Notifications
**Endpoint**: `GET /notifications`
**Access**: Protected
**Description**: Get user notifications

**Query Parameters**:
- `unreadOnly` (boolean)
- `page` (default: 1)
- `limit` (default: 20)

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "notificationId": "ntf_abc123",
        "type": "booking_confirmed",
        "title": "Booking Confirmed",
        "message": "Mike Johnson confirmed your booking for Dec 5 at 2:00 PM",
        "read": false,
        "createdAt": "2025-12-03T11:00:00Z",
        "actionUrl": "/bookings/bkg_abc123"
      }
    ],
    "unreadCount": 5
  }
}
```

---

### 38. Mark Notification as Read
**Endpoint**: `PUT /notifications/:notificationId/read`
**Access**: Protected
**Description**: Mark notification as read

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

### 39. Mark All Notifications as Read
**Endpoint**: `PUT /notifications/read-all`
**Access**: Protected
**Description**: Mark all notifications as read

**Response** (200 OK):
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

### 40. Get Notification Preferences
**Endpoint**: `GET /notifications/preferences`
**Access**: Protected
**Description**: Get user notification preferences

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "email": {
      "bookingUpdates": true,
      "promotions": false,
      "newsletter": true
    },
    "sms": {
      "bookingUpdates": true,
      "reminders": true
    },
    "push": {
      "bookingUpdates": true,
      "messages": true
    }
  }
}
```

---

### 41. Update Notification Preferences
**Endpoint**: `PUT /notifications/preferences`
**Access**: Protected
**Description**: Update notification preferences

**Request Body**:
```json
{
  "email": {
    "bookingUpdates": true,
    "promotions": false
  },
  "sms": {
    "bookingUpdates": true
  }
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Preferences updated successfully"
}
```

---

### 42. Send SMS Notification (Internal)
**Endpoint**: `POST /notifications/sms`
**Access**: Internal (Server-to-server)
**Description**: Send SMS via Twilio (used by booking system)

**Request Body**:
```json
{
  "to": "+1234567890",
  "message": "Your booking is confirmed for Dec 5 at 2:00 PM",
  "bookingId": "bkg_abc123"
}
```

---

## File Upload APIs

### 43. Upload Profile Image
**Endpoint**: `POST /uploads/profile`
**Access**: Protected
**Description**: Upload profile picture

**Request**: `multipart/form-data`
```
file: (image file, max 5MB)
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "url": "https://cdn.plumberbook.com/profiles/usr_abc123.jpg",
    "thumbnailUrl": "https://cdn.plumberbook.com/profiles/usr_abc123_thumb.jpg"
  }
}
```

---

### 44. Upload Booking Images
**Endpoint**: `POST /uploads/booking`
**Access**: Protected
**Description**: Upload problem images for booking

**Request**: `multipart/form-data`
```
files[]: (multiple image files, max 10MB each)
bookingId: "bkg_abc123"
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "images": [
      "https://cdn.plumberbook.com/bookings/bkg_abc123_1.jpg",
      "https://cdn.plumberbook.com/bookings/bkg_abc123_2.jpg"
    ]
  }
}
```

---

### 45. Upload Gallery Images (Plumber)
**Endpoint**: `POST /uploads/gallery`
**Access**: Protected (Plumber only)
**Description**: Upload work portfolio images

**Request**: `multipart/form-data`
```
files[]: (multiple image files)
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "images": [
      "https://cdn.plumberbook.com/gallery/plm_xyz789_1.jpg"
    ]
  }
}
```

---

### 46. Upload Documents (Plumber)
**Endpoint**: `POST /uploads/documents`
**Access**: Protected (Plumber only)
**Description**: Upload license/certification documents

**Request**: `multipart/form-data`
```
file: (PDF or image file)
documentType: "license" | "certificate" | "insurance"
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "documentId": "doc_abc123",
    "url": "https://cdn.plumberbook.com/documents/plm_xyz789_license.pdf",
    "type": "license",
    "status": "pending_verification"
  }
}
```

---

## Search & Filter APIs

### 47. Search Plumbers
**Endpoint**: `GET /search/plumbers`
**Access**: Public
**Description**: Full-text search for plumbers

**Query Parameters**:
- `q` (search query)
- `city`
- `specialty`
- `minRating`
- `maxRate`

**Example**: `GET /search/plumbers?q=emergency drain cleaning&city=Austin`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "plumberId": "plm_xyz789",
        "fullName": "Mike Johnson",
        "businessName": "Johnson Plumbing",
        "rating": 4.9,
        "specialties": ["Emergency Repairs", "Drain Cleaning"],
        "relevanceScore": 0.95
      }
    ],
    "totalResults": 12,
    "searchTime": "0.043s"
  }
}
```

---

### 48. Get Available Slots
**Endpoint**: `GET /plumbers/:plumberId/availability`
**Access**: Public
**Description**: Get available time slots for booking

**Query Parameters**:
- `date` (e.g., "2025-12-05")
- `duration` (estimated hours)

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "date": "2025-12-05",
    "availableSlots": [
      {
        "startTime": "09:00",
        "endTime": "11:00",
        "available": true
      },
      {
        "startTime": "11:00",
        "endTime": "13:00",
        "available": false,
        "reason": "Booked"
      },
      {
        "startTime": "14:00",
        "endTime": "16:00",
        "available": true
      }
    ]
  }
}
```

---

### 49. Get Service Types
**Endpoint**: `GET /services`
**Access**: Public
**Description**: Get list of service types

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "services": [
      {
        "serviceId": "srv_1",
        "name": "Emergency Repairs",
        "description": "24/7 urgent plumbing repairs",
        "averagePrice": 150,
        "estimatedDuration": 2
      },
      {
        "serviceId": "srv_2",
        "name": "Installations",
        "description": "Install new fixtures and appliances",
        "averagePrice": 200,
        "estimatedDuration": 3
      }
    ]
  }
}
```

---

### 50. Get Cities
**Endpoint**: `GET /locations/cities`
**Access**: Public
**Description**: Get list of supported cities

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "cities": [
      {
        "cityId": "city_1",
        "name": "Austin",
        "state": "TX",
        "totalPlumbers": 45
      },
      {
        "cityId": "city_2",
        "name": "Dallas",
        "state": "TX",
        "totalPlumbers": 38
      }
    ]
  }
}
```

---

## Dashboard APIs

### 51. Get Customer Dashboard
**Endpoint**: `GET /dashboard/customer`
**Access**: Protected (Customer only)
**Description**: Get customer dashboard data

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "upcomingBookings": [
      {
        "bookingId": "bkg_abc123",
        "plumberName": "Mike Johnson",
        "serviceType": "Emergency Repair",
        "scheduledDate": "2025-12-05",
        "scheduledTime": "14:00"
      }
    ],
    "recentBookings": [ ... ],
    "favoriteServices": ["Emergency Repair", "Installations"],
    "totalSpent": 2340,
    "totalBookings": 12,
    "notifications": [
      {
        "type": "booking_confirmed",
        "message": "Your booking has been confirmed",
        "time": "2 hours ago"
      }
    ],
    "suggestedPlumbers": [ ... ]
  }
}
```

---

### 52. Get Plumber Dashboard
**Endpoint**: `GET /dashboard/plumber`
**Access**: Protected (Plumber only)
**Description**: Get plumber dashboard data

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "todayBookings": [
      {
        "bookingId": "bkg_abc123",
        "customerName": "John Doe",
        "serviceType": "Emergency Repair",
        "scheduledTime": "14:00",
        "status": "confirmed",
        "address": "123 Main St, Austin"
      }
    ],
    "upcomingBookings": [ ... ],
    "pendingRequests": 3,
    "stats": {
      "totalEarnings": 34500,
      "pendingPayouts": 2800,
      "totalBookings": 227,
      "averageRating": 4.9
    },
    "recentReviews": [ ... ],
    "notifications": [ ... ]
  }
}
```

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  user_id VARCHAR(50) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  profile_image VARCHAR(500),
  role ENUM('customer', 'plumber', 'admin') DEFAULT 'customer',
  status ENUM('active', 'suspended', 'deleted') DEFAULT 'active',
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_status (status)
);
```

### Plumbers Table
```sql
CREATE TABLE plumbers (
  plumber_id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) UNIQUE NOT NULL,
  business_name VARCHAR(255),
  bio TEXT,
  license_number VARCHAR(100),
  years_experience INT,
  hourly_rate DECIMAL(10, 2),
  rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  total_jobs INT DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  available BOOLEAN DEFAULT TRUE,
  response_time INT, -- in minutes
  completion_rate INT, -- percentage
  member_since DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_rating (rating),
  INDEX idx_verified (verified),
  INDEX idx_available (available)
);
```

### Addresses Table
```sql
CREATE TABLE addresses (
  address_id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  country VARCHAR(50) DEFAULT 'USA',
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_city (city)
);
```

### Specialties Table
```sql
CREATE TABLE specialties (
  specialty_id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Plumber Specialties (Junction Table)
```sql
CREATE TABLE plumber_specialties (
  plumber_id VARCHAR(50) NOT NULL,
  specialty_id VARCHAR(50) NOT NULL,
  PRIMARY KEY (plumber_id, specialty_id),
  FOREIGN KEY (plumber_id) REFERENCES plumbers(plumber_id) ON DELETE CASCADE,
  FOREIGN KEY (specialty_id) REFERENCES specialties(specialty_id) ON DELETE CASCADE
);
```

### Service Areas Table
```sql
CREATE TABLE service_areas (
  area_id VARCHAR(50) PRIMARY KEY,
  plumber_id VARCHAR(50) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip_codes JSON, -- Array of zip codes
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (plumber_id) REFERENCES plumbers(plumber_id) ON DELETE CASCADE,
  INDEX idx_plumber (plumber_id),
  INDEX idx_city (city)
);
```

### Availability Table
```sql
CREATE TABLE availability (
  availability_id VARCHAR(50) PRIMARY KEY,
  plumber_id VARCHAR(50) NOT NULL,
  day_of_week ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'),
  start_time TIME,
  end_time TIME,
  available BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (plumber_id) REFERENCES plumbers(plumber_id) ON DELETE CASCADE,
  INDEX idx_plumber (plumber_id)
);
```

### Bookings Table
```sql
CREATE TABLE bookings (
  booking_id VARCHAR(50) PRIMARY KEY,
  customer_id VARCHAR(50) NOT NULL,
  plumber_id VARCHAR(50) NOT NULL,
  service_type VARCHAR(100) NOT NULL,
  status ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'rejected') DEFAULT 'pending',
  urgency ENUM('low', 'medium', 'high', 'emergency') DEFAULT 'medium',
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  estimated_duration INT, -- in hours
  actual_start_time TIMESTAMP,
  actual_end_time TIMESTAMP,
  address_street VARCHAR(255) NOT NULL,
  address_city VARCHAR(100) NOT NULL,
  address_state VARCHAR(50) NOT NULL,
  address_zip VARCHAR(20) NOT NULL,
  description TEXT,
  images JSON, -- Array of image URLs
  contact_phone VARCHAR(20),
  estimated_cost DECIMAL(10, 2),
  actual_cost DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (plumber_id) REFERENCES plumbers(plumber_id) ON DELETE CASCADE,
  INDEX idx_customer (customer_id),
  INDEX idx_plumber (plumber_id),
  INDEX idx_status (status),
  INDEX idx_scheduled_date (scheduled_date)
);
```

### Booking Timeline Table
```sql
CREATE TABLE booking_timeline (
  timeline_id VARCHAR(50) PRIMARY KEY,
  booking_id VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  note TEXT,
  created_by VARCHAR(50),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
  INDEX idx_booking (booking_id)
);
```

### Payments Table
```sql
CREATE TABLE payments (
  payment_id VARCHAR(50) PRIMARY KEY,
  booking_id VARCHAR(50) NOT NULL,
  customer_id VARCHAR(50) NOT NULL,
  plumber_id VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2),
  plumber_earnings DECIMAL(10, 2),
  payment_method VARCHAR(50), -- 'card', 'bank_transfer'
  payment_intent_id VARCHAR(255), -- Stripe payment intent ID
  status ENUM('pending', 'processing', 'succeeded', 'failed', 'refunded') DEFAULT 'pending',
  receipt_url VARCHAR(500),
  refund_amount DECIMAL(10, 2) DEFAULT 0,
  refund_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (plumber_id) REFERENCES plumbers(plumber_id) ON DELETE CASCADE,
  INDEX idx_booking (booking_id),
  INDEX idx_status (status)
);
```

### Payouts Table (for plumbers)
```sql
CREATE TABLE payouts (
  payout_id VARCHAR(50) PRIMARY KEY,
  plumber_id VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
  bank_account_id VARCHAR(255),
  estimated_arrival DATE,
  actual_arrival DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (plumber_id) REFERENCES plumbers(plumber_id) ON DELETE CASCADE,
  INDEX idx_plumber (plumber_id),
  INDEX idx_status (status)
);
```

### Reviews Table
```sql
CREATE TABLE reviews (
  review_id VARCHAR(50) PRIMARY KEY,
  booking_id VARCHAR(50) NOT NULL,
  customer_id VARCHAR(50) NOT NULL,
  plumber_id VARCHAR(50) NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  professionalism_rating INT,
  quality_rating INT,
  punctuality_rating INT,
  communication_rating INT,
  helpful_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (plumber_id) REFERENCES plumbers(plumber_id) ON DELETE CASCADE,
  INDEX idx_plumber (plumber_id),
  INDEX idx_rating (rating)
);
```

### Notifications Table
```sql
CREATE TABLE notifications (
  notification_id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  action_url VARCHAR(500),
  read_status BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_read (read_status),
  INDEX idx_created (created_at)
);
```

### Notification Preferences Table
```sql
CREATE TABLE notification_preferences (
  preference_id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) UNIQUE NOT NULL,
  email_booking_updates BOOLEAN DEFAULT TRUE,
  email_promotions BOOLEAN DEFAULT TRUE,
  email_newsletter BOOLEAN DEFAULT TRUE,
  sms_booking_updates BOOLEAN DEFAULT TRUE,
  sms_reminders BOOLEAN DEFAULT TRUE,
  push_booking_updates BOOLEAN DEFAULT TRUE,
  push_messages BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
```

### Certifications Table
```sql
CREATE TABLE certifications (
  certification_id VARCHAR(50) PRIMARY KEY,
  plumber_id VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  issued_by VARCHAR(255),
  issued_date DATE,
  expiry_date DATE,
  document_url VARCHAR(500),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (plumber_id) REFERENCES plumbers(plumber_id) ON DELETE CASCADE,
  INDEX idx_plumber (plumber_id)
);
```

### Gallery Table (plumber portfolio)
```sql
CREATE TABLE gallery (
  gallery_id VARCHAR(50) PRIMARY KEY,
  plumber_id VARCHAR(50) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (plumber_id) REFERENCES plumbers(plumber_id) ON DELETE CASCADE,
  INDEX idx_plumber (plumber_id)
);
```

---

## Third-Party Integrations

### 1. Stripe (Payment Processing)

**Purpose**: Handle all payment transactions

**Required Setup**:
- Stripe Account (with Connected Accounts for plumbers)
- Stripe API Keys (Publishable & Secret)
- Webhook endpoint for payment confirmations

**Key Features**:
- Payment Intents API for secure payments
- Connected Accounts for plumber payouts
- Automatic payouts to plumber bank accounts
- Refund processing
- Webhook events for real-time updates

**Webhook Events to Handle**:
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`
- `payout.paid`
- `payout.failed`

**Documentation**: https://stripe.com/docs/api

---

### 2. Twilio (SMS Notifications)

**Purpose**: Send SMS notifications for booking updates

**Required Setup**:
- Twilio Account SID
- Twilio Auth Token
- Twilio Phone Number

**SMS Triggers**:
- Booking confirmed by plumber
- Plumber is on the way
- Booking completed
- Payment received
- Review reminder (24 hours after completion)
- Upcoming booking reminder (1 hour before)

**Example SMS**:
```
PlumberBook: Your booking with Mike Johnson is confirmed for Dec 5 at 2:00 PM.
Address: 123 Main St, Austin. Track: plumberbook.com/bookings/bkg_abc123
```

**Documentation**: https://www.twilio.com/docs/sms

---

### 3. SendGrid / AWS SES (Email Service)

**Purpose**: Send transactional and marketing emails

**Required Setup**:
- SendGrid API Key or AWS SES Credentials
- Verified sender domain
- Email templates

**Email Types**:
- Welcome email
- Email verification
- Password reset
- Booking confirmations
- Receipt emails
- Review requests
- Newsletter (if enabled)
- Promotional emails

**Documentation**:
- SendGrid: https://sendgrid.com/docs/api-reference/
- AWS SES: https://docs.aws.amazon.com/ses/

---

### 4. AWS S3 / Cloudinary (File Storage)

**Purpose**: Store and serve images and documents

**Required Setup**:
- S3 Bucket or Cloudinary account
- Access credentials
- CDN configuration (CloudFront for S3)

**File Types**:
- Profile images
- Booking problem images
- Plumber gallery images
- License/certification documents
- Receipt PDFs

**Optimization**:
- Automatic image resizing
- Thumbnail generation
- Image compression
- CDN delivery

**Documentation**:
- AWS S3: https://docs.aws.amazon.com/s3/
- Cloudinary: https://cloudinary.com/documentation

---

### 5. Google Maps API

**Purpose**: Location services and geocoding

**Required Setup**:
- Google Cloud Project
- Maps JavaScript API key
- Geocoding API key
- Places API key

**Features Needed**:
- Address autocomplete
- Distance calculation
- Map display on booking details
- Plumber location on map
- Service area visualization

**Documentation**: https://developers.google.com/maps/documentation

---

### 6. Firebase Cloud Messaging (Push Notifications)

**Purpose**: Send push notifications to mobile/web apps

**Required Setup**:
- Firebase project
- FCM server key
- Client SDKs

**Notification Types**:
- New booking request (plumber)
- Booking status updates (customer)
- New message
- Review received
- Payment received

**Documentation**: https://firebase.google.com/docs/cloud-messaging

---

### 7. Redis (Caching & Sessions)

**Purpose**: Cache frequently accessed data and manage sessions

**Required Setup**:
- Redis server (AWS ElastiCache or self-hosted)
- Redis connection details

**Cached Data**:
- User sessions
- Plumber search results
- Popular plumbers list
- Analytics data
- Rate limiting

**Documentation**: https://redis.io/documentation

---

### 8. Elasticsearch (Optional - Advanced Search)

**Purpose**: Full-text search and filtering

**Use Cases**:
- Plumber search with relevance scoring
- Service search
- Location-based search
- Fuzzy matching

**Documentation**: https://www.elastic.co/guide/

---

## Environment Variables

```env
# Server
NODE_ENV=production
PORT=3000
API_BASE_URL=https://api.plumberbook.com

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=plumberbook
DB_USER=dbuser
DB_PASSWORD=securepassword

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=7d

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PLATFORM_FEE_PERCENT=10

# Twilio
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1234567890

# SendGrid
SENDGRID_API_KEY=SG...
SENDGRID_FROM_EMAIL=noreply@plumberbook.com
SENDGRID_FROM_NAME=PlumberBook

# AWS S3
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
AWS_S3_BUCKET=plumberbook-uploads
AWS_CLOUDFRONT_URL=https://cdn.plumberbook.com

# Google Maps
GOOGLE_MAPS_API_KEY=AIza...

# Firebase
FIREBASE_SERVER_KEY=...
FIREBASE_PROJECT_ID=plumberbook

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=...

# Frontend URL
FRONTEND_URL=https://plumberbook.com

# Rate Limiting
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX_REQUESTS=100
```

---

## API Rate Limiting

**Default Rate Limits**:
- Public endpoints: 100 requests per 15 minutes per IP
- Authenticated endpoints: 1000 requests per 15 minutes per user
- Search endpoints: 50 requests per 15 minutes per IP
- Upload endpoints: 20 requests per hour per user

**Rate Limit Headers**:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1670845200
```

---

## API Versioning

Current version: **v1**

API endpoints are versioned in the URL: `/v1/auth/login`

When breaking changes are needed, a new version will be created: `/v2/...`

Old versions will be maintained for 6 months after deprecation announcement.

---

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| `AUTH_001` | Invalid credentials | Email or password is incorrect |
| `AUTH_002` | Token expired | JWT token has expired |
| `AUTH_003` | Token invalid | JWT token is malformed or invalid |
| `AUTH_004` | Email already exists | User with this email already exists |
| `AUTH_005` | Unauthorized | User not authorized for this action |
| `USER_001` | User not found | User ID does not exist |
| `USER_002` | Invalid profile data | Profile update data is invalid |
| `PLUMBER_001` | Plumber not found | Plumber ID does not exist |
| `PLUMBER_002` | Not verified | Plumber account not yet verified |
| `BOOKING_001` | Booking not found | Booking ID does not exist |
| `BOOKING_002` | Invalid time slot | Requested time slot not available |
| `BOOKING_003` | Cannot cancel | Booking cannot be cancelled (too late) |
| `PAYMENT_001` | Payment failed | Payment processing failed |
| `PAYMENT_002` | Insufficient funds | Customer card has insufficient funds |
| `PAYMENT_003` | Refund failed | Refund processing failed |
| `REVIEW_001` | Already reviewed | Booking has already been reviewed |
| `REVIEW_002` | Cannot review | Only completed bookings can be reviewed |
| `UPLOAD_001` | File too large | Uploaded file exceeds size limit |
| `UPLOAD_002` | Invalid file type | File type not supported |
| `VALIDATION_001` | Validation error | Request validation failed |
| `SERVER_001` | Internal server error | Unexpected server error occurred |

---

## Security Considerations

### 1. Authentication
- JWT tokens with short expiration (1 hour)
- Refresh tokens with longer expiration (7 days)
- Secure password hashing (bcrypt, 12 rounds)
- Email verification required
- Rate limiting on auth endpoints

### 2. Authorization
- Role-based access control (customer, plumber, admin)
- Resource ownership validation
- API key authentication for server-to-server calls

### 3. Data Protection
- All endpoints use HTTPS only
- Sensitive data encrypted at rest
- PCI compliance for payment data
- GDPR compliance for user data

### 4. Input Validation
- All inputs sanitized and validated
- SQL injection prevention (parameterized queries)
- XSS prevention (output encoding)
- CSRF protection

### 5. File Uploads
- File type validation
- Size limits enforced
- Virus scanning (ClamAV)
- Secure file storage (S3 with signed URLs)

---

## API Testing

### Postman Collection
A complete Postman collection with all 52 endpoints will be provided, including:
- Pre-request scripts for authentication
- Example requests and responses
- Environment variables
- Test scripts

### Testing Checklist
- [ ] All endpoints return correct status codes
- [ ] Error handling works properly
- [ ] Authentication and authorization enforced
- [ ] Rate limiting functions correctly
- [ ] File uploads work properly
- [ ] Payment processing succeeds
- [ ] SMS notifications send correctly
- [ ] Email notifications send correctly
- [ ] Webhooks process correctly
- [ ] Database transactions are atomic

---

## Deployment Requirements

### Recommended Stack
- **Backend**: Node.js with Express.js or NestJS
- **Database**: PostgreSQL 14+
- **Cache**: Redis 6+
- **File Storage**: AWS S3
- **Hosting**: AWS EC2 / DigitalOcean / Heroku
- **Load Balancer**: AWS ALB or Nginx

### Minimum Server Requirements
- **CPU**: 2 vCPUs
- **RAM**: 4 GB
- **Storage**: 50 GB SSD
- **Bandwidth**: Unlimited

### Scaling Considerations
- Horizontal scaling with load balancer
- Database read replicas
- Redis cluster for caching
- CDN for static assets
- Background job queue (Bull/Redis)

---

## Additional Recommendations

### Background Jobs
Use a job queue (Bull, BullMQ) for:
- Sending emails
- Sending SMS notifications
- Processing payments
- Generating reports
- Image optimization
- Database cleanup

### Monitoring
- Application monitoring (New Relic, Datadog)
- Error tracking (Sentry)
- Uptime monitoring (Pingdom)
- Performance monitoring (APM)

### Logging
- Structured logging (Winston, Pino)
- Centralized logging (CloudWatch, ELK stack)
- Log rotation and retention policies

### Backup & Recovery
- Automated daily database backups
- Point-in-time recovery capability
- Regular backup testing
- Disaster recovery plan

---

## API Development Timeline Estimate

**Phase 1: Core APIs (4-6 weeks)**
- Authentication & User Management
- Plumber Management
- Booking Management (basic)

**Phase 2: Payments & Reviews (2-3 weeks)**
- Stripe integration
- Payment processing
- Review system

**Phase 3: Notifications & Analytics (2-3 weeks)**
- SMS integration (Twilio)
- Email integration (SendGrid)
- Push notifications
- Analytics APIs

**Phase 4: Advanced Features (2-3 weeks)**
- File uploads
- Advanced search
- Dashboard APIs
- Admin APIs

**Phase 5: Testing & Optimization (2-3 weeks)**
- Load testing
- Security audit
- Performance optimization
- Documentation finalization

**Total Estimated Time: 12-18 weeks**

---

## Contact & Support

For questions about this API documentation:
- Email: dev@plumberbook.com
- Documentation: https://docs.plumberbook.com
- Status Page: https://status.plumberbook.com

---

**Document Version**: 1.0
**Last Updated**: December 3, 2025
**Author**: PlumberBook Development Team
