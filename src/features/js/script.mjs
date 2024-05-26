// Copyright Joan Montas
// All rights reserved.
// License under GNU General Public License v3.0

import {
    auth,
    signInn,
    signOutt
} from "../../auth.js";

$(document).ready(function() {
    $("#navBar").load("../navbar.html", function() {
        $("#homeLink").attr("href", "../index.html");
        $("#featuresLink").attr("href", "#");
        $("#boardLink").attr("href", "../board/board.html");
        $("#settingsLink").attr("href", "../settings/settings.html");
    });
})