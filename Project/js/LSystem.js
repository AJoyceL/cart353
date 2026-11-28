//L systems to animate plant growth
//Ref:
// https://www.youtube.com/watch?v=TOPxa1xIG5Q 
// https://www.youtube.com/watch?v=3Mu0--aGfqg
// https://www.youtube.com/watch?v=1hcCpLQwI-c

// https://www.houdinikitchen.net/wp-content/uploads/2019/12/L-systems.pdf
export default class LSystem {
    constructor(scene, x, y, options = {})
    {
        this.scene = scene;

        //Starting position
        this.x = x;
        this.y = y;

        //Settiing
        if (options.len !== undefined)
        {
            this.len = options.len;
        }
        else 
        {
            this.len = 2;
        }

        if (options.ang !== undefined)
        {
            this.ang = options.ang;
        }
        else 
        {
            this.ang = 25;
        }

        if (options.maxGen !== undefined)
        {
            this.maxGen = options.maxGen;
        }
        else 
        {
            this.maxGen = 4;
        }

        if (options.growthRate !== undefined)
        {
            this.growthRate = options.growthRate;
        }
        else{
            this.growthRate = .0005;
        }

        //Current generation
        this.word = "X";
        this.currGen = 0;
        this.growthPercent = 0;
        this.isGrowing = false;

        //Create phaser graphic
        this.graphics = scene.add.graphics();
        this.graphics.setDepth(3);

        this.clickZone = scene.add.zone(x, y - 40, 80, 120);
        this.clickZone.setInteractive();
        this.clickZone.setDepth(10);

        this.clickZone.on("pointerdown", () => {
            if (this.currGen < this.maxGen && !this.isGrowing) {
                this.grow();
            }
            else if (this.onHarvest) {
                this.onHarvest();
            }
        });

        //Rules
        this.type = options.type || 1;

        const cropRules =
        {
            //Sage
            1: {
                ang: 25,
                rules: {
                    X: "F[+X][-X]FX", //Branches
                    F: "FF", //Stem
                }
            },

            //Thyme
            2: {
                ang: 25,
                rules: {
                    X: "F[+X][-X]F[+X][-X]FX",
                    F: "FF"
                }
            },

            //Mugwort
            3: {
                ang: 20,
                rules: {
                    X: "F[+X]F[-X]F[+X][-X]FX",
                    F: "FF"
                }
            },

            //Hemlock
            4: {
                ang: 30,
                rules: {
                    X: "F[-X]F[-X][+X]XC",
                    F: "FF"
                }
            },

            //Yarrow
            5: {
                ang: 30,
                rules: {
                    X: "F[+X]F[[-X][+X]]FC",
                    F: "FF"
                }
            }, 

            //Fairy cup
            6: {
                ang: 30,
                rules: {
                    X: "F[+FC][-FC]F[++FC][-FC]+F[+FC][-FC]F",
                    F: "FF"
                }
            }
        };

        const selectCrop = cropRules[this.type] || cropRules[1];

        this.ang = selectCrop.ang;

        this.rules = {
            X: selectCrop.rules.X,
            F: selectCrop.rules.F
        };
        
        //Draws
        this.draw();
    }


    //GENERATE NEW LSYSTEM
   generate()
    {
        let next = "";

        for (let i = 0; i < this.word.length; i++)
        {
            const c = this.word[i];
            const rule = this.rules[c];

            if (c in this.rules)
            {
                if (Array.isArray(rule))
                {
                    next += this.chooseOne(rule);
                }
                else
                {
                    next += rule;
                }
            }
            else
            {
                next += c;
            }
        }

        this.word = next;
    }


    //CHOOSE RANDOM RULE
    chooseOne(ruleSet)
    {
        const n = Math.random();
        let total = 0;

        for (let i = 0; i < ruleSet.length; i++)
        {
            total += ruleSet[i].prob;

            if (total > n)
            {
                return ruleSet[i].rule;
            }
        }

        return "";
    }


    //GROW 
    grow()
    {
        if (this.currGen >= this.maxGen) {
            return;
        }

        this.generate();
        this.currGen++;

        this.growthPercent = 0;
        this.isGrowing = true;
    }


    //UPDATE
    update(delta)
    {
        if (this.isGrowing) {
            this.growthPercent += this.growthRate * delta;

            if (this.growthPercent >= 1) {
                this.growthPercent = 1;
                this.isGrowing = false;

                if (this.currGen === this.maxGen && this.onFullyGrown) {
                    this.onFullyGrown();
                }
            }

            this.draw();
        }
    }


    //DRAW PLANT
    draw()
    {
        //clear previous
        this.graphics.clear();

        //keep growth between 0 - 1
        const t = Phaser.Math.Clamp(this.growthPercent, 0, 1);

        //Start pos + d
        let x = this.x;
        let y = this.y;
        let d = -90;

        //save
        const stack =[];

        //Check
        let lerpOn = false;

        for (let i = 0; i < this.word.length; i++)
        {
            const c = this.word[i];

            //start
            if (c === "(")
            {
                lerpOn = true;
                continue;
            }

            //stop
            if (c ===")")
            {
                lerpOn = false;
                continue;
            }

            //only animate charcater inside ()
            let lerpT = 1;

            if (lerpOn)
            {
                lerpT = t;
            }

            //draw stem + move forward
            if (c === "F")
            {
                const radians = Phaser.Math.DegToRad(d);

                const newX = x + Math.cos(radians) * this.len * lerpT;
                const newY = y + Math.sin(radians) * this.len * lerpT;

                this.graphics.lineStyle(2, 0x586661, 1);
                this.graphics.lineBetween(x, y, newX, newY);

                x = newX;
                y = newY;
            }
            //rotate right
            else if (c === "+")
            {
                d -= this.ang * lerpT;
            }
            //rotate left
            else if (c === "-")
            {
                d += this.ang * lerpT;
            }

            //save pos and d
            else if (c === "[")
            {
                stack.push({
                    x: x,
                    y: y,
                    d: d
                });
            }

            //restore previous pos and d
            else if (c === "]")
            {
                const previous = stack.pop();

                if (previous)
                { x = previous.x;
                    y = previous.y;
                    d = previous.d;
                }
            }

            // Draw small flowers
            else if (c === "C") {
                this.graphics.fillStyle(0xe3e1dc, 1);

                this.graphics.fillCircle(
                    x,
                    y,
                    this.len * 0.7 * lerpT
                );
            }
        }
    }

    destroy()
    {
        this.clickZone.destroy();
        this.graphics.destroy();
    }
}

window.LSystem = LSystem;