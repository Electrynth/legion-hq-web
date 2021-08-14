import React, { useState, useContext } from 'react';
import { Chip, Menu, MenuItem } from '@material-ui/core';
import DataContext from 'context/DataContext';
import ListContext from 'context/ListContext';

export default function GameChangeButton() {
    const { currentList, handleSetGame } = useContext(ListContext);
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
                <MenuItem
                  onClick={() => {
                    handleSetGame('legion');
                    handleCloseMenu();
                  }}
                >
                    Legion
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleSetGame('Storm Tide: Special Forces Division');
                    handleCloseMenu();
                  }}
                >
                    Storm Tide: Special Forces Division
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleSetGame('Storm Tide: Armored Division');
                    handleCloseMenu();
                  }}
                >
                    Storm Tide: Armored Division
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleSetGame('Storm Tide: Infantry Division');
                    handleCloseMenu();
                  }}
                >
                    Storm Tide: Infantry Division
                </MenuItem>
            </Menu>
            <Chip
                clickable
                variant="outlined"
                label={currentList.game === 'legion' ? 'Game: Legion' : currentList.game}
                onClick={handleOpenMenu}
                style={{ marginRight: 4, marginBottom: 4 }}
            />
        </React.Fragment>
    );
}
