//L systems to animate plant growth
//Ref:
// https://www.youtube.com/watch?v=TOPxa1xIG5Q 
// https://www.youtube.com/watch?v=3Mu0--aGfqg
// https://www.youtube.com/watch?v=1hcCpLQwI-c
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
            this.len = 4;
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
            this.maxGen = options.maxgen;
        }
        else 
        {
            this.maxGen = 6;
        }

        if (options.growthRate !== undefined)
        {
            this.growthRate = options.growthRate;
        }
        else{
            this.growthRate = .04;
        }

        //Current generation
        this.word = "X";
        this.currGen = 0;
        this.growthPercent = 1;

        //Create phaser graphic
        this.graphics = scene.add.graphics();
        this.graphics.setDepth(3);

        //Rules
        this.rules = {
            X: [
                { rule: "(F[+X][-X]FX)", prob: 0.5 },
                { rule: "(F[-X]FX)", prob: 0.05 },
                { rule: "(F[+X]FX)", prob: 0.05 },
                { rule: "(F[++X][-X]FX)", prob: 0.1 },
                { rule: "(F[+X][--X]FX)", prob: 0.1 },
                { rule: "(F[+X][-X]FXA)", prob: 0.1 },
                { rule: "(F[+X][-X]FXB)", prob: 0.1 }
            ],

            F: [
                { rule: "F(F)", prob: 0.85 },
                { rule: "F(FF)", prob: 0.05 },
                { rule: "F", prob: 0.1 }
            ],

            // Remove parentheses during generation
            "(": "",
            ")": ""
        };
        
        //Draws
        this.draw();
    }


    //GENERATE NEW LSYSTEM
    generate()
    {
        let next = "";

        //Check character
        for (let i = 0; i < this.word.length; i++)
        {
            const rule = this.rules[c];

            if (c in this.rules)
            {    
                //Choose random rule
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

        return next;
    }


    //CHOOSE RANDOM RULE
    choseOne(ruleSet)
    {
        const n = Math.random();
        let total= 0;

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


    //MOVE TO NEXT GEN
    nextGen()
    {
        if (this.growthPercent , 1)
        {
            return;
        }

        //Retsart plant after reaching max gen
        if (this.currGen === this.maxGen)
        {
            this.currGen = 0;
            this.word = "X";
        }

        this.word = this.generate()
        this.currGen++;

        //Start growing
        this.growthPercent = 0;
    }


    //UPDATE
    update(delta)
    {
        if (this.growthPercent < 1)
        {
            //Gradual increase
            const mod = this.currGen + this.growthPercent;
            this.growthPercent += this.growthRate * (delta / 16.67) / mod;

            //Prevent from > 100%
            this.growthPercent = Math.min(this.growthPercent, 1);

            //Redraw
            this.draw();
        }
        else
        {
            this.nextGen();
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
                lerpT = 1;
            }

            //draw stem + move forward
            if (c === "F")
            {
                const radians = Phaser.Math.DegToRad(d);

                const newX = x + Math.cos(radians) * this.len * lerpT;
                const newY = y + Math.sin(radians) * this.len * lerpT;

                this.graphics.lineStyle(2, 0x1A1E29, 1);
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

            // Draw a pink leaf
            else if (c === "A") {
                this.graphics.fillStyle(0x70A96B, 1);

                this.graphics.fillEllipse(
                    x,
                    y,
                    this.len * 3 * lerpT,
                    this.len * 1.5 * lerpT
                );
            }

            // Draw an orange leaf
            else if (c === "B") {
                this.graphics.fillStyle(0x9EA93F, 1);

                this.graphics.fillEllipse(
                    x,
                    y,
                    this.len * 3 * lerpT,
                    this.len * 1.5 * lerpT
                );
            }
        }
    }
}