import React, { useContext } from 'react';
import {
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Clear as ClearIcon, Info as InfoIcon, Warning as WarningIcon } from '@material-ui/icons';
import ListContext from 'context/ListContext';
import legionModes from 'constants/legionModes';
import battleForcesDict from 'constants/battleForcesDict';
import ModeButton from './ModeButton';
import TitleField from './TitleField';
import KillPointsField from './KillPointsField';
import FactionButton from './FactionButton';

import cards from 'constants/cards';


const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  battleForceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: { marginRight: 6 },
  valError: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'start'
  },
});

function ListHeader() {
  const {
    currentList,
    handleSetBattleForce,
    currentKillPoints,
    isKillPointMode,
    handleChangeTitle,
    handleChangeMode
  } = useContext(ListContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isBattleForceDialogOpen, setIsBattleForceDialogOpen] = React.useState(false);
  const [isValidationDialogOpen, setValidationDialogOpen ] = React.useState(false);
  const handleFactionMenuOpen = event => setAnchorEl(event.currentTarget);
  const handleFactionMenuClose = () => setAnchorEl(null);
  const handleOpenBFDialog = () => setIsBattleForceDialogOpen(true);
  const handleCloseBFDialog = () => setIsBattleForceDialogOpen(false);
  const numActivations = currentList.units.reduce((num, unit) => {
    num += unit.count;
    return num;
  }, 0);


  const validBattleForces = []; 


  Object.keys(battleForcesDict).forEach(bf=>{
    if(battleForcesDict[bf].faction == currentList.faction){
      validBattleForces.push(battleForcesDict[bf]);
    }
  });

  var validationIssues =[];

  const battleForce = currentList.battleForce;

  var ranks = { commander:0, operative:0, corps:0, special:0, heavy:0, support:0 }
  var mercs = { commander:0, operative:0, corps:0, special:0, heavy:0, support:0 }

  // TODO brighttree
  // TODO this is ugly (but works for now)
  const isSC = battleForce == "Shadow Collective"


  // TODO BF rules should go in an obj or other handler
  if(battleForce == "Blizzard Force"){
    var stormsCount = 0;
    currentList.units.forEach((unit)=>{

      if(unit.unitId == "ay" || unit.unitId == "sr"){
        stormsCount += unit.count;
      }
    });
    
    if(stormsCount > 2){
      validationIssues.push({level:2, text:"Maximum 2 Stormtroopers (Regular or HRU in any combo)"});
    }
  }

  // Check for Allies of Convenience via keyword or Underworld Connections
  var hasAoc = false;
  var aocRanks = []; // could toggle the aoc flag itself, this feels nicer
  currentList.units.forEach((unit)=>{
    const card = cards[unit.unitId]
    ranks[card.rank]+=unit.count;

    if(card.faction == 'fringe' && !isSC){
      mercs[card.rank]+=unit.count;
    }

    // Check for upgrades which impact rank limits, i.e. Allies of Convenience
    // Eventually, Entourage will probably go in this loop
    if(!hasAoc)
    {
      if(card.keywords.find(k => k == "Allies of Convenience")){
        hasAoc = true;
      }
      else if(unit.upgradesEquipped.find(c => c != null && c == 'rf')){ // find Underworld Connections
        hasAoc = true;
      }
    }
  });

  var rankReqs;
  // TODO need more definitive handling for the other modes...
  if(battleForce){
    if(battleForcesDict[battleForce][currentList.mode])
      rankReqs = battleForcesDict[battleForce][currentList.mode];
    else{
      validationIssues.push({level:2, text:"Playing a battleforce in a mode with no defined army construction rules (Defaulting to 800pt)"});
      rankReqs = battleForcesDict[battleForce]['standard mode'];
    }
  } else{
    rankReqs = legionModes[currentList.mode].unitCounts;
  }

  // Flag for a bf's combined comm/op limits, only when comm/op individually isn't being overrun
  if(rankReqs.commOp && (ranks.commander + ranks.commander) > rankReqs.commOp
    && !(ranks.commander > rankReqs.commander || ranks.operative > rankReqs.operative)){
    validationIssues.push({level:2, text:"Limit of " + rankReqs.commOp + " total COMMMANDERS and OPERATIVES"});
  }

  Object.keys(ranks).forEach(t =>{
    const range = rankReqs[t];

    // mercs don't count for minimum; for applicable battleforces, just don't count them as mercs
    if((ranks[t] - mercs[t]) < range[0]){
      validationIssues.push({level:2, text:"Not enough " + t.toUpperCase() + " units! (minimum " + range[0] + ")"});
    }
    
    if(ranks[t] > range[1]){
      validationIssues.push({level:2, text:"Too many " + t.toUpperCase() + " units! (maximum " + range[1] + ")"});
    }
    
    // TODO Entourage
    
    if(mercs[t] > 1){
      if(!hasAoc || mercs[t] > 2){
        validationIssues.push({level:2, text:"Too many MERCENARY " + t.toUpperCase() + " units! (maximum " + (hasAoc ? 2:1) + ")"});
      } 
      aocRanks.push(t);
    }
  });

  if(aocRanks.length > 1){
    validationIssues.push({level:2, text:"Allies of Convenience only allows ONE additional merc of any rank (" + aocRanks.join(", ")+ ")"});
  }

  var minValidationError = validationIssues.reduce((highest, e)=>{
    return e.level > highest ? e.level : highest;
  }, 0)

  


  return (
    <div id="list-header" className={classes.columnContainer}>
      <div className={classes.container}>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleFactionMenuClose}
        >
          {currentList.faction !== 'fringe' && (
            <MenuItem
              key="none"
              selected={!currentList.battleForce || currentList.battleForce === ''}
              onClick={() => {
                handleSetBattleForce('');
                handleFactionMenuClose();
              }}
            >
              No Battle Force
            </MenuItem>
          )}
          {validBattleForces.map(battleForce => {
            return (
              <MenuItem
                key={battleForce.name}
                selected={currentList.battleForce === battleForce.name}
                onClick={() => {
                  handleSetBattleForce(battleForce.name);
                  handleFactionMenuClose();
                }}
              >
                {battleForce.name}
              </MenuItem>
            );
          })}
        </Menu>
        <div className={classes.item}>
          <FactionButton
            faction={currentList.faction}
            handleFactionMenuOpen={handleFactionMenuOpen}
            handleFactionMenuClose={handleFactionMenuClose}
          />
        </div>
        <div className={classes.item}>
          <TitleField
            activations={numActivations}
            title={currentList.title}
            handleChange={e => {
              e.persist();
              handleChangeTitle(e.target.value);
            }}
          />
        </div>
        <div className={classes.item}>
          <ModeButton
            currentMode={currentList.mode}
            points={currentList.pointTotal}
            maxPoints={legionModes[currentList.mode].maxPoints}
            handleChangeMode={handleChangeMode}
          />
        </div>
        { validationIssues.length > 0 &&
          <div className={classes.battleForceContainer}>

            <IconButton onClick={()=>setValidationDialogOpen(true)}>
              <WarningIcon style={{color: minValidationError < 2 ? 'yellow':'red'}}/>
            </IconButton> 

            <Dialog open={isValidationDialogOpen} onClose={() => setValidationDialogOpen(false)}>
              <DialogTitle>List Errors*</DialogTitle>
              <DialogContent>*Validation does currently not catch all edge cases or rank modifications. (e.g. Allies of Convenience, Entourage, Maul's Darksaber, etc)</DialogContent>
              <DialogContent>
                {validationIssues.map((el, i) =>
                <div key={i} className={classes.valError}>
                  <WarningIcon className={classes.item} style={{color: el.level == 1 ?'yellow':'red'}}/>
                  <DialogContentText>{el.text}</DialogContentText>
                </div>
                )}
                <br/>
                <DialogContentText>
                  All Star Wars: Legion documents are located on the Atomic Mass Games{' '}
                  <a style={{ textDecoration: 'none' }} href="https://atomicmassgames.com/star-wars-legion-documents" target="_blank" rel="noreferrer noopener">website</a>.
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
        }
        {isKillPointMode && (
          <div className={classes.item}>
            <KillPointsField
              killPoints={currentKillPoints}
            />
          </div>
        )}

      </div>
      {currentList.battleForce && (
        <div className={classes.battleForceContainer}>
          <Button
            endIcon={<InfoIcon />}
            variant="outlined"
            size="small"
            onClick={handleOpenBFDialog}
          >
            {currentList.battleForce}
          </Button>
          <Dialog open={isBattleForceDialogOpen} onClose={handleCloseBFDialog}>
            <DialogTitle>{currentList.battleForce} List Requirements</DialogTitle>
            <DialogContent>
              <DialogContentText>
                The list building rules for the {currentList.battleForce} battleforce is <a style={{ textDecoration: 'none' }} href={battleForcesDict[currentList.battleForce].ruleUrl} target="_blank" rel="noreferrer noopener">here</a>.
              </DialogContentText>
              <br/>
              <DialogContentText>
                All Star Wars: Legion documents are located on the Atomic Mass Games{' '}
                <a style={{ textDecoration: 'none' }} href="https://atomicmassgames.com/star-wars-legion-documents" target="_blank" rel="noreferrer noopener">website</a>.
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
      )}
      
    </div>
  );
};

export default ListHeader;
