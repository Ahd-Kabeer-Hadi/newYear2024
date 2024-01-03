const EXPRESS = require('express');
const { CreateTodo, UpdateTodo } = require('./types');
const { Todos } = require('./db');
const CORS = require('cors');
const APP = EXPRESS()
const PORT = 3000 || process.env.PORT;


APP.use(EXPRESS.json())
APP.use(CORS({
    origin: '*',
}))
/* 
    body: {
        title: String,
        description: String,
    }
*/

APP.post('/todos',async (req, res) => {

    const payload = req.body;
    const parsePayload = CreateTodo.safeParse(payload);

    if(!parsePayload.success){
        res.status(411).json({
            message: 'You put the wrong thingy in the body',
        })
        return ;
    }

    try{
        await Todos.create({
            title: payload.title,
            description: payload.description,
            completed : payload.completed
        })

        res.json({
            Message : 'Todo created'
        })
    }catch(e){
        res.status(500).send(
            {
                Message: 'something happened'
            }
        )
    } 
    
})

APP.get('/todos', async (req, res) => {

    try{
        const todos = await Todos.find();

        if(!todos){
            res.status(403).send(
                {
                    Message: 'No todos found'
                }
            )
        }
        res.json(todos)
    }catch(e){
        res.status(500).send(
            {
                Message: 'something happened'
            }
        )
    }
    
})

APP.put('/update', async (req, res) => {

    const payload = req.body;
    const parsePayload = UpdateTodo.safeParse(payload);

    if(!parsePayload.success){
        res.status(411).json({
            message: 'You put the wrong thingy in the body',
        })
        return ;
    }

    try{
        
        await Todos.findOneAndUpdate(
            {
                _id: payload.id
            },
            {
                completed: true
            }
        )
        res.json({
            Message : 'Todo marked as completed'
        })
    }catch(e){
        console.log(e)
        res.status(500).send(
            {
                Message: 'something happened'
            }
        )
    }

})

APP.delete('/remove', async (req, res) => {

    const payload = req.body;
    const parsePayload = UpdateTodo.safeParse(payload);
    if(!parsePayload.success){
        res.status(411).json({
            message: 'You put the wrong thingy in the body',
            payload : payload
        })
        return ;
    }
    try{
        await Todos.findOneAndDelete(
            {
                _id: payload.id
            }
        )
        res.json({
            Message : 'Todo deleted'
        })
    }catch(e){
        res.status(500).send(
            {
                Message: 'something happened'
            }
        )
    }
})


APP.listen(PORT, () => console.log(`Server running on port ${PORT}`))