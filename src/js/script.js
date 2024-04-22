$(function() {
    $("#sortable").sortable({
        revert: true
    });

    $("#sortable-2").sortable({
        revert: true
    });

    $("#draggable").draggable({
        connectToSortable: "#sortable",
        helper: "clone",
        revert: "invalid"
    });
    $("ul, li").disableSelection();
});