import { IslandTemplate } from "../../utils/IslandTemplateTile";

class PlayerController {
    constructor(parent,loc,sp) {
        this.parent = parent;
        this._isAsleep = false;    
        this.speed = 0.5;
        this.location = {x:570, y:1820};
        this.didMove = true;
    }

    playerx(){
        return this.location.x;
    }

    playery(){
        return this.location.y;
    }

    setLocation(vec2){
        this.location = vec2;
    }

    getLocation(){
        return this.location;
    }

    setSpeed(sp){
        this.speed = sp;
    }

    getSpeed(){
        return this.speed;
    }

    setAsleep(bool){
        this._isAsleep = bool;
    }

    isAsleep(){
        return this._isAsleep;
    }
        
    determineLastMoveState(code) {
        return IslandTemplate.KEYCODEMAP[code] || 0;
    }

    update(p5) {
        
    }

    render(p5) {
        let renderCharIdle = () => {
        if (this.parent.lastMoveState <= 2) {
            p5.push();
            p5.scale(-1, 1); // Scale -1, 1 means reverse the x axis, keep y the same.
            this.parent.CharIdle.draw(p5, -this.location.x - 24, this.location.y);//p5.image(this.playerImage, -this.playerx - this.tileWidth, this.playery); // Because the x-axis is reversed, we need to draw at different x position. negative x
            p5.pop();
        } else { // if last move state was 3 down or 4 left, and not moving then draw the standing to the left sprite
            this.parent.CharIdle.draw(p5, this.location.x, this.location.y); //p5.image(this.playerImage, this.playerx, this.playery);
        }
        };

        if (
        this.parent.useCharImage &&
        (this.parent.moveState.isMovingDown ||
            this.parent.moveState.isMovingUp ||
            this.parent.moveState.isMovingLeft ||
            this.parent.moveState.isMovingRight)
        ) {
        if (this.parent.moveState.isMovingLeft) {
            this.parent.CharRunLeft.draw(p5, this.location.x, this.location.y); //p5.image(this.playerImageLeft, this.playerx, this.playery); //parent.getAssets('GameMapScene')['PlayerImageLeft']
        } else if (this.parent.moveState.isMovingRight) {
            this.parent.CharRunRight.draw(p5, this.location.x, this.location.y); //p5.image(this.playerImageRight, this.playerx, this.playery);
        } else {
            if (this.parent.moveState.isMovingUp) {
            this.parent.CharRunUp.draw(p5, this.location.x, this.location.y); //p5.image(this.playerImage, this.playerx, this.playery);
            } else if (this.parent.moveState.isMovingDown) {
            this.parent.CharRunDown.draw(p5, this.location.x, this.location.y); //p5.image(this.playerImage, this.playerx, this.playery);
            }
        }
        } else if (this.parent.useCharImage) {
        renderCharIdle();
        } else {
        // no char image def box
        p5.rect(this.location.x, this.location.y, 24, 32);
        }
    }
  }
  
  export default PlayerController;