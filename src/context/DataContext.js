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
import urls from 'constants/urls';
import settings from 'constants/settings';
import { useAuth0 } from '@auth0/auth0-react';
import auth from 'constants/auth';
const { returnTo } = auth.prod;

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
  '/list/fringe': {
    name: 'Shadow Collective',
    path: '/list/fringe',
    icon: <FactionIcon faction="fringe" />
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
    "title": "Adepticon Reveals Added",
    "date": "28 March 2024",
    "body": "Added units reveals at Adepticon 2024."
  },
  {
    "title": "New Battle Forces & List Validation Returns",
    "date": "18 September 2023",
    "body": "Added the new Wookiee Defenders & Experimental Droids Battleforces from the Ministravaganza. Limited list validation has returned; it is a work in progress so it is NOT fully functional yet. Credit to John Lueck (Grabnar on the Legion Discord) for this new feature. Thanks John!"
  },
  {
    "title": "Geonosians and Inquisitors Added",
    "date": "17 September 2023",
    "body": "Added cards from Ministravaganza. New battle forces and improved card images will be implemented soon."
  },
  {
    "title": "Tempest Force Added",
    "date": "13 July 2023",
    "body": "Added the new empire battleforce."
  },
  {
    "title": "Bright Tree Village Added",
    "date": "6 June 2023",
    "body": "Added the new ewok battleforce."
  },
  {
    "title": "Summer Points Update",
    "date": "5 June 2023",
    "body": "Implemented summer points update. Click on the Using New Points button at the bottom of the list building screen to toggle between new and old points."
  },
  {
    "title": "Ewok Cards Added",
    "date": "25 May 2023",
    "body": "Added cards from AMG Scene to Stats article on Ewok Skirmishers and Slingers."
  },
  {
    "title": "Ewok Cards Added",
    "date": "18 May 2023",
    "body": "Added cards from AMG article."
  },
  {
    "title": "Ewok cards added",
    "date": "7 May 2023",
    "body": "Ewok Skirmishers and Chewbacca (AT-ST)."
  },
  {
    "title": "Ahsoka Command Cards Added",
    "date": "4 April 2023",
    "body": "Added cards revealed in Ahsoka article."
  },
  {
    "title": "Ahsoka and Wicket Added",
    "date": "27 March 2023",
    "body": "Added cards revealed at Adepticon."
  },
  {
    "title": "Imperial Remnant Added",
    "date": "22 February 2023",
    "body": "Implemented the Imperial Remnant Battleforce. Counting of ranks for units will never show red. This feature will be disabled until more work is done on it to prevent confusion."
  },
  {
    "title": "Dark Trooper Cards Added",
    "date": "10 January 2023",
    "body": "Added cards from the AMG preview on Imperial Dark Troopers."
  },
  {
    "title": "Moff Gideon",
    "date": "4 January 2023",
    "body": "Added cards from the AMG preview on Moff Gideon."
  },
  {
    "title": "Points Update!",
    "date": "8 December 2022",
    "body": "Version 2.5 points update is being used. Click on the Using New Points toggle button to switch between the current point change taking place 1-1-2023 and the previous points change."
  },
  {
    "title": "IG-11 & IG-88 Cards Added",
    "date": "20 September 2022",
    "body": "Added cards from the AMG preview on the IG-Series Assassin Droid."
  },
  {
    "title": "Din Djarin Cards Added",
    "date": "16 September 2022",
    "body": "The final revealed cards for The Mandalorian have been added."
  },
  {
    "title": "Rank Counting Improvements",
    "date": "9 August 2022",
    "body": "The way units of a given rank are counted have been improved to work better with battle forces. Additionally, a link to battle force rules has been added in the form of a button for convenience."
  },
  {
    "title": "Mini-extravaganza Cards Added",
    "date": "15 July 2022",
    "body": "Added various The Mandalorian themed cards from AMG event."
  },
  {
    "title": "Battle Forces Implemented",
    "date": "5 July 2022",
    "body": "Click on the faction icon button to select a battle force. More quality of life features related to battle forces soon to come."
  },
  {
    "title": "New Feature to View Old Cards",
    "date": "1 June 2022",
    "body": "Click on a unit's portrait or the 'Show More' button to view the old version of a card. As of now only the original bounty hunter cards use this feature."
  },
  {
    "title": "Bounty Hunters Updated",
    "date": "31 May 2022",
    "body": "Updated bounty hunters from an AMG preview."
  },
  {
    "title": "New Mercenary Cards Added",
    "date": "24 May 2022",
    "body": "Added Gar Saxon cards from an AMG preview."
  },
  {
    "title": "Added Kill Calculator Feature",
    "date": "18 May 2022",
    "body": "Added feature to quickly calculating points killed for end game ties."
  },
  {
    "title": "New Mercenary Cards Added",
    "date": "17 May 2022",
    "body": "Added Mandalorian Super Commando cards from an AMG preview."
  },
  {
    "title": "New Mercenary Cards Added",
    "date": "12 May 2022",
    "body": "Added cards from an AMG preview."
  },
  {
    "title": "New Cards Added",
    "date": "3 May 2022",
    "body": "Added Shadow Collective Maul and other cards"
  },
  {
    "title": "New Mercenary Cards Added",
    "date": "24 April 2022",
    "body": "Added Pyke and Black Sun cards, the special counting of ranks for mercenaries is not yet implemented."
  },
  {
    "title": "Points Adjustments",
    "date": "27 October 2021",
    "body": "Implemented 2021 points adjustments (effective 8 Nov 2021). Feature to toggle old point costs added. Contact if discrepancies are found."
  },
  {
    "title": "New Legion Guide",
    "date": "4 October 2021",
    "body": "Added a link to the Legion Quick Guide in the navigation menu. Check it out!"
  },
  {
    "title": "New Cards Added",
    "date": "11 September 2021",
    "body": "Added Slug Tank and Infantry Platform cards."
  },
  {
    "title": "New Cards Added",
    "date": "8 September 2021",
    "body": "Added more Dwarf Spider Droid cards."
  },
  {
    "title": "New Cards Added",
    "date": "1 September 2021",
    "body": "Added Gnasp Bombardier."
  },
  {
    "title": "New Cards Added",
    "date": "30 August 2021",
    "body": "Added Dwarf Spider Droid cards."
  },
  {
    "title": "New Cards Added",
    "date": "25 August 2021",
    "body": "Added Raddaugh Gnasp Fluttercraft cards."
  },
  {
    "title": "New Cards Added",
    "date": "20 August 2021",
    "body": "Added Super Tactical Droid command cards."
  },
  {
    "title": "New Cards Added",
    "date": "18 August 2021",
    "body": "Added MagnaGuard upgrade cards."
  },
  {
    "title": "Storm Tide Content",
    "date": "16 August 2021",
    "body": "Added ability to create lists for The Fifth Trooper's unofficial narrative campaign, Storm Tide."
  },
  {
    "title": "New Cards Added",
    "date": "11 August 2021",
    "body": "Added Super Tactical Droid units."
  },
  {
    "title": "New Cards Added",
    "date": "7 August 2021",
    "body": "Added IG-100 MagnaGuard unit."
  },
  {
    "title": "Temporary Outage",
    "date": "23 July 2021",
    "body": "Accounts are back online, however card images will be unavaible for a small amount of time. Sorry for the inconvenience."
  },
  {
    "title": "New Cards Added",
    "date": "8 July 2021",
    "body": "New wookiee command cards for GAR added."
  },
  {
    "title": "New Cards Added",
    "date": "5 July 2021",
    "body": "New Force and Training upgrade cards added."
  },
  {
    "title": "Chewbacca Added",
    "date": "2 July 2021",
    "body": "Chewbacca and command card added from AMG twitter post."
  },
  {
    "title": "Wookiee Long Gun Added",
    "date": "30 June 2021",
    "body": "Wookiee Long Gun upgrade added. Accounts are now available and URLs should be working as normal. We apologize for the inconvenience."
  },
  {
    "title": "Accounts Temporarily Unavailable",
    "date": "29 June 2021",
    "body": "Accounts unavailable for 12-24 hours"
  },
  {
    "title": "Yoda Command Cards Added",
    "date": "28 June 2021",
    "body": "New command cards added from AMG update"
  },
  {
    "title": "Wookiee Chieftain and Warriors added",
    "date": "25 June 2021",
    "body": "New unit cards added from AMG stream."
  },
  {
    "title": "Battle Shield Wookiee Added",
    "date": "4 May 2021",
    "body": "New upgrade card added from AMG stream."
  },
  {
    "title": "Final LAAT Upgrades",
    "date": "12 April 2021",
    "body": "Added last set of upgrade cards for LAAT expansion."
  },
  {
    "title": "Additional A-A5 Truck Upgrades",
    "date": "25 March 2021",
    "body": "Added cards from FFG A-A5 preview article."
  },
  {
    "title": "Heavy Vehicles & Yoda Update",
    "date": "20 March 2021",
    "body": "Cards from AMG livestream added"
  },
  {
    "title": "Lando & Kallus Update",
    "date": "19 February 2021",
    "body": "Lando and Kallus command cards and flaw card added."
  },
  {
    "title": "Specialists Personnel Expansions",
    "date": "6 January 2021",
    "body": "Content from Separatists and Republic Specialists Personnel Expansions added."
  },
  {
    "title": "Lando & Agent Kallus",
    "date": "15 December 2020",
    "body": "Lando Calrissian, Agent Kallus cards added. Contingency mechanic added, but may be buggy."
  },
  {
    "title": "Rules Reference 2020 Update",
    "date": "19 November 2020",
    "body": "Changes can be accessed by hitting the Show More button and expanding History."
  },
  {
    "title": "Added Maul Expansion",
    "date": "27 October 2020",
    "body": "Contents from Maul preview article added."
  },
  {
    "title": "Add Anakin Skywalker expansion",
    "date": "21 October 2020",
    "body": "New mechanics \"Tempted\" and \"Flaw\" completed."
  },
  {
    "title": "Added Anakin Skywalker expansion",
    "date": "20 October 2020",
    "body": "New mechanic \"Tempted\" added. \"Flawed\" card mechanic will be added later today or tomorrow."
  },
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
  const [isAlertAllowed, setIsAlertAllowed] = useState(true);
  const [error, setError] = useState();
  const [userId, setUserId] = useState();
  const [message, setMessage] = useState();
  const [userLists, setUserLists] = useState([]);
  const [userSettings, setUserSettings] = useState(initializeLocalSettings());

  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  let isLoginDisabled = true;
  let loginTooltipText = '';
  let loginButtonText = 'Loading...';
  let loginHandler;

  if (!isAuthenticated) {
    isLoginDisabled = false;
    loginButtonText = 'Login';
    loginTooltipText = 'Login via Google, Facebook, or use a custom account.';
    loginHandler = () => loginWithRedirect();
  } else {
    isLoginDisabled = false;
    loginButtonText = 'Logout';
    loginTooltipText = `Logged in as ${user.email}`;
    loginHandler = () => logout({ returnTo });
  }

  useEffect(() => {
    if (user && user.email && isAuthenticated && !userId) {
      fetchUserId(user.email);
    }
  }, [isAuthenticated, user, userId]);

  useEffect(() => {
    if (userId) fetchUserLists(userId);
  }, [userId]);

  useEffect(() => {
    let numFetches = 0;
    const intervalId = setInterval(() => {
      if (userId && numFetches < 5) {
        numFetches++;
        fetchUserLists(userId);
      } else if (user && isAuthenticated && !userId) {
        fetchUserId(user.email ? user.email : 'Undefined email');
      }
    }, 15000);
    return () => clearInterval(intervalId);
  }, [userId, user, isAuthenticated]);

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
          console.log(e);
          setError(e);
          setMessage(`Can't find user with email address ${email}. Server likely down.`);
          setIsAlertOpen(true);
        });
    }
  }
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    setIsAlertAllowed(false);
  }

  // if (error) return <ErrorFallback error={error} message={message} />;

  return (
    <React.Fragment>
      <DataContext.Provider
        value={{
          isDrawerOpen,
          newsPosts,
          userId,
          routes,
          userLists,
          userSettings,
          goToPage,
          fetchUserLists,
          setUserLists,
          setUserSettingsValue,
          setIsDrawerOpen,
          deleteUserList,
          isLoginDisabled,
          loginTooltipText,
          loginButtonText,
          loginHandler
        }}
      >
        {children}
      </DataContext.Provider>
      <Snackbar open={isAlertOpen && isAlertAllowed} autoHideDuration={null} onClose={handleCloseAlert}>
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
