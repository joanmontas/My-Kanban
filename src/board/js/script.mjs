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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

function saveData() {
    // TODO(Joan) modify as to update already existing - Joan
    set(ref(db, "someLocation/" + "someID"), {
        Data: "someData",
    }).then(() => {
        alert("Data added sucessfully!");
    }).catch((error) => {
        alert("Data added failed: ", error);
    })
}

function newData(li) {
    var liID = $(li).attr("id");
    var ulID = $(li).parent().attr('id');

    var userID = "sudo"; // TODO(Joan) ID should be unique user ID when they login - Joan

    var path = "test/";
    path = path + "/" + userID;
    path = path + "/" + ulID;

    // TODO(Joan) Extact data from the il - Joan
    var h3Element = $(li).find('h3');
    var textAreaVal = $(li).find('textarea').val();
    const inputVal = $(li).find('input[type="text"]').val(); // More specific selector

    const myData = {
        title: inputVal,
        detail: textAreaVal,
    };

    console.log(textAreaVal);
    console.log(inputVal);

    if (typeof liID === 'undefined') {
        // alert("New");
        const dbRef = ref(db, path);
        push(dbRef, myData)
            .then((snapshot) => {
                li.id = snapshot.key;
                h3Element.text(inputVal);
            })
            .catch((error) => {
                console.error("Error: Unable to push data:", error);
            });
    } else {
        // alert("OLD");
        path = path + "/" + liID;
        const dbRef = ref(db, path);

        get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                set(dbRef, myData).then(() => {
                    h3Element.text(inputVal);
                }).catch((error) => {
                    alert("Error: Could not update card:" + error);
                })
            } else {
                alert("Error: The current card does not exist in the database.");
            }
        }).catch((error) => {
            // Handle errors from get() method
            alert("Error: Could not hadle updating values" + error);
        });
    }
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
            '<h3>New TODO</h3>' +
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

        delBut.addEventListener("click", newData);

        saveBut.addEventListener('click', function() {
            newData(newLi);
        });

        $(".accordion").accordion({
            collapsible: true,
            active: false
        });
    });

    $("#add_in_progress").click(function() {
        const newLi = document.createElement("li");
        var newLiInner = '<div class="accordion">' +
            '<h3>New Progress</h3>' +
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

        delBut.addEventListener("click", newData);

        saveBut.addEventListener('click', function() {
            newData(newLi);
        });

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

        delBut.addEventListener("click", newData);

        saveBut.addEventListener('click', function() {
            newData(newLi);
        });

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