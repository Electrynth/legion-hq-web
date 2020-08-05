import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  ViewModule as CardsIcon,
  Announcement as NewsIcon,
  Casino as DiceIcon
} from '@material-ui/icons';
import { Snackbar } from '@material-ui/core';
import { AlertTitle, Alert } from '@material-ui/lab';
// import ErrorFallback from 'common/ErrorFallback';
import FactionIcon from 'common/FactionIcon';
import auth0Client from 'utility/Auth';
import urls from 'constants/urls';
import settings from 'constants/settings';

const DataContext = createContext();
const httpClient = Axios.create();
httpClient.defaults.timeout = 10000;

const fontSize = 26;

const routes = {
  '/': {
    name: 'Home',
    path: '/',
    icon: <HomeIcon style={{ fontSize }} />
  },
  '/news': {
    name: 'News',
    path: '/news',
    icon: <NewsIcon style={{ fontSize }} />
  },
  '/cards': {
    name: 'Cards',
    path: '/cards',
    icon: <CardsIcon style={{ fontSize }} />
  },
  '/roller': {
    name: 'Dice Roller',
    path: '/roller',
    icon: <DiceIcon style={{ fontSize }} />
  },
  '/list/rebels': {
    name: 'Rebels',
    path: '/list/rebels',
    icon: <FactionIcon faction="rebels" />
  },
  '/list/empire': {
    name: 'Empire',
    path: '/list/empire',
    icon: <FactionIcon faction="empire" />
  },
  '/list/republic': {
    name: 'Republic',
    path: '/list/republic',
    icon: <FactionIcon faction="republic" />
  },
  '/list/separatists': {
    name: 'Separatists',
    path: '/list/separatists',
    icon: <FactionIcon faction="separatists" />
  },
  '/settings': {
    name: 'Settings',
    path: '/settings',
    icon: <SettingsIcon style={{ fontSize }} />
  },
  '/info': {
    name: 'Info',
    path: '/info',
    icon: <InfoIcon style={{ fontSize }} />
  }
};

const newsPosts = [
  {
    "title": "Add Inferno Squad expansion",
    "date": "5 August 2020",
    "body": "Added Imp Special Forces cards."
  },
  {
    "title": "Added cards from GenCon",
    "date": "1 August 2020",
    "body": "Anakin and Maul have not been revealed, but their command cards are viewable in the Cards page. The other upgrade cards and command cards from the GenCon stream and article are available."
  },
  {
    "title": "Added Mandalorian Resistance expansion",
    "date": "27 July 2020",
    "body": "Will add the Equip keyword functionality at a later date."
  },
  {
    "title": "Move to The Fifth Trooper subdomain",
    "date": "30 June 2020",
    "body": "Completed move to legionhq.thefifthtrooper.com. Dash was removed from name."
  },
  {
    "title": "List Templates are here",
    "date": "17 June 2020",
    "body": "When building a list you can now use a previously saved list as a template."
  },
  {
    "title": "Situational Awareness and Ascension Cable upgrades added.",
    "date": "16 June 2020",
    "body": "Also added special interaction between Sit. Awareness and unit with a Support rank."
  },
  {
    "title": "Randomly decided to add a dice roller",
    "date": "2 June 2020",
    "body": "Still needs a lot of work but the basics are there. Currently only does attack dice and doesn't count up results."
  },
  {
    "title": "Save + Fork button completed",
    "date": "28 May 2020",
    "body": "If logged in, lists can be created, updated, or forked."
  },
  {
    "title": "URL Export completed",
    "date": "27 May 2020",
    "body": "URL export is complete-ish but requires more testing with loadout+counterpart and upgrades that add a slot."
  },
  {
    "title": "Login enabled and Discord integration",
    "date": "25 May 2020",
    "body": "Lists from the Heroku app can now be accessed. Small Discord widget that has invite to Legion Discord added."
  },
  {
    "title": "Link posted on Heroku app",
    "date": "24 May 2020",
    "body": "The goal is to get more people to start testing the main new stuff like Counterparts and Loadout."
  }
];

