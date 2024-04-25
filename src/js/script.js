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

$("#add_todo").on("click", function() {
    var todoUl = $("#todo_sortable");

    var newLi = $("<li>");
    var accordionDiv = $("<div>").addClass("accordion");
    var accordionDivH3 = $("<h3>").text("New Thing");
    var accordionDivDiv = $("<div>").text("New asd");

    accordionDivH3.appendTo(accordionDiv);
    accordionDivDiv.appendTo(accordionDiv);
    accordionDiv.appendTo(newLi);
    newLi.appendTo(todoUl);

    accordionDiv.accordion({
        collapsible: true,
        active: false
    });

});