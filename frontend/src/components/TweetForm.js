import React, { useState } from "react";
import axios from "axios";

const TweetForm = () => {
  const [topic, setTopic] = useState("");
  const [generatedTweet, setGeneratedTweet] = useState("");
  const [message, setMessage] = useState("");

  const generateTweet = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/tweets/generate", { topic });
      setGeneratedTweet(response.data.tweet);
    } catch (error) {
      console.error(error);
    }
  };

  const postTweet = async () => {
    try {
      await axios.post("http://localhost:5000/api/tweets/post", { content: generatedTweet });
      setMessage("Tweet posted successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to post tweet.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button onClick={generateTweet}>Generate Tweet</button>
      {generatedTweet && (
        <div>
          <p>{generatedTweet}</p>
          <button onClick={postTweet}>Post Tweet</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default TweetForm;
