// L-systems to animate plant growth
// References:
// https://www.youtube.com/watch?v=TOPxa1xIG5Q
// https://www.youtube.com/watch?v=3Mu0--aGfqg
// https://www.youtube.com/watch?v=1hcCpLQwI-c
// https://www.houdinikitchen.net/wp-content/uploads/2019/12/L-systems.pdf

export default class LSystem {

    constructor(scene, x, y, options = {})
    {
        // Store the Phaser scene so this class can create graphics and game objects.
        this.scene = scene;

        // Set the starting position of the plant.
        this.x = x;
        this.y = y;

        // Set the length of each stem. Default value is 2.
        if (options.len !== undefined)
        {
            this.len = options.len;
        }
        else
        {
            this.len = 2;
        }

        // Set the angle used when creating branches. Default value is 25 degrees.
        if (options.ang !== undefined)
        {
            this.ang = options.ang;
        }
        else
        {
            this.ang = 25;
        }

        // Set the maximum number of generations the plant can grow.
        if (options.maxGen !== undefined)
        {
            this.maxGen = options.maxGen;
        }
        else
        {
            this.maxGen = 4;
        }

        // Controls how quickly the plant's growth animation progresses.
        // A value of 0.2 makes the animation take approximately 5 seconds.
        if (options.growthRate !== undefined)
        {
            this.growthRate = options.growthRate;
        }
        else
        {
            this.growthRate = .2;
        }

        // Store the current L-system instructions.
        // X is the starting instruction for the plant.
        this.word = "X";

        // Track the current generation and animation progress.
        this.currGen = 0;
        this.growthPercent = 0;
        this.isGrowing = false;

        // Create the graphics object used to draw the plant.
        this.graphics = scene.add.graphics();
        this.graphics.setDepth(3);

        // Store the previous generation's instructions.
        this.previousWord = null;

        // Create an invisible clickable area around the plant.
        this.clickZone = scene.add.zone(x, y - 40, 80, 120);
        this.clickZone.setInteractive();
        this.clickZone.setDepth(10);

        // When the player clicks the plant, grow it or harvest it.
        this.clickZone.on("pointerdown", () => {

            // Grow if the plant has not reached its maximum generation
            // and is not currently growing.
            if (this.currGen < this.maxGen && !this.isGrowing)
            {
                this.grow();
            }

            // Harvest once the plant reaches its maximum generation.
            else if (this.currGen >= this.maxGen && this.onHarvest)
            {
                this.onHarvest();
            }
        });

        // Select which crop's L-system rules should be used.
        this.type = options.type || 1;

        // Each crop has its own rewriting rules and branching angle.
        const cropRules =
        {
            // Sage
            1: {
                ang: 25,
                rules: {
                    X: "F[+X][-X]FX",
                    F: "FF"
                }
            },

            // Thyme
            2: {
                ang: 25,
                rules: {
                    X: "F[+X][-X]F[+X][-X]FX",
                    F: "FF"
                }
            },

            // Mugwort
            3: {
                ang: 20,
                rules: {
                    X: "F[+X]F[-X]F[+X][-X]FX",
                    F: "FF"
                }
            },

            // Hemlock
            4: {
                ang: 30,
                rules: {
                    X: "F[-X]F[-X][+X]XC",
                    F: "FF"
                }
            },

            // Yarrow
            5: {
                ang: 30,
                rules: {
                    X: "F[+X]F[[-X][+X]]FC",
                    F: "FF"
                }
            },

            // Fairy cup
            6: {
                ang: 30,
                rules: {
                    X: "F[+FC][-FC]F[++FC][-FC]+F[+FC][-FC]F",
                    F: "FF"
                }
            }
        };

        // Find the selected crop's rules.
        // If the crop type is not found, use Sage's rules.
        const selectCrop = cropRules[this.type] || cropRules[1];

        // Apply the selected crop's branching angle.
        this.ang = selectCrop.ang;

        // Store the selected crop's rewriting rules.
        // X and F are replaced when a new generation is created.
        this.rules = {
            X: selectCrop.rules.X,
            F: selectCrop.rules.F
        };

        // Draw the plant in its initial state.
        this.draw();
    }


