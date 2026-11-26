// ref: https://www.youtube.com/watch?v=ow_Lum-Agbs&t=88s

class Familiar {
    constructor(scene, x, y, type, number) {
        this.scene = scene;
        this.type = type;
        this.number = number;

        // Create the familiars array if it does not exist
        if (!this.scene.familiars) {
            this.scene.familiars = [];
        }

        this.scene.familiars.push(this);

        // Create a sprite using the familiar's starting texture
        this.image = scene.add.sprite(x, y, this.number + "_Lsit");
        this.image.setDisplaySize(50, 50);
        this.image.setDepth(10);
        this.image.setInteractive();

        // Starting movement settings
        this.facing = "L";
        this.speed = 60;
        this.targetX = x;
        this.targetY = y;
        this.task = null;
        this.affection = 10;

        // Increase affection when the player clicks the familiar
        this.image.on("pointerdown", () => {
            this.increase(1);
            console.log(this.type, "affection:", this.affection);
        });

        // Decrease affection every 30 seconds
        this.timer = this.scene.time.addEvent({
            delay: 30000,
            callback: () => {
                this.lose(1);
                console.log("Losing affection:", this.type, this.affection);
            },
            loop: true
        });

        // Start the familiar's behaviour depending on its type
        if (this.type === "planter") {
            this.destination();
        }
        else if (this.type === "waterer") {
            this.wateringCrop();
        }
        else {
            this.wanderer();
        }
    }

    // AFFECTION

    // Increase affection, up to a maximum of 10
    increase(amount) {
        this.affection = Math.min(10, this.affection + amount);
    }

    // Decrease affection and remove the familiar when it reaches 0
    lose(amount) {
        if (this.affection >= amount) {
            this.affection -= amount;

            if (this.affection === 0) {
                this.leave();
            }

            return true;
        }

        return false;
    }

    // Remove the familiar from the garden
    leave() {
        this.timer.remove();
        this.image.destroy();

        // Remove this familiar from the array
        this.scene.familiars = this.scene.familiars.filter(
            familiar => familiar !== this
        );
    }

    // MOVEMENT

    // Find a seed and an available plot for the planter
    destination() {
        if (this.type !== "planter" || !this.image.active) {
            return;
        }

        // Find a seed that has not been planted, carried, or harvested
        const crop = this.scene.crops.find(crop =>
            crop.active &&
            !crop.isPlanted &&
            !crop.isBeingCarried &&
            !crop.isHarvested
        );

        // Find the first unoccupied plot
        const plot = this.scene.plots.find(plot => !plot.occupied);

        if (crop && plot) {
            crop.isBeingCarried = true;

            // Store the current task
            this.task = {
                crop: crop,
                plot: plot,
                phase: "crop"
            };

            // Move towards the seed
            this.targetX = crop.x;
            this.targetY = crop.y;
        }
        else {
            // Wander around when there are no available seeds or plots
            this.task = null;
            this.wanderer();
        }
    }

    // Find a planted crop that needs watering
    wateringCrop() {
        if (this.type !== "waterer" || !this.image.active) {
            return;
        }

        const crop = this.scene.crops.find(crop =>
            crop.active &&
            crop.isPlanted &&
            !crop.isBeingCarried &&
            !crop.isHarvested &&
            !crop.isBeingWatered
        );

        if (crop) {
            // Store the watering task
            this.task = {
                crop: crop,
                phase: "watering"
            };

            // Mark the crop so another familiar does not select it
            crop.isBeingWatered = true;

            // Move towards the crop
            this.targetX = crop.x;
            this.targetY = crop.y;
        }
        else {
            // Wander around when there are no crops to water
            this.task = null;
            this.wanderer();
        }
    }

    // Move to a random location when there are no tasks
    wanderer() {
        if (!this.image.active) {
            return;
        }

        this.task = null;

        // Choose a random destination
        this.targetX = Phaser.Math.Between(50, 910);
        this.targetY = Phaser.Math.Between(50, 350);

        // Wait before choosing another task
        this.scene.time.delayedCall(
            Phaser.Math.Between(1500, 3000),
            () => {
                // Stop if the familiar has been removed
                if (!this.image.active) {
                    return;
                }

                // Return to the familiar's normal behaviour
                if (this.type === "planter") {
                    this.destination();
                }
                else if (this.type === "waterer") {
                    this.wateringCrop();
                }
                else {
                    this.wanderer();
                }
            }
        );
    }

