// Copyright Joan Montas
// All rights reserved.
// License under GNU General Public License v3.0

import {
    auth,
    getUserID,
    db,
    set,
    push,
    get,
    remove,
    ref,
} from "../../auth.js";

import {
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

onAuthStateChanged(auth, () => {
    const userID = getUserID();
    if (userID) {
        console.log("looged ", userID);
        loadSettings();
    } else {
        console.log("not logged")
    }
});

$("#navBar").load("../../navbar.html", function() {
    $("#homeLink").attr("href", "../../index.html");
    $("#featuresLink").attr("href", "../../features/features.html");
    $("#boardLink").attr("href", "../../board/board.html");
    $("#settingsLink").attr("href", "#");
})


function loadSettings() {
    var userID = getUserID();

    if (!userID) {
        return;
    }

    var path = userID + "/settings";

    const dbRef0 = ref(db, path);

    get(dbRef0).then((snapshot) => {
        const data = snapshot.val();
        console.log(data);
        $("#firstName").val(data["firstName"]);
        $("#lastName").val(data["lastName"]);
        $("#displayName").val(data["displayName"]);
        $("#profilePicture").val(data["profilePicture"]);
    });
}


$("#saveSettings").click(function() {
    var userID = getUserID();
    if (!userID) {
        return;
    }

    var path = userID + "/settings";

    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var displayName = $("#displayName").val();
    var profilePicture = $("#profilePicture").val();

    const myData = {
        firstName,
        lastName,
        displayName,
        profilePicture,
    }

    const dbRef = ref(db, path);

    set(dbRef, myData).then(() => {
        console.log("Sucessfully saved settings");
        // TODO(Joan) give visual queues
    }).catch((error) => {
        alert("Error: Could not save settings:" + error);
    })
});