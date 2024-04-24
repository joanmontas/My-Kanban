// Copyright Joan Montas
// All rights reserved.
// License under GNU General Public License v3.0

$(function() {
    $("ul.sortable").sortable({
        revert: true,
        connectWith: ".sortable"
    });

    $(".draggable").draggable({
        connectToSortable: ".sortable",
        helper: "clone",
        revert: "invalid"
    });

    $(".accordion").accordion({
        collapsible: true
    });

    $("ul, li").disableSelection();
});