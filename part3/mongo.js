const mongoose = require('mongoose')

// Replace with the URL of your own database. Do not store the password on GitLab!
const url = 'mongodb+srv://web-and-mobile:secret@cluster0.lx7sz.mongodb.net/myFirstDatabase?'

var args = process.argv.slice(2);

mongoose.connect(url)

const reminderSchema = mongoose.model('Reminder', {
    content: String,
    date: Date,
    important: Boolean
})

if (args.length === 0) {
    reminderSchema
        .find({})
        .then(result => {
            result.forEach(reminder => {
                console.log(reminder)
            })
            mongoose.connection.close()
        })
}
else {
    const reminder = new reminderSchema({
        content: args[0],
        date: args[1],
        important: false
    })
    reminder
        .save()
        .then(response => {
            console.log(reminder + ' reminder saved!')
            mongoose.connection.close()
        })
}
