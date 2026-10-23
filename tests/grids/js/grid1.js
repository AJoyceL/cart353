

//CLASSES
class Plot //draws plots
{
    constructor(scene, x, y)
    {
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.occupied = false; //plot empty

        this.rectangle = scene.add.rectangle(x, y, 100, 100, 0x7d7482);
        this.rectangle.setInteractive();

        //MOUSE EVENTS
        this.rectangle.on("pointerover", () => {
            this.rectangle.setFillStyle(0x574f5c);
        });
        this.rectangle.on("pointerout", () => {
            this.rectangle.setFillStyle(0x7d7482);
        });
    };

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

class Apple //apples class
{
    constructor (scene, x, y)
    {
        this.scene = scene;
        this.circle = scene.add.circle(x, y, 15, 0x70a9ba);
        this.circle.setInteractive();
        this.circle.setDepth(3);
        
        makeDraggable(this.circle, scene);
    };
}

class Orange //oranges class
{
    constructor (scene, x, y)
    {
        this.scene = scene;
        this.circle = scene.add.circle(x, y, 15, 0x78f6638);
        this.circle.setInteractive();
        this.circle.setDepth(3);
        
        makeDraggable(this.circle, scene);
    };
}

class Berry //berries class
{
    constructor (scene, x, y)
    {
        this.scene = scene;
        this.circle = scene.add.circle(x, y, 15, 0x914359);
        this.circle.setInteractive();
        this.circle.setDepth(3);
        
        makeDraggable(this.circle, scene);
    };
}

class text //text class
{
    constructor(scene, x, y, text)
    {
        this.scene = scene;
        this.text = scene.add.text(x, y, text, { fontSize: "32px", fill: "#7e699b" });
        this.text.setOrigin(.5, .5);
    }
}

class MagicBar{
    constructor(scene, x, y, text)
    {
        this.scene = scene;
        this.text = scene.add.text(x, y, text, { fontSize: "32px", fill: "#7e699b" });
        this.text.setOrigin(.5, .5);
    }

}

const config = {
    width: 800,
    height: 400,
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

const game = new Phaser.Game(config);

function preload()
{

}

function init()
{
    //initilise fruit counts
    this.appleCount = 0;
    this.orangeCount = 0;
    this.berryCount = 0;
    this.magicCount = 0;
}

function create()
{
    //GRID
    this.grid = this.add.grid(400, 200, 300, 300, 100, 100, 0x543f13, 0, 0x574f5c, 1);
    this.grid.setDepth(2); //z-index

    //PLOT
    this.plot1 = new Plot(this, 300, 200);
    this.plot2 = new Plot(this, 400, 200);
    this.plot3 = new Plot(this, 500, 200);
    this.plot4 = new Plot(this, 300, 100);
    this.plot5 = new Plot(this, 400, 100);
    this.plot6 = new Plot(this, 500, 100);
    this.plot7 = new Plot(this, 300, 300);
    this.plot8 = new Plot(this, 400, 300);
    this.plot9 = new Plot(this, 500, 300);

    //plot arrays
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

    this.crops = [];

    //TEXT
    this.applesText = new text(this, 700, 150, "0");
    this.orangesText = new text(this, 700, 250, "0");
    this.berriesText = new text(this, 700, 350, "0");
    this.magicBar = new MagicBar(this, 100, 50, "Magic: 0");

    //KEYBOARD INPUT
    this.arrows = this.input.keyboard.createCursorKeys();

    //FAMILIARS
    this.familiars = [];
    

    this.planterCreated = false; //calls planter type

    this.familiars.push (new Familiar(this, 700, 350, 0xcf598e, "wanderer"));

    this.watererCreated = false;
}

function update(time, delta)
{
    //when pressed, create a new fruit and add it to the scene
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

    // Update all familiars
    if (this.familiars) {
        this.familiars.forEach(familiar => {
            familiar.update(time, delta);
        });
    }
}


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
    gameObject.isPlanted = false;
    gameObject.isBeingCarried = false;
    gameObject.isHarvested = false;
    gameObject.isFullyGrown = false;
    gameObject.harvestCrop = harvestCrop;

    function log(message)
    {
        if (enableLogs)
        {
            console.log(message);
        }
    };

    //FAMILIAR PLANTING
    gameObject.plantInPlot = function(plot) {
        if (planted || plot.occupied) {
            return false;
        }

        gameObject.setPosition(plot.x, plot.y);

        // Record which plot this crop occupies
        plot.occupied = true;
        plantedPlot = plot;

        planted = true;
        fullyGrown = false;
        gameObject.isPlanted = true;
        gameObject.isHarvested = false;
        gameObject.isFullyGrown = false;

        growthStage = 0;
        gameObject.setScale(1);
        growFruit();

        return true;
    }

    //FAMILIAR WATERING
    gameObject.waterCrop = function() {
        if (!planted || fullyGrown || familiarWatering) {
            return false;
        }

        familiarWatering = true;
        growFruit();

        return true;
    };

    function harvestCrop() {
        if (!fullyGrown) {
            return;
        }

        gameObject.setScale(1.5);
        gameObject.disableInteractive();

        if (plantedPlot) {
            plantedPlot.occupied = false;
            plantedPlot = null;
        }

        planted = false;
        fullyGrown = false;
        gameObject.isPlanted = false;
        gameObject.isFullyGrown = false;
        growthStage = 0;
        gameObject.isHarvested = true;

        // Update magic
        scene.magicCount++;
        scene.magicBar.text.setText("Magic: " + scene.magicCount);

        // Unlock planter
        if (scene.magicCount >= 1 && !scene.planterCreated) {
            scene.planterCreated = true;
            scene.familiars.push(new Familiar(scene, 700, 50, 0x2c2a59, "planter"));
        }

        // Unlock only one waterer after 2 harvests
        if (scene.magicCount >= 2 && !scene.watererCreated) {
            scene.watererCreated = true;
            scene.familiars.push(new Familiar(scene, 700, 50, 0xa1f7e3, "waterer"));
        }

        // Add harvested crop to inventory
        if (gameObject.fillColor === 0x70a9ba) {
            gameObject.setPosition(700, 100);
            scene.appleCount++;
            scene.applesText.text.setText(scene.appleCount);
        }
        else if (gameObject.fillColor === 0x78f6638) {
            gameObject.setPosition(700, 200);
            scene.orangeCount++;
            scene.orangesText.text.setText(scene.orangeCount);
        }
        else if (gameObject.fillColor === 0x914359) {
            gameObject.setPosition(700, 300);
            scene.berryCount++;
            scene.berriesText.text.setText(scene.berryCount);
        }

        console.log("Crop harvested!");
    }

    //ONDRAG FUNTION
    function onDrag(pointer) 
    {
        log(`[makeDraggable:onDrag] invoked for game object: ${gameObject.name}`);

        // Prevent dragging if the fruit is planted and not fully grown
        if(planted && !fullyGrown){
            return;
        };

        gameObject.x = pointer.x;
        gameObject.y = pointer.y;
    }

    
    //GROW FRUIT FUNCTION
    function growFruit() {
        growthStage++;

        //Animate the growth of the fruit by increasing its scale
        scene.tweens.add({
            targets: gameObject,
            scale: gameObject.scale + 0.5,
            duration: 2000,
            ease: "Sine.easeInOut",

            onComplete: () => {
                familiarWatering = false;

                //If fruit not fully grown, trigger next growth stage (watering crop)
                if (growthStage < 3) {
                    gameObject.once("pointerdown", () => {
                        growFruit();
                    });
                } 
                //If fruit fully grown, harvest crop + update count
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

        // Find the plot that contains the fruits
        const plot = scene.plots.find(plot =>
            plot.contains(gameObject.x, gameObject.y)
        );

        // If a plot is found + not occupied, plant the fruit
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
            // Snap crop to the centre of the plot
            gameObject.setPosition(plot.x, plot.y);

            // Mark the plot and crop as planted
            plot.occupied = true;
            plantedPlot = plot;
            planted = true;
            fullyGrown = false;
            gameObject.isPlanted = true;

            growthStage = 0;
            gameObject.setScale(1);
            growFruit();
            // Cancel the familiar1's task if it was targeting this crop
            if (scene.familiar1 && scene.familiar1.task &&
                scene.familiar1.task.crop === gameObject) {
                gameObject.isBeingCarried = false;
                scene.familiar1.task = null;
                scene.familiar1.destination();
            }
        }    
        

        gameObject.on(Phaser.Input.Events.POINTER_DOWN, startDrag);
        gameObject.off(Phaser.Input.Events.POINTER_UP, stopDrag);
        gameObject.off(Phaser.Input.Events.POINTER_MOVE, onDrag);

        // If the fruit is fully grown, allow it to be harvested again
        if (fullyGrown)
        {
            gameObject.on(Phaser.Input.Events.POINTER_DOWN, startDrag);
        }
    }

    //STARTDRAG FUNCTION
    function startDrag(pointer) {
        // Prevent dragging if the fruit is planted and not fully grown
        if (planted && !fullyGrown) {
            return;
        }

        log(`[makeDraggable:startDrag] invoked for game object: ${gameObject.name}`);

        gameObject.off(Phaser.Input.Events.POINTER_DOWN, startDrag);
        gameObject.on(Phaser.Input.Events.POINTER_UP, stopDrag);
        gameObject.on(Phaser.Input.Events.POINTER_MOVE, onDrag);
    }

    gameObject.on(Phaser.Input.Events.POINTER_DOWN, startDrag);
}

// //calls other scripts
window.Familiar = Familiar;
