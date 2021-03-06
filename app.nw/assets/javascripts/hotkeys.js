(function() {
    function setHotKey(options) {
        var _opt = options || {},
            _edt = _opt.editor || {},
            _app = _opt.app || {};
        editor.commands.addCommand({
            name: _edt.name || '',
            bindKey: _edt.bindKey || {},
            exec: _edt.exec || function() {},
            readOnly: false
        });
        $(document).bind('keydown', _app.bindKey || {}, _app.exec || function() {
            return false;
        });
        $('#findreplace input').bind('keydown', _app.bindKey || {}, _app.exec || function() {
            return false;
        });
    }

    function handleNew() {
        $('#new').trigger('click');
    }

    function handleOpen() {
        $('#open').trigger('click');
    }

    function handleSave() {
        if (!$('#save').prop('disabled')) {
            $('#save').trigger('click');
        }
    }

    function handleRun() {
        $('#run').trigger('click');
    }

    function handlePreview() {
        if (!$('#preview').prop('disabled')) {
            $('#preview').trigger('click');
        }
    }

    function handleFindReplace() {
        $('#find').trigger('click');
    }

    function handleEscape() {
        $('#fd-finish').trigger('click');
    }
    //
    setHotKey({
        editor: {
            name: 'NEW',
            bindKey: {
                win: 'Ctrl-n',
                mac: 'Command-n'
            },
            exec: function(editor) {
                handleNew();
            }
        },
        app: {
            bindKey: 'ctrl+n meta+n',
            exec: function(evt) {
                handleNew();
                return false;
            }
        }
    });
    setHotKey({
        editor: {
            name: 'OPEN',
            bindKey: {
                win: 'Ctrl-o',
                mac: 'Command-o'
            },
            exec: function(editor) {
                handleOpen();
            }
        },
        app: {
            bindKey: 'ctrl+o meta+o',
            exec: function(evt) {
                handleOpen();
                return false;
            }
        }
    });
    setHotKey({
        editor: {
            name: 'SAVE',
            bindKey: {
                win: 'Ctrl-s',
                mac: 'Command-s'
            },
            exec: function(editor) {
                handleSave();
            }
        },
        app: {
            bindKey: 'ctrl+s meta+s',
            exec: function(evt) {
                handleSave();
                return false;
            }
        }
    });
    setHotKey({
        editor: {
            name: 'RUN',
            bindKey: {
                win: 'Ctrl-r',
                mac: 'Command-r'
            },
            exec: function(editor) {
                handleRun();
            }
        },
        app: {
            bindKey: 'ctrl+r meta+r',
            exec: function(evt) {
                handleRun();
                return false;
            }
        }
    });
    setHotKey({
        editor: {
            name: 'PREVIEW',
            bindKey: {
                win: 'Ctrl-p',
                mac: 'Command-p'
            },
            exec: function(editor) {
                handlePreview();
            }
        },
        app: {
            bindKey: 'ctrl+p meta+p',
            exec: function(evt) {
                handlePreview();
                return false;
            }
        }
    });
    setHotKey({
        editor: {
            name: 'FIND/REPLACE',
            bindKey: {
                win: 'Ctrl-f',
                mac: 'Command-f'
            },
            exec: function(editor) {
                handleFindReplace();
            }
        },
        app: {
            bindKey: 'ctrl+f meta+f',
            exec: function(evt) {
                handleFindReplace();
                return false;
            }
        }
    });
    setHotKey({
        editor: {
            name: 'ESCAPE',
            bindKey: {
                win: 'esc',
                mac: 'esc'
            },
            exec: function(editor) {
                handleEscape();
            }
        },
        app: {
            bindKey: 'esc',
            exec: function(evt) {
                handleEscape();
                return false;
            }
        }
    });
})();
