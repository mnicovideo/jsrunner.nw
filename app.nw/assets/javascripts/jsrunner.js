function p(s) {
    var stdout = document.getElementById('stdout');
    stdout.innerHTML += s + '<br>';
    stdout.scrollTop = stdout.scrollHeight;
}

function print(s) {
    var stdout = document.getElementById('stdout');
    stdout.innerHTML += s;
    stdout.scrollTop = stdout.scrollHeight;
}

function puts(s) {
    var stdout = document.getElementById('stdout');
    stdout.innerHTML += s + '<br>';
    stdout.scrollTop = stdout.scrollHeight;
}

function gets() {
    var text = arguments[0] ? arguments[0] : '';
    var value = arguments[1] ? arguments[1] : '';
    var result = window.prompt(text, value);
    return result;
}

function getn() {
    var text = arguments[0] ? arguments[0] : '';
    var value = arguments[1] && Number.isFinite(arguments[1]) ? arguments[1] : 0;
    var flg = true;
    while (flg) {
        var result = window.prompt(text, value);
        result = result === null ? null : Number(result);
        if (result === null || Number.isFinite(result)) {
            flg = false;
        }
    }
    return result;
}
//
$('nav>ul')
    .append($('<li>')
        .append($('<button>')
            .prop('id', 'run')
            .prop('class', 'btn btn-default btn-xs')
            .css('margin-left', '1em')
            .text('run')))
    .append($('<li>')
        .append($('<button>')
            .prop('id', 'preview')
            .prop('class', 'btn btn-default btn-xs')
            .text('preview')))
    .append($('<li>')
        .append($('<button>')
            .prop('id', 'clear')
            .prop('class', 'btn btn-default btn-xs')
            .text('clear')));
$('#editor')
    .css('bottom', '200px')
    .after($('<div id="stdout">')
        .css('margin', '0')
        .css('padding', '0.5em')
        .css('border', '0')
        .css('border-radius', '0')
        .css('position', 'absolute')
        .css('bottom', '20px')
        .css('left', '0')
        .css('right', '0')
        .css('height', '180px')
        .css('color', 'white'));
//
$('#new').click(function(evt) {
	$('#stdout').text('');
});
$('#open').click(function(evt) {
	$('#stdout').text('');
});
$('#run').click(function(evt) {
    $('#stdout').text('');
    try {
        new Function(editor.getValue())();
    } catch (e) {
        $('#stdout').append($('<span>').css('color', 'red').text(e));
    }
    editor.focus();
});
$('#preview').click(function(evt) {
    try {
        var w = window.open('about:blank');
        w.document.open();
        w.document.write(editor.getValue());
        w.document.close();
    } catch (e) {
        $('#stdout').append($('<span>').css('color', 'red').text(e));
    }
	$(this).blur();
});
$('#clear').click(function(evt) {
    $('#stdout').text('');
    editor.focus();
});
//
editor.setValue("puts( 'hello, ' + gets('what is your name?','anonymous') );", -1);