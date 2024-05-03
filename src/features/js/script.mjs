// Copyright Joan Montas
// All rights reserved.
// License under GNU General Public License v3.0
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import {
    getAnalytics
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

import {
    getDatabase,
    set,
    get,
    update,
    remove,
    ref,
    child
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

$(document).ready(function() {
    $("#navBar").load("../navbar.html", function() {
        $("#homeLink").attr("href", "../index.html");
        $("#featuresLink").attr("href", "#");
        $("#boardLink").attr("href", "../board/board.html");
    });
})