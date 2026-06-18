const express = require('express');
const admin = require('firebase-admin');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('dashboard/dist'));

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebase-service-account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://wildsaura-1ef8a-default-rtdb.firebaseio.com'
});

const db = admin.database();
const auth = admin.auth();

// Middleware: Verify Firebase Token
async function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
        const decodedToken = await auth.verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token', details: error.message });
    }
}

// GET /api/user/role - Get current user's role
app.get('/api/user/role', verifyToken, async (req, res) => {
    try {
        const userId = req.user.uid;
        const snapshot = await db.ref(`userRoles/${userId}`).once('value');
        const role = snapshot.val() || 'user';
        
        res.json({
            userId,
            role,
            email: req.user.email
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/admin/setrole - Admin only: Set user's role
app.post('/api/admin/setrole', verifyToken, async (req, res) => {
    try {
        const adminId = req.user.uid;
        const adminSnapshot = await db.ref(`userRoles/${adminId}`).once('value');
        const adminRole = adminSnapshot.val();
        
        if (adminRole !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized: Admin role required' });
        }
        
        const { userId, role } = req.body;
        
        if (!userId || !role) {
            return res.status(400).json({ error: 'userId and role required' });
        }
        
        if (!['admin', 'volunteer', 'user'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }
        
        await db.ref(`userRoles/${userId}`).set(role);
        
        res.json({
            message: 'Role updated successfully',
            userId,
            role
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/admin/users - Admin only: List all users with roles
app.get('/api/admin/users', verifyToken, async (req, res) => {
    try {
        const adminId = req.user.uid;
        const adminSnapshot = await db.ref(`userRoles/${adminId}`).once('value');
        const adminRole = adminSnapshot.val();
        
        if (adminRole !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized: Admin role required' });
        }
        
        const usersSnapshot = await db.ref('userRoles').once('value');
        const users = usersSnapshot.val() || {};
        
        res.json({
            count: Object.keys(users).length,
            users
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fallback: Serve React app for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});