// Copyright Joan Montas
// All rights reserved.
// License under GNU General Public License v3.0

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import {
    getDatabase,
    set,
    push,
    get,
    remove,
    ref,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

import {
    app,
    analytics,
    auth,
    signInn,
    signOutt,
    provider,
    getUserID
} from "../../auth.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Initialize Firebase
const db = getDatabase();

function deleteData(li) {
    // alert("delete!");

    var liID = $(li).attr("id");
    var ulID = $(li).parent().attr('id');

    var userID = getUserID();
    if (!userID) {
        return;
    }

    var path = "";
    path = path + "/" + userID;
    path = path + "/" + ulID + "/";

    if (typeof liID === 'undefined') {
        // alert("New");
    } else {
        // alert("OLD");
        path = path + liID;
        const dbRef = ref(db, path);

        remove(dbRef)
            .then(() => {
                console.log("Data deleted successfully!");
            })
            .catch((error) => {
                console.error("Error: Unable to delete data from db:", error);
            });

    }

    li.remove();
}

function swapData(previousColumn, currentColumn, li) {
    var liID = $(li).attr("id");
    var ulID = $(li).parent().attr('id');

    var userID = getUserID();
    if (!userID) {
        return;
    }

    var path0 = "";
    path0 = path0 + "/" + userID;
    path0 = path0 + "/" + previousColumn;


    if (typeof liID === 'undefined') {
        // alert("New");
        return;
    }

    path0 = path0 + "/" + liID;
    const dbRef0 = ref(db, path0);


    get(dbRef0)
        .then((snapshot) => {
            const data = snapshot.val();
            var path1 = "";
            path1 = path1 + "/" + userID;
            path1 = path1 + "/" + currentColumn;
            path1 = path1 + "/" + liID;
            const dbRef1 = ref(db, path1);


            set(dbRef1, data).then(() => {
                console.log("Data added successfully! ", data);
            }).catch((error) => {
                alert("Error: Could not update card:" + error);
            })

            remove(dbRef0)
                .then(() => {
                    console.log("Data deleted successfully!");
                })
                .catch((error) => {
                    console.error("Error: Unable to delete data from db:", error);
                });
        })
        .catch((error) => {
            alert("Error: The current card does not exist in the database.");
            return;
        });
}

function saveData(li) {
    var liID = $(li).attr("id");
    var ulID = $(li).parent().attr('id');

    var userID = getUserID();
    if (!userID) {
        return;
    }

    var path = "";
    path = path + "/" + userID;
    path = path + "/" + ulID;

    var h3Element = $(li).find('h3');
    var textAreaVal = $(li).find('textarea').val();

    const inputVal = $(li).find('input').val();

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
                h3Element.html(h3Element.find('span.ui-accordion-header-icon').prop('outerHTML') + inputVal);
                $(".accordion").accordion({
                    collapsible: true,
                    active: false
                });
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
                    h3Element.html(h3Element.find('span.ui-accordion-header-icon').prop('outerHTML') + inputVal);
                }).catch((error) => {
                    alert("Error: Could not update card:" + error);
                })
            } else {
                alert("Error: The current card does not exist in the database.");
            }
        }).catch((error) => {
            alert("Error: Could not hadle updating values" + error);
        });
    }
    $(".accordion").accordion({
        collapsible: true,
        active: false
    });
}

