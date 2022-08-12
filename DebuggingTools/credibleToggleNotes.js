function toggleNotes(sender) {
    var ename = $(sender).attr('name');
    if (
        $("input[name='" + ename + "'][data-notes='show']:checked").length > 0
    ) {
        $("table[id='qnotestd_" + ename.replace('q_', '') + "']").toggle(true);
    } else {
        $("table[id='qnotestd_" + ename.replace('q_', '') + "']").toggle(false);
    }
}
// Assign handler to has notes checkboxes
$('input:checkbox').click(function (sender) {
    toggleNotes(sender.target);
});
// if Has Notes and Is Default are checked, display Notes field by default
if ($("input[data-notes='show']:checked").length > 0) {
    $("input[data-notes='show']:checked").each(function (i, item) {
        toggleNotes(item);
    });
}
