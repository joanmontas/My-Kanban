// Copyright Joan Montas
// All rights reserved.
// License under GNU General Public License v3.0

import {
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
} from "../../auth.js";

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import {
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

var currentKanban = undefined;

function deleteCardData(li) {
    // TODO(Joan) Modify to reflect current kanban - Joan
    // alert("delete!");

    var liID = $(li).attr("id");
    var ulID = $(li).parent().attr('id');

    var userID = getUserID();
    if (!userID) {
        return;
    }

    if (!currentKanban) {
        return;
    }

    var path = userID + "/personalKanbans/" + currentKanban + "/data/" + ulID + "/";

    if (typeof liID === 'undefined') {
        // alert("New");
    } else {
        // alert("OLD");
        path = path + liID;
        console.log("Path being deleted:", path);
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

function swapCardsData(previousColumn, currentColumn, li) {
    // TODO(Joan) Modify to reflect current kanban - Joan
    var liID = $(li).attr("id");
    var ulID = $(li).parent().attr('id');

    var userID = getUserID();
    if (!userID) {
        return;
    }

    if (currentKanban === 'undefined') {
        return;
    }

    var path0 = userID + "/personalKanbans/" + currentKanban + "/data/" + previousColumn;


    if (typeof liID === 'undefined') {
        // alert("New");
        return;
    }

    path0 = path0 + "/" + liID;
    console.log("Path0 = ", path0);
    const dbRef0 = ref(db, path0);


    get(dbRef0)
        .then((snapshot) => {
            const data = snapshot.val();
            var path1 = userID + "/personalKanbans/" + currentKanban + "/data/" + currentColumn;

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

function saveCardData(li) {
    // TODO(Joan) Modify to be save in the right kanban - Joan
    console.log("saving");

    if (!currentKanban) {
        return;
    };

    var liID = $(li).attr("id");
    var ulID = $(li).parent().attr('id');

    var userID = getUserID();
    if (!userID) {
        return;
    }

    if (!ulID) {
        return;
    }

    var path = userID + "/personalKanbans/" + currentKanban + "/data/" + ulID + "/";

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
                path = path + li.id;
                h3Element.html(h3Element.find('span.ui-accordion-header-icon').prop('outerHTML') + inputVal);
                $(".kanbanCard").accordion({
                    collapsible: true,
                    active: false
                });
            })
            .catch((error) => {
                console.error("Error: Unable to push data:", error);
            });
    } else {
        // alert("OLD");
        path = path + liID;
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
    $(".kanbanCard").accordion({
        collapsible: true,
        active: false
    });
}

function loadCardData(kanban) {
    clearUls();
    var userID = getUserID();

    if (!userID) {
        return;
    }

    if (!kanban.id) {
        // TODO(Joan) Replace notice saying kanban has not yet been saved - Joan
        return;
    }

    currentKanban = kanban.id;
    var h3Element = $(kanban).find('h3');

    $("#titleOfCurrentKanbanBeingLookedAt").text(h3Element.text());

    $("#todo_sortable_div").css("display", "");
    $("#in_progress_sortable_div").css("display", "");
    $("#accomplished_sortable_div").css("display", "");

    console.log("kanban id: " + kanban.id);

    var path0 = userID + "/personalKanbans/" + currentKanban + "/data/";
    path0 = path0 + "todo_sortable";

    const dbRef0 = ref(db, path0);

    get(dbRef0).then((snapshot) => {
        const data = snapshot.val();

        for (const key in data) {
            const value = data[key];
            const newLi = document.createElement("li");
            var newLiInner = '<div class="accordion kanbanCard">' +
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
                deleteCardData(newLi);
            });

            saveBut.addEventListener('click', function() {
                saveCardData(newLi);
            });

            $("#todo_sortable").append(newLi);
        }

        $(".kanbanCard").accordion({
            collapsible: true,
            active: false
        });
    });

    var path1 = userID + "/personalKanbans/" + currentKanban + "/data/";
    path1 = path1 + "in_progress_sortable";

    const dbRef1 = ref(db, path1);

    get(dbRef1).then((snapshot) => {
        const data = snapshot.val();

        for (const key in data) {
            const value = data[key];
            const newLi = document.createElement("li");
            var newLiInner = '<div class="accordion kanbanCard">' +
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
                deleteCardData(newLi);
            });

            saveBut.addEventListener('click', function() {
                saveCardData(newLi);
            });

            $("#in_progress_sortable").append(newLi);
        }

        $(".kanbanCard").accordion({
            collapsible: true,
            active: false
        });
    });

    var path2 = userID + "/personalKanbans/" + currentKanban + "/data/";
    path2 = path2 + "accomplished_sortable";

    const dbRef2 = ref(db, path2);

    get(dbRef2).then((snapshot) => {
        const data = snapshot.val();

        for (const key in data) {
            const value = data[key];
            const newLi = document.createElement("li");
            var newLiInner = '<div class="accordion kanbanCard">' +
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
                deleteCardData(newLi);
            });

            saveBut.addEventListener('click', function() {
                saveCardData(newLi);
            });

            $("#accomplished_sortable").append(newLi);
        }

        $(".kanbanCard").accordion({
            collapsible: true,
            active: false
        });
    });
}

