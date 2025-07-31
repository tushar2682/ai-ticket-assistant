import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Inngest from '../inngest/client.js'; // Adjust path as needed
import user from '../models/user.js';

export const signup = async (req, res) => {
    const { email, password, skills } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashed, skills });
        // Fire inngest event
        await Inngest.sendEvent({
            name: 'user.signup',
            data: { email }
        });
        const token = jwt.sign(
            { _id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET
        );
        res.json({ user, token });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }
        const token = jwt.sign(
            { _id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET
        );
        res.json({ user, token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
export const logout = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }
        // Optionally verify token
        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if (err) {
                return res.status(401).json({ error: "Invalid token" });
            }
            // Token is valid, proceed to "logout"
            return res.json({ message: "Logged out successfully" });
        });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(401).json({ error: "Internal server error" });
    }
};
export const updateUser = async (req, res) => {
    const { skills = [], role, email } = req.body;
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ error: "Forbidden" });
        }
        // Find the user to update
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Update fields
        user.skills = skills.length ? skills : user.skills;
        if (role) user.role = role;
        await user.save();
        return res.json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error during updateUser:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
export const getUser = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Forbidden" });
        }
        const users = await User.find().select("-password");
        return res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Update failed", details: error.message });
    }
};