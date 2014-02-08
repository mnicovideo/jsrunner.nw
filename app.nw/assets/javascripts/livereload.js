var path = './';
var fs = require('fs');
fs.watch(path, [], function() {
    if (location)
        location.reload(false);
});
