# AK Resorts - A Full-Stack Resort Booking Platform

[![Node.js](https://img.shields.io/badge/Node.js-18.0%2B-brightgreen)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.17.1-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0%2B-green)](https://www.mongodb.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

AK Resorts is a full-stack web application that allows users to explore, review, and book resorts. Built with modern web technologies, it provides a seamless user experience for both resort owners and travelers.

## Demo

If you want to see a demo of this project in action, you can visit:
[DEMO](https://ak-resorts.vercel.app/listings) 

## 🌟 Key Features

-   User authentication and authorization
-   Browse and search resorts with filters
-   Leave reviews and ratings
-   Interactive maps integration
-   Image upload with Cloudinary
-   Responsive design for all devices
-   Real-time notifications
-   Session management

## 🛠 Tech Stack

### Backend

-   **Runtime**: Node.js (v18+)
-   **Framework**: Express.js
-   **Database**: MongoDB with Mongoose ODM
-   **Authentication**: Passport.js with Local Strategy
-   **File Upload**: Multer with Cloudinary
-   **Sessions**: Express-session with MongoDB session store

### Frontend

-   **Templating**: EJS with EJS-Mate
-   **Styling**: Bootstrap 5 with custom CSS
-   **Icons**: Bootstrap Icons
-   **Maps**: Mapbox Integration

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   MongoDB Atlas account or local MongoDB installation
-   Cloudinary account for image storage
-   Mapbox API key

### Environment Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/arunmudhirajcoding/AkResorts.git
    cd AKResorts
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following variables:
    ```
    ATLASDB_URL=your_mongodb_connection_string
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_KEY=your_cloudinary_api_key
    CLOUDINARY_SECRET=your_cloudinary_api_secret
    SECRET=your_session_secret
    MAPBOX_TOKEN=your_mapbox_access_token
    ```

### Running the Application

1. Start the development server:

    ```bash
    npm start
    ```

2. Open your browser and navigate to:
    ```
    http://localhost:2100
    ```

## 📁 Project Structure

```
project1/
├── config/               # Configuration files
├── controllers/          # Route controllers
├── middleware/           # Custom middleware
├── models/               # Database models
├── public/               # Static files
│   ├── css/
│   ├── js/
│   └── images/
├── routes/               # Route definitions
├── utils/                # Utility functions
├── views/                # EJS templates
│   ├── layouts/          # Layout templates
│   ├── listings/         # Listing-related views
│   └── users/            # User-related views
├── .env.example          # Example environment variables
├── app.js                # Main application file
└── package.json          # Project dependencies
```

## 🛠 Dependencies

### Core Dependencies

-   `express`: Web framework
-   `mongoose`: MongoDB ODM
-   `ejs`: Templating engine
-   `ejs-mate`: Layout support for EJS
-   `passport`: Authentication middleware
-   `cloudinary`: Image and file upload
-   `@mapbox/mapbox-sdk`: Maps integration

### Development Dependencies

-   `dotenv`: Environment variable management
-   `nodemon`: Development server (optional)

## 🔒 Security Features

-   Password hashing with bcrypt
-   Session management with secure cookies
-   CSRF protection
-   Input validation with Joi
-   Secure file upload handling

## 🚧 Future Enhancements

-   Add an owner/admin dashboard for managing listings, bookings, and payouts.
-   Integrate payments (Stripe/PayPal) with invoices and refund support.
-   Real-time booking availability sync and a shared calendar view.
-   Mobile app or Progressive Web App (PWA) for offline/low-bandwidth use.
-   Internationalization (i18n), multi-currency pricing, and tax handling.
-   Advanced search and personalized recommendations using ML signals.
-   User profiles with booking history, saved searches, and wishlists.
-   Automated email/SMS notifications and transactional receipts.
-   Accessibility (WCAG) improvements and performance optimizations.

## 🆘 Support

-   For issues or questions, contact me at [duruguarun@gmail.com](mailto:duruguarun@gmail.com).
-   Feedback is also welcome! You can create an issue on this project's GitHub page and label it as "feedback". This will help me to improve the project and make it more useful for everyone.

---

**AK Resorts — Built with care for modern resort booking experiences.**

