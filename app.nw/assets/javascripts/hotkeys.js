(function() {
    function setHotKey(options) {
        editor.commands.addCommand({
            name: options.editor.name,
            bindKey: options.editor.bindKey,
            exec: options.editor.exec,
            readOnly: false
        });
        $(document).bind('keydown', options.app.bindKey, options.app.exec);
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
})();
