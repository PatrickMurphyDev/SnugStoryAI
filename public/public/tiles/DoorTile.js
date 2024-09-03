
import * as LittleJS from "../littlejs.esm.js";
import { GLOBALDATETIME, spriteAtlas, score, deaths} from "../game.js";
const { hsl, Timer, percent, warmup, max, ASSERT, EngineObject, vec2, PI, drawTile  } = LittleJS;


class DoorTile extends EngineObject 
{
    constructor(pos) 
    { 
        super(pos, vec2(1), spriteAtlas.coin);
        this.color = hsl(.15,1,.5);
    }

    render()
    {
        // make it appear to spin
        const t = GLOBALDATETIME.timeValue.secondsValue+this.pos.x/4+this.pos.y/4;
        drawTile(this.pos, vec2(.1, .6), 0, this.color); // edge of coin
        drawTile(this.pos, vec2(.5+.5*Math.sin(t*2*PI), 1), this.tileInfo, this.color);
    }

    update(o)
    {
        if (!player)
                return;

        // check if player in range
        const d = this.pos.distanceSquared(player.pos);
        if (d > .5)
            return; 
        
        // award points and destroy
        ++score;
        sound_score.play(this.pos);
        this.destroy();
    }
}