import React, { Component, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button'; // Import Button from Material UI
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { AppBar, Container, LinearProgress, Toolbar, Typography, Card, CardContent } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import TermsModal from './TermsModal';

import './App.css';
import background from './images/background.png';


const theme = createTheme({
  palette: {
    primary: {
      main: '#f6f1c1',
    },
    secondary: {
      main: '#c1d6f6', 
    },
    success: {
      main: '#a5d6a7'
    }
  },
});

function App() {
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState('');
  const [character, setCharacter] = useState('A dragon named Albert');
  const [minutes, setMinutes] = useState(2);
  const [age, setAge] = useState(2);
  const [moral, setMoral] = useState('to be good');
  const [showForm, setShowForm] = useState(true);

  const createStory = async () => {
    setShowForm(false);
    setLoading(true);
    const prompt = `
        Create a bedtime story designed for a child of age ${age}. 
        The story should take about ${minutes} minutes to read to the child. 
        The main character is ${character}. The hidden moral will be ${moral}. 
        Always conclude the Story with "The End".
        Return the content formatted in HTML. Use paragraph tags to make it easy to read.
        Each Story should have a short title at the start in H2. \n\n 
      `;
    try {
      const res = await axios.post('/api/create-story', { prompt });
      // const res = await axios.post('http://localhost:5000/create-story', { prompt });
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
    <ThemeProvider theme={theme}>
      <TermsModal />
      {/* <header>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant="h6">
              Bonnie
            </Typography>
          </Toolbar>
        </AppBar>
      </header> */}
      <main>
        <section class='intro'>
          <Container maxWidth='sm' align='center'>
            <Typography variant="h1">Bonnie</Typography>
            <Typography variant="p">
              Bonnie generates unique, AI-powered children's stories. Enjoy a new story every time, perfect for bedtime, playtime, or any time!
            </Typography>
          </Container>
        </section>
        {showForm && (
          <section class='story-form'>
            <Container maxWidth='sm'>
              <Stack spacing={5}>
                  <label htmlFor="character">Describe the main character:</label>
                  <TextField
                    value={character}
                    onChange={e => setCharacter(e.target.value)}
                    label="Character" // Display label for the TextField
                    variant="outlined" // Outlined style
                    fullWidth="True"
                    color="success"
                  />
                  <label htmlFor="minutes">Length of the story (in minutes):</label>
                  <Slider
                    aria-label="Minutes"
                    defaultValue={2}
                    value={minutes}
                    valueLabelDisplay="on"
                    step={1}
                    marks
                    min={1}
                    max={5}
                    color="success"
                    onChange={(e, value) => setMinutes(value)}
                  />
                <label htmlFor="age">Age of the child:</label>
                <FormControl variant="outlined">
                  <InputLabel id="age-label">Years</InputLabel>
                  <Select
                    labelId="age-label"
                    id="age"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    label="Age of the child"
                    color="success"

                  >
                    <MenuItem value={"Under 1"}>Under 1</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9+</MenuItem>
                  </Select>
                </FormControl>
                <label htmlFor="moral">Moral of the story:</label>
                <TextField
                  value={moral}
                  onChange={e => setMoral(e.target.value)}
                  label="Moral of Story" // Display label for the TextField
                  variant="outlined" // Outlined style
                  color="success"
                />
                  <Button variant="contained" onClick={createStory} color="success">Create a Story</Button>
                </Stack>
            </Container>
          </section>
        )}
        {loading ? (
          <section class='story-output'>
            <Container maxWidth='sm'>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <LinearProgress />
                    <Typography align="center">Please wait, your story is being created. This will take a little time...</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Container>
          </section>
        ) : (
          story && (
            <section class='story-output'>
              <Container maxWidth='sm'>
                <Stack spacing={5}>
                <Card>
                  <CardContent>
                    <Typography variant="body1" paragraph={true} align="left" color="textPrimary">
                      <div dangerouslySetInnerHTML={{ __html: story }} />
                    </Typography> 
                  </CardContent>
                </Card>
                <Button variant="contained" onClick={startNewStory} color="success">Start a New Story</Button>
                </Stack>
              </Container>
            </section>
          )
        )}
      </main>
    </ThemeProvider>
  );
}

export default App;