function loadData() {
    var userID = getUserID();

    if (!userID) {
        return;
    }

    var path0 = "";
    path0 = path0 + userID + "/";
    path0 = path0 + "todo_sortable";

    const dbRef0 = ref(db, path0);

    get(dbRef0).then((snapshot) => {
        const data = snapshot.val();

        for (const key in data) {
            const value = data[key];
            const newLi = document.createElement("li");
            var newLiInner = '<div class="accordion">' +
                '<h3>New TODO</h3>' +
                '<form>' +
                '<div class="form-group">' +
                '<label>Title</label>' +
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

            newLi.id = key;
            var h3Element = $(newLi).find('h3');
            h3Element.html(value["title"]);

            var textAreaVal = $(newLi).find('textarea');
            textAreaVal.text(value["detail"]);

            var inputVal = $(newLi).find("input");
            inputVal.val(value["title"]);

            const saveBut = newLi.querySelector("button.accordion-save-button");
            const delBut = newLi.querySelector("button.accordion-delete-button");

            delBut.addEventListener("click", function() {
                deleteData(newLi);
            });

            saveBut.addEventListener('click', function() {
                saveData(newLi);
            });


            $("#todo_sortable").append(newLi);
        }

        $(".accordion").accordion({
            collapsible: true,
            active: false
        });
    });

    var path1 = "";
    path1 = path1 + userID + "/";
    path1 = path1 + "in_progress_sortable";

    const dbRef1 = ref(db, path1);

    get(dbRef1).then((snapshot) => {
        const data = snapshot.val();

        for (const key in data) {
            const value = data[key];
            const newLi = document.createElement("li");
            var newLiInner = '<div class="accordion">' +
                '<h3>New TODO</h3>' +
                '<form>' +
                '<div class="form-group">' +
                '<label>Title</label>' +
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

            newLi.id = key;
            var h3Element = $(newLi).find('h3');
            h3Element.html(value["title"]);



            var textAreaVal = $(newLi).find('textarea');
            textAreaVal.text(value["detail"]);

            var inputVal = $(newLi).find("input");
            inputVal.val(value["title"]);

            const saveBut = newLi.querySelector("button.accordion-save-button");
            const delBut = newLi.querySelector("button.accordion-delete-button");

            delBut.addEventListener("click", function() {
                deleteData(newLi);
            });

            saveBut.addEventListener('click', function() {
                saveData(newLi);
            });

            $("#in_progress_sortable").append(newLi);
        }

        $(".accordion").accordion({
            collapsible: true,
            active: false
        });
    });

    var path2 = "";
    path2 = path2 + userID + "/";
    path2 = path2 + "accomplished_sortable";

    const dbRef2 = ref(db, path2);

    get(dbRef2).then((snapshot) => {
        const data = snapshot.val();

        for (const key in data) {
            const value = data[key];
            const newLi = document.createElement("li");
            var newLiInner = '<div class="accordion">' +
                '<h3>New TODO</h3>' +
                '<form>' +
                '<div class="form-group">' +
                '<label>Title</label>' +
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

            newLi.id = key;
            var h3Element = $(newLi).find('h3');
            h3Element.html(value["title"]);

            var textAreaVal = $(newLi).find('textarea');
            textAreaVal.text(value["detail"]);

            var inputVal = $(newLi).find("input");
            inputVal.val(value["title"]);

            const saveBut = newLi.querySelector("button.accordion-save-button");
            const delBut = newLi.querySelector("button.accordion-delete-button");

            delBut.addEventListener("click", function() {
                deleteData(newLi);
            });

            saveBut.addEventListener('click', function() {
                saveData(newLi);
            });

            $("#accomplished_sortable").append(newLi);
        }

        $(".accordion").accordion({
            collapsible: true,
            active: false
        });
    });
}
onAuthStateChanged(auth, () => {
    const userID = getUserID();
    if (userID) {
        console.log("looged ", userID);
        loadData();
    } else {
        console.log("not logged")
    }
});

$("ul.sortable").sortable({
    revert: true,
    connectWith: ".sortable",
    distance: 100
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
        '<label>Title</label>' +
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

    delBut.addEventListener("click", function() {
        deleteData(newLi);
    });

    saveBut.addEventListener('click', function() {
        saveData(newLi);
    });

    $(".accordion").accordion({
        collapsible: true,
        active: false,
    });
});

$("#add_in_progress").click(function() {
    const newLi = document.createElement("li");
    var newLiInner = '<div class="accordion">' +
        '<h3>New Progress</h3>' +
        '<form>' +
        '<div class="form-group">' +
        '<label>Title</label>' +
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

    delBut.addEventListener("click", function() {
        deleteData(newLi);
    });

    saveBut.addEventListener('click', function() {
        saveData(newLi);
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
        '<label>Title</label>' +
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

    delBut.addEventListener("click", function() {
        deleteData(newLi);
    });

    saveBut.addEventListener('click', function() {
        saveData(newLi);
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

        swapData(previousSortableColumn, currentSortableColumn, li);

        $(".accordion").accordion({
            collapsible: true,
            active: false
        });
    }
}).disableSelection();

$(document).ready(function() {
    $("#navBar").load("../navbar.html", function() {
        $("#homeLink").attr("href", "../../index.html");
        $("#featuresLink").attr("href", "../features/features.html");
        $("#boardLink").attr("href", "#");
    });
})