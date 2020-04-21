"use strict";

const clone = require("rfdc")({ proto: true });

// Only works for 2 or 3 columns
export default (photos, columns) => {
  let photosLeft = clone(photos);
  let photoSources = []; // for lightbox
  let photoBlocks = []; // for grid
  let currentBlock = {
    columns: []
  };
  let lastBlock; // only used if columns === 2
  let currentColumn = {
    photos: []
  };
  let lastColumn; // only used (in a rare case) if columns === 3
  const mapTile = {
    map: true,
    tilesWide: 1,
    tilesTall: 1
  };

  // String constants
  const LANDSCAPE = "landscape";
  const PORTRAIT = "portrait";
  const NORMAL_LANDSCAPE = "normalLandscape";
  const FEATURED = "featured";

  // Check number of landscape/portrait photos
  const landscapeCount = photos.reduce(
    (count, photo) => (photo.orientation === LANDSCAPE ? count + 1 : count),
    0
  );
  const portraitCount = photos.reduce(
    (count, photo) => (photo.orientation === PORTRAIT ? count + 1 : count),
    0
  );

  // If the first photo is landscape, try to ensure first three photos are landscape
  if (photosLeft[0].orientation === LANDSCAPE) {
    if (landscapeCount >= 3) {
      // Arrange first block
      let landscapesMoved = 0;
      let i = 0;
      while (landscapesMoved < 1) {
        if (photosLeft[i].orientation === LANDSCAPE) {
          pushPhoto(i, FEATURED);
          pushColumnAndClear(2, 2);
          if (columns === 2) {
            pushBlockAndClear(2);
          }
          landscapesMoved++;
        } else {
          i++;
        }
      }
      while (landscapesMoved < 2) {
        if (photosLeft[i].orientation === LANDSCAPE) {
          pushPhoto(i, NORMAL_LANDSCAPE);
          if (columns === 2) {
            pushColumnAndClear(1, 1);
          }
          landscapesMoved++;
        } else {
          i++;
        }
      }
      while (landscapesMoved < 3) {
        if (photosLeft[i].orientation === LANDSCAPE) {
          pushPhoto(i, NORMAL_LANDSCAPE);
          pushColumnAndClear(1, columns === 2 ? 1 : 2);
          landscapesMoved++;
        } else {
          i++;
        }
      }
      pushBlockAndClear(columns === 2 ? 1 : 2);
    } else if (landscapeCount >= 1) {
      // At least try to make the first photo landscape
      let landscapesMoved = 0;
      let i = 0;
      while (landscapesMoved < 1) {
        if (photosLeft[i].orientation === LANDSCAPE) {
          pushPhoto(i, FEATURED);
          pushColumnAndClear(2, 2);
          if (columns === 2) {
            pushBlockAndClear(2);
          }
          landscapesMoved++;
        } else {
          i++;
        }
      }

      // Finish 3-column block with a portrait photo if possible
      if (columns === 3) {
        if (portraitCount >= 1) {
          let portraitsMoved = 0;
          let j = 0;
          while (portraitsMoved < 1) {
            if (photosLeft[j].orientation === PORTRAIT) {
              pushPhoto(j, PORTRAIT);
              portraitsMoved++;
            } else {
              j++;
            }
          }
        } else if (photosLeft.length > 0) {
          // There's only one photo left, landscape, so add it and the map tile and complete
          pushPhoto(0, NORMAL_LANDSCAPE);
          currentColumn.photos.push(mapTile);
          pushColumnAndClear(1, 2);
          pushBlockAndClear(2);
          return { photoBlocks, photoSources };
        } else {
          // No photos left, so add map and street view tiles
          currentColumn.photos.push(mapTile);
          pushColumnAndClear(1, 1);
          pushBlockAndClear(2);
          return { photoBlocks, photoSources };
        }
        pushColumnAndClear(1, 2);
        pushBlockAndClear(2);
      }
    }
  }

  // If all photos are portrait, this process is much simpler
  if (landscapeCount === 0) {
    // Arrange
    let i = 0;
    while (photosLeft.length > 0) {
      pushPhoto(0, PORTRAIT);
      pushColumnAndClear(1, 2);
      if (i % columns === columns - 1) {
        pushBlockAndClear(2);
      }
      i++;
    }

    // Add map and street view tiles
    if (columns - currentBlock.columns.length === 1) {
      currentColumn.photos.push(mapTile);
      pushColumnAndClear(1, 1);
      pushBlockAndClear(2);
    } else {
      currentColumn.photos.push(mapTile);
      pushColumnAndClear(1, 1);
      pushBlockAndClear(1);
    }

    // Return
    return { photoBlocks, photoSources };
  }

  // Process remaining blocks
  if (columns === 3) {
    // Set up block processing variables
    let lastFeaturedSide = "left";

    // Each loop is one block
    while (photosLeft.length > 0) {
      if (
        photosLeft.length >= 3 &&
        photosLeft[0].orientation === LANDSCAPE &&
        photosLeft[1].orientation === LANDSCAPE &&
        photosLeft[2].orientation === LANDSCAPE
      ) {
        // Feature one and complete block
        if (lastFeaturedSide === "left") {
          pushPhoto(0, NORMAL_LANDSCAPE);
          pushPhoto(0, NORMAL_LANDSCAPE);
          pushColumnAndClear(1, 2);
          pushPhoto(0, FEATURED);
          pushColumnAndClear(2, 2);
          lastFeaturedSide = "right";
          pushBlockAndClear(2);
        } else {
          pushPhoto(0, FEATURED);
          pushColumnAndClear(2, 2);
          pushPhoto(0, NORMAL_LANDSCAPE);
          pushPhoto(0, NORMAL_LANDSCAPE);
          pushColumnAndClear(1, 2);
          lastFeaturedSide = "left";
          pushBlockAndClear(2);
        }
      } else {
        // Handle one column at a time
        let columnsProcessed = 0;
        // Each loop is one column
        while (columnsProcessed < 3) {
          if (photos[0].orientation === PORTRAIT) {
            // Complete column
            pushPhoto(0, PORTRAIT);
            pushColumnAndClear(1, 2);
            columnsProcessed++;
          } else if (photos[0].orientation === LANDSCAPE) {
            if (numPhotosLeft(LANDSCAPE) > 1) {
              if (numPhotosLeft() === 2) {
                // These are the last two photos, so arrange them with the map and street view tiles in mind
                if (columnsProcessed === 2) {
                  // Add next two landscape and complete column
                  let landscapesMoved = 0;
                  let i = 0;
                  while (landscapesMoved < 2) {
                    if (photosLeft[i].orientation === LANDSCAPE) {
                      pushPhoto(i, NORMAL_LANDSCAPE);
                      landscapesMoved++;
                    } else {
                      i++;
                    }
                  }
                  pushColumnAndClear(1, 2);
                  columnsProcessed++;
                } else if (columnsProcessed === 1) {
                  // Add both remaining columns with map/street view below
                  pushPhoto(0, NORMAL_LANDSCAPE);
                  currentColumn.photos.push(mapTile);
                  pushColumnAndClear(1, 2);
                  columnsProcessed++;
                  pushPhoto(0, NORMAL_LANDSCAPE);
                  pushColumnAndClear(1, 1);
                  columnsProcessed++;

                  // Complete last block and return
                  pushBlockAndClear(2);
                  return { photoBlocks, photoSources };
                } else {
                  // Complete the rest, with tiles
                  pushPhoto(0, NORMAL_LANDSCAPE);
                  pushColumnAndClear(1, 1);
                  pushPhoto(0, NORMAL_LANDSCAPE);
                  pushColumnAndClear(1, 1);
                  currentColumn.photos.push(mapTile);
                  pushColumnAndClear(1, 1);
                  pushBlockAndClear(1);
                  return { photoBlocks, photoSources };
                }
              }
              // Add next two landscape and complete column
              let landscapesMoved = 0;
              let i = 0;
              while (landscapesMoved < 2) {
                if (photosLeft[i].orientation === LANDSCAPE) {
                  pushPhoto(i, NORMAL_LANDSCAPE);
                  landscapesMoved++;
                } else {
                  i++;
                }
              }
              pushColumnAndClear(1, 2);
              columnsProcessed++;
            } else if (numPhotosLeft(PORTRAIT) > 0) {
              // Add portrait to column instead
              let portraitsMoved = 0;
              let j = 0;
              while (portraitsMoved < 1) {
                if (photosLeft[j].orientation === PORTRAIT) {
                  pushPhoto(j, PORTRAIT);
                  portraitsMoved++;
                } else {
                  j++;
                }
              }
              pushColumnAndClear(1, 2);
              columnsProcessed++;
            } else {
              // This is the last photo, so determine how to add map and street view tiles
              if (columnsProcessed === 2) {
                // Add final column and finish up
                pushPhoto(0, NORMAL_LANDSCAPE);
                currentColumn.photos.push(mapTile);
                pushColumnAndClear(1, 2);
                pushBlockAndClear(2);
                return { photoBlocks, photoSources };
              } else if (columnsProcessed === 1) {
                // Finish in one row
                const blockHeight = lastColumn.tilesTall;
                pushPhoto(0, NORMAL_LANDSCAPE);
                pushColumnAndClear(1, 1);
                currentColumn.photos.push(mapTile);
                pushColumnAndClear(1, 1);
                pushBlockAndClear(blockHeight);
                return { photoBlocks, photoSources };
              } else {
                // Finish in one row
                pushPhoto(0, NORMAL_LANDSCAPE);
                pushColumnAndClear(1, 1);
                currentColumn.photos.push(mapTile);
                pushColumnAndClear(1, 1);
                pushBlockAndClear(1);
                return { photoBlocks, photoSources };
              }
            }
          } else {
            // Only map/street view tiles are left
            if (columnsProcessed === 2) {
              // Put tiles in last column and complete
              currentColumn.photos.push(mapTile);
              pushColumnAndClear(1, 1);
              pushBlockAndClear(2);
              return { photoBlocks, photoSources };
            } else {
              // One column is processed, so put tiles in own columns and complete
              currentColumn.photos.push(mapTile);
              pushColumnAndClear(1, 1);
              pushBlockAndClear(2);
              return { photoBlocks, photoSources };
            }
          }
        }

        // If nothing has been returned by this point, a block is complete, so move on
        pushBlockAndClear(2);
      }
    }

    // If nothing has been returned by this point, map tile goes alone in its own block
    currentColumn.photos.push(mapTile);
    pushColumnAndClear(1, 1);
    pushBlockAndClear(1);

    // Return
    return { photoBlocks, photoSources };
  } else {
    // columns === 2
    // Each loop is one block
    while (photosLeft.length > 0) {
      if (photosLeft[0].orientation === LANDSCAPE) {
        // Check if last block is just one featured photo
        if (lastBlock.columns.length === 1) {
          if (
            photosLeft.length > 1 &&
            photosLeft[1].orientation === LANDSCAPE
          ) {
            // Complete block, one row tall
            pushPhoto(0, NORMAL_LANDSCAPE);
            pushColumnAndClear(1, 1);
            pushPhoto(0, NORMAL_LANDSCAPE);
            pushColumnAndClear(1, 1);
            pushBlockAndClear(1);
          } else if (
            photosLeft.length > 1 &&
            photosLeft[1].orientation === PORTRAIT
          ) {
            if (numPhotosLeft(LANDSCAPE) > 1) {
              // Grab the next two landscapes, then the next portrait
              let landscapesMoved = 0;
              let i = 0;
              while (landscapesMoved < 2) {
                if (photosLeft[i].orientation === LANDSCAPE) {
                  pushPhoto(i, NORMAL_LANDSCAPE);
                  landscapesMoved++;
                } else {
                  i++;
                }
              }
              pushColumnAndClear(1, 2);
              pushPhoto(0, PORTRAIT);
              pushColumnAndClear(1, 2);
              pushBlockAndClear(2);
            } else {
              // Put the portrait first, then decide
              pushPhoto(1, PORTRAIT);
              pushColumnAndClear(1, 2);
              if (
                photosLeft.length > 1 &&
                photosLeft[1].orientation === PORTRAIT
              ) {
                // Put the next portrait in and complete block
                pushPhoto(1, PORTRAIT);
                pushColumnAndClear(1, 2);
                pushBlockAndClear(2);
              } else {
                // This landscape is the last photo, so finish up with map tile
                pushPhoto(0, NORMAL_LANDSCAPE);
                currentColumn.photos.push(mapTile);
                pushColumnAndClear(1, 2);
                pushBlockAndClear(2);
                return { photoBlocks, photoSources };
              }
            }
          } else {
            // This landscape is the last photo, so finish up with map tile
            pushPhoto(0, NORMAL_LANDSCAPE);
            pushColumnAndClear(1, 1);
            currentColumn.photos.push(mapTile);
            pushColumnAndClear(1, 1);
            pushBlockAndClear(1);
            return { photoBlocks, photoSources };
          }
        } else {
          // Feature
          pushPhoto(0, FEATURED);
          pushColumnAndClear(2, 2);
          pushBlockAndClear(2);
        }
      } else {
        // Next photo is portrait
        // Push photo and then decide
        pushPhoto(0, PORTRAIT);
        pushColumnAndClear(1, 2);
        if (photosLeft[0].orientation === PORTRAIT) {
          // Push photo and complete block
          pushPhoto(0, PORTRAIT);
          pushColumnAndClear(1, 2);
          pushBlockAndClear(2);
        } else if (photosLeft.orientation === LANDSCAPE) {
          // Check if there are more landscapes left
          if (numPhotosLeft(LANDSCAPE) > 1) {
            // Push next two landscapes and complete block
            let landscapesMoved = 0;
            let i = 0;
            while (landscapesMoved < 2) {
              if (photosLeft[i].orientation === LANDSCAPE) {
                pushPhoto(i, NORMAL_LANDSCAPE);
                landscapesMoved++;
              } else {
                i++;
              }
            }
            pushColumnAndClear(1, 2);
            pushBlockAndClear(2);
          } else if (numPhotosLeft(PORTRAIT) > 0) {
            // Push next portrait and complete block
            let portraitsMoved = 0;
            let j = 0;
            while (portraitsMoved < 1) {
              if (photosLeft[j].orientation === PORTRAIT) {
                pushPhoto(j, PORTRAIT);
                portraitsMoved++;
              } else {
                j++;
              }
            }
            pushColumnAndClear(1, 2);
            pushBlockAndClear(2);
          } else {
            // This landscape is the last photo, so finish up with map tile
            pushPhoto(0, NORMAL_LANDSCAPE);
            currentColumn.photos.push(mapTile);
            pushColumnAndClear(1, 2);
            pushBlockAndClear(2);
            return { photoBlocks, photoSources };
          }
        } else {
          // Only map tile is left, so push and complete
          currentColumn.photos.push(mapTile);
          pushColumnAndClear(1, 1);
          pushBlockAndClear(2);
          return { photoBlocks, photoSources };
        }
      }
    }

    // If nothing has been returned by this point, map tile goes alone in its own block
    currentColumn.photos.push(mapTile);
    pushColumnAndClear(1, 1);
    pushBlockAndClear(1);

    // Return
    return { photoBlocks, photoSources };
  }

  // Local functions
  function pushBlockAndClear(tilesTall) {
    addDimensions(currentBlock, columns, tilesTall);
    photoBlocks.push(clone(currentBlock));
    if (columns === 2) {
      lastBlock = clone(currentBlock);
    }
    currentBlock = {
      tilesWide: columns,
      tilesTall: 1,
      columns: []
    };
  }
  function pushColumnAndClear(tilesWide, tilesTall) {
    addDimensions(currentColumn, tilesWide, tilesTall);
    currentBlock.columns.push(clone(currentColumn));
    if (columns === 3) {
      lastColumn = clone(currentColumn);
    }
    currentColumn = {
      tilesWide: 1,
      tilesTall: 1,
      photos: []
    };
  }
  function pushPhoto(index, dimensionType) {
    addDimensions(
      photosLeft[index],
      dimensionType === FEATURED ? 2 : 1,
      dimensionType === NORMAL_LANDSCAPE ? 1 : 2
    );
    photoSources.push({ src: photosLeft[index].src });
    photosLeft[index].index = photoSources.length - 1;
    currentColumn.photos.push(...photosLeft.splice(index, 1));
  }
  function addDimensions(object, tilesWide, tilesTall) {
    Object.assign(object, { tilesWide, tilesTall });
  }
  function numPhotosLeft(orientation) {
    if (orientation) {
      return photosLeft.reduce(
        (count, photo) =>
          photo.orientation === orientation ? count + 1 : count,
        0
      );
    } else {
      return photosLeft.length;
    }
  }
};