function loadBoards() {
    clearUls();
    var userID = getUserID();

    if (!userID) {
        return;
    }

    var path0 = userID + "/personalKanbans";

    const dbRef0 = ref(db, path0);

    get(dbRef0).then((snapshot) => {
        const data = snapshot.val();

        for (const key in data) {
            const value = data[key];
            const newLi = document.createElement("li");
            var newLiInner = '<div class="accordion kanbans">' +
                '<h3>New Kanban</h3>' +
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
                '<button type="button" class="btn btn-success accordion-load-button">Load</button>' +
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
            $("#list_kanban").append(newLi);

            const saveBut = newLi.querySelector("button.accordion-save-button");
            const delBut = newLi.querySelector("button.accordion-delete-button");
            const loadBut = newLi.querySelector("button.accordion-load-button");

            delBut.addEventListener("click", function() {
                deleteBoardData(newLi);
            });

            saveBut.addEventListener('click', function() {
                saveBoardData(newLi);
            });

            loadBut.addEventListener('click', function() {
                loadCardData(newLi);
            });
        }

        $(".kanbans").accordion({
            collapsible: true,
            active: false
        });
    });
}

onAuthStateChanged(auth, () => {
    const userID = getUserID();
    if (userID) {
        console.log("looged ", userID);
        loadBoards();
    } else {
        console.log("not logged")
    }
});

$("#add_todo").click(function() {
    const newLi = document.createElement("li");
    var newLiInner = '<div class="accordion kanbanCard">' +
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
        deleteCardData(newLi);
    });

    saveBut.addEventListener('click', function() {
        saveCardData(newLi);
    });

    $(".kanbanCard").accordion({
        collapsible: true,
        active: false,
    });
});

$("#add_in_progress").click(function() {
    const newLi = document.createElement("li");
    var newLiInner = '<div class="accordion kanbanCard">' +
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
        deleteCardData(newLi);
    });

    saveBut.addEventListener('click', function() {
        saveCardData(newLi);
    });

    $(".kanbanCard").accordion({
        collapsible: true,
        active: false
    });
});

$("#add_accomplished").click(function() {
    const newLi = document.createElement("li");
    var newLiInner = '<div class="accordion kanbanCard">' +
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
        deleteCardData(newLi);
    });

    saveBut.addEventListener('click', function() {
        saveCardData(newLi);
    });

    $(".kanbanCard").accordion({
        collapsible: true,
    });
});


$("#add_kanban").click(function() {
    // TODO(Joan) Automatically save the kanban uppon add - Joan
    const newLi = document.createElement("li");
    var newLiInner = '<div class="accordion kanbans">' +
        '<h3>New Kanban</h3>' +
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
        '<button type="button" class="btn btn-success accordion-load-button">Load</button>' +
        '</div>' +
        '</form>' +
        '</div>';
    newLi.innerHTML = newLiInner;

    $("#list_kanban").append(newLi);

    const saveBut = newLi.querySelector("button.accordion-save-button");
    const delBut = newLi.querySelector("button.accordion-delete-button");
    const loadBut = newLi.querySelector("button.accordion-load-button");

    delBut.addEventListener("click", function() {
        deleteBoardData(newLi);
    });

    saveBut.addEventListener('click', function() {
        saveBoardData(newLi);
    });

    loadBut.addEventListener('click', function() {
        loadCardData(newLi);
    });

    $(".kanbans").accordion({
        collapsible: true,
        active: false
    });
});

function saveBoardData(li) {
    var liID = $(li).attr("id");

    var userID = getUserID();
    if (!userID) {
        return;
    }

    var path = userID + "/personalKanbans";

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
                $(".kanban").accordion({
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
    $(".kanbans").accordion({
        collapsible: true,
        active: false
    });
}

function deleteBoardData(li) {
    // TODO(Joan) Modify to reflect current kanban - Joan
    // alert("delete!");

    var liID = $(li).attr("id");
    var ulID = $(li).parent().attr('id');

    var userID = getUserID();
    if (!userID) {
        return;
    }

    if (li.id === currentKanban) {
        $("#titleOfCurrentKanbanBeingLookedAt").text("Please Load A Kanban");
        currentKanban = undefined
    }

    var path = userID + "/personalKanbans/";

    if (typeof liID === 'undefined') {
        // alert("New");
    } else {
        // alert("OLD");
        path = path + liID;
        console.log("Deleting board: ", path);
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
    clearUls();
}

function clearUls() {
    $("#todo_sortable").empty();
    $("#in_progress_sortable").empty();
    $("#accomplished_sortable").empty();

}

$(".sortable").sortable({
    connectWith: ".sortable",
    start: function(event, ui) {
        $(this).data('previousSortableColumn', $(this).attr('id'));
    },
    receive: function(event, ui) {
        var li = ui.item;
        var currentSortableColumn = $(this).attr('id');

        var previousSortableColumn = $(ui.sender).attr('id');

        swapCardsData(previousSortableColumn, currentSortableColumn, li);

        $(".kanbanCard").accordion({
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