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
    push,
    get,
    remove,
    ref,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
auth.languageCode = "en";
const provider = new GoogleAuthProvider();
const db = getDatabase();

const signInn = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("Successfully signInn", user);
        console.log("Successfully signInn", result);
        window.location.href = "../index.html";
    } catch (error) {
        console.error("Error: Unable to signInn ", error);
    }
};

const signOutt = async () => {
    try {
        await signOut(auth);
        console.log("successfully signOutt");
        window.location.href = "../../index.html";
    } catch (error) {
        console.error("Error: Unable to signOutt ", error);
    }
};

function getUserID() {
    if (auth && auth.currentUser) {
        return auth.currentUser.uid;
    } else {
        return null;
    }
}

async function registerNewUser() {
    var settingPath = getUserID() + "/settings"
    const settingsDbRef = ref(db, settingPath);
    get(settingsDbRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log("Returning user");
            } else {
                console.log("New user");
                const mySettings = {
                    name: "",
                    id: getUserID(),
                    created: auth.currentUser.metadata.createdAt,
                };
                set(settingsDbRef, mySettings).then(() => {
                    console.log("Sucessfully register user in db");
                }).catch((error) => {
                    alert("Error: Could not register user:" + error);
                })
                var firstKanbanPath = getUserID() + "/personalKanbans/";
            }
        })
        .catch((error) => {
            alert("Error: Could not gather user information" + error);
        });
}

function createOwnKanban() {
    // TODO() create a sample kanban for user to interact
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("logged", user);
        // console.log("new? ", auth);
        // console.log(auth.currentUser.metadata.createdAt, " ,", auth.currentUser.metadata.lastLoginAt);
        if (getUserID()) {
            registerNewUser();
        }
        $("#loginLogoutButton").text("Logout");
        $("#loginLogoutButton").on("click", signOutt);

    } else {
        console.log("Not logged ");
        $("#loginLogoutButton").text("Login");
        $("#loginLogoutButton").on("click", function() {
            window.location.href = "../../login/login.html";
        });
    }
});

export {
    app,
    analytics,
    auth,
    signInn,
    signOutt,
    provider,
    getUserID,
    db,
    getDatabase,
    set,
    push,
    get,
    remove,
    ref,
};