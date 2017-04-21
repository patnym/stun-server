//Defines uncategorized middleware used by express
const app = require('express')();

//Error handler
var errorHandler;

//Development
if(app.get('env') === 'development') {
    console.log("Running development, using dev error middleware");
    
    errorHandler = (err, req, res, next) => {
                    console.log("YO");
        res.status(err.stats || 500);
        res.send(
            {
                name: err.name || 'Unkown error',
                message: err.message || '',
                error: err.err || ''
            }
        )
    };
} 
//Production
else {
    console.log("Running production, using prod error middleware");

    errorHandler = (err, req, res, next) => {
        res.status(err.stats || 500)
        res.send(
            {
                name: err.name,
                message: '',
                error: ''
            }
        )
    };
}

module.exports = errorHandler;