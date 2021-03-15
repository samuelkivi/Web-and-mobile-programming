const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json());

app.use(cors());

let reminders = [
    {
        "important": true,
        "content": "Buy some eggs",
        "timestamp": "2021-11-10T13:00:00.141Z",
        "id": 1
    },
    {
        "important": true,
        "content": "Make omelette",
        "timestamp": "2021-11-11T08:00:00.141Z",
        "id": 2
    },
    {
        "important": true,
        "content": "Wash dishes",
        "timestamp": "2021-11-11T09:00:00.000Z",
        "id": 3
    },
    {
        "important": true,
        "content": "Buy more eggs",
        "timestamp": "2021-11-11T13:00:00.000Z",
        "id": 4
    }
]


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/reminders', (req, res) => {
    res.json(reminders)
})

app.get('/api/reminders/:id', (request, response) => {
    const id = Number(request.params.id)
    const reminder = reminders.find(reminders => reminders.id === id)

    if (reminder) {
        response.json(reminder)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/reminders/:id', (request, response) => {
    const id = Number(request.params.id)
    reminders = reminders.filter(reminder => reminder.id !== id)

    response.status(204).end()
})

function isNameInList(content) {
    var found = false;
    console.log(content);
    for (var i = 0; i < reminders.length; i++) {
        if (reminders[i].content === content) {
            found = true;
            console.log("found: "+found)
            return found;
        }
    }
    if (!found) {
        console.log("found: "+found)
        return found;
    }
}

const generateId = () => {
    const maxId = reminders.length > 0 ? reminders.map(n => n.id).sort((a, b) => a - b).reverse()[0] : 1
    return maxId + 1
}

app.post('/api/reminders', (request, response) => {
    const body = request.body
    console.log(body.content)
    
    if (body.content === undefined || isNameInList(body.content)) {
        return response.status(400).json({ error: 'content missing or is already in the list' })
    }

    const reminder = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    }

    reminders = reminders.concat(reminder)

    response.json(reminder)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})