    // GENERATE A NEW L-SYSTEM GENERATION
    generate()
    {
        let next = "";

        // Read each character in the current L-system instruction string.
        for (let i = 0; i < this.word.length; i++)
        {
            const c = this.word[i];

            // Check if the character has a rewriting rule.
            if (c in this.rules)
            {
                // Replace the character with its corresponding rule.
                next += this.rules[c];
            }
            else
            {
                // Keep characters that do not have rewriting rules.
                // For example: +, -, [, ], and C.
                next += c;
            }
        }

        // Replace the old instruction string with the new generation.
        this.word = next;
    }


    // GROW THE PLANT
    grow()
    {
        // Stop if the plant has reached its maximum generation
        // or is already growing.
        if (this.currGen >= this.maxGen || this.isGrowing)
        {
            return;
        }

        // Save the current generation before creating the next one.
        this.previousWord = this.word;

        // Generate the next L-system generation.
        this.generate();

        // Increase the current generation number.
        this.currGen++;

        // Reset the animation progress and start growing.
        this.growthPercent = 0;
        this.isGrowing = true;

        // Draw the previous generation before animating the new one.
        this.draw();
    }


    // UPDATE THE GROWTH ANIMATION
    update(delta)
    {
        // Only update the animation while the plant is growing.
        if (this.isGrowing)
        {
            // Increase the growth percentage over time.
            // Divide delta by 1000 to convert milliseconds into seconds.
            this.growthPercent += this.growthRate * (delta / 1000);

            // Stop the animation once growth reaches 100%.
            if (this.growthPercent >= 1)
            {
                this.growthPercent = 1;
                this.isGrowing = false;

                // Notify the garden when the final generation is complete.
                if (this.currGen === this.maxGen && this.onFullyGrown)
                {
                    this.onFullyGrown();
                }
            }

            // Redraw the plant using the updated growth percentage.
            this.draw();
        }
    }


    // DRAW THE PLANT USING ITS L-SYSTEM INSTRUCTIONS
    draw()
    {
        // Clear the previous frame.
        this.graphics.clear();

        // Keep the growth percentage between 0 and 1.
        const t = Phaser.Math.Clamp(this.growthPercent, 0, 1);

        // Draw the previous generation completely first.
        if (this.previousWord)
        {
            this.drawWord(this.previousWord, this.previousWord.length);
        }

        // Calculate how many instructions of the new generation are visible.
        const visibleCount = Math.floor(this.word.length * t);

        // Draw the new generation progressively.
        this.drawWord(this.word, visibleCount);
    }


    // DRAW AN L-SYSTEM WORD
    drawWord(word, visibleCount)
    {
        // Set the starting drawing position and direction.
        let x = this.x;
        let y = this.y;
        let d = -90;

        // Store previous positions and directions for branches.
        const stack = [];

        // Process the instructions that should currently be visible.
        for (let i = 0; i < visibleCount; i++)
        {
            const c = word[i];

            if (c === "F")
            {
                const radians = Phaser.Math.DegToRad(d);

                const newX = x + Math.cos(radians) * this.len;
                const newY = y + Math.sin(radians) * this.len;

                this.graphics.lineStyle(2, 0x586661, 1);
                this.graphics.lineBetween(x, y, newX, newY);

                x = newX;
                y = newY;
            }
            else if (c === "+")
            {
                d -= this.ang;
            }
            else if (c === "-")
            {
                d += this.ang;
            }
            else if (c === "[")
            {
                stack.push({ x: x, y: y, d: d });
            }
            else if (c === "]")
            {
                const previous = stack.pop();

                if (previous)
                {
                    x = previous.x;
                    y = previous.y;
                    d = previous.d;
                }
            }
            else if (c === "C")
            {
                this.graphics.fillStyle(0xe3e1dc, 1);
                this.graphics.fillCircle(x, y, this.len * 0.7);
            }
        }
    }


    // REMOVE THE PLANT'S GAME OBJECTS
    destroy()
    {
        // Remove the clickable area.
        this.clickZone.destroy();

        // Remove the plant graphics.
        this.graphics.destroy();
    }
}

// Make the class accessible through window.
window.LSystem = LSystem;