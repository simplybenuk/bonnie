import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [story, setStory] = useState('');
  const [character, setCharacter] = useState('A dragon named Albert');
  const [minutes, setMinutes] = useState(2);
  const [parent, setParent] = useState('Father');
  const [age, setAge] = useState(2);
  const [moral, setMoral] = useState('to be good');

  const createStory = async () => {
    const prompt = `Act as a best selling children's author. Write a bedtime story designed for a child of age ${age}. The story will be read by a ${parent}. It should take the parent around ${minutes} minutes to read the story. The main character is ${character}. The moral of the story will be ${moral}. .\n\n `;
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
      <label htmlFor="minutes">Length of the story (in minutes):</label>
      <input
        type="number"
        id="minutes"
        value={minutes}
        min={1}
        max={5}
        onChange={e => setMinutes(e.target.value)}
      />
      <label>Are you the child's:</label>
      <div>
        <input
          type="radio"
          id="father"
          name="parent"
          value="Father"
          checked={parent === 'Father'}
          onChange={e => setParent(e.target.value)}
        />
        <label htmlFor="father">Father</label>
        <input
          type="radio"
          id="mother"
          name="parent"
          value="Mother"
          checked={parent === 'Mother'}
          onChange={e => setParent(e.target.value)}
        />
        <label htmlFor="mother">Mother</label>
      </div>
      <label htmlFor="age">Age of the child:</label>
      <input
        type="number"
        id="age"
        value={age}
        min={1}
        onChange={e => setAge(e.target.value)}
      />
      <label htmlFor="moral">Moral of the story:</label>
      <input
        type="text"
        id="moral"
        value={moral}
        onChange={e => setMoral(e.target.value)}
      />
      <button onClick={createStory}>Create a Story</button>
      <p>{story}</p>
    </div>
  );
}

export default App;


