// PathingEntity.js
import Entity from "./Entity";
import PF from "pathfinding";

export default class PathingEntity extends Entity {
  constructor(
    entityType,
    id = Math.floor(Math.random() * 1000),
    location = { x: 0, y: 0 },
    size = { width: 32, height: 32 },
    map = {mapWidth:64,mapHeight:64,tiles:[]},
    speed = 1,
    movementGrid,
  ) {
    super(entityType, id, location, size); //entityType, id, location, size
    this.map = map; // for set path {mapWidth:0,mapHeight:0,tiles:[]}
    this.speed = speed; // Base speed for the entity
    this.movementGrid = movementGrid; // Reference to the movement speed grid
    this.path = [];
    this.currentTargetIndex = 0;
    this.currentTarget = null;
    this.lastUpdateTime = Date.now();
  }

  // Set the path using A* algorithm
  setPath(goal) {
    const grid = new PF.Grid(
      this.map.mapWidth,
      this.map.mapHeight,
      this.map.tiles
    );
    const finder = new PF.AStarFinder({
      allowDiagonal: false,
      dontCrossCorners: true,
    });

    this.path = finder.findPath(
      Math.floor(this.location.x / this.size.width),
      Math.floor(this.location.y / this.size.height),
      goal.x,
      goal.y,
      grid
    );
    this.currentTargetIndex = 0;
    this.setNextTarget();
  }

  // Set the next target tile in the path
  setNextTarget() {
    if (this.currentTargetIndex < this.path.length) {
      const [nextX, nextY] = this.path[this.currentTargetIndex];
      this.currentTarget = { x: nextX * 32 + 16, y: nextY * 32 + 16 };
      this.currentTargetIndex++;
    } else {
      this.currentTarget = null;
    }
  }

  // Update the entity's position with dynamic speed adjustment
  update(minElapsed) {
    if (!this.currentTarget) return;

    const deltaTime = minElapsed;

    const tileX = Math.floor(this.x / this.size.width);
    const tileY = Math.floor(this.y / this.size.height);
    const tileSpeedModifier = this.movementGrid[tileY][tileX] || 1.0;
    const effectiveSpeed = this.speed * tileSpeedModifier;

    const distanceToMove = effectiveSpeed * deltaTime;

    const dx = this.currentTarget.x - this.x;
    const dy = this.currentTarget.y - this.y;
    const distanceToTarget = Math.sqrt(dx * dx + dy * dy);

    if (distanceToMove >= distanceToTarget) {
      this.x = this.currentTarget.x;
      this.y = this.currentTarget.y;
      this.setNextTarget();
    } else {
      const moveRatio = distanceToMove / distanceToTarget;
      this.x += dx * moveRatio;
      this.y += dy * moveRatio;
    }
  }
}
