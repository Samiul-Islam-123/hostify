require('dotenv').config();
const express = require('express');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const getIPAddress = require('../../utils/IP');

const PORT = process.env.PORT || 5501;
const app = express();

const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { Webhook } = require('svix');
const UserModel = require('../../Database/models/UserModel');
const generateToken = require('./JWT');
const Logger = require('../../utils/Logger');
const ConnectToDatabase = require('../../Database/DBConnection');
require('dotenv').config();

const logger = new Logger();
// Middleware to parse JSON bodies
app.use(express.json());

// Protect the root endpoint with Clerk authentication
app.get('/', (req, res) => {
    res.send("Auth service is running and you are authenticated!");
});

app.use(cors())


// app.get('/repos',  async (req, res) => {
//     try {
//       // Get GitHub access token from session claims
//       const githubToken = req.auth.sessionClaims?.githubAccessToken;
      
//       if (!githubToken) {
//         return res.status(403).json({ error: 'GitHub not connected' });
//       }
  
//       // Fetch repositories from GitHub API
//       const response = await fetch('https://api.github.com/user/repos', {
//         headers: {
//           Authorization: `Bearer ${githubToken}`,
//           Accept: 'application/vnd.github+json'
//         }
//       });
  
//       if (!response.ok) throw new Error('GitHub API error');
      
//       const repos = await response.json();

//       console.logger(repos.map(repo => ({
//         name: repo.name,
//         url: repo.html_url,
//         private: repo.private
//       })));
//       res.json(repos.map(repo => ({
//         name: repo.name,
//         url: repo.html_url,
//         private: repo.private
//       })));
  
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'Failed to fetch repositories' });
//     }
//   });


// Verify Clerk JWT
// const verifyClerkJWT = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
    
//     if (!token) {
//       return res.status(401).json({ error: 'No token provided' });
//     }
    
//     // Verify token with Clerk public key
//     // You need to set CLERK_JWT_PUBLIC_KEY in your .env file
//     const decoded = jwt.verify(token, process.env.CLERK_JWT_PUBLIC_KEY, {
//       algorithms: ['RS256']
//     });
    
//     req.auth = { userId: decoded.sub };
//     next();
//   } catch (error) {
//     console.error('Auth error:', error);
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// };


// // GitHub repositories endpoint
// app.get('/api/github/repos', verifyClerkJWT, async (req, res) => {
//   try {
//     // Get the authenticated user's ID from the JWT
//     const userId = req.auth.userId;
//     console.logger(userId)
    
//     // Make request to Clerk API to get user data including OAuth connections
//     const clerkResponse = await axios.get(`https://api.clerk.dev/v1/users/${userId}`, {
//       headers: {
//         'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
//         'Content-Type': 'application/json'
//       }
//     });
    
//     const user = clerkResponse.data;
//     console.logger("Clerk User Data:", JSON.stringify(user, null, 2)); // 👈 logger full response
//     // Find the GitHub OAuth account

//     const githubAccount = user.external_accounts?.find(
//       account => account.provider === 'github'
//     );

//     console.logger(githubAccount)
    
//     if (!githubAccount) {
//       return res.status(400).json({ error: 'No GitHub account connected' });
//     }
    
//     // Get OAuth token from Clerk for this user's GitHub connection
//     const tokenResponse = await axios.get(
//       `https://api.clerk.dev/v1/users/${userId}/oauth_access_tokens/github`,
//       {
//         headers: {
//           'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );
    
//     console.logger("Token Response:", JSON.stringify(tokenResponse.data, null, 2)); // 👈 logger token response
    
//     const githubToken = tokenResponse.data.data?.[0]?.token; // 👈 Key might be nested
    
//     if (!githubToken) {
//       return res.status(400).json({ error: 'Could not retrieve GitHub token' });
//     }
    
//     // Use the token to fetch GitHub repositories
//     const githubResponse = await axios.get('https://api.github.com/user/repos', {
//       headers: {
//         'Authorization': `token ${githubToken}`,
//         'Accept': 'application/vnd.github.v3+json'
//       }
//     });
    
//     res.json(githubResponse.data);
//   } catch (error) {
//     console.error('Error fetching GitHub repos:', error);
//     res.status(500).json({ 
//       error: 'Failed to fetch GitHub repositories',
//       details: error.message
//     });
//   }
// });


app.post('/register', async(req,res) => {
    const { username, email, isVerified, avatarURL } = req.body;

    try {
        if (!username || !email || !isVerified)
            return res.json({
                success: false,
                message: "Unable to save user data, All fields must be provided"
            })

        //check for existing user
        const User = await UserModel.findOne({
            email: email
        })

        if (!User) {
            //create user
            const CurrentUser = new UserModel({
                username, email, isVerified, avatarURL
            })
            //create jwt token
            const token = generateToken({
                id : CurrentUser._id,
                username : CurrentUser.username,
                email : CurrentUser.email,
                isVerified : CurrentUser.isVerified,
                avatarURL : CurrentUser.avatarURL
            });
            //save the user
            await CurrentUser.save();
            return res.json({
                success: true,
                message: "User has been registered Successfully",
                token : token
            })
        }

        //create jwt token
        const token = generateToken({
            id : User._id,
            username : User.username,
            email : User.email,
            isVerified : User.isVerified,

        });
        return res.json({
            success: true,
            message: "User already exists",
            token : token
        })
    }
    catch (error) {
        logger.error(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
})

app.post('/login', async(req,res) => {
    const { email, username } = req.body;

    try {
        if (!email )
            return res.json({
                success: false,
                message: "Unable to save user data, All fields must be provided"
            })

        //check for existing user
        const User = await UserModel.findOne({
            email: email,
            username : username
        })

        if (!User) {
            return res.json({
                success : false,
                message : "User not found"
            })
        }

        //create jwt token
        const token = generateToken({
            id : User._id,
            username : User.username,
            email : User.email,
            isVerified : User.isVerified,
            avatarURL : User.avatarURL
        });
        return res.json({
            success: true,
            message: "User logged in successfully",
            token : token
        })
    }
    catch (error) {
        logger.error(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
})

app.listen(PORT, async () => {
    const DB_URL = process.env.DB_URL;
    await ConnectToDatabase(DB_URL);
    const IP = getIPAddress();
    logger.info(`Auth service is running at http://${IP}:${PORT}`);
});