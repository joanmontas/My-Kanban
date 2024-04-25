// Copyright Joan Montas
// All rights reserved.
// License under GNU General Public License v3.0

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
        var newItem = '<li>' +
            '<div class="accordion">' +
            '<h3>New TODO</h3>' +
            '<form>' +
            '<div class="form-group">' +
            '<label>New TODO</label>' +
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

    $("#add_in_progress").click(function() {
        var newItem = '<li>' +
            '<div class="accordion">' +
            '<h3>New In Progress</h3>' +
            '<form>' +
            '<div class="form-group">' +
            '<label>New Progress</label>' +
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

        $("#in_progress_sortable").append(newItem);

        $(".accordion").accordion({
            collapsible: true,
            active: false
        });
    });

    $("#add_accomplished").click(function() {
        var newItem = '<li>' +
            '<div class="accordion">' +
            '<h3>New Accomplished</h3>' +
            '<form>' +
            '<div class="form-group">' +
            '<label>New Accomplished</label>' +
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

        $("#accomplished_sortable").append(newItem);

        $(".accordion").accordion({
            collapsible: true,
            active: false
        });
    });
});

$(document).ready(function() {
    $(".sortable").sortable({
        connectWith: ".sortable",
        start: function(event, ui) {
            $(this).data('previousSortableColumn', $(this).attr('id'));
        },
        receive: function(event, ui) {
            var li = ui.item;
            var currentSortableColumnt = $(this).attr('id');

            var previousSortableColumn = $(ui.sender).attr('id');

            var h3Element = li.find("h3");
            h3Element.html(h3Element.find('span.ui-accordion-header-icon').prop('outerHTML') + 'FROM: ' + previousSortableColumn + " TO: " + currentSortableColumnt);

            console.log("Dropped item from " + previousSortableColumn + " into " + currentSortableColumnt);
            $(".accordion").accordion({
                collapsible: true,
                active: false
            });
        }
    }).disableSelection();
});