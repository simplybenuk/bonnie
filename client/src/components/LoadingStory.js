import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

const LoadingStory = () => {
    return (
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
    )
}

export default LoadingStory;
