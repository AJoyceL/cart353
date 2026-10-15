
class Familiar {
    constructor(scene, x, y) {
        this.scene = scene;

        this.circle = scene.add.circle(x, y, 25, 0x2c2a59);
        this.circle.setDepth(3);

        this.speed = 60;
        this.targetX = x;
        this.targetY = y;
        this.task = null;

        this.destination();
    }

    destination() {
        // Find an unplanted crop and unoccupied plot
        //reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        const crop = this.scene.crops.find(
            crop => !crop.isPlanted && !crop.isBeingCarried
        );

        const plot = this.scene.plots.find(
            plot => !plot.occupied
        );

        if (crop && plot) {
            crop.isBeingCarried = true; //crop being carried

            //task stage
            this.task = {
                crop: crop,
                plot: plot,
                phase: "crop"
            };

            // Walk towards the crop
            this.targetX = crop.x;
            this.targetY = crop.y;
        } 
        else {
            // Wander around when no crops
            this.task = null;

            //random direction
            this.targetX = Phaser.Math.Between(50, 750);
            this.targetY = Phaser.Math.Between(50, 350);

            //monvement delay
            this.scene.time.delayedCall(Phaser.Math.Between(1500, 3000), () => this.destination());
        }
    }

    update(time, delta) {
        //calculate distance
        const dx = this.targetX - this.circle.x;
        const dy = this.targetY - this.circle.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        // Move towards the target
        if (d > 3) {
            const step = this.speed * (delta / 1000);

            //stop at target
            if (step >= d) {
                this.circle.setPosition(this.targetX, this.targetY);
            }
            // move towards target
            else {
                this.circle.x += (dx / d) * step;
                this.circle.y += (dy / d) * step;
            }
        }

        //stop task if no crop available
        if (!this.task) {
            return;
        }    

        // Reached the crop: carry it towards the plot
        if (this.task.phase === "crop" && d <= 3) {
            this.task.phase = "plot";
            this.targetX = this.task.plot.x;
            this.targetY = this.task.plot.y;
        }

        // Carry the crop while moving
        if (this.task.phase === "plot") {
            this.task.crop.setPosition(this.circle.x + 25, this.circle.y);

            //check distance
            const plotD = Phaser.Math.Distance.Between(this.circle.x, this.circle.y, this.targetX, this.targetY);

            //plant crop
            if (plotD <= 3) {
                const crop = this.task.crop;
                const plot = this.task.plot;

                crop.isBeingCarried = false;

                //debug
                if (crop.plantInPlot(plot)) {
                    console.log("Familiar planted a crop!");
                } 
                else {
                    console.log("Could not plant crop.");
                }

                this.task = null;
                this.destination();
            }
        }
    }
}

window.Familiar = Familiar;