    // UPDATE MOVEMENT AND TASKS

    update(time, delta) {
        if (!this.image.active) {
            return;
        }

        // Calculate the distance between the sprite and its destination
        const dx = this.targetX - this.image.x;
        const dy = this.targetY - this.image.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Move the sprite if it has not reached its destination
        if (distance > 3) {

            // Update which direction the familiar is facing
            if (dx < 0) {
                this.facing = "L";
            }
            else if (dx > 0) {
                this.facing = "R";
            }

            // Change to the moving sprite texture
            this.image.setTexture(this.number + "_" + this.facing + "move");

            // Calculate movement speed based on affection
            const currentSpeed = this.speed * (this.affection / 10);
            const step = currentSpeed * (delta / 1000);

            // Move towards the destination
            if (step >= distance) {
                this.image.setPosition(this.targetX, this.targetY);
            }
            else {
                this.image.x += (dx / distance) * step;
                this.image.y += (dy / distance) * step;
            }
        }
        else {
            // Change to the sitting sprite when movement stops
            this.image.setTexture(this.number + "_" + this.facing + "sit");
        }

        // WATERING FAMILIARS

        if (this.type === "waterer") {
            if (!this.task) {
                return;
            }

            const crop = this.task.crop;

            // Check whether the assigned crop is still available
            if (!crop || !crop.active || !crop.isPlanted || crop.isHarvested) {

                // Release the crop if it still exists
                if (crop && crop.active) {
                    crop.isBeingWatered = false;
                }

                this.task = null;
                this.wateringCrop();
                return;
            }

            // Calculate the distance between the familiar and the crop
            const cropDistance = Phaser.Math.Distance.Between(
                this.image.x,
                this.image.y,
                crop.x,
                crop.y
            );

            // Water or harvest the crop when close enough
            if (cropDistance <= 30) {

                if (crop.isFullyGrown) {
                    crop.harvestCrop();
                    console.log("Waterer harvested a crop!");
                }
                else {
                    const watered = crop.waterCrop();

                    if (watered) {
                        console.log("Waterer watered a crop!");
                    }
                    else {
                        // Release the crop if it cannot be watered
                        crop.isBeingWatered = false;
                        this.task = null;

                        this.scene.time.delayedCall(500, () => {
                            if (this.image.active) {
                                this.wateringCrop();
                            }
                        });

                        return;
                    }
                }

                // Release the crop after completing the task
                crop.isBeingWatered = false;
                this.task = null;

                // Wait before looking for another crop
                this.scene.time.delayedCall(2200, () => {
                    if (this.image.active) {
                        this.wateringCrop();
                    }
                });
            }

            return;
        }

        // PLANTING FAMILIARS

        // Only planter familiars can plant seeds
        if (this.type !== "planter" || !this.task) {
            return;
        }

        // Check if the familiar has reached its assigned seed
        if (this.task.phase === "crop" && distance <= 3) {
            this.task.phase = "plot";

            // Change destination to the assigned plot
            this.targetX = this.task.plot.x;
            this.targetY = this.task.plot.y;
        }

        // Carry the seed while moving towards the plot
        if (this.task.phase === "plot") {

            this.task.crop.setPosition(this.image.x + 25, this.image.y);

            // Calculate distance to the plot
            const plotDistance = Phaser.Math.Distance.Between(
                this.image.x,
                this.image.y,
                this.targetX,
                this.targetY
            );

            // Plant the seed when the familiar reaches the plot
            if (plotDistance <= 3) {
                const crop = this.task.crop;
                const plot = this.task.plot;

                crop.isBeingCarried = false;

                // Plant the crop in the assigned plot
                if (crop.plantInPlot(plot)) {
                    console.log("Familiar planted a crop!");
                }
                else {
                    console.log("Could not plant crop.");
                }

                // Clear the task and look for another seed
                this.task = null;
                this.destination();
            }
        }
    }
}

window.Familiar = Familiar;