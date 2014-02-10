var jsrunner = {
    source: {}
};
jsrunner.source.functions = "\
function p(s) {\
    var stdout = window.parent.document.getElementById('stdout');\
    stdout.innerHTML += s + '<br>';\
    stdout.scrollTop = stdout.scrollHeight;\
}\
\
function print(s) {\
    var stdout = window.parent.document.getElementById('stdout');\
    stdout.innerHTML += s;\
    stdout.scrollTop = stdout.scrollHeight;\
}\
\
function puts(s) {\
    var stdout = window.parent.document.getElementById('stdout');\
    stdout.innerHTML += s + '<br>';\
    stdout.scrollTop = stdout.scrollHeight;\
}\
\
function gets() {\
    var text = arguments[0] || '';\
    var value = arguments[1] || '';\
    var result = window.prompt(text, value);\
    return result;\
}\
\
function getn() {\
    var text = arguments[0] || '';\
    var value = arguments[1] && Number.isFinite(arguments[1]) ? arguments[1] : 0;\
    var flg = true;\
    while (flg) {\
        var result = window.prompt(text, value);\
        result = result === null ? null : Number(result);\
        if (result === null || Number.isFinite(result)) {\
            flg = false;\
        }\
    }\
    return result;\
}\
";
jsrunner.source.before = "\
<!DOCTYPE html>\
<html>\
<head></head>\
<body>\
<script>\
try {\
";
jsrunner.source.after = "\
} catch(e) {\
  var stdout = window.parent.document.getElementById('stdout');\
  stdout.innerHTML += '<span style=\"color:red;\">' + e + '</span>';\
  stdout.scrollTop = stdout.scrollHeight;\
}\
</script>\
</body>\
</html>\
";
//
$('body')
    .append($('<iframe>')
        .prop('id', 'sandbox')
        .prop('src', 'about:blank')
        .prop('nwdisable', 'nwdisable')
        .css('display', 'none'));
$('#commands>ul')
    .append($('<li>')
        .append($('<button>')
            .prop('id', 'run')
            .prop('class', 'btn btn-default btn-xs')
            .css('margin-left', '1em')
            .append($('<span class="underline">').text('R'))
            .append('un')))
    .append($('<li>')
        .append($('<button>')
            .prop('id', 'preview')
            .prop('class', 'btn btn-default btn-xs')
            .prop('disabled', true)
            .append($('<span class="underline">').text('P'))
            .append('review')))
    .append($('<li>')
        .append($('<button>')
            .prop('id', 'clear')
            .prop('class', 'btn btn-default btn-xs')
            .text('Clear')));
$('#editor')
    .css('bottom', '188px')
    .after($('<div id="stdout">')
        .css('margin', '5px')
        .css('padding', '0')
        .css('border', '0')
        .css('border-radius', '0')
        .css('position', 'absolute')
        .css('bottom', '20px')
        .css('left', '0')
        .css('right', '0')
        .css('height', '158px')
        .css('overflow', 'auto')
        .css('color', 'white'));
//
$('#new').click(function(evt) {
    $('#stdout').text('');
});
$('#open').click(function(evt) {
    $('#stdout').text('');
});
$('#run').click(function(evt) {
    $('#clear').trigger('click');
    try {
        var doc = $('#sandbox')[0].contentDocument;
        doc.open();
        doc.write(jsrunner.source.before + jsrunner.source.functions + editor.getValue() + jsrunner.source.after);
        doc.close();
    } catch (e) {
        $('#stdout')
            .append($('<span>').css('color', 'red').text(e))
            .append($('<br>'))
            .scrollTop($('#stdout')[0].scrollHeight);
    }
    editor.focus();
});
$('#preview').click(function(evt) {
    $('#clear').trigger('click');
    try {
        var new_win = gui.Window.open('blank.html', {
            toolbar: true,
            focus: true
        });
        new_win.on('loaded', function() {
            var _document = $('iframe', new_win.window.document)[0].contentDocument;
            _document.open();
            _document.write(editor.getValue());
            _document.close();
        });
    } catch (e) {
        $('#stdout')
            .append($('<span>').css('color', 'red').text(e))
            .append($('<br>'))
            .scrollTop($('#stdout')[0].scrollHeight);
    }
    $(this).blur();
});
$('#clear').click(function(evt) {
    var iframe = $('#sandbox')[0];
    iframe.src = iframe.src;
    $('#stdout').text('');
    editor.focus();
});
$('#editmode').change(function(evt) {
    if ($(this).val() === 'html') {
        $('#preview').prop('disabled', false);
    } else {
        $('#preview').prop('disabled', true);
    }
});
//
