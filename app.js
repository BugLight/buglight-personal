const express = require('express'),
    routes = require('./routes'),
    app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use('/', routes);
app.listen(3000, function () {
    console.log('Server started on 3000 port.');
});
