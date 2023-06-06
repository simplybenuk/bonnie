import React from 'react';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button'; 
import Stack from '@mui/material/Stack';
import { AppBar, Container, Toolbar, Typography, Card, CardContent } from '@mui/material';

const StoryForm = ({character, setCharacter, minutes, setMinutes, age, setAge, moral, setMoral, createStory}) => {
    return (
        <section class='story-form'>
            <Container maxWidth='sm'>
              <Stack spacing={5}>
                  <label htmlFor="character">Describe the main character:</label>
                  <TextField
                    value={character}
                    onChange={e => setCharacter(e.target.value)}
                    label="Character"
                    variant="outlined"
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
                  label="Moral of Story"
                  variant="outlined"
                  color="success"
                />
                  <Button variant="contained" onClick={createStory} color="success">Create a Story</Button>
                </Stack>
            </Container>
          </section>
    )
}

export default StoryForm;