function initializeLocalSettings() {
  if (typeof(Storage) !== 'undefined') {
    const localSettings = JSON.parse(window.localStorage.getItem('settings'));
    return {
      ...settings.default,
      ...localSettings
    };
  }
  return settings.default;
}

export function DataProvider({ children }) {
  const history = useHistory();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [auth, setAuth] = useState();
  const [error, setError] = useState();
  const [userId, setUserId] = useState();
  const [message, setMessage] = useState();
  const [userLists, setUserLists] = useState([]);
  const [userSettings, setUserSettings] = useState(initializeLocalSettings());

  useEffect(() => {
    const asyncSilentAuth = async () => {
      try {
        await auth0Client.silentAuth();
        setAuth(auth0Client);
      } catch {
        setAuth(auth0Client);
      }
    }
    asyncSilentAuth();
  }, []);

  useEffect(() => {
    if (auth && auth.isAuthenticated() && !userId) {
      fetchUserId(auth.getEmail());
    }
  }, [auth]);

  useEffect(() => {
    if (userId) fetchUserLists(userId);
  }, [userId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (userId) {
        console.log(`Fetching lists for userId: ${userId}`);
        fetchUserLists(userId);
      } else if (auth && auth.isAuthenticated() && !userId) {
        console.log(`Logging in user with email: ${auth.getEmail()}`);
        fetchUserId(auth.getEmail());
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [userId, auth]);

  const setUserSettingsValue = (key, value) => {
    if (typeof(Storage) !== 'undefined') {
      const newSettings = {
        ...userSettings,
        [key]: value
      };
      window.localStorage.setItem('settings', JSON.stringify(newSettings));
      setUserSettings(newSettings)
    }
  }
  const goToPage = (newRoute) => history.push(newRoute);
  const fetchUserLists = (userId) => {
    if (userId) {
      httpClient.get(`${urls.api}/lists?userId=${userId}`)
        .then(response => {
          setUserLists(response.data);
        }).catch(e => {
          setError(e);
          setMessage(`Failed to fetch lists for user ${userId}.`);
          setIsAlertOpen(true);
        });
    } else setUserLists([]);
  }
  const deleteUserList = (listId) => {
    if (listId) {
      httpClient.delete(`${urls.api}/lists/${listId}`)
        .then(response => fetchUserLists(userId))
        .catch(e => {
          setError(e);
          setMessage(`Failed to delete list ${listId} for user ${userId}.`);
          setIsAlertOpen(true);
        });
    }
  }
  const fetchUserId = (email) => {
    if (email) {
      httpClient.get(`${urls.api}/users?email=${email}`)
        .then(response => {
          if (response.data.length > 0) {
            setUserId(response.data[0].userId);
          } else {
            httpClient.post(`${urls.api}/users`, { email })
            .then(creationResponse => {
              if (creationResponse.data.length > 0){
                setUserId(response.data[0].userId)
              } else {
                setError('Login failure');
                setMessage(`Tried and failed to create account with email address ${email}.`);
                setIsAlertOpen(true);
              }
            })
            .catch(e => {
              setError('Login failure');
              setMessage(`Failed to create account with email address ${email}.`);
              setIsAlertOpen(true);
            });
          }
        })
        .catch(e => {
          setError(e);
          setMessage(`Failed to find user with email address ${email}.`);
          setIsAlertOpen(true);
        });
    }
  }
  const handleCloseAlert = () => setIsAlertOpen(false);

  // if (error) return <ErrorFallback error={error} message={message} />;
  return (
    <React.Fragment>
      <DataContext.Provider
        value={{
          isDrawerOpen,
          newsPosts,
          auth,
          userId,
          routes,
          userLists,
          userSettings,
          goToPage,
          fetchUserLists,
          setUserLists,
          setUserSettingsValue,
          setIsDrawerOpen,
          deleteUserList
        }}
      >
        {children}
      </DataContext.Provider>
      <Snackbar open={isAlertOpen} autoHideDuration={null} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error">
          <AlertTitle>
            Something went wrong!
          </AlertTitle>
          <strong>
            {error && error.toString()}
          </strong>
          <br />
          {message}
          <br />
          Issues can be emailed to <a href="mailto:contact@legion-hq.com">contact@legion-hq.com</a>.
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default DataContext;
