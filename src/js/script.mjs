// Copyright Joan Montas
// All rights reserved.
// License under GNU General Public License v3.0

import {
    auth,
    signInn,
    signOutt
} from "../auth.js";

$("#navBar").load("../navbar.html", function() {
    $("#homeLink").attr("href", "#");
    $("#featuresLink").attr("href", "./features/features.html");
    $("#boardLink").attr("href", "./board/board.html");
});