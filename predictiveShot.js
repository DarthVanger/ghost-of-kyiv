export function predictVxVy (maxBulletSpeed, bullet, target) {
    console.log('shonebud');
    let virBullet = {
        vx: 0,
        vy: maxBulletSpeed,
        x: bullet.x,
        y: bullet.y,
        width: bullet.height,
        hieght: bullet.width,
    }

    let result = {
        vx: 0,
        vy: 0,
    }

    let virTarget = {
        vx: target.vx,
        vy: target.vy,
        x: target.x,
        y: target.y,
    }
    
    let popal = false;

    while (!popal && virBullet.vx < maxBulletSpeed) {
       // console.log(virBullet.vx, virBullet.vy);
        retryShot();
    };

    function retryShot() {
        simulateShot();
        virBullet.vx += maxBulletSpeed/3;
        virBullet.vy = Math.sqrt(maxBulletSpeed * maxBulletSpeed - virBullet.vx * virBullet.vx);
    
    };

    function simulateShot () {
        console.log('---   NEW SIMILATION   ----',virBullet.vx, virBullet.vy)
        let time = 0;
        virBullet.x = bullet.x;
        virBullet.y = bullet.y;
        virTarget.x = target.x;
        virTarget.y = target.y;
       
        while (time < 1000) {
           // console.log(virBullet.x, virBullet.y)
            time += 1;
            virBullet.x += virBullet.vx;
            virBullet.y += virBullet.vy;
            virTarget.x += virTarget.vx;
            virTarget.y += virTarget.vy;
            if (detectCollision(virBullet,virTarget)) {
                popal = true;
                result.vx = virBullet.vx;
                result.vy = virBullet.vy;
                console.log('popal');
                console.log('Vx:',virBullet.vx, 'Vy: ',virBullet.vy);
              break;
            }
        }
    }
    console.log(result);
    return result;
};

function detectCollision(bullet,ship) {
    console.log('bullet: ',bullet.x, bullet.y, bullet.vx, bullet.vy);
    console.log('ship: ',ship.x, ship.y, ship.vx, ship.vy);
    if (
       bullet.x + bullet.width > ship.x && 
       bullet.x < ship.x + ship.width &&
       bullet.y + bullet.height > ship.y && 
       bullet.y < ship.y + ship.height 
     ) {
        console.log('est collision');
         return true;
     } else {
        console.log('net collision');
     }
    
 }