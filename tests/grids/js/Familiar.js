//creates an agent-based familiar that moves around the screen and can drag and drop fruits into plots if there are any available plots 
class Familiar {
    constructor(scene, x, y) {
        this.scene = scene;

        this.circle = scene.add.circle(x, y, 25, 0x2c2a59);
        this.circle.setInteractive();
        this.circle.setDepth(3);

        //Movement
        this.speed = 60;
        this.targetX = x;
        this.targetY = y;

        this.destination();
    }

    destination()
    {
        this.targetX = Phaser.Math.Between(50, 750);
        this.targetY = Phaser.Math.Between(50, 350);

        //delay
        this.scene.time.delayedCall(
            Phaser.Math.Between(1500, 3000), () => {
                this.destination();
            }
        );
    }

    update(time, delta) {
        const dx = this.targetX - this.circle.x;
        const dy = this.targetY - this.circle.y;

        const d = Math.sqrt(dx * dx + dy * dy); //distance

        if (d > 3) {
            const step = this.speed * (delta / 1000);

            if (step >= d) {
                this.circle.setPostiiont(this.targetX, this.targetY);
            }
            else {
                this.circle.x += (dx / d) * step;
                this.circle.y += (dy / d) * step;
            }
        }
    }
}

window.Familiar = Familiar;