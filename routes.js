const express = require('express');
const { collection } = require('./user.model');
const { songCollection } = require('./user.model');
const { playlistCollection } = require('./user.model');
const router = express.Router();
const path = require('path')

router.use(express.static(path.join(__dirname, '../Mash/artifacts')))

router.post('/login', async (req, res) =>{
    const {Username, Password } = req.body;
    console.log(req.body)
    try {
        // Check if user exists
        const submission = await collection.findOne({ Username: Username, Password: Password }).exec();

        console.log(submission)
        if (!submission) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    
        console.log("PROCESS STOPPED HERE")
        // Authentication successful
        res.json({ message: 'Login successful', User: submission});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/search', async (req, res) => {
    const query = req.query.q;

    try{
        const songs = await songCollection.find({
            $or: [
                {Song: {$regex: query, $options: 'i'}},
                {Artist:{$regex: query, $options: 'i'} }
            ]
        });
        res.json(songs);
    } catch(error){
        console.error('Error during search:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    console.log("Song has been found")
});

module.exports = router;