import { IslandTemplateTiled } from "./IslandTemplateTiled";

const TILE_TYPES_ENUM = {
    "WATER":        0,
    "PATH":         1,
    "SHORE":        2,
    "GRASS":        3,
    "SAND":         4,
    "WALL":         5,
    "BOARDWALK":    6,
    "DIRT":         7,
    "BUILDING":     8
}

class TileMapExample {
    constructor(dimensions){
        this.tileTypeMap = [];
        this.dimensions = dimensions || {width: 64, height: 64};
        for(var x = 0; x<this.dimensions.width; x++){
            for(var y = 0; y<this.dimensions.height; y++){
                this.tileTypeMap.push(TILE_TYPES_ENUM.WATER);
            }
        }
    }
}