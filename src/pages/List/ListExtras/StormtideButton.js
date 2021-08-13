import React, { useState, useContext } from 'react';
import { Chip, Menu, MenuItem } from '@material-ui/core';
import DataContext from 'context/DataContext';
import ListContext from 'context/ListContext';

export default function StormtideButton() {
    const { currentList } = useContext(ListContext);
    const [anchorEl, setAnchorEl] = useState();

    const handleOpenMenu = event => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl();

    return (
        <React.Fragment>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem>
                    Legion
                </MenuItem>
                <MenuItem>
                    Storm Tide: Special Forces Division
                </MenuItem>
                <MenuItem>
                    Storm Tide: Armored Division
                </MenuItem>
                <MenuItem>
                    Storm Tide: Infantry Division
                </MenuItem>
            </Menu>
            <Chip
                clickable
                variant="outlined"
                label={`Game: Legion`}
                onClick={handleOpenMenu}
                style={{ marginRight: 4, marginBottom: 4 }}
            />
        </React.Fragment>
    );
}