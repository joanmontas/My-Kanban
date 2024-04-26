// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
    getAnalytics
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBaiICE8GM99_W_pYjcoVlqfXmnGBK3ELs",
    authDomain: "my-kanban-ddb8c.firebaseapp.com",
    projectId: "my-kanban-ddb8c",
    storageBucket: "my-kanban-ddb8c.appspot.com",
    messagingSenderId: "281639066893",
    appId: "1:281639066893:web:a1109b6933884b0baae444",
    measurementId: "G-W9J9K1ZW2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);