//IMPORTS
import Shop from "./scene/Shop.js"; //shop scene
import Wallet from "./Wallet.js"; //wallet class
import Seed from "./Seed.js"; //seeds class


//CLASSES
class Plot //draws garden plot
{
    constructor(scene, x, y)
    {
        this.scene = scene; 
        this.x = x; 
        this.y = y; 

        this.occupied = false; //tracks occupancy

        this.rectangle = scene.add.rectangle(x, y, 100, 100, 0x7d7482); //creates rec
        this.rectangle.setInteractive();

        //MOUSE EVENTS
        //ref: https://docs.phaser.io/api-documentation/namespace/input-events
        this.rectangle.on("pointerover", () => {
            this.rectangle.setFillStyle(0x574f5c); //darken when hovering
        });
        this.rectangle.on("pointerout", () => {
            this.rectangle.setFillStyle(0x7d7482); //return colour
        });
    };

    //check center of plot 
    contains(x, y)
    {
        return (
            x >= this.x - 50 &&
            x <= this.x + 50 &&
            y >= this.y - 50 &&
            y <= this.y + 50
        );
    };
}

class text //draws text
{
    constructor(scene, x, y, text)
    {
        this.scene = scene;
        this.text = scene.add.text(x, y, text, { fontSize: "28px", fill: "#1f1a25" });
        this.text.setOrigin(.5, .5);
        this.text.setDepth(9);
    }
}

class MagicBar{ //draws magic count
    constructor(scene, x, y, text)
    {
        this.scene = scene;
        this.text = scene.add.text(x, y, text, { fontSize: "32px", fill: "#c9b5e5"});
        this.text.setOrigin(.5, .5);
        this.text.setAlpha(0);
    }

}


//PHASER GAME CONFIGURATION
const config = {
    width: 960,
    height: 600,
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics:
    {
        default: "arcade",
        arcade: 
        {
            gravity:{y: 0},
            debug: true
        }
    },
    scene: 
    [
        {
            key: "Garden",
            init: init,
            preload: preload,
            create: create,
            update: update, 
        },
        Shop,
    ]

};

const game = new Phaser.Game(config); //create Phaser game


function preload()
{
    //will add
}


function init()
{
    //initilise text counts
    this.type1Count = 0;
    this.type2Count = 0;
    this.type3Count = 0;
    this.type4Count = 0;
    this.type5Count = 0;
    this.type6Count = 0;

    this.magicCount = 0; //magic level

}


function create()
{
    //GRID
    this.grid = this.add.grid(480, 200, 300, 300, 100, 100, 0x543f13, 0, 0x574f5c, 1); //draws grid
    this.grid.setDepth(2);

    //PLOT
    //draws 9 plot
    this.plot1 = new Plot(this, 380, 200);
    this.plot2 = new Plot(this, 480, 200);
    this.plot3 = new Plot(this, 580, 200);

    this.plot4 = new Plot(this, 380, 100);
    this.plot5 = new Plot(this, 480, 100);
    this.plot6 = new Plot(this, 580, 100);

    this.plot7 = new Plot(this, 380, 300);
    this.plot8 = new Plot(this, 480, 300);
    this.plot9 = new Plot(this, 580, 300);

    //store plots in array
    this.plots = [
        this.plot1,
        this.plot2,
        this.plot3,
        this.plot4,
        this.plot5,
        this.plot6,
        this.plot7,
        this.plot8,
        this.plot9
    ];


    //CROP & SEEDS
    this.crops = []; //store crop in array
    this.newSeeds = []; //store seeds in array

    //draws seed types to scene
    this.addSeed = (type) =>
    {
        const seed = Seed.createSeed(this, type);

        if (seed)
        {
            makeDraggable(seed.circle, this);

            //crop info
            seed.circle.on("pointerdown", () => {
                let infoText = "";

                if (this.cropInfoText) {
                    this.cropInfoText.destroy(); //destroy previous text
                }
                //call crop secific text
                if (seed.circle.type === "1") {
                    infoText = "Apple! You bought it for 5$";
                } 
                else if (seed.circle.type === "2") {
                    infoText = "Orange! You bought it for 8$";
                } 
                else if (seed.circle.type === "3") {
                    infoText = "Berry! You bought it for 15$";
                }
                else if (seed.circle.type === "4") {
                    infoText = "Seed 4! You bought it for 20$";
                }   
                else if (seed.circle.type === "5") {
                    infoText = "Seed 5! You bought it for 28$";
                }
                else if (seed.circle.type === "6") {
                    infoText = "Seed 6! You bought it for 35$";
                }
                else{
                    return;
                }
                
                this.cropInfoText = this.add.text(25, 425, infoText, { fontSize: "16px", fill: "#1f1a25" });
                this.cropInfoText.setDepth(10);
                this.cropInfoText.setOrigin(0, 0);
            });
        }
    };


    //TEXT
    //draws text
    this.type1Text = new text(this, 675, 475, "0");
    this.type2Text = new text(this, 775, 475, "0");
    this.type3Text = new text(this, 875, 475, "0");
    this.type4Text = new text(this, 675, 575, "0");   
    this.type5Text = new text(this, 775, 575, "0");
    this.type6Text = new text(this, 875, 575, "0");

    this.magicBar = new MagicBar(this, 100, 50, "Magic: 0"); //magic level is invisible
    

    //WALLET 
    this.wallet = new Wallet(this, 900, 50);
    this.events.on("resume", () => {
        this.wallet.update(); //update wallet when returning to garden
    });


    //KEYBOARD INPUT
    //ref: https://docs.phaser.io/api-documentation/function/input
    this.arrows = this.input.keyboard.createCursorKeys();


    //FAMILIARS
    this.familiars = []; //store familiars in array
    
    this.planterCreated = false; //track type
    this.watererCreated = false; //track type

    this.familiars.push (new Familiar(this, 700, 350, 0xcf598e, "wanderer")); //draws wandering familiar


    //INVENTORY
    this.inventory = [];//inventory array
    this.inventory.push (new Inventory(this, 0, 400, 960, 200)); //draws inventory


    //BUTTONS
    this.buttons = [];
    this.buttons.push (new Button(this, -20, 325, 150, 50, 0xe9e1f2, "shop"));
}


