var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var tileFront='rgb(153, 153, 153)'
var tileBack='rgb(204, 204, 204)'
var matchedTileColor = 'rgb(2, 204, 204)'
var fontColor = 'black';
var tileSize = 110;
var tileLocations = [];
var openTiles = []; //Will contain currently open two tiles
var tileValues = [1,2,1,2,3,4,3,4,5,6,5,6,7,8,7,8]; //XXX Randomize this
var numberOfTilesMatched=0;


function tilexy(x,y,clicked,matched){
  this.x = x;
  this.y = y;
  this.clicked=clicked;
  this.matched=matched;
}

window.addEventListener('mousedown',
  function(event){
    isButtonClicked(event.x, event.y);
    isTileClicked(event.x, event.y)
  });

function initBoard() {
  ctx.fillStyle = tileFront;
  ctx.font = "28pt Tahoma";
  for(var j=0; j<4; j++){
    for(var i=0; i<4; i++){
      tileLocations.push(new tilexy(10 + (i*tileSize + i*10), 10 + (j*tileSize + j*10), false, false ) )
      ctx.fillRect(10 + (i*tileSize + i*10), 10 + (j*tileSize + j*10), tileSize ,tileSize);
    }
  }
}

function flipTile(tileNumber) {
  // Don't flip already matched tiles
  if(tileLocations[tileNumber].matched === true) {
    return;
  }

  if(tileLocations[tileNumber].clicked === true) {
    ctx.fillStyle = tileBack;
  } else {
    ctx.fillStyle = tileFront;
  }
  ctx.fillRect(tileLocations[tileNumber].x,tileLocations[tileNumber].y,tileSize,tileSize);
  ctx.fillStyle = fontColor;
  if(tileLocations[tileNumber].clicked === true) {
    ctx.fillText(  tileValues[tileNumber], tileLocations[tileNumber].x + tileSize/2-10, tileLocations[tileNumber].y  + tileSize/2+10);
  }

}

function isTileClicked(px, py){
  for(var i=0; i < tileLocations.length; i++){
    if( (px > tileLocations[i].x  && px < tileLocations[i].x + tileSize) && (py>tileLocations[i].y && py < tileLocations[i].y + tileSize) ){
      tileLocations[i].clicked = !tileLocations[i].clicked; //Toggle the clicked state
      if(openTiles.indexOf(i) > -1){
        return; // Check if tile was already open - if so, don't flip it.
      }
      openTiles.push(i);
      flipTile(i);
      if(tileValues[openTiles[0]] === tileValues[openTiles[1]]){
        numberOfTilesMatched++;
        markMatchedTiles(openTiles);
      }

      if(openTiles.length > 2) {
        tileLocations[openTiles[0]].clicked = false;
        flipTile(openTiles[0]);
        tileLocations[openTiles[1]].clicked = false;
        flipTile(openTiles[1]);
        openTiles = [i]; //Set the openTiles to the "third" tile clicked
      }
      if(numberOfTilesMatched === 15){
        ctx.fillStyle = 'green';
        ctx.fillText(" You won!", 100, 550);
      }
    }
  }
}

function markMatchedTiles(openTiles) {
  for(var i=0; i< 2 ; i++){
    tileNumber = openTiles[i];
    ctx.fillStyle = matchedTileColor;
    tileLocations[tileNumber].matched=true;
    ctx.fillRect(tileLocations[tileNumber].x,tileLocations[tileNumber].y,tileSize,tileSize);
    ctx.fillStyle = fontColor;
    ctx.fillText(  tileValues[tileNumber], tileLocations[tileNumber].x + tileSize/2-10, tileLocations[tileNumber].y  + tileSize/2+10);

  }
}

function isButtonClicked(px, py){

}

initBoard();