const reminderSchema = require('./reminder')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json());

app.use(cors());

const formatReminder = (reminderSchema) => {
    const formattedReminder = { ...reminderSchema._doc, id: reminderSchema.id }
    delete formattedReminder.id
    delete formattedReminder.__v

    return formattedReminder
}


app.get('/', (request, response) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/reminders', (request, response) => {
    reminderSchema
        .find({})
        .then(reminder => {
            response.json(reminder.map(formatReminder))
        })
})

app.get('/api/reminders/:id', (request, response) => {
    reminderSchema
        .findById(request.params.id)
        .then(reminder => {
            response.json(formatReminder(reminder))
        })
})

app.delete('/api/reminders/:id', (request, response) => {
    reminderSchema
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.post('/api/reminders', (request, response) => {
    const body = request.body
    console.log(body.content)

    if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing or is already in the list' })
    }

    const reminder = new reminderSchema({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })

    reminder
        .save()
        .then(savedReminder => {
            response.json(formatReminder(savedReminder))
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})