import React, { useState } from 'react';
import Img from 'react-image';
import mergeImages from 'merge-images'
import domtoimage from 'dom-to-image-more';
import { Grid, Typography } from '@material-ui/core';

function ListImage() {
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [headerSrc, setHeaderSrc] = useState();
  const [unitsSrc, setUnitsSrc] = useState();
  const [commandsSrc, setCommandsSrc] = useState();
  const [objectivesSrc, setObjectivesSrc] = useState();
  const [combinedSrc, setCombinedSrc] = useState();

  const options = {
    cacheBust: true,
    quality: 0.5,
    style: {
      backgroundColor: '#1e2125',
      font: 'small-caps bold 24px/1 sans-serif',
    }
  };

  const listHeader = document.getElementById('list-header');
  domtoimage.toJpeg(listHeader, options).then(src => setHeaderSrc(src));
  const listUnits = document.getElementById('list-units');
  domtoimage.toJpeg(listUnits, options).then(src => setUnitsSrc(src));
  const listCommands = document.getElementById('list-commands');
  domtoimage.toJpeg(listCommands, options).then(src => setCommandsSrc(src));
  const listObjectives = document.getElementById('list-objectives');
  domtoimage.toJpeg(listObjectives, options).then(src => setObjectivesSrc(src));
  if (
    headerSrc &&
    unitsSrc &&
    commandsSrc &&
    objectivesSrc &&
    isLoadingImage
  ) {
    setIsLoadingImage(false);
    mergeImages([
      { src: unitsSrc }
    ]).then(src => setCombinedSrc(src));
  }

  return (
    <Grid container direction="column" justify="center">
      {isLoadingImage ? (
        <Grid item>
          <Typography>
            Loading...
          </Typography>
        </Grid>
      ) : (
        <Grid item>
          <img alt="units" src={combinedSrc} />
        </Grid>
      )}
    </Grid>
  );
}

export default ListImage;
