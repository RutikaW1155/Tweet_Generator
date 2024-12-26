const express = require("express");
const { OpenAI } = require("openai");
const { TwitterApi } = require("twitter-api-v2");
const Tweet = require("../models/Tweet");
const router = express.Router();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Twitter Client
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// Generate Tweet
router.post('/generate-tweet', async (req, res) => {
    try {
      const { topic } = req.body;
  
      if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
      }
  
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Generate a tweet about ${topic}`,
        max_tokens: 50,
      });
  
      const tweet = response.data.choices[0].text.trim();
      res.json({ tweet });
    } catch (error) {
      console.error('Error generating tweet:', error.message);
      res.status(500).json({ error: 'Failed to generate tweet' });
    }
  });
  

// Post Tweet
router.post("/post", async (req, res) => {
  try {
    const { content } = req.body;

    // Post to Twitter
    await twitterClient.v2.tweet(content);

    // Save to MongoDB
    const tweet = new Tweet({ content });
    await tweet.save();

    res.json({ message: "Tweet posted and saved", content });
  } catch (error) {
    res.status(500).json({ error: "Failed to post tweet", details: error.message });
  }
});

module.exports = router;