function update(time, delta)
{
    //access seeds
    //ref: https://docs.phaser.io/api-documentation/class/data-datamanager
    const pendingSeeds = this.game.registry.get("pendingSeeds") || [];

    //check seeds
    while (pendingSeeds.length > 0)
    {
        const type = pendingSeeds.shift(); //
        console.log("Creating seed:", type);
        this.addSeed(type);
    }


    //FAMILIAR UPDATES
    //calls familiars
    if (this.familiars) {
        this.familiars.forEach(familiar => {
            familiar.update(time, delta);
        });
    }
}


//SEEDS
function addSeed(type)
{
    const seed = Seed.createSeed(this, type);

    if (seed) 
    {
        makeDraggable(seed.circle, this);
    }
}


//DRAGGING + CROP BEHAVIOUR
//ref: https://youtu.be/jWglIBp4usY?si=ewJsWkuTyCx2tdrG
//ref: https://youtu.be/mWaLFYbLWIk?si=Mu9LVW4tv0-V9yNH
function makeDraggable(gameObject, scene, enableLogs = false) 
{
    //crop growth variables
    let growthStage = 0; //crop size
    let planted = false; //crop movable
    let fullyGrown = false; //crop harvested
    let plantedPlot = null; //plot occupied
    let familiarWatering = false; //familiar watering

    gameObject.setInteractive();

    //public state for familiars to check
    gameObject.isPlanted = false;
    gameObject.isBeingCarried = false;
    gameObject.isHarvested = false;
    gameObject.isFullyGrown = false;
    gameObject.harvestCrop = harvestCrop; //calls harvesting function


    //DEBUG
    function log(message)
    {
        if (enableLogs)
        {
            console.log(message);
        }
    };


    //FAMILIAR PLANTING FUNCTION
    gameObject.plantInPlot = function(plot) {
        //stop if plot occupied
        if (planted || plot.occupied) {
            return false;
        }

        gameObject.setPosition(plot.x, plot.y); //move seed to center

        //record which plot this crop occupies
        plot.occupied = true;
        plantedPlot = plot;

        //update crop
        planted = true;
        fullyGrown = false;
        gameObject.isPlanted = true;
        gameObject.isHarvested = false;
        gameObject.isFullyGrown = false;

        //reset harvested crop
        growthStage = 0;
        gameObject.setScale(1);
        growFruit();

        return true;
    }


    //FAMILIAR WATERING FUNCTION
    gameObject.waterCrop = function() {
        //stop if no planted crop
        if (!planted || fullyGrown || familiarWatering) {
            return false;
        }

        familiarWatering = true;
        growFruit();

        return true;
    };


    //HARVESTING FUNCTION
    function harvestCrop() {
        //stop harvesting until complete
        if (!fullyGrown) {
            return;
        }

        gameObject.setScale(3); //grow crop
        gameObject.disableInteractive();

        //free plot after harvesting
        if (plantedPlot) {
            plantedPlot.occupied = false;
            plantedPlot = null;
        }

        //reset states
        planted = false;
        fullyGrown = false;
        gameObject.isPlanted = false;
        gameObject.isFullyGrown = false;
        growthStage = 0;
        gameObject.isHarvested = true;

        //UPDATE MAGIC
        scene.magicCount++;
        scene.magicBar.text.setText("Magic: " + scene.magicCount);

        //calls planter familiar
        if (scene.magicCount >= 1 && !scene.planterCreated) {
            scene.planterCreated = true;
            scene.familiars.push(new Familiar(scene, 700, 50, 0x2c2a59, "planter"));
        }

        //calls waterer familiar
        if (scene.magicCount >= 2 && !scene.watererCreated) {
            scene.watererCreated = true;
            scene.familiars.push(new Familiar(scene, 700, 50, 0xa1f7e3, "waterer"));
        }

        //HARVESTING + INCREASE COUNT
        if (gameObject.type === "1") {
            gameObject.setPosition(650, 475);
            scene.type1Count++;
            scene.type1Text.text.setText(scene.type1Count);
        }
        else if (gameObject.type === "2") {
            gameObject.setPosition(750, 475);
            scene.type2Count++;
            scene.type2Text.text.setText(scene.type2Count);
        }
        else if (gameObject.type === "3") {
            gameObject.setPosition(850, 475);
            scene.type3Count++;
            scene.type3Text.text.setText(scene.type3Count);
        }
        else if (gameObject.type === "4") {
            gameObject.setPosition(650, 475);
            scene.type4Count++;
            scene.type4Text.text.setText(scene.type4Count);
        }
        else if (gameObject.type === "5") {
            gameObject.setPosition(750, 475);
            scene.type5Count++;
            scene.type5Text.text.setText(scene.type5Count);
        }
        else if (gameObject.type === "6") {
            gameObject.setPosition(850, 475);
            scene.type6Count++;
            scene.type6Text.text.setText(scene.type6Count);
        }

        console.log("Crop harvested!"); //debug
    }


    //ONDRAG FUNTION
    function onDrag(pointer, dragObject, dragX, dragY) 
    {
        log(`[makeDraggable:onDrag] invoked for game object: ${gameObject.name}`);

        if (dragObject !== gameObject) {
            return;
        }

        //stop drag if planted and fully grown
        if(planted && !fullyGrown){
            return;
        };

        //follow pointer position
        gameObject.setPosition(dragX, dragY);
    }


    //GROW FRUIT
    function growFruit() {
        growthStage++; //advance crop size

        //animate growth
        //ref:  https://docs.phaser.io/api-documentation/class/tweens-tweenmanager
        scene.tweens.add({
            targets: gameObject,
            scale: gameObject.scale + 1.5,
            duration: 1500, //time is 5000
            ease: "Sine.easeInOut",

            //run when complete
            onComplete: () => {
                familiarWatering = false;

                //trigger watering 
                if (growthStage < 3) { //max growth is 5
                    gameObject.once("pointerdown", () => {
                        growFruit();
                    });
                } 
                //trigger harvesting when fully grown
                else {
                    fullyGrown = true;
                    gameObject.isFullyGrown = true;
                    gameObject.once("pointerdown", harvestCrop);
                }
            }
        });
    }


    //STOPDRAG FUNCTION
    function stopDrag(pointer) 
    {
        log(`[makeDraggable:stopDrag] invoked for game object: ${gameObject.name}`);

        //find plot containing crop
        //ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        const plot = scene.plots.find(plot =>
            plot.contains(gameObject.x, gameObject.y)
        );

        //DEBUG 
        //check plot state
        if (!plot) {
            console.log("Crop was not dropped over a plot.");
        }
        else if (plot.occupied) {
            console.log("This plot is already occupied.");
        }
        else if (planted) {
            console.log("This crop is already planted.");
        }
        else {
            //snap seed to center
            gameObject.setPosition(plot.x, plot.y);

            //record state
            plot.occupied = true;
            plantedPlot = plot;
            planted = true;
            fullyGrown = false;
            gameObject.isPlanted = true;

            //reset size + start animation
            growthStage = 0;
            gameObject.setScale(1);
            growFruit(); //calls grow funtion

            //stop planter from picking planted seed
            if (scene.familiar1 && scene.familiar1.task &&
                scene.familiar1.task.crop === gameObject) {
                gameObject.isBeingCarried = false;
                scene.familiar1.task = null;
                scene.familiar1.destination();
            }
        }    
        
        //interactions
        gameObject.on(Phaser.Input.Events.POINTER_DOWN, startDrag);
        gameObject.off(Phaser.Input.Events.POINTER_UP, stopDrag);
        gameObject.off(Phaser.Input.Events.POINTER_MOVE, onDrag);

        //allow harvesting fully grown fruit
        if (fullyGrown)
        {
            gameObject.on(Phaser.Input.Events.POINTER_DOWN, startDrag);
        }
    }


    //STARTDRAG FUNCTION
    function startDrag() {
        //stop when planted + fully grown
        if (planted && !fullyGrown) {
            return;
        }

        log(`[makeDraggable:startDrag] invoked for game object: ${gameObject.name}`);
    }

    //listens for clicks
    //ref: https://docs.phaser.io/api-documentation/namespace/input-events
    scene.input.setDraggable(gameObject); //makes draggable
    scene.input.on(Phaser.Input.Events.DRAG, onDrag);
    scene.input.on(Phaser.Input.Events.DRAG_END, (pointer, dragObject) => { 
        if (dragObject === gameObject) {
            stopDrag(pointer);
        }
    });
}

//CLASS SCRIPTS
window.Familiar = Familiar; //familiar
