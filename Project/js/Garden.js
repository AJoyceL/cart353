//IMPORTS
import Shop from "./scene/Shop.js"; //shop scene
import Menu from "./scene/Menu.js"; //menu scene
import Info from "./scene/Info.js"; //menu scene

import Wallet from "./Wallet.js"; //wallet class
import Seed from "./Seed.js"; //seeds class
import NPC from "./NPC.js"; //npc class
import CropCount from "./CropCount.js" //crop count class
import LSystem from "./LSystem.js"; // LSystem class

//PALETTE COLOUR
// {
//     #EDE6D8,
//     #C2B180,
//     #A89FB5,
//     #7A6C8C,
//     #2E2A3B,
//     #1A1E29
// }


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
        Menu,
        {
            key: "Garden",
            init: init,
            preload: preload,
            create: create,
            update: update, 
        },
        Shop,
        Info,
    ]

};

const game = new Phaser.Game(config); //create Phaser game


function preload()
{
    //BACKGROUND
    this.load.image('GardenBG', 'Images/Background/GardenBG.png');


    //GARDEN PLOT
    this.load.image('Garden', 'Images/Container/Garden.png');


    //INVENTORY
    this.load.image('Inventory', 'Images/Container/Inventory.png');


    //SHOPE
    this.load.image('Shop', 'Images/Button/Shop.png');
    this.load.image('ShopOn', 'Images/Button/ShopOn.png');


    //NPC 
    //Npc background
    this.load.image('npcFrame', 'Images/Container/npcFrame.png');

    //Answer NPC
    this.load.image('CallNPC', 'Images/Button/CallNPC.png');
    this.load.image('CallNPCOn', 'Images/Button/CallNPCOn.png');

    //Yes btn
    this.load.image('Yes', 'Images/Button/Yes.png');
    this.load.image('YesOn', 'Images/Button/YesOn.png');

    //No btn
    this.load.image('No', 'Images/Button/No.png');
    this.load.image('NoOn', 'Images/Button/NoOn.png');

    //Haggle btn
    this.load.image('Haggle', 'Images/Button/Haggle.png');
    this.load.image('HaggleOn', 'Images/Button/HaggleOn.png');

    //NPC sprites
    this.load.image('npc_demon', 'Images/NPC/npc_demon.png');
    this.load.image('npc_bunny', 'Images/NPC/npc_bunny.png');
    this.load.image('npc_cat', 'Images/NPC/npc_cat.png');
    this.load.image('npc_cryptid', 'Images/NPC/npc_cryptid.png');
    this.load.image('npc_doctor', 'Images/NPC/npc_doctor.png');
    this.load.image('npc_elk', 'Images/NPC/npc_elk.png');
    this.load.image('npc_ent', 'Images/NPC/npc_ent.png');
    this.load.image('npc_golemn', 'Images/NPC/npc_golemn.png');
    this.load.image('npc_ghost', 'Images/NPC/npc_ghost.png');
    this.load.image('npc_shroom', 'Images/NPC/npc_shroom.png');
    this.load.image('npc_slime', 'Images/NPC/npc_slime.png');
    this.load.image('npc_wizard', 'Images/NPC/npc_wizard.png');


    //OPTION WIDGET
    //Question mark
    this.load.image('Info', 'Images/Button/Info.png');
    this.load.image('InfoOn', 'Images/Button/InfoOn.png');

    //Widget
    this.load.image('Option', 'Images/Container/Option.png');

    //Exit widget
    this.load.image('Exit', 'Images/Button/Exit.png');
    this.load.image('ExitOn', 'Images/Button/ExitOn.png');

    //Instruction btn
    this.load.image('Intro', 'Images/Button/Intro.png');
    this.load.image('IntroOn', 'Images/Button/IntroOn.png');

    //Menu btn
    this.load.image('Menu', 'Images/Button/Menu.png');
    this.load.image('MenuOn', 'Images/Button/MenuOn.png');


    //WALLET
    this.load.image('Money', 'Images/Container/Money.png');


    //SEEDS & CROPS
    //Seed bank
    this.load.image('SeedBank', 'Images/Container/SeedBank.png');

    //Seed sprites
    this.load.image('SeedSage', 'Images/Crop/SeedSage.png');
    this.load.image('SeedThyme', 'Images/Crop/SeedThyme.png');
    this.load.image('SeedMugwort', 'Images/Crop/SeedMugwort.png');
    this.load.image('SeedHemlock', 'Images/Crop/SeedHemlock.png');
    this.load.image('SeedYarrow', 'Images/Crop/SeedYarrow.png');
    this.load.image('SeedFairyCup', 'Images/Crop/SeedFairyCup.png');


    //Crop information
    this.load.image('TxtSage', 'Images/Crop/TxtSage.png');
    this.load.image('TxtThyme', 'Images/Crop/TxtThyme.png');
    this.load.image('TxtMugwort', 'Images/Crop/TxtMugwort.png');
    this.load.image('TxtHemlock', 'Images/Crop/TxtHemlock.png');
    this.load.image('TxtYarrow', 'Images/Crop/TxtYarrow.png');
    this.load.image('TxtFairyCup', 'Images/Crop/TxtFairyCup.png');
    
    //Familiar
    //Ferret
    this.load.image('1_Lmove', 'Images/Familiar/Pet1_Lmove.png');
    this.load.image('1_Rmove', 'Images/Familiar/Pet1_Rmove.png');
    this.load.image('1_Lsit', 'Images/Familiar/Pet1_Lsit.png');
    this.load.image('1_Rsit', 'Images/Familiar/Pet1_Rsit.png');

    //Bat
    this.load.image('2_Lmove', 'Images/Familiar/Pet2_Lmove.png');
    this.load.image('2_Rmove', 'Images/Familiar/Pet2_Rmove.png');
    this.load.image('2_Lsit', 'Images/Familiar/Pet2_Lsit.png');
    this.load.image('2_Rsit', 'Images/Familiar/Pet2_Rsit.png');

    //Dino
    this.load.image('3_Lmove', 'Images/Familiar/Pet3_Lmove.png');
    this.load.image('3_Rmove', 'Images/Familiar/Pet3_Rmove.png');
    this.load.image('3_Lsit', 'Images/Familiar/Pet3_Lsit.png');
    this.load.image('3_Rsit', 'Images/Familiar/Pet3_Rsit.png');
}


function init()
{
    this.magicCount = 0; //magic level
}


function create()
{
    //Background
    this.gardenBG = this.add.image(480, 300, "GardenBG");
    this.gardenBG.setDisplaySize(960, 600);
    this.gardenBG.setDepth(0);

    //GRID
    this.garden = this.add.image(480, 200, "Garden");
    this.garden.setDisplaySize(300, 300);
    this.garden.setDepth(1);
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
                let infoImg;

                if (this.cropInfoText) {
                    this.cropInfoText.destroy(); //destroy previous text
                }

                //call crop secific text
                if (seed.circle.type === "1") {
                    infoImg = "TxtSage";
                } 
                else if (seed.circle.type === "2") {
                    infoImg = "TxtThyme";
                } 
                else if (seed.circle.type === "3") {
                    infoImg = "TxtMugwort";
                }
                else if (seed.circle.type === "4") {
                    infoImg = "TxtHemlock";
                }   
                else if (seed.circle.type === "5") {
                    infoImg = "TxtYarrow";
                }
                else if (seed.circle.type === "6") {
                    infoImg = "TxtFairyCup";
                }
                else
                {
                    return;
                }
                
                this.cropInfoText = this.add.image(480, 420, infoImg);
                this.cropInfoText.setDepth(10);

                if  (seed.circle.type === "6") {
                    this.cropInfoText.setDisplaySize(550, 100);
                }
                else
                {
                    this.cropInfoText.setDisplaySize(500, 100);
                }
            });
        }
    };

    this.seedBank = this.add.image(100, 200, "SeedBank");
    this.seedBank.setDisplaySize(125, 175);
    this.seedBank.setDepth(1);


    //TEXT
    //Crop text
    this.type1Text = new CropCount(this, 160, 530, "0", 0);
    this.type2Text = new CropCount(this, 260, 530, "0", 1);
    this.type3Text = new CropCount(this, 380, 530, "0", 2);
    this.type4Text = new CropCount(this, 510, 530, "0", 3);
    this.type5Text = new CropCount(this, 640, 530, "0", 4);
    this.type6Text = new CropCount(this, 780, 530, "0", 5);

    this.magicBar = new MagicBar(this, 100, 50, "Magic: 0"); //magic level is invisible
    

    //WALLET 
    this.wallet = new Wallet(this, 885, 40);
    this.events.on("resume", () => {
        this.wallet.update(); //update wallet when returning to garden
    });


    //FAMILIARS
    this.familiars = []; //store familiars in array
    
    this.planterCreated = false; //track type
    this.watererCreated = false; //track type

    this.familiars.push (new Familiar(this, 700, 350, "wanderer", 3)); //draws wandering familiar


    //INVENTORY
    this.inventory = this.add.image(480, 525, "Inventory");
    this.inventory.setDisplaySize(800, 100);
    this.inventory.setDepth(1);


    //BUTTONS
    this.shopBtn = new Button(this, 85, 400, 150, 50, "shop", null, "Shop", "ShopOn"); // scene button


    this.optionBtn = new Button(this, 40, 40, 50, 50, "option", null, "Info", "InfoOn"); // option widget


    this.npcBtnAvailable = false;
    this.npcButton = new Button(this, 930, 400, 50, 50, "NPC", null, "CallNPC", "CallNPCOn");
    this.npcButton.image.visible = false;

    //starts the delay before the btn is visible
    this.time.delayedCall(5000, () => {
        this.npcBtnAvailable = true;
        this.npcButton.image.visible = true;
        this.npcButton.NPCBtnState();
    });

    
    //NPC
    this.npcs = []; //calls npc array
    this.npcBtnAvailable = true;
    //counts how many times they're rejected
    this.angryNPCCounts = {
        Bunny: 0,
        Cat: 0,
        Cryptid: 0,
        Demon: 0,
        Doctor: 0,
        Elk: 0,
        Ent: 0,
        Ghost: 0,
        Golemn: 0,
        Shroom: 0,
        Slime: 0,
        Wizard: 0
    };
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


    //CROP LSYSTEM UPDATE
    this.crops.forEach(crop => {
        if (crop.plant) {
            crop.plant.update(delta);
        }
    });
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
        if (planted || plot.occupied) {
            return false;
        }

        gameObject.setPosition(plot.x, plot.y);

        plot.occupied = true;
        plantedPlot = plot;

        planted = true;
        fullyGrown = false;
        growthStage = 1;

        gameObject.isPlanted = true;
        gameObject.isHarvested = false;
        gameObject.isFullyGrown = false;

        // Remove seed sprite
        gameObject.setVisible(false);

        // Create the L-system
        gameObject.plant = new LSystem(scene, plot.x, plot.y, {
            len: 4,
            ang: 25,
            type: Number(gameObject.type)
        });

        // Connect L-system to crop growth and harvesting
        gameObject.plant.onFullyGrown = () => {
            fullyGrown = true;
            gameObject.isFullyGrown = true;
        };

        gameObject.plant.onHarvest = harvestCrop;

        // Generate first growth stage
        gameObject.plant.grow();

        return true;
    };


    //FAMILIAR WATERING FUNCTION
    gameObject.waterCrop = function() {
        if (!planted || fullyGrown || familiarWatering) {
            return false;
        }

        familiarWatering = true;

        growthStage++;
        gameObject.plant.grow();

        familiarWatering = false;

        if (growthStage >= 5) {
            fullyGrown = true;
            gameObject.isFullyGrown = true;
        }

        return true;
    };


    //HARVESTING FUNCTION
    function harvestCrop() {
        //stop harvesting until complete
        if (!fullyGrown) {
            return;
        }

        gameObject.plant.destroy();
        gameObject.plant = null;

        gameObject.setVisible(false);
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
        if (scene.magicCount >= 10 && !scene.planterCreated) {
            scene.planterCreated = true;
            scene.familiars.push(new Familiar(scene, 700, 50, "planter", 1));
        }

        //calls waterer familiar
        if (scene.magicCount >= 20 && !scene.watererCreated) {
            scene.watererCreated = true;
            scene.familiars.push(new Familiar(scene, 700, 50, "waterer", 2));
        }

        //HARVESTING + INCREASE COUNT
        const type = Number(gameObject.type);

        if (type >= 1 && type <= 6)
        {
            CropCount.add(type - 1, 1);
            scene[`type${type}Text`].update();
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
            duration: 5000, //time is 5000
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
            gameObject.plantInPlot(plot);

            //stop planter from picking planted seed
            scene.familiars.forEach(familiar => {
                if (familiar.type === "planter" &&
                    familiar.task &&
                    familiar.task.crop === gameObject) {

                    gameObject.isBeingCarried = false;
                    familiar.task = null;
                    familiar.destination();
                }
            });
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
