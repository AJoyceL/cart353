
class Familiar {
    constructor(scene, x, y, color, type) {
        this.scene = scene;
        this.type = type;

        this.circle = scene.add.circle(x, y, 25, color);
        this.circle.setDepth(10);

        this.speed = 60; //movement speed
        this.targetX = x; //destination X
        this.targetY = y; //destination Y
        this.task = null; //task

        //calls behaviour
        //planter
        if (this.type === "planter") { 
            this.destination();
        }
        //calls waterer
        else if (this.type === "waterer") {
            this.wateringCrop();
        }
        //else, always wandering
        else {
            this.wanderer();
        }
    }

    destination() {
        //assigns planter task
        if (this.type !== "planter") {
            return
        }

        //find seed, carried or harvested
        //ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        const crop = this.scene.crops.find(crop => !crop.isPlanted && !crop.isBeingCarried && !crop.isHarvested);

        const plot = this.scene.plots.find(plot => !plot.occupied); //find first unoccipied plot

        if (crop && plot) {
            crop.isBeingCarried = true; //crop being carried

            //task action
            this.task = {
                crop: crop,
                plot: plot,
                phase: "crop"
            }

            //set destination
            this.targetX = crop.x;
            this.targetY = crop.y;
        } 
        else {
            //wander around when no seeds
            this.task = null;
            this.wanderer();
        }
    }

    //Waters crops when planted 
    wateringCrop() {
        if (this.type !== "waterer") return;

        //find planted crop
        // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        const crop = this.scene.crops.find(crop => crop.active && crop.isPlanted && !crop.isBeingCarried && !crop.isHarvested && !crop.isBeingWatered);

        if (crop) {
            //task action
            this.task = {
                crop: crop,
                phase: "watering"
            };

            crop.isBeingWatered = true; //mark crop

            //set destination
            this.targetX = crop.x;
            this.targetY = crop.y;
        } 
        else {
            //wander around when no crops
            this.task = null;
            this.wanderer();
        }
    }

    //move randomly when no crops
    wanderer() {
        this.task = null;

        //random direction
        //ref: https://docs.phaser.io/phaser/concepts/math
        this.targetX = Phaser.Math.Between(50, 750);
        this.targetY = Phaser.Math.Between(50, 350);

        //monvement delay
        //ref: https://docs.phaser.io/api-documentation/class/time-clock
        this.scene.time.delayedCall(Phaser.Math.Between(1500, 3000), () => {
            if (this.type === "planter") {
                this.destination();
            }
            else if (this.type === "waterer") {
                this.wateringCrop();
            }
            else {
                this.wanderer();
            }
        });

    }

    update(time, delta) {
        //calculate moveement distance
        const dx = this.targetX - this.circle.x;
        const dy = this.targetY - this.circle.y;
        const d = Math.sqrt(dx * dx + dy * dy); //ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt

        // Move towards the target
        if (d > 3) {
            const step = this.speed * (delta / 1000); //scale emovment by time

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
            if (!this.task) {
                return; //do nothing
            }    

            const crop = this.task.crop;

            //check if crop is active
            if (!crop || !crop.active || !crop.isPlanted || crop.isHarvested) {
                //release crop assignment if it still exists
                if (crop && crop.active) {
                    crop.isBeingWatered = false;
                }

                //search for crop
                this.task = null;
                this.wateringCrop();
                return;
            }

            //calculates distance
            //ref: https://docs.phaser.io/phaser/concepts/math
            const d = Phaser.Math.Distance.Between(this.circle.x, this.circle.y, crop.x, crop.y);

            //start watering + harvesting when close
            if (d <= 30) {
                if (crop.isFullyGrown) {
                    crop.harvestCrop(); //harvest crop
                    console.log("Waterer harvested a crop!");
                } 
                else {
                    const watered = crop.waterCrop(); //calls crop growth 

                    if (watered) {
                        console.log("Waterer watered a crop!");
                    } 
                    else {
                        crop.isBeingWatered = false; //release crop
                        this.task = null; //restart task

                        //ref: https://docs.phaser.io/api-documentation/class/time-clock
                        this.scene.time.delayedCall(500, () => {
                            if (this.circle.active) {
                                this.wateringCrop();
                            }
                        });

                        return;
                    }
                }

                //release crop
                crop.isBeingWatered = false;
                this.task = null;

                //delay before search
                //ref: https://docs.phaser.io/api-documentation/class/time-clock
                this.scene.time.delayedCall(2200, () => {
                    if (this.circle.active) {
                        this.wateringCrop();
                    }
                });
            }

            return; // stops watere from running planter
        }

        //planting familiars
        if (this.type !== "planter" || !this.task) {
            return;
        }

        //change task when reached seed
        if (this.task.phase === "crop" && d <= 3) {
            this.task.phase = "plot";
            this.targetX = this.task.plot.x;
            this.targetY = this.task.plot.y;
        }

        // Carry the seed while moving
        if (this.task.phase === "plot") {
            this.task.crop.setPosition(this.circle.x + 25, this.circle.y);

            //check distance
            //ref: https://docs.phaser.io/phaser/concepts/math
            const plotD = Phaser.Math.Distance.Between(this.circle.x, this.circle.y, this.targetX, this.targetY);

            //plant seed
            if (plotD <= 3) {
                const crop = this.task.crop;
                const plot = this.task.plot;

                crop.isBeingCarried = false; //not carried

                //debug
                if (crop.plantInPlot(plot)) {
                    console.log("Familiar planted a crop!");
                } 
                else {
                    console.log("Could not plant crop.");
                }

                this.task = null; //clear task when complete
                this.destination(); //look for crop
            }
        }
    }
}

window.Familiar = Familiar;
