/*
    LittleJS Platformer Example - Objects
    - Base GameObject class for objects with health
    - Crate object collides with player, can be destroyed
    - Weapon is held and fires bullets with some settings
    - Bullet is the projectile launched by a weapon
*/

import * as LittleJS from "./littlejs.esm.js";

class GameObject extends LittleJS.EngineObject 
{
    constructor(pos, size, tileInfo, angle)
    {
        super(pos, size, tileInfo, angle);
        this.health = 0;
        this.isGameObject = 1;
        this.damageTimer = new LittleJS.Timer;
    }

    update()
    {
        super.update();

        // flash white when damaged
        if (!this.isDead() && this.damageTimer.isSet())
        {
            const a = .5*percent(this.damageTimer, .15, 0);
            this.additiveColor = hsl(0,0,a,0);
        }
        else
            this.additiveColor = hsl(0,0,0,0);

        // kill if below level
        if (!this.isDead() && this.pos.y < -9)
            warmup ? this.destroy() : this.kill();
    }

    damage(damage, damagingObject)
    {
        ASSERT(damage >= 0);
        if (this.isDead())
            return 0;
        
        // set damage timer;
        this.damageTimer.set();
        for (const child of this.children)
            child.damageTimer && child.damageTimer.set();

        // apply damage and kill if necessary
        const newHealth = max(this.health - damage, 0);
        if (!newHealth)
            this.kill(damagingObject);

        // set new health and return amount damaged
        return this.health - (this.health = newHealth);
    }

    isDead()                { return !this.health; }
    kill(damagingObject)    { this.destroy(); }
}
/*
///////////////////////////////////////////////////////////////////////////////

class Coin extends EngineObject 
{
    constructor(pos) 
    { 
        super(pos, vec2(1), spriteAtlas.coin);
        this.color = hsl(.15,1,.5);
    }

    render()
    {
        // make it appear to spin
        const t = time+this.pos.x/4+this.pos.y/4;
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

///////////////////////////////////////////////////////////////////////////////

class Enemy extends GameObject 
{
    constructor(pos) 
    { 
        super(pos, vec2(.9,.9), spriteAtlas.enemy);

        this.drawSize = vec2(1);
        this.color = hsl(rand(), 1, .7);
        this.health = 5;
        this.bounceTime = new Timer(rand(1e3));
        this.setCollision(true, false);
    }

    update()
    {
        super.update();
        
        if (!player)
            return;

        // jump around randomly
        if (this.groundObject && rand() < .01 && this.pos.distance(player.pos) < 20)
        {
            this.velocity = vec2(rand(.1,-.1), rand(.4,.2));
            sound_jump.play(this.pos, .4, 2);
        }

        // damage player if touching
        if (isOverlapping(this.pos, this.size, player.pos, player.size))
            player.damage(1, this);
    }

    kill()
    {
        if (this.destroyed)
            return;

        ++score;
        sound_score.play(this.pos);
        makeDebris(this.pos, this.color);
        this.destroy();
    }
       
    render()
    {
        // bounce by changing size
        const bounceTime = this.bounceTime*6;
        this.drawSize = vec2(1-.1*Math.sin(bounceTime), 1+.1*Math.sin(bounceTime));

        // make bottom flush
        let bodyPos = this.pos;
        bodyPos = bodyPos.add(vec2(0,(this.drawSize.y-this.size.y)/2));
        drawTile(bodyPos, this.drawSize, this.tileInfo, this.color, this.angle, this.mirror, this.additiveColor);
    }
}*/