(function() {
    function Menu(undoLabel, redoLabel, cutLabel, copyLabel, pasteLabel, selectAllLabel) {
        var gui = gui || require('nw.gui'),
            menu = new gui.Menu(),
            undo = new gui.MenuItem({
                label: undoLabel || 'Undo',
                click: function() {
                    editor.session.getUndoManager().undo(false);
                    console.log('Menu:', 'undo');
                }
            }),
            redo = new gui.MenuItem({
                label: redoLabel || 'Redo',
                click: function() {
                    editor.session.getUndoManager().redo(false);
                    console.log('Menu:', 'redo');
                }
            }),
            cut = new gui.MenuItem({
                label: cutLabel || 'Cut',
                click: function() {
                    document.execCommand('cut');
                    console.log('Menu:', 'cutted to clipboard');
                }
            }),
            copy = new gui.MenuItem({
                label: copyLabel || 'Copy',
                click: function() {
                    document.execCommand('copy');
                    console.log('Menu:', 'copied to clipboard');
                }
            }),
            paste = new gui.MenuItem({
                label: pasteLabel || 'Paste',
                click: function() {
                    document.execCommand('paste');
                    console.log('Menu:', 'pasted to textarea');
                }
            }),
            selectAll = new gui.MenuItem({
                label: selectAllLabel || 'Select All',
                click: function() {
                    editor.selection.selectAll();
                    console.log('Menu:', 'selected all text');
                }
            });

        function separator() {
            return new gui.MenuItem({
                type: 'separator'
            });
        }
        menu.append(undo);
        menu.append(redo);
        menu.append(separator());
        menu.append(cut);
        menu.append(copy);
        menu.append(paste);
        menu.append(separator());
        menu.append(selectAll);
        return menu;
    }
    //
    var contextMenu = new Menu();
    $('#editor').on('contextmenu', function(e) {
        e.preventDefault();
        contextMenu.popup(e.originalEvent.x, e.originalEvent.y);
    });
})();
