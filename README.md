# DataSweepr

A comprehensive data management and analysis platform with browser extension and web application components.

## Project Structure

- `webapp/` - React-based web application
- `extention/` - Browser extension for data collection

## Features

- User authentication and authorization
- Data collection and analysis
- Real-time data processing
- Browser extension for data extraction
- Modern web interface

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project setup

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rojan-upreti/datasweepr.git
cd datasweepr
```

2. Install dependencies for the webapp:
```bash
cd webapp
npm install
```

3. Set up environment variables:
   - Copy `webapp/env.example` to `webapp/.env`
   - Fill in your Firebase configuration values

4. Start the development server:
```bash
npm start
```

### Browser Extension Setup

1. Navigate to the extension directory:
```bash
cd extention
```

2. Load the extension in your browser:
   - Open Chrome/Edge and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `extention` folder

## Environment Variables

Create a `.env` file in the `webapp` directory with the following variables:

```
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore)
- **Extension**: Vanilla JavaScript, Chrome Extension API

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue on GitHub.
