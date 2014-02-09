var path = './';
var fs = fs? fs : require('fs');
fs.watch(path, [], function() {
    if (location)
        location.reload(false);
});
