import React, { useContext } from 'react';
import {
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fade
} from '@material-ui/core';
import DataContext from 'context/DataContext';
import settings from 'constants/settings';

function SettingDropdown({ id, name, value, options, handleClick }) {
  return (
    <FormControl>
      <InputLabel htmlFor={`${id}-selector`}>
        {name}
      </InputLabel>
      <Select
        id={id}
        value={value}
        onChange={handleClick}
        style={{ minWidth: 100 }}
      >
        {options.map(option => (
          <MenuItem key={option.key} value={option.key}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function Settings() {
  const { userSettings, setUserSettingsValue } = useContext(DataContext);
  return (
    <Fade in={true}>
      <Container>
        <Grid container spacing={4} direction="column" alignItems="center">
          <Grid item>
            <Typography variant="h5">
              Settings
            </Typography>
          </Grid>
          {settings.list.map(setting => (
            <Grid item key={setting.key}>
              <SettingDropdown
                id={setting.key}
                name={setting.name}
                value={userSettings[setting.key]}
                options={setting.values}
                handleClick={(event) => {
                  setUserSettingsValue(setting.key, event.target.value);
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Fade>
  );
};

export default Settings;
