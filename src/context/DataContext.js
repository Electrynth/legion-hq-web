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
import ErrorFallback from 'common/ErrorFallback';
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
          setMessage(`Failed to fetch lists for user ${userId}`);
        });
    } else setUserLists([]);
  }
  const deleteUserList = (listId) => {
    if (listId) {
      httpClient.delete(`${urls.api}/lists/${listId}`)
        .then(response => fetchUserLists(userId))
        .catch(e => {
          setError(e);
          setMessage(`Failed to delete list ${listId} for user ${userId}`);
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
                setMessage(`Tried and failed to create account with email address ${email}`);
              }
            })
            .catch(e => {
              setError('Login failure');
              setMessage(`Failed to create account with email address ${email}`);
            });
          }
        })
        .catch(e => {
          setError(e);
          setMessage(`Failed to find user with email address ${email}`);
        });
    }
  }
  if (error) return <ErrorFallback error={error} message={message} />;
  return (
    <DataContext.Provider
      value={{
        isDrawerOpen,
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
  );
};

export default DataContext;
