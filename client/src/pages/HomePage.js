import React, { useState } from 'react';
import axios from 'axios';
import { AppBar, Box, Container, Toolbar, Typography, Card, CardContent } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TermsModal from '../components/TermsModal';
import StoryForm from '../components/StoryForm';
import LoadingStory from '../components/LoadingStory';
import StoryOutput from '../components/StoryOutput';
import '../App.css';
import background from '../images/background.png';
import logo from '../images/android-chrome-512x512.png';

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [story, setStory] = useState('');
    const [character, setCharacter] = useState('A dragon named Albert');
    const [minutes, setMinutes] = useState(2);
    const [age, setAge] = useState(2);
    const [moral, setMoral] = useState('to be good');
    const [isRhyming, setIsRhyming] = useState(false);
    const [showForm, setShowForm] = useState(true);
  
    const createStory = async () => {
      setShowForm(false);
      setLoading(true);
      const prompt = `
          Create a bedtime story designed for a child of age ${age}. 
          The story should take about ${minutes} minutes to read to the child. 
          ${isRhyming ? 'The story should rhyme.' : ''}
          The main character is ${character}. The hidden moral will be ${moral}. 
          Always conclude the Story with "The End".
          Return the content formatted in HTML. Use paragraph tags to make it easy to read.
          Each Story should have a short title at the start in H2. \n\n         
      `;
      console.log("Prompt:", prompt);
      try {
        const res = await axios.post('/api/create-story', { prompt });
        setStory(res.data.story);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setStory('Error creating story');
        setLoading(false);
      }
    }
  
    const startNewStory = () => {
      window.location.reload();
    }
  
    return (
        <main>
          <TermsModal />  
          <section className='intro'>
            <Container maxWidth='sm'>
                <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
                    <img src={logo} alt="Logo" style={{ height: '60px' }} />
                    <Typography variant="h1">Bonnie</Typography>
                </Box>
                <Typography variant="p" align="center">
                    Bonnie generates unique, AI-powered children's stories. Enjoy a new story every time, perfect for bedtime, playtime, or any time!
                </Typography>
            </Container>
          </section>
          {showForm ? (
            <StoryForm
              character={character}
              setCharacter={setCharacter}
              minutes={minutes}
              setMinutes={setMinutes}
              age={age}
              setAge={setAge}
              moral={moral}
              setMoral={setMoral}
              isRhyming={isRhyming}
              setIsRhyming={setIsRhyming}
              createStory={createStory}
            />
          ) : null}
          {loading ? (
            <LoadingStory />
          ) : null}
          {story ? (
            <StoryOutput
              story={story}
              startNewStory={startNewStory}
            />
          ) : null}
        </main>
    );
  
}

export default HomePage;
