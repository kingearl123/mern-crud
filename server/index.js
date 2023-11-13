const express = require('express')
const mongoose = require('mongoose');
const UserModel = require('./User');
var cors = require('cors');



const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

const db = mongoose.connect('mongodb://localhost/nodeexpressdb',{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

.then( db => console.log('database connected'))
.catch( err => console.log(err))


app.get('/', (req, res) => {
//   res.send('Hello World!')
    UserModel.find()
    .then (User => res.json(User))
    .catch (err => res.json(err))
})


app.get('/get/:id', (req, res) => {
    const id = req.params.id
    UserModel.findById({_id : id})
    .then (post => res.json(post))
    .catch (err => res.json(err))
})

app.post('/create', (req, res) => {
    UserModel.create(req.body)
    .then (User => res.json(User))
    .catch (err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id : id},
        {
            name : req.body.name,
            email : req.body.email,
            age : req.body.age
        })
        .then (User => res.json(User))
        .catch (err => res.json(err))
})

app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findByIdAndDelete({_id : id})  
    .then (response => res.json(response))
    .catch (err => res.json(err))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})