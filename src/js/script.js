// Copyright Joan Montas
// All rights reserved.
// License under GNU General Public License v3.0

$(function() {
    $("ul.sortable").sortable({
        revert: true,
        connectWith: ".sortable"
    });

    $(".accordion").accordion({
        collapsible: true,
        active: false
    });

    $("ul, li").disableSelection();
});

$("#add_todo").click(function() {
    var newItem = '<li>' +
        '<div class="accordion">' +
        '<h3>second Finished</h3>' +
        '<form>' +
        '<div class="form-group">' +
        '<label>Title</label>' +
        '<input type="text" class="form-control" placeholder="Card Name">' +
        '</div>' +
        '<div class="form-group">' +
        '<label>Detail</label>' +
        '<textarea class="form-control" rows="3"></textarea>' +
        '<button type="button" class="btn btn-primary">Save</button>' +
        '<button type="button" class="btn btn-danger">Delete</button>' +
        '</div>' +
        '</form>' +
        '</div>' +
        '</li>';

    $("#todo_sortable").append(newItem);

    $(".accordion").accordion({
        collapsible: true,
        active: false
    });
});