const MONGOOSE = require('mongoose');
const URI = require('./ENV/env').MONGODB_URI;
/*
    TODO: Create a schema
    SCHEMA: {
        title: String,
        description: String,
        completed: Boolean
    }

*/
MONGOOSE.connect(URI);
const TODO_SCHEMA = MONGOOSE.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const TODO_MODEL = MONGOOSE.model('todos', TODO_SCHEMA);

module.exports = {
    Todos : TODO_MODEL
}