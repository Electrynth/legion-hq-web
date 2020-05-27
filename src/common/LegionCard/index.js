import React, { useContext } from 'react';
import DataContext from 'context/DataContext';
import cards from 'constants/cards';
import ImageCard from './ImageCard';
import TextCard from './TextCard';
import ChipCard from './ChipCard';

function LegionCard({
  id,
  isBasic = false,
  isSelected = false,
  size = 'medium',
  handleClick,
  handleCardZoom,
  handleDelete
}) {
  const { userSettings } = useContext(DataContext);
  const card = cards[id];
  if (isBasic) {
    return (
      <ChipCard
        chipSize={size}
        card={card}
        handleClick={handleCardZoom}
        handleDelete={handleDelete}
      />
    );
  } else if (userSettings.cardStyle === 'images') {
    return (
      <ImageCard
        isSelected={isSelected}
        card={card}
        handleClick={isSelected ? undefined : handleClick}
        handleCardZoom={handleCardZoom}
      />
    );
  } else if (userSettings.cardStyle === 'text') {
    return (
      <TextCard
        isSelected={isSelected}
        card={card}
        handleClick={isSelected ? undefined : handleClick}
        handleCardZoom={handleCardZoom}
      />
    );
  } else {
    return null;
  }
};

export default LegionCard;
