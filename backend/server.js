const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://vickyy:nandhu000@cluster0.xq2msem.mongodb.net/complaintbox?appName=Cluster0")
    .then(() => console.log("☑️Connected to MongoDB!"))
    .catch(err => console.error("❌ Database connection error:", err));

    const complaintSchema = new mongoose.Schema({
        department: String,
        description: String,
        image: String
    });

    const Complaint = mongoose.model('Complaint', complaintSchema);

    const userSchema = new mongoose.Schema({
        username: String,
        password: String
    });
    const User = mongoose.model('User', userSchema);
   
    app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const foundUser = await User.findOne({ username: username, password: password });
        if (foundUser) {
            res.status(200).json({ message: "Login successful!" });
        } else {
            res.status(401).json({ message: "wrong username or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "error", error: error.message });
    }

});
    app.post('/register', async (req, res) => {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201).json({ message: "User created successfully!" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    app.post('/complaints', async (req, res) => {
        try {
            const newComplaint = new Complaint(req.body);

            await newComplaint.save();
            res.status(201).json({ message: "Complaint added successfully!", data: newComplaint });
        } catch (error) {
            res.status(500).json({ message: "Failed to savecomplaint", error: error.message });

        }
    });
    app.get('/complaints', async (req, res) => {
        try {
            const allComplaints = await Complaint.find();
            res.status(200).json(allComplaints);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch complaints", error: error.message });

        }
    });
    app.delete('/complaints/:id', async (req, res) => {
        try {
            await Complaint.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Complaint deleted successfully!" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
    