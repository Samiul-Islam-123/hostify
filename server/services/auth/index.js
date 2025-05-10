require('dotenv').config();
const express = require('express');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const Logger = require('../../utils/Logger');
const getIPAddress = require('../../utils/IP');

const PORT = process.env.PORT || 5501;
const app = express();
const logger = new Logger();

// Middleware to parse JSON bodies
app.use(express.json());

// Protect the root endpoint with Clerk authentication
app.get('/', ClerkExpressRequireAuth(), (req, res) => {
    res.send("Auth service is running and you are authenticated!");
});

app.get('/repos', ClerkExpressRequireAuth(), async (req, res) => {
    try {
      // Get GitHub access token from session claims
      const githubToken = req.auth.sessionClaims?.githubAccessToken;
      
      if (!githubToken) {
        return res.status(403).json({ error: 'GitHub not connected' });
      }
  
      // Fetch repositories from GitHub API
      const response = await fetch('https://api.github.com/user/repos', {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github+json'
        }
      });
  
      if (!response.ok) throw new Error('GitHub API error');
      
      const repos = await response.json();

      console.log(repos.map(repo => ({
        name: repo.name,
        url: repo.html_url,
        private: repo.private
      })));
      res.json(repos.map(repo => ({
        name: repo.name,
        url: repo.html_url,
        private: repo.private
      })));
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch repositories' });
    }
  });
app.listen(PORT, () => {
    const IP = getIPAddress();
    logger.info(`Auth service is running at http://${IP}:${PORT}`);
});