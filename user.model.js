const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Username: { type: String, required: true },
    Password: { type: String, required: true },
    Email: { type: String, required: true }
});

const collection = new mongoose.model('User', userSchema, 'UserLoginInfo');

const songSchema = new mongoose.Schema({
    Song: { type: String, required: true },
    Artist: { type: String, required: true },
    SongFile: { type: String, required: true}
});
const songCollection = new mongoose.model('Songs', songSchema, 'Songs')

const playlistSchema = new mongoose.Schema({
    Song: { type: String, required: true },
    Username: { type: String, required: true }
})

const playlistCollection = new mongoose.model('Playlist', playlistSchema, 'Playlist')
module.exports = {collection, songCollection, playlistCollection};