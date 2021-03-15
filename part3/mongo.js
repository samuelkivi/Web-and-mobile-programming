const mongoose = require('mongoose')

// Replace with the URL of your own database. Do not store the password on GitLab!
const url = 'mongodb+srv://web-and-mobile:mymongodbdatabase@cluster0.lx7sz.mongodb.net/myFirstDatabase?'

mongoose.connect(url)

const Reminder = mongoose.model('Reminder', {
    content: String,
    date: Date,
    important: Boolean
})

const reminder = new Reminder({
    content: 'HTML on helppoa',
    date: new Date(),
    important: true
})

reminder
    .save()
    .then(response => {
        console.log('reminder saved!')
        mongoose.connection.close()
    })