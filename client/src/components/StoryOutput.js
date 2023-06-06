import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

const StoryOutput = ({story, startNewStory}) => {
    return (
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
}

export default StoryOutput;
