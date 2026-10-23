
class Familiar {
    constructor(scene, x, y, color, type) {
        this.scene = scene;
        this.type = type;

        this.circle = scene.add.circle(x, y, 25, color);
        this.circle.setDepth(10);

        this.speed = 60;
        this.targetX = x;
        this.targetY = y;
        this.task = null;

        //calls planter familiar
        if (this.type === "planter") {
            this.destination();
        }
        //calls waterer
        else if (this.type === "waterer") {
            this.wateringCrop();
        }
        //else familiar wanders
        else {
            this.wanderer();
        }
    }

    destination() {
        // Find an unplanted crop and unoccupied plot
        //reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        if (this.type !== "planter") {
            return
        }

        const crop = this.scene.crops.find(crop => !crop.isPlanted && !crop.isBeingCarried && !crop.isHarvested);

        const plot = this.scene.plots.find(plot => !plot.occupied);

        if (crop && plot) {
            crop.isBeingCarried = true; //crop being carried

            //task stage
            this.task = {
                crop: crop,
                plot: plot,
                phase: "crop"
            }

            // Walk towards the crop
            this.targetX = crop.x;
            this.targetY = crop.y;
        } 
        else {
            // Wander around when no crops
            this.task = null;
            this.wanderer();
        }
    }

    //Waters crops when planted 
    wateringCrop() {
        if (this.type !== "waterer") {
            return;
        }

        const crop = this.scene.crops.find(crop => crop.isPlanted && !crop.isBeingCarried && !crop.isHarvested);

        if (crop) {
            this.task = {
                crop: crop,
                phase: "watering"
            }
            this.targetX = crop.x;
            this.targetY = crop.y;
        }
        else {
            this.task = null;
            this.wanderer();
        }
    }

    //Wander when no crops
    wanderer() {
        this.task = null;

        //random direction
        this.targetX = Phaser.Math.Between(50, 750);
        this.targetY = Phaser.Math.Between(50, 350);

        //monvement delay
        this.scene.time.delayedCall(Phaser.Math.Between(1500, 3000), () => {
            if (!this.circle.active) {
                return;
            }

            if (this.type === "planter") {
                this.destination();
            }

            else {
                this.wanderer();
            }
        });

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

        //watering familiars
        if (this.type === "waterer") {
            // Stop if there is no crop to water
            if (!this.task) {
                return;
            }

            if (this.task.phase === "watering") {
                const crop = this.task.crop;

                const distance = Phaser.Math.Distance.Between(
                    this.circle.x,
                    this.circle.y,
                    crop.x,
                    crop.y
                );

                if (distance <= 30) {
                    if (crop.isFullyGrown) {
                        crop.harvestCrop();
                        console.log("Waterer harvested a crop!");
                    }
                    else {
                        crop.waterCrop();
                        console.log("Waterer watered a crop!");
                    }

                    this.task = null;

                    this.scene.time.delayedCall(2200, () => {
                        if (this.circle.active) {
                            this.wateringCrop();
                        }
                    });
                }
            }

            return;
        }

        //planting familiars
        if (this.type !== "planter" || !this.task) {
            return;
        }

        //garderner reached crops
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
