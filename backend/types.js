const ZOD = require('zod');

/*
TODO Input Schemas:

Create Todo: {
    title : string,
    description : string
}

Update Todo: {
    id : string,
}

*/

const CREATE_TODO = ZOD.object({
    title: ZOD.string(),
    description: ZOD.string(),
    completed: ZOD.boolean(),
})

const UPDATE_TODO = ZOD.object({
    id: ZOD.string(),
})

module.exports = {
    CreateTodo : CREATE_TODO,
    UpdateTodo : UPDATE_TODO
}