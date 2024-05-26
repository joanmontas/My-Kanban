// Copyright Joan Montas
// All rights reserved.
// License under GNU General Public License v3.0

import {
    auth,
    signInn,
    signOutt
} from "../../auth.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInAnonymously,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

$("#signUpButton").click(function(event) {
    event.preventDefault();

    const email = $("#signUpEmailPasswordEmailInput").val();
    const password = $("#signUpEmailPasswordPasswordInput").val();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Successfully SignUp!");
            window.location.href = "../../index.html";
        })
        .catch((error) => {
            // TODO(Joan)Account for the error visually - Joan
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("ERROR: Unable to SignUp", errorCode, errorMessage);
        });
});

$("#logInButton").click(function(event) {
    event.preventDefault();

    const email = $("#signUpEmailPasswordEmailInput").val();
    const password = $("#signUpEmailPasswordPasswordInput").val();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Successfully SignUp!");
            window.location.href = "../../index.html";
        })
        .catch((error) => {
            // TODO(Joan)Account for the error visually - Joan
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("ERROR: Unable to SignUp", errorCode, errorMessage);
        });
});

$('#anonymousLogInButton').click(function(event) {
    signInAnonymously(auth)
        .then(() => {
            console.log("Successfully SignUp!");
            window.location.href = "../../index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
});

$("#continueWithGoogleButton").click(function(event) {
    event.preventDefault();
    signInn();
});

$("#navBar").load("../../navbar.html", function() {
    $("#homeLink").attr("href", "../../index.html");
    $("#featuresLink").attr("href", "../../features/features.html");
    $("#boardLink").attr("href", "../../board/board.html");
    $("#settingsLink").attr("href", "../../settings/settings.html");
})