// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlPf7xaLTcARbZHtVpPYEDpSRRZHWyuWU",
  authDomain: "datasweepr.firebaseapp.com",
  projectId: "datasweepr",
  storageBucket: "datasweepr.firebasestorage.app",
  messagingSenderId: "1071200842389",
  appId: "1:1071200842389:web:d2d3b2adbea581f1ea619c",
  measurementId: "G-6D5KW2MFV2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = firebase.auth();

// Initialize Firestore
const db = firebase.firestore();

// Export for use in other files
window.auth = auth;
window.db = db; 