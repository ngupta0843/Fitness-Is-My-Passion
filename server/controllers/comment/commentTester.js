const mongoose = require('mongoose');
const { createComment } = require('./comment.controllers'); // Adjust the path
const Comment = require('../../models/commentModel'); // Adjust the path

// Connect to your database
const runTest = async () => {
    try {
        // Connect to the database
        await mongoose.connect('mongodb+srv://ngupta0843:mingao@35l-database.mcevi.mongodb.net/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to the database.');

        // Hardcoded comment data
        const hardcodedComment = {
            username: 'TestUser',
            userID: 'testUserID',
            commentID: 'testCommentID123', // Use a fixed or unique ID
            message: 'This is a hardcoded test comment',
            parentPostID: 't@gmail.com0',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Manually create the comment object
        console.log('Creating a hardcoded comment...');
        const newComment = new Comment(hardcodedComment);
        await newComment.save();

        console.log('Comment created successfully:', newComment);

        // Verify the saved comment
        const savedComment = await Comment.findOne({ commentID: 'testCommentID123' });
        console.log('Verified Comment Data:', savedComment);

    } catch (error) {
        console.error('Error during test:', error);
    } finally {
        // Disconnect from the database
        await mongoose.connection.close();
        console.log('Disconnected from the database.');
    }
};

runTest();
