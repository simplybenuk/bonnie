import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [story, setStory] = useState('');
  const [character, setCharacter] = useState('A dragon named Albert');

  const createStory = async () => {
    const prompt = `Write a 2 minute bedtime story a Father can read to their 2 year old child. The main character is ${character}. The moral of the story will be to not lie`;
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
      <label htmlFor="character">Describe the main character:</label>
      <input
        type="text"
        id="character"
        value={character}
        onChange={e => setCharacter(e.target.value)}
      />
      <button onClick={createStory}>Create a Story</button>
      <p>{story}</p>
    </div>
  );
}

export default App;

