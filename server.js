var express = require('express');
var app     = express();
var jwt     = require('express-jwt');
var rsaValidation   =   require('auth0-api-jwt-rsa-validation');

var jwtCheck = jwt({
    secret: rsaValidation(),
    algorithms: ['RS256'],
    issuer: "ENTER AUTH_0 DOMAIN HERE",
    audience: 'ENTER AUDIENCE HERE'
});

var guard = function(req, res, next){
    switch(req.path){
        // If path is movies, check to see if token has 'general' scope
        case '/movies' : 
            var permissions = ['general'];
            for(var i = 0; i < permissions.length; i++){
                if(req.user.scope.includes(permissions[i])){
                    next();
                } else {
                    res.send(403,{message: 'Forbidden'});
                }
            }
            break;
        

        // If path is reviewers, check to see if token has 'general' scope
        case '/reviewers' : 
            var permissions = ['general'];
            for( var i = 0; i < permissions.length; i++){
                if(req.user.scope.includes(permissions[i])){
                    next();
                } else {
                    res.send(403, {message: 'Forbidden'});
                }
            }
            break;
        

        // If path is publications, check to see if token has 'general' scope
        case '/publications': 
            var permissions = ['general'];
            for( var i = 0; i < permissions.length; i++){
                if(req.user.scope.includes(permissions[i])){
                    next();
                } else {
                    res.send(403,{message: 'Forbidden'});
                }
            }
            break;
        

        // If path is pending, check to see if token has 'admin' scope
        case '/pending': 
            var permissions = ['admin'];
            console.log(req.user.scope);
            for(var i = 0; i < permissions.length; i++){
                if(req.user.scope.includes(permissions[i])){
                    next();
                } else {
                    res.send(403, {message: 'Forbidden'});
                }
            }
            break;
        
    }
};


app.use(jwtCheck);

app.use(guard);

app.use(function(err, req, res, next){
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({message: 'Missing or invalid token'});
    }
});

// Implement movies API endpoint
app.get('/movies', function(req, res){
    // Get a list of movies and their review scores
    var movies = [
        {title : 'Suicide Squad', release: '2016', score: 8, reviewer: 'Robert Smith', publication : 'The Daily Reviewer'},    
        {title : 'Batman vs. Superman', release : '2016', score: 6, reviewer: 'Chris Harris', publication : 'International Movie Critic'},
        {title : 'Captain America: Civil War', release: '2016', score: 9, reviewer: 'Janet Garcia', publication : 'MoviesNow'},
        {title : 'Deadpool', release: '2016', score: 9, reviewer: 'Andrew West', publication : 'MyNextReview'},
        {title : 'Avengers: Age of Ultron', release : '2015', score: 7, reviewer: 'Mindy Lee', publication: 'Movies n\' Games'},
        {title : 'Ant-Man', release: '2015', score: 8, reviewer: 'Martin Thomas', publication : 'TheOne'},
        {title : 'Guardians of the Galaxy', release : '2014', score: 10, reviewer: 'Anthony Miller', publication : 'ComicBookHero.com'}
    ];

    res.json(movies);
});

app.get('/reviewers', function(req, res){
    // Get a list of all the reviewers
    var authors = [
        {name : 'Robert Smith', publication : 'The Daily Reviewer', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/angelcolberg/128.jpg'},
        {name: 'Chris Harris', publication : 'International Movie Critic', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/bungiwan/128.jpg'},
        {name: 'Janet Garcia', publication : 'MoviesNow', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/grrr_nl/128.jpg'},
        {name: 'Andrew West', publication : 'MyNextReview', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/d00maz/128.jpg'},
        {name: 'Mindy Lee', publication: 'Movies n\' Games', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/laurengray/128.jpg'},
        {name: 'Martin Thomas', publication : 'TheOne', avatar : 'https://s3.amazonaws.com/uifaces/faces/twitter/karsh/128.jpg'},
        {name: 'Anthony Miller', publication : 'ComicBookHero.com', avatar : 'https://s3.amazonaws.com/uifaces/faces/twitter/9lessons/128.jpg'}
    ];

    res.json(authors);
});

app.get('/publications', function(req, res){
    // Get a list of publications

    var publications = [
        {name : 'The Daily Reviewer', avatar: 'glyphicon-eye-open'},
        {name : 'International Movie Critic', avatar: 'glyphicon-fire'},
        {name : 'MoviesNow', avatar: 'glyphicon-time'},
        {name : 'MyNextReview', avatar: 'glyphicon-record'},
        {name : 'Movies n\' Games', avatar: 'glyphicon-heart-empty'},
        {name : 'TheOne', avatar : 'glyphicon-globe'},
        {name : 'ComicBookHero.com', avatar : 'glyphicon-flash'}
    ];

    res.json(publications);
});

app.get('/pending', function(req, res){
    // Get a list of pending movie reviews
    var pending = [
        {title : 'Superman: Homecoming', release: '2017', score: 10, reviewer: 'Chris Harris', publication: 'International Movie Critic'},
        {title : 'Wonder Woman', release: '2017', score: 8, reviewer: 'Martin Thomas', publication : 'TheOne'},
        {title : 'Doctor Strange', release : '2016', score: 7, reviewer: 'Anthony Miller', publication : 'ComicBookHero.com'}
    ];

    res.json(pending);
});

app.listen(8080);