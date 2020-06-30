import React, { useState, useEffect, useContext, createContext } from 'react';
import Axios from 'axios';
import DataContext from 'context/DataContext';
import ErrorFallback from 'common/ErrorFallback';
import LoadingWidget from 'common/LoadingWidget';
import factions from 'constants/factions';
import cards from 'constants/cards';
import urls from 'constants/urls';
import {
  mergeLists,
  convertHashToList,
  toggleListMode,
  changeListTitle,
  addUnit,
  addCommand,
  removeCommand,
  addCounterpart,
  removeCounterpart,
  addBattle,
  removeBattle,
  incrementUnit,
  decrementUnit,
  equipUpgrade,
  unequipUpgrade,
  getEligibleCommandsToAdd,
  getEligibleUnitsToAdd,
  getEquippableUpgrades,
  getEquippableLoadoutUpgrades,
  getEligibleBattlesToAdd
} from 'constants/listOperations';
import listTemplate from 'constants/listTemplate';

const ListContext = createContext();
const httpClient = Axios.create();
httpClient.defaults.timeout = 10000;

function isValidListId(listId) {
  return Number.parseInt(listId) > 999 && Number.parseInt(listId) < 999999;
}

export function ListProvider({
  width, children, slug, listHash, storedLists, updateStoredList
}) {
  const { userId, userSettings, goToPage } = useContext(DataContext);
  const [stackSize, setStackSize] = useState(1);
  const [isApplyToAll, setIsApplyToAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [listSaveMessage, setListSaveMessage] = useState();
  const [currentList, setCurrentList] = useState();
  const [leftPaneWidth, setLeftPaneWidth] = useState(0);
  const [rightPaneWidth, setRightPaneWidth] = useState(0);
  const [modalContent, setModalContent] = useState();
  const [cardPaneFilter, setCardPaneFilter] = useState({ action: 'DISPLAY' });

  useEffect(() => {
    // route '/list/rebels' fetches the rebel list from storage
    if (slug in factions) {
      if (listHash) {
        const convertedList = convertHashToList(slug, listHash);
        if (convertedList) setCurrentList({ ...convertedList });
        else setCurrentList(JSON.parse(JSON.stringify(storedLists[slug])));
      } else setCurrentList(JSON.parse(JSON.stringify(storedLists[slug])));
    }
    // route '/list/1234' fetches list 1234 from database
    else if (slug !== '' && isValidListId(slug)) {
      setStatus('loading');
      httpClient.get(`${urls.api}/lists/${slug}`)
        .then(response => {
          if (response.data.length > 0) {
            let loadedList = response.data[0];
            let oldCounterparts = ['lw', 'ji', 'jj'];
            loadedList.units = loadedList.units.filter(unit => {
              return !oldCounterparts.includes(unit.unitId)
            });
            loadedList.uniques = loadedList.uniques.filter(id => {
              return !oldCounterparts.includes(id);
            });
            setCurrentList(loadedList);
          } else setError(`List ${slug} not found.`);
          setStatus('idle');
        })
        .catch(err => {
          setMessage(`Failed to fetch list (id=${slug})`);
          setError(err);
          setStatus('idle');
        });
    }
  }, [slug]);
  useEffect(() => {
    // Save list before unmount
    return () => { if (currentList) updateStoredList(currentList); }
  }, [currentList]);
  useEffect(() => {
    if (width === 'xs' || width === 'sm') {
      setLeftPaneWidth(12);
      setRightPaneWidth(0);
    } else {
      setLeftPaneWidth(6);
      setRightPaneWidth(6);
    }
  }, [width]);
  useEffect(() => {
    if (width === 'xs' || width === 'sm') {
      if (cardPaneFilter.action === 'DISPLAY') {
        setLeftPaneWidth(12);
        setRightPaneWidth(0);
      } else {
        setLeftPaneWidth(0);
        setRightPaneWidth(12);
      }
    }
    setStackSize(1);
  }, [width, cardPaneFilter]);
  const reorderUnits = (startIndex, endIndex) => {
    function reorder(arr) {
      const result = Array.from(arr);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    }
    currentList.units = reorder(
      currentList.units, startIndex, endIndex
    );
    currentList.unitObjectStrings = reorder(
      currentList.unitObjectStrings, startIndex, endIndex
    );
    setCurrentList({ ...currentList });
  }
  const handleIncrementStackSize = () => {
    if (stackSize < 12) { setStackSize(stackSize + 1); }
  }
  const handleDecrementStackSize = () => {
    if (stackSize > 1) { setStackSize(stackSize - 1); }
  }
  const handleToggleIsApplyToAll = () => setIsApplyToAll(!isApplyToAll);
  const handleClearList = () => {
    setCardPaneFilter({ action: 'DISPLAY' });
    const newList = JSON.parse(JSON.stringify(listTemplate));
    setCurrentList({ ...newList, faction: currentList.faction });
  }
  const handleChangeTitle = title => setCurrentList({ ...changeListTitle(currentList, title) });
  const handleChangeMode = () => setCurrentList({ ...toggleListMode(currentList) });
  const handleEquipUpgrade = (action, unitIndex, upgradeIndex, upgradeId, isApplyToAll) => {
    const unit = currentList.units[unitIndex];
    let applyFilter; let nextAvailIndex; let nextAvailType;
    if (isApplyToAll || unit.count === 1) {
      let i = (upgradeIndex + 1) % unit.upgradesEquipped.length;
      let numUpgradesEquipped = 0;
      // console.log(i, unit.upgradesEquipped.length);
      while (
        !nextAvailIndex &&
        !nextAvailType &&
        numUpgradesEquipped < unit.upgradesEquipped.length
      ) {
        const id = unit.upgradesEquipped[i];
        const unitCard = cards[unit.unitId];
        if (id) {
          numUpgradesEquipped++;
          continue;
        };
        nextAvailIndex = i;
        nextAvailType = unitCard.upgradeBar[i] ?
                        unitCard.upgradeBar[i] :
                        unit.additionalUpgradeSlots[i - (unitCard.upgradeBar.length + 1)];
        i = (i + 1) % unit.upgradesEquipped.length;
      }
      if (nextAvailIndex !== undefined && nextAvailType) {
        applyFilter = (newUpgradesEquipped, newAdditionalUpgradeSlots) => setCardPaneFilter({
          action: 'UNIT_UPGRADE',
          unitIndex,
          upgradeIndex: nextAvailIndex,
          upgradeType: nextAvailType,
          hasUniques: unit.hasUniques,
          unitId: unit.unitId,
          upgradesEquipped: newUpgradesEquipped,
          additionalUpgradeSlots: newAdditionalUpgradeSlots
        });
      }
    }
    // else applyFilter = () => setCardPaneFilter({ action: 'DISPLAY' })
    const newList = equipUpgrade(
      currentList, action, unitIndex, upgradeIndex, upgradeId, isApplyToAll
    );
    if (applyFilter && newList.units[unitIndex]) {
      const newUnit = newList.units[unitIndex];
      applyFilter(newUnit.upgradesEquipped, newUnit.additionalUpgradeSlots);
    } else setCardPaneFilter({ action: 'DISPLAY' });
    setCurrentList({ ...newList });
  };
  const handleUnequipUpgrade = (action, unitIndex, upgradeIndex) => {
    setCardPaneFilter({ action: 'DISPLAY' });
    const newList = unequipUpgrade(
      currentList, action, unitIndex, upgradeIndex
    );
    setCurrentList({ ...newList });
  }
  const handleAddUnit = (unitId) => {
    if (width === 'xs' || width === 'sm') {
      setCardPaneFilter({ action: 'DISPLAY' });
    }
    setStackSize(1);
    const newList = addUnit(currentList, unitId, stackSize);
    setCurrentList({ ...newList });
  }
  const handleAddCommand = (commandId) => {
    const newList = addCommand(currentList, commandId);
    setCurrentList({ ...newList });
  }
  const handleRemoveCommand = (commandIndex) => {
    const newList = removeCommand(currentList, commandIndex);
    setCurrentList({ ...newList });
  }
  const handleAddBattle = (type, battleId) => {
    const newList = addBattle(currentList, type, battleId);
    setCurrentList({ ...newList });
  }
  const handleRemoveBattle = (type, battleId) => {
    const newList = removeBattle(currentList, type, battleId);
    setCurrentList({ ...newList });
  }
  const handleAddCounterpart = (unitIndex, counterpartId) => {
    setCardPaneFilter({ action: 'DISPLAY' });
    const newList = addCounterpart(currentList, unitIndex, counterpartId);
    setCurrentList({ ...newList });
  }
  const handleRemoveCounterpart = (unitIndex) => {
    setCardPaneFilter({ action: 'DISPLAY' });
    const newList = removeCounterpart(currentList, unitIndex);
    setCurrentList({ ...newList });
  }
  const handleIncrementUnit = (index) => {
    const newList = incrementUnit(currentList, index);
    setCurrentList({ ...newList });
  }
  const handleDecrementUnit = (index) => {
    if (cardPaneFilter.action.includes('UPGRADE')) {
      setCardPaneFilter({ action: 'DISPLAY' });
    }
    const newList = decrementUnit(currentList, index);
    setCurrentList({ ...newList });
  }
  const handleMergeList = (listToMerge) => {
    const newList = mergeLists(currentList, listToMerge);
    setCurrentList({ ...newList });
  }
  const handleOpenModal = () => {
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent();
  }
  const handleCardZoom = (cardId) => {
    setModalContent(cardId);
    setIsModalOpen(true);
  }
  const handleListSave = (list) => {
    if (!userId) return;
    const { _id, listId, ...rest } = list;
    if (listId) {
      Axios.put(`${urls.api}/lists/${listId}`, currentList).then(response => {
        const newList = response.data;
        setCurrentList(newList);
        setListSaveMessage('List Updated!');
      }).catch(e => {
        setError(e);
        setMessage(`Failed to update list ${listId}`);
      });
    } else {
      Axios.post(`${urls.api}/lists`, { ...rest, userId }).then(response => {
        const { listId } = response.data;
        setCurrentList({ ...currentList, listId });
        setListSaveMessage('List Created!')
      }).catch(e => {
        setError(e);
        setMessage(`Failed to create list for user ${userId}`);
      });
    }
  }
  const handleListFork = (list) => {
    if (!userId) return;
    const { _id, listId, ...rest } = list;
    if (!listId) return;
    const forkedList = { ...rest, title: list.title + ' fork' };
    Axios.post(`${urls.api}/lists`, { ...forkedList, userId }).then(response => {
      const newList = response.data;
      goToPage(`/list/${newList.listId}`);
    }).catch(e => {
      setError(e);
      setMessage(`Failed to fork list ${listId} for user ${userId}`);
    });
  }
  const unitProps = {
    getEligibleUnitsToAdd,
    getEquippableUpgrades,
    getEquippableLoadoutUpgrades,
    handleAddUnit,
    handleAddCounterpart,
    handleRemoveCounterpart,
    handleEquipUpgrade,
    handleUnequipUpgrade,
    handleIncrementUnit,
    handleDecrementUnit
  };
  const battleProps = {
    getEligibleBattlesToAdd,
    handleAddBattle,
    handleRemoveBattle
  }
  const commandProps = {
    getEligibleCommandsToAdd,
    handleAddCommand,
    handleRemoveCommand
  };
  const listProps = {
    currentList,
    stackSize,
    reorderUnits,
    isApplyToAll,
    handleClearList,
    handleToggleIsApplyToAll,
    handleChangeTitle,
    handleChangeMode,
    handleIncrementStackSize,
    handleDecrementStackSize,
    handleListSave,
    handleListFork,
    handleMergeList
  };
  const modalProps = {
    handleOpenModal,
    handleCloseModal,
    modalContent,
    isModalOpen,
    handleCardZoom
  };
  const viewProps = {
    width,
    cardPaneFilter,
    setCardPaneFilter,
    leftPaneWidth,
    rightPaneWidth,
    setLeftPaneWidth,
    setRightPaneWidth
  };
  const messageProps = {
    listSaveMessage
  };
  if (error) return <ErrorFallback error={error} message={message} />;
  if (status === 'loading') return <LoadingWidget />;
  if (status === 'idle') {
    // console.log(currentList);
    return (
      <ListContext.Provider
        value={{
          userSettings,
          ...unitProps,
          ...commandProps,
          ...battleProps,
          ...listProps,
          ...modalProps,
          ...viewProps,
          ...messageProps
        }}
      >
        {children}
      </ListContext.Provider>
    );
  }
}

export default ListContext;
