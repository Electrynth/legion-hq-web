import React from 'react';
import { Popover, Chip, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import factions from 'constants/factions';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    background: '#1F2125'
  }
}));

function ListChipDropdown({ chips, faction }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => setAnchorEl(null);
  const handleClick = event => setAnchorEl(event.currentTarget);

  const factionTheme = createMuiTheme({
    palette: {
      primary: { main: factions[faction].primaryColor },
      secondary: { main: factions[faction].secondaryColor }
    }
  });

  return (
    <ThemeProvider theme={factionTheme}>
      <Chip
        clickable
        color="primary"
        style={{ margin: '0 5 5 0' }}
        label={
          <Typography variant="subtitle1">
            {`${chips.length} lists`}
          </Typography>
        }
        onClick={handleClick}
      />
      <Popover
        id={`${faction} list menu`}
        classes={classes}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {chips.map((chip, i) => (
          <div key={`${faction}_list_${i}`} style={{ margin: 6 }}>
            {chip}
          </div>
        ))}
      </Popover>
    </ThemeProvider>
  );
};

export default ListChipDropdown;
