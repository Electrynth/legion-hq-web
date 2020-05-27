import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Fade
} from '@material-ui/core';

function Privacy() {
  return (
    <Fade in={true}>
      <Container>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography variant="h5">
              Privacy
            </Typography>
          </Grid>
          <Grid item>

          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
};

export default Privacy;
