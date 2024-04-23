// Copyright Joan Montas
// All rights reserved.
// License under GNU General Public License v3.0

$(function() {
    // Make all unordered lists sortable
    $("ul.sortable").sortable({
        revert: true,
        connectWith: ".sortable" // Enable dragging between sortable lists
    });

    // Make specific list items draggable (optional)
    $(".draggable").draggable({
        connectToSortable: ".sortable",
        helper: "clone",
        revert: "invalid"
    });

    // Prevent text selection while dragging
    $("ul, li").disableSelection();
});