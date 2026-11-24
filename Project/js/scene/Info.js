// //INTRO MENU

//IMPORTS
import Button from "../Button.js";

export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: "Info" });
    }

    preload()
    {
        //Background
        this.load.image('Introduction', 'Images/Background/Introduction.png');

        //Play 
        this.load.image('Play', 'Images/Button/Play.png');
        this.load.image('PlayOn', 'Images/Button/PlayOn.png');  

        //Menu
        this.load.image('Menu', 'Images/Button/Menu.png');
        this.load.image('MenuOn', 'Images/Button/MenuOn.png');  
    }

    create() {
        //BACKGROUND
        this.IntroBG = this.add.image(480, 300, "Introduction");
        this.IntroBG.setDisplaySize(960, 600);
        this.IntroBG.setDepth(1);

        this.title = this.add.text(480, 60, "Welcome to Blackbriar Grove!", 
            { 
                fontFamily: "Silkscreen",
                fontSize: "40px", 
                fill: "#7300ff",
                align: "center",
                wordWrap: { width: 500}
            }
        );
        this.title.setOrigin(.5);
        this.title.setDepth(1);
        
        //Instruction text
        // INTRO TEXT
        let introText = 
            "Welcome to Blackbriar Grove!\n\n" +
            "You're a new herbalist, and the residents of Blackbriar Grove are counting on you! " +
            "Grow magical plants, help your customers, and turn your little garden into a thriving herbal shop.";

        this.intro = this.add.text(480, 100, introText,
            {
                fontFamily: "Silkscreen",
                fontSize: "16px",
                fill: "#7300ff",
                align: "center",
                wordWrap: { width: 600 }
            }
        );
        this.intro.setOrigin(0.5);
        this.intro.setDepth(1);


        // GOAL TEXT
        let goalText =
            "GROW YOUR GARDEN\n" +
            "- Visit Loopy Rabbit's shop to buy seeds.\n" +
            "- Plant your seeds and wait for them to grow.\n" +
            "- Harvest your crops when they're ready!\n\n" +

            "MEET YOUR FAMILIARS\n" +
            "- Build up your garden's magic to unlock helpful familiars.\n" +
            "- Familiars can help plant seeds and speed up crop growth.\n" +
            "- But remember to love them or they'll leave you!\n\n" +

            "HELP YOUR CUSTOMERS\n" +
            "- Customers will visit your shop looking for crops.\n" +
            "- Listen to their requests and choose how to respond.\n" +
            "- Sell crops to earn money for more seeds!\n\n" +

            "WATCH YOUR REPUTATION!\n" +
            "- Avoid disappointing the same customers too many times.\n" +
            "- Upset them repeatedly, and they may stop visiting for good.\n" +
            "- Keep customers happy to help everyone in Blackbriar Grove!\n\n" +

            "NOW, GET PLANTING! BLACKBRIAR GROVE IS COUNTING ON YOU!";

        this.goal = this.add.text(480, 340, goalText,
            {
                fontFamily: "Silkscreen",
                fontSize: "12px",
                fill: "#7300ff",
                align: "left",
                wordWrap: { width: 650 },
                lineSpacing: 5
            }
        );
        this.goal.setOrigin(0.5);
        this.goal.setDepth(1);


        //BUTTONS
        this.StartGame = new Button(this, 480, 525, 150, 50, "start", null, "Play", "PlayOn");

        this.Info = new Button(this, 60, 35, 100, 50, "menu", null, "Menu", "MenuOn");
    }
}