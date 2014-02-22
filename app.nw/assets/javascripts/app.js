var gui = require('nw.gui');
var clipboard = gui.Clipboard.get();
var fs = require('fs');
(function(global) {
    var defaultMode = 'javascript';

    function setAceMode(mode) {
        var modeString = 'ace/mode/' + (mode || defaultMode);
        editor.session.setMode(modeString);
    }

    function handleDocumentChange(entry) {
        var mode = defaultMode,
            title;
        if (entry) {
            title = entry.match(/[^/]+$/)[0];
            if (title.match(/.md$/) || title.match(/.markdown$/)) {
                mode = 'markdown';
            } else if (title.match(/.txt$/)) {
                mode = "text";
            } else if (title.match(/.js$/) || title.match(/.json$/)) {
                mode = 'javascript';
            } else if (title.match(/.html$/)) {
                mode = "html";
            } else if (title.match(/.css$/)) {
                mode = "css";
            }
        }
        return mode;
    }

    function readFileIntoEditor(theFileEntry) {
        fs.readFile(theFileEntry, function(err, data) {
            if (err) {
                console.log('Read failed: ' + err);
                window.alert('Read failed: ' + err);
                return -1;
            }
            editor.setValue(String(data), -1);
            var mode = handleDocumentChange(theFileEntry);
            setMode(mode);
            var title = theFileEntry ? theFileEntry.match(/[^/]+$/)[0] : 'untitled';
            initStatus(title);
        });
    }

    function writeEditorToFile(theFileEntry) {
        fs.writeFile(theFileEntry, editor.getValue(), function(err) {
            if (err) {
                console.log('Write failed: ' + err);
                window.alert('Write failed: ' + err);
                return -1;
            }
            var mode = handleDocumentChange(theFileEntry);
            setMode(mode);
            var title = theFileEntry ? theFileEntry.match(/[^/]+$/)[0] : 'untitled';
            initStatus(title);
            console.log("Write completed.");
        });
    }

    function onChosenFileToOpen(theFileEntry) {
        setFile(theFileEntry);
        readFileIntoEditor(theFileEntry);
    };

    function onChosenFileToSave(theFileEntry) {
        setFile(theFileEntry);
        writeEditorToFile(theFileEntry);
    }

    function newFile() {
        setFile('')
        editor.setValue('', -1);
        setMode();
        initStatus('untitled');
        editor.focus();
    }

    function setFile(theFileEntry) {
        $('#fileEntry').val(theFileEntry);
    }

    function setMode(mode) {
        var modeString = mode || defaultMode;
        setAceMode(modeString);
        $('#editmode').val(modeString);
        $('#editmodestring').text($('#editmode option:selected').text()).change();
    }

    function initStatus(title) {
        $('title').text(title);
        $('#openFile').val(null);
        $('#saveFile').val(null);
        $('#save').attr('disabled', 'disabled');
        $('#hasChanged').prop('checked', false);
        var handleChange = function(evt) {
            $('#save').removeAttr('disabled');
            $('#hasChanged').prop('checked', true);
            editor.off('change', handleChange);
        };
        editor.on('change', handleChange);
        editor.session.getUndoManager().reset();
    }

    function showReplaceMode(isShow) {
        if (isShow) {
            $('#editor').addClass('mode-replace');
            $('#findreplace').addClass('mode-replace');
            $('#findreplace .replace').css('display', 'block');
            $('#fd-finish').css('visibility', 'hidden');
            $('#rp-text').focus();
        } else {
            $('#editor').removeClass('mode-replace');
            $('#findreplace').removeClass('mode-replace');
            $('#findreplace .replace').css('display', 'none');
            $('#fd-finish').css('visibility', 'visible');
            $('#fd-text').focus();
        }
    }

    function textFindPreview() {
        editor.findPrevious();
    }

    function textFindNext() {
        editor.findNext();
    }

    function textReplace() {
        editor.replace($('#rp-text').val());
        editor.session.selection.clearSelection();
    }

    function textReplaceAll() {
        editor.replaceAll($('#rp-text').val());
        editor.session.selection.clearSelection();
    }

    function incrementalSearch() {
        editor.find($('#fd-text').val(), {
            skipCurrent: false,
            backwards: false,
            wrap: true,
            caseSensitive: false,
            wholeWord: false,
            regExp: false
        });
    }

    var editor = global.editor = ace.edit('editor');
    var StatusBar = ace.require('ace/ext/statusbar').StatusBar;
    var statusBar = new StatusBar(editor, document.getElementById('statusBar'));
    editor.setTheme('ace/theme/monokai');
    newFile();
    //
    $('#new').click(function(evt) {
        if ($('#hasChanged:checked').val()) {
            if ($('#fileEntry').val()) {
                $('#save').trigger('click');
            } else {
                if (!window.confirm('Are you sure?')) {
                    editor.focus();
                    evt.stopImmediatePropagation();
                    return false;
                }
            }
        }
        newFile();
    });
    $('#open').click(function(evt) {
        if ($('#hasChanged:checked').val()) {
            if ($('#fileEntry').val()) {
                $('#save').trigger('click');
            } else {
                if (!window.confirm('Are you sure?')) {
                    editor.focus();
                    evt.stopImmediatePropagation();
                    return false;
                }
            }
        }
        $('#openFile').trigger('click');
        editor.focus();
    });
    $('#save').click(function(evt) {
        if ($('#fileEntry').val()) {
            if ($('#hasChanged:checked').val()) {
                writeEditorToFile($('#fileEntry').val());
            }
        } else {
            $('#saveFile').trigger('click');
        }
        editor.focus();
    });
    $('#find').click(function(evt) {
        if ($('#editor').hasClass('mode-find')) {
            $('#fd-enablereplace').trigger('click');
        } else {
            $('#editor').addClass('mode-find');
            $('#fd-text').focus();
        }
    });
    $('#fd-finish').click(function(evt) {
        showReplaceMode(false);
        $('#editor').removeClass('mode-find');
        $('#fd-enablereplace').prop('checked', false);
        editor.focus();
    });
    $('#rp-finish').click(function(evt) {
        $('#fd-finish').trigger('click');
    });
    $('#fd-enablereplace').click(function(evt) {
        showReplaceMode($(this).prop('checked'));
    });
    $('#editmodestring').click(function(evt) {
        $('#editmode').show().focus();
    });
    $('#fd-preview').click(function(evt) {
        textFindPreview();
    });
    $('#fd-next').click(function(evt) {
        textFindNext();
    });
    $('#rp-replace').click(function(evt) {
        textReplace();
    });
    $('#rp-replaceall').click(function(evt) {
        textReplaceAll();
    });
    //
    $('#editmode')
        .change(function(evt) {
            setMode($(this).val());
        })
        .blur(function(evt) {
            $('#editmode').hide();
        });
    $('#openFile').change(function(evt) {
        if (!$(this).val()) {
            editor.focus();
            evt.stopImmediatePropagation();
            return false;
        }
        onChosenFileToOpen($(this).val());
        editor.focus();
    });
    $('#saveFile').change(function(evt) {
        onChosenFileToSave($(this).val());
        editor.focus();
    });
    $('#fd-text').keyup(function(evt) {
        incrementalSearch();
    });
    //
    gui.App.on('open', function(filePath) {
        if (filePath.match(/.js$/)) {
            if ($('#hasChanged:checked').val()) {
                if ($('#fileEntry').val()) {
                    $('#save').trigger('click');
                } else {
                    if (!window.confirm('Are you sure?')) {
                        editor.focus();
                        return false;
                    }
                }
            }
            $('#fileEntry').val();
            onChosenFileToOpen(filePath);
            editor.focus();
        }
    });
    if (gui.App.argv.length) {
        var filePath = gui.App.argv[0];
        if (filePath.match(/.js$/)) {
            $('#fileEntry').val();
            onChosenFileToOpen(filePath);
            editor.focus();
        }
    }
})(this);
