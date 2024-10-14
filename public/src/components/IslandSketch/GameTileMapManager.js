export class GameTileMapManager {
  constructor(parent,dimensions,tiles) {
    this.parent = parent;
    this.dimensions = dimensions || {width:64,height:64};
    this.tiles = tiles || [];
    this.chunks = [];
  }

  getChunks(){
    return this.chunks;
  }

  getTiles(){
    //let tempTiles = {};
//    this.chunks.forEach((a,i,v)=>{

  ///  });
    return this.tiles;
  }

  getWidth(){
    return this.dimensions.width;
  }

  getHeight(){
    return this.dimensions.height;
  }
}
