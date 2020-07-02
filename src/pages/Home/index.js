import React, { useContext, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Grid, Typography, Container, Fade } from '@material-ui/core';
import LoginButton from './LoginButton';
import ListChip from './ListChip';
import FactionChip from './FactionChip';
import DataContext from 'context/DataContext';
import ErrorFallback from 'common/ErrorFallback';
import factions from 'constants/factions';
import ftLogoLight from 'assets/ftLogoLight.png';
import ftLogoDark from 'assets/ftLogoDark.png';
import lhqLogoLight from 'assets/lhqLogoLight.png';
import lhqLogoDark from 'assets/lhqLogoDark.png';

function Home() {
  const {
    auth,
    userId,
    userLists,
    userSettings,
    fetchUserLists,
    deleteUserList
  } = useContext(DataContext);
  const listChips = {};
  Object.keys(factions).forEach(faction => listChips[faction] = []);
  if (userLists) {
    userLists.forEach(userList => {
      if (userList.faction in listChips) {
        listChips[userList.faction].push(userList);
      }
    });
  }
  useEffect(() => {
    if (userId) fetchUserLists(userId);
  }, [userId]);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Fade in={true}>
        <Container>
          <Grid
            container
            spacing={1}
            direction="column"
            justify="center"
            alignItems="center"
            style={{ marginTop: 5 }}
          >
            <Grid item>
              <img
                alt="Fifth Trooper Logo"
                src={userSettings.themeColor === 'light' ? ftLogoLight : ftLogoDark}
                style={{ width: 150, height: 'auto' }}
              />
            </Grid>
            <Grid item>
              <img
                alt="Legion HQ Logo"
                src={userSettings.themeColor === 'light' ? lhqLogoLight : lhqLogoDark}
                style={{ width: 400, height: 'auto' }}
              />
            </Grid>
            <Grid item style={{ maxWidth: '75vw', textAlign: 'center' }}>
              <Typography variant="subtitle1">
                An unofficial list building tool and resource for Fantasy Flight Games: Star Wars: Legion.
              </Typography>
            </Grid>
            <Grid item>
              <div style={{ height: 10 }} />
            </Grid>
            {Object.keys(factions).map(faction => (
              <Grid
                key={faction}
                item
                container
                spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item key="factionChip">
                  <FactionChip faction={faction} />
                </Grid>
                {listChips[faction].map(userList => (
                  <Grid item key={userList.listId}>
                    <ListChip userList={userList} deleteUserList={deleteUserList} />
                  </Grid>
                ))}
              </Grid>
            ))}
            <Grid item>
              <div style={{ height: 10 }} />
            </Grid>
            <Grid item>
              <LoginButton auth={auth} />
            </Grid>
            <Grid item>
              <div style={{ height: 10 }} />
            </Grid>
            <Grid item>
              <iframe
                title="Legion Discord"
                frameBorder="0"
                allowtransparency="true"
                style={{ width: '100%', height: 400 }}
                src="https://discordapp.com/widget?id=349001242489520128&theme=dark&username="
              >
              </iframe>
            </Grid>
            <Grid item>
              <div style={{ height: 10 }} />
            </Grid>
          </Grid>
        </Container>
      </Fade>
    </ErrorBoundary>
  );
};

export default Home;
