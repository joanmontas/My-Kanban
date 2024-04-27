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

function saveData() {
    set(ref(db, "someLocation/" + "someID"), {
        Data: "someData",
    }).then(() => {
        alert("Data added sucessfully!");
    }).catch((error) => {
        alert("Data added failed: ", error);
    })
}

$(document).ready(function() {

    $("ul.sortable").sortable({
        revert: true,
        connectWith: ".sortable"
    });

    $(".accordion").accordion({
        collapsible: true,
        active: false
    });

    $("ul, li").disableSelection();

    $("#add_todo").click(function() {
        const newLi = document.createElement("li");
        var newLiInner = '<div class="accordion">' +
            '<h3>New Accomplished</h3>' +
            '<form>' +
            '<div class="form-group">' +
            '<label>New Accomplished</label>' +
            '<input type="text" class="form-control" placeholder="Card Name">' +
            '</div>' +
            '<div class="form-group">' +
            '<label>Detail</label>' +
            '<textarea class="form-control" rows="3"></textarea>' +
            '<button type="button" class="btn btn-primary accordion-save-button">Save</button>' +
            '<button type="button" class="btn btn-danger accordion-delete-button">Delete</button>' +
            '</div>' +
            '</form>' +
            '</div>';
        newLi.innerHTML = newLiInner;

        $("#todo_sortable").append(newLi);

        const saveBut = newLi.querySelector("button.accordion-save-button");
        const delBut = newLi.querySelector("button.accordion-delete-button");

        saveBut.addEventListener("click", saveData);
        delBut.addEventListener("click", saveData);

        $(".accordion").accordion({
            collapsible: true,
            active: false
        });
    });

    $("#add_in_progress").click(function() {
        const newLi = document.createElement("li");
        var newLiInner = '<div class="accordion">' +
            '<h3>New Accomplished</h3>' +
            '<form>' +
            '<div class="form-group">' +
            '<label>New Accomplished</label>' +
            '<input type="text" class="form-control" placeholder="Card Name">' +
            '</div>' +
            '<div class="form-group">' +
            '<label>Detail</label>' +
            '<textarea class="form-control" rows="3"></textarea>' +
            '<button type="button" class="btn btn-primary accordion-save-button">Save</button>' +
            '<button type="button" class="btn btn-danger accordion-delete-button">Delete</button>' +
            '</div>' +
            '</form>' +
            '</div>';
        newLi.innerHTML = newLiInner;

        $("#in_progress_sortable").append(newLi);

        const saveBut = newLi.querySelector("button.accordion-save-button");
        const delBut = newLi.querySelector("button.accordion-delete-button");

        saveBut.addEventListener("click", saveData);
        delBut.addEventListener("click", saveData);

        $(".accordion").accordion({
            collapsible: true,
            active: false
        });
    });

    $("#add_accomplished").click(function() {
        const newLi = document.createElement("li");
        var newLiInner = '<div class="accordion">' +
            '<h3>New Accomplished</h3>' +
            '<form>' +
            '<div class="form-group">' +
            '<label>New Accomplished</label>' +
            '<input type="text" class="form-control" placeholder="Card Name">' +
            '</div>' +
            '<div class="form-group">' +
            '<label>Detail</label>' +
            '<textarea class="form-control" rows="3"></textarea>' +
            '<button type="button" class="btn btn-primary accordion-save-button">Save</button>' +
            '<button type="button" class="btn btn-danger accordion-delete-button">Delete</button>' +
            '</div>' +
            '</form>' +
            '</div>';
        newLi.innerHTML = newLiInner;

        $("#accomplished_sortable").append(newLi);

        const saveBut = newLi.querySelector("button.accordion-save-button");
        const delBut = newLi.querySelector("button.accordion-delete-button");

        saveBut.addEventListener("click", saveData);
        delBut.addEventListener("click", saveData);

        $(".accordion").accordion({
            collapsible: true,
            active: false
        });
    });

    $(".sortable").sortable({
        connectWith: ".sortable",
        start: function(event, ui) {
            $(this).data('previousSortableColumn', $(this).attr('id'));
        },
        receive: function(event, ui) {
            var li = ui.item;
            var currentSortableColumn = $(this).attr('id');

            var previousSortableColumn = $(ui.sender).attr('id');

            var h3Element = li.find("h3");
            h3Element.html(h3Element.find('span.ui-accordion-header-icon').prop('outerHTML') +
                "FROM: " + previousSortableColumn + " TO: " + currentSortableColumn);

            $(".accordion").accordion({
                collapsible: true,
                active: false
            });
        }
    }).disableSelection();
});