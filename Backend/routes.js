const express = require('express');
const { collection } = require('./user.model');
const { songCollection } = require('./user.model');
const { playlistCollection } = require('./user.model');
const router = express.Router();
const path = require('path');

router.use(express.static(path.join(__dirname, '../Mash/artifacts')));

router.post('/login', async (req, res) => {
    const { Username, Password } = req.body;
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

    try {
        const songs = await songCollection.find({
            $or: [
                { Song: { $regex: query, $options: 'i' } },
                { Artist: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(songs);
    } catch(error){
        console.error('Error during search:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    console.log("Song has been found");
});

router.post('/resetpassword', async (req, res) => {
    // Extract username, new password, and confirmed password from request body
    const { Username, newPassword, confirmPassword } = req.body;

    try {
        // Find the user with the provided username
        const submission = await collection.findOne({ Username });

        // If no user found, return 400 Bad Request
        if (!submission) {
            return res.status(400).send('User not found.');
        }

        // Check if the new password matches the confirmed password
        if (newPassword !== confirmPassword) {
            return res.status(400).send('Passwords do not match.');
        }

        // Update the user's password with the new one
        submission.Password = newPassword;
        await submission.save();

        // Return success message
        res.send('Password reset successfully.');
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).send('An error occurred while resetting password.');
    }
});

module.exports = router;
