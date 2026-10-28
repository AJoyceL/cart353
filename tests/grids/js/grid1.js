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

class Apple //draws apples
{
    constructor (scene, x, y)
    {
        this.scene = scene;
        this.circle = scene.add.circle(x, y, 15, 0x70a9ba);
        this.circle.setInteractive();
        this.circle.setDepth(3);
        
        makeDraggable(this.circle, scene); //allow apple to be dragged
    };
}

class Orange //draws oranges
{
    constructor (scene, x, y)
    {
        this.scene = scene;
        this.circle = scene.add.circle(x, y, 15, 0x78f6638);
        this.circle.setInteractive();
        this.circle.setDepth(3);
        
        makeDraggable(this.circle, scene); //allow orange to be dragged
    };
}

class Berry //draws berry
{
    constructor (scene, x, y)
    {
        this.scene = scene;
        this.circle = scene.add.circle(x, y, 15, 0x914359);
        this.circle.setInteractive();
        this.circle.setDepth(3);
        
        makeDraggable(this.circle, scene); //allow berry to be dragged
    };
}

class text //draws text
{
    constructor(scene, x, y, text)
    {
        this.scene = scene;
        this.text = scene.add.text(x, y, text, { fontSize: "32px", fill: "#1f1a25" });
        this.text.setOrigin(.5, .5);
        this.text.setDepth(9);
    }
}

class MagicBar{ //draws magic count
    constructor(scene, x, y, text)
    {
        this.scene = scene;
        this.text = scene.add.text(x, y, text, { fontSize: "32px", fill: "#c9b5e5" });
        this.text.setOrigin(.5, .5);
    }

}

//PHASER GAME CONFIGURATION
const config = {
    width: 960,
    height: 540,
    type: Phaser.AUTO,
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
    {
        init: init,
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config); //create Phaser game

function preload()
{
    //will add
}

function init()
{
    //initilise text counts
    this.appleCount = 0;
    this.orangeCount = 0;
    this.berryCount = 0;
    this.magicCount = 0;
}

function create()
{
    //GRID
    this.grid = this.add.grid(400, 200, 300, 300, 100, 100, 0x543f13, 0, 0x574f5c, 1); //draws grid
    this.grid.setDepth(2);

    //PLOT
    //draws 9 plot
    this.plot1 = new Plot(this, 300, 200);
    this.plot2 = new Plot(this, 400, 200);
    this.plot3 = new Plot(this, 500, 200);
    this.plot4 = new Plot(this, 300, 100);
    this.plot5 = new Plot(this, 400, 100);
    this.plot6 = new Plot(this, 500, 100);
    this.plot7 = new Plot(this, 300, 300);
    this.plot8 = new Plot(this, 400, 300);
    this.plot9 = new Plot(this, 500, 300);

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

    //CROP
    this.crops = []; //store crop in array

    //TEXT
    //draws text
    this.applesText = new text(this, 625, 500, "0");
    this.orangesText = new text(this, 775, 500, "0");
    this.berriesText = new text(this, 925, 500, "0");
    this.magicBar = new MagicBar(this, 100, 50, "Magic: 0");

    //KEYBOARD INPUT
    //ref: https://docs.phaser.io/api-documentation/function/input
    this.arrows = this.input.keyboard.createCursorKeys();

    //FAMILIARS
    this.familiars = []; //store familiars in array
    
    this.planterCreated = false; //track type
    this.watererCreated = false; //track type

    this.familiars.push (new Familiar(this, 700, 350, 0xcf598e, "wanderer")); //draws wandering familiar

    //Inventory
    this.inventory = [];//inventory array

    this.inventory.push (new Inventory(this, 0, 400, 960, 150)); //draws inventory

}

function update(time, delta)
{
    //KEYBOARD CONTROLS
    //buys fruits (temporary)
    //ref: https://docs.phaser.io/api-documentation/function/input
    if (Phaser.Input.Keyboard.JustDown(this.arrows.up))//adds apple
    {
        this.apple = new Apple(this, 50, 100);
        this.crops.push(this.apple.circle);
        console.log("buy apple")
    }

    if (Phaser.Input.Keyboard.JustDown(this.arrows.down))//adds orange
    {
        this.orange = new Orange(this, 50, 200);
        this.crops.push(this.orange.circle);
        console.log("buy orange")
    }

    if (Phaser.Input.Keyboard.JustDown(this.arrows.left))//adds berry
    {
        this.berry = new Berry(this, 50, 300);
        this.crops.push(this.berry.circle);
        console.log("buy berry")
    }

    //FAMILIAR UPDATES
    //calls familiars
    if (this.familiars) {
        this.familiars.forEach(familiar => {
            familiar.update(time, delta);
        });
    }
}

//DRAGGING + CROP BEHAVIOUR
//ref: https://youtu.be/jWglIBp4usY?si=ewJsWkuTyCx2tdrG
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

        gameObject.setScale(1.5); //grow crop
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
        if (gameObject.fillColor === 0x70a9ba) {
            gameObject.setPosition(600, 4);
            scene.appleCount++;
            scene.applesText.text.setText(scene.appleCount);
        }
        else if (gameObject.fillColor === 0x78f6638) {
            gameObject.setPosition(750, 4);
            scene.orangeCount++;
            scene.orangesText.text.setText(scene.orangeCount);
        }
        else if (gameObject.fillColor === 0x914359) {
            gameObject.setPosition(900, 4);
            scene.berryCount++;
            scene.berriesText.text.setText(scene.berryCount);
        }

        console.log("Crop harvested!"); //debug
    }

    //ONDRAG FUNTION
    function onDrag(pointer) 
    {
        log(`[makeDraggable:onDrag] invoked for game object: ${gameObject.name}`);

        //stop drag if planted and fully grown
        if(planted && !fullyGrown){
            return;
        };

        //follow pointer position
        gameObject.x = pointer.x;
        gameObject.y = pointer.y;
    }

    
    //GROW FRUIT
    function growFruit() {
        growthStage++; //advance crop size

        //animate growth
        //ref:  https://docs.phaser.io/api-documentation/class/tweens-tweenmanager
        scene.tweens.add({
            targets: gameObject,
            scale: gameObject.scale + 0.5,
            duration: 2000,
            ease: "Sine.easeInOut",

            //run when complete
            onComplete: () => {
                familiarWatering = false;

                //trigger watering 
                if (growthStage < 3) {
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
    function startDrag(pointer) {
        //stop when planted + fully grown
        if (planted && !fullyGrown) {
            return;
        }

        log(`[makeDraggable:startDrag] invoked for game object: ${gameObject.name}`);

        //interactions
        gameObject.off(Phaser.Input.Events.POINTER_DOWN, startDrag);
        gameObject.on(Phaser.Input.Events.POINTER_UP, stopDrag);
        gameObject.on(Phaser.Input.Events.POINTER_MOVE, onDrag);
    }

    gameObject.on(Phaser.Input.Events.POINTER_DOWN, startDrag); //listens for clicks
}

//CLASS SCRIPTS
window.Familiar = Familiar; //familiar
// window.Inventory = Inventory; //inventory
