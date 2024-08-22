// PathingEntity.js
import Entity from './Entity';
import PF from 'pathfinding';

export default class PathingEntity extends Entity {
  constructor(x, y, map, speed = 1, movementGrid) {
    super(x, y);
    this.map = map;
    this.speed = speed; // Base speed for the entity
    this.movementGrid = movementGrid; // Reference to the movement speed grid
    this.path = [];
    this.currentTargetIndex = 0;
    this.currentTarget = null;
    this.lastUpdateTime = Date.now();
  }

  // Set the path using A* algorithm
  setPath(goal) {
    const grid = new PF.Grid(this.map.mapWidth, this.map.mapHeight, this.map.tiles);
    const finder = new PF.AStarFinder({
      allowDiagonal: false,
      dontCrossCorners: true,
    });

    this.path = finder.findPath(
      Math.floor(this.x / 32),
      Math.floor(this.y / 32),
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
  update() {
    if (!this.currentTarget) return;

    const now = Date.now();
    const deltaTime = (now - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = now;

    const tileX = Math.floor(this.x / 32);
    const tileY = Math.floor(this.y / 32);
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
