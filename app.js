/**
 * Application Entry point
 * @type {createApplication}
 */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const expressGraphQL = require('express-graphql');

// let's import the schema file we just created
const GraphQLSchema = require('./graphql');


/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 *
 * Default path: .env (You can remove the path argument entirely, after renaming `.env.example` to `.env`)
 */
dotenv.load({path: '.env'});

/**
 * Create Express server.
 */
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    autoIndex: true,
    useFindAndModify: false,
    useCreateIndex: true
});
mongoose.connection.on('error', function () {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});
mongoose.set('debug', true);

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));

app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 5000}));
app.use(bodyParser.json({limit: '50mb'}));


/**
 * CORS middleware
 */
app.use(cors());


// =========== GraphQL setting  ========== //
app.use('/graphql', expressGraphQL(req => ({
        schema: GraphQLSchema,
        context: req.context,
        graphiql: process.env.NODE_ENV === 'development',
    })
));
// =========== GraphQL setting END ========== //

/**
 * Start Express server.
 */
app.listen(app.get('port'), function () {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
