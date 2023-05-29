import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [story, setStory] = useState('');

  const createStory = async () => {
    const prompt = "Write a 2 minute bedtime story a Father can read to their 2 year old child. The main character is called Bob. The moral of the story will be to not lie";
    try {
      const res = await axios.post('http://localhost:5000/create-story', { prompt });
      setStory(res.data.story);
    } catch (error) {
      console.error(error);
      setStory('Error creating story');
    }
  }

  return (
    <div className="App">
      <button onClick={createStory}>Create a Story</button>
      <p>{story}</p>
    </div>
  );
}

export default App;
