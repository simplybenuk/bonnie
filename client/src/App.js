import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button'; // Import Button from Material UI
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { AppBar, Grid, Container, Toolbar, Typography, Card, CardContent } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';


const theme = createTheme({
  palette: {
    primary: {
      main: '#a5d6a7', // Soft Green
    },
    secondary: {
      main: '#fff59d', // Light Yellow
    },
  },
});


function App() {
  const [story, setStory] = useState('');
  const [character, setCharacter] = useState('A dragon named Albert');
  const [minutes, setMinutes] = useState(2);
  const [age, setAge] = useState(2);
  const [moral, setMoral] = useState('to be good');

  const createStory = async () => {
    const prompt = `
        Act as a best selling children's author. Write a bedtime story designed for a child of age ${age}. 
        It should take the parent around ${minutes} minutes to read the story. 
        The main character is ${character}. The hidden moral of the story will be ${moral}. 
        Always conclude the Story with "The End".
        Return the content formatted in HTML, rather than plain text.
        Each Story should have a short title at the start in H2. \n\n 
      `;
    try {
      const res = await axios.post('http://localhost:5000/create-story', { prompt });
      setStory(res.data.story);
    } catch (error) {
      console.error(error);
      setStory('Error creating story');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <header>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant="h6">
              Bonnie
            </Typography>
          </Toolbar>
        </AppBar>
      </header>
      <main>
        <section class='intro'>
          <Container maxWidth='sm' align='center'>
            <Typography variant="h1">Bonnie</Typography>
            <Typography variant="p">
              Welcome to Bonnie, your digital bedtime story companion. 
              Bonnie is designed to make bedtime stories more engaging, creative, and personalized for your little ones. 
              With Bonnie, you can quickly craft unique tales tailored to your child's interests and imagination. 
              Whether it's an adventure in a magical kingdom or a journey through the stars, 
              Bonnie helps you transform bedtime into an unforgettable storytelling experience. 
              Unlock the world of imagination with Bonnie, and make each night a special memory for your child.
            </Typography>
          </Container>
        </section>
        <section className='story-form'>
          <Container maxWidth='sm'>
            <label htmlFor="character">Describe the main character:</label>

            {/* <Grid container direction="column" spacing={2}> */}
              {/* <Grid item> */}
              <TextField
                value={character}
                onChange={e => setCharacter(e.target.value)}
                label="Character" // Display label for the TextField
                variant="outlined" // Outlined style
              />
              {/* </Grid> */}
              {/* <Grid item> */}
              <label htmlFor="minutes">Length of the story (in minutes):</label>
              <Slider
                aria-label="Minutes"
                defaultValue={2}
                value={minutes}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={5}
                onChange={(e, value) => setMinutes(value)}
              />
              {/* </Grid>
              <Grid item> */}
              <label htmlFor="age">Age of the child:</label>
              <FormControl variant="outlined">
                <InputLabel id="age-label">Years</InputLabel>
                <Select
                  labelId="age-label"
                  id="age"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  label="Age of the child"
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
              {/* </Grid>
              <Grid item> */}
              <label htmlFor="moral">Moral of the story:</label>
              <TextField
                value={moral}
                onChange={e => setMoral(e.target.value)}
                label="Moral of Story" // Display label for the TextField
                variant="outlined" // Outlined style
              />
              {/* </Grid>
              <Grid item> */}
                <Button variant="contained" onClick={createStory}>Create a Story</Button>
              {/* </Grid> */}

              {/* <Grid item>
              </Grid>
            </Grid> */}
          </Container>
        </section>
        <section className='story-output'>
          <Container maxWidth='sm'>
            <Card>
              <CardContent>
                <Typography variant="body1" paragraph={true} align="left" color="textPrimary">
                  <div dangerouslySetInnerHTML={{ __html: story }} />
                </Typography>        
              </CardContent>
            </Card>
          </Container>
        </section>
      </main>
    </ThemeProvider>
  );
}

export default App;

