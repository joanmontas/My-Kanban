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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
auth.languageCode = "en";
const provider = new GoogleAuthProvider();


$("#navBar").load("../navbar.html", function() {
    $("#homeLink").attr("href", "#");
    $("#featuresLink").attr("href", "./features/features.html");
    $("#boardLink").attr("href", "./board/board.html");
});

const signInn = async () => { // Use async for cleaner handling
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("Successfully signInn", user);
    } catch (error) {
        console.error("Error: Unable to signOutt ", error);
    }
};

const signOutt = async () => {
    try {
        await signOut(auth);
        console.log("successfully signout");
    } catch (error) {
        console.error("Error: Unable to signout ", error);
    }
};


onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("logged", user);
        $("#loginLogoutButton").text("Logout");
        $("#loginLogoutButton").on("click", signOutt);

    } else {
        console.log("Not logged ");
        $("#loginLogoutButton").text("Login");
        $("#loginLogoutButton").on("click", signInn);
    }
});