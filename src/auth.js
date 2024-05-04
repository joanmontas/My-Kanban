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

$(document).ready(function() {
    $("#navBar").load("../navbar.html", function() {
        $("#homeLink").attr("href", "../index.html");
        $("#featuresLink").attr("href", "#");
        $("#boardLink").attr("href", "../board/board.html");
    });
})

const signInn = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("Successfully signInn", user);
        location.reload(true);
    } catch (error) {
        console.error("Error: Unable to signInn ", error);
    }
};

const signOutt = async () => {
    try {
        await signOut(auth);
        console.log("successfully signOutt");
        location.reload(true);
    } catch (error) {
        console.error("Error: Unable to signOutt ", error);
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

function getUserID() {
    if (auth && auth.currentUser) {
        return auth.currentUser.uid;
    } else {
        return null;
    }
}

export {
    app,
    analytics,
    auth,
    signInn,
    signOutt,
    provider,
    getUserID
};