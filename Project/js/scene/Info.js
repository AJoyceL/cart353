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
                fill: "#1A1E29",
                align: "center",
                wordWrap: { width: 500}
            }
        );
        this.title.setOrigin(.5);
        this.title.setDepth(1);
        
        // INTRO TEXT
        let introText = 
            "You're a herbalist, and the residents of Blackbriar Grove are counting on you! " +
            "Grow magical plants, help your customers, and turn your little garden into a thriving herbal shop.";

        this.intro = this.add.text(180, 135, introText,
            {
                fontFamily: "Silkscreen",
                fontSize: "16px",
                fill: "#2E2A3B",
                align: "center",
                wordWrap: { width: 650 }
            }
        );
        this.intro.setDepth(1);


        // GROW YOUR GARDEN
        this.gardenTitle = this.add.text(180, 230, "GROW YOUR GARDEN", 
        {
            fontFamily: "Silkscreen",
            fontSize: "15px",
            fontStyle: "bold",
            fill: "#2E2A3B"
        });

        this.gardenGoal = this.add.text(180, 250,
            "- Buy seeds at the shop.\n" +
            "- Plant and grow your seeds.\n" +
            "- Harvest your crops!",
            {
                fontFamily: "Silkscreen",
                fontSize: "14px",
                fill: "#4B3B59",
                align: "left",
                wordWrap: { width: 300 },
                lineSpacing: 5
            }
        );

        this.gardenTitle.setDepth(1);
        this.gardenGoal.setDepth(1);


        // MEET YOUR FAMILIARS
        this.familiarTitle = this.add.text(500, 230, "MEET YOUR FAMILIARS", 
        {
            fontFamily: "Silkscreen",
            fontSize: "14px",
            fontStyle: "bold",
            fill: "#2E2A3B"
        });

        this.familiarGoal = this.add.text(500, 250,
                "- Unlock familiars as your harvest crops.\n" +
                "- They'll plant seeds and water crops.\n" +
                "- Pet them so they don't leave!",
            {
                fontFamily: "Silkscreen",
                fontSize: "14px",
                fill: "#4B3B59",
                align: "left",
                wordWrap: { width: 300 },
                lineSpacing: 5
            }
        );

        this.familiarTitle.setDepth(1);
        this.familiarGoal.setDepth(1);

        // HELP YOUR CUSTOMERS
        this.customerTitle = this.add.text(180, 385, "HELP YOUR CUSTOMERS", 
        {
            fontFamily: "Silkscreen",
            fontSize: "14px",
            fontStyle: "bold",
            fill: "#2E2A3B"
        });

        this.customerGoal = this.add.text(180, 405,
                "- Fulfill customer requests.\n" +
                "- Sell crops to earn money for seeds!",
            {
                fontFamily: "Silkscreen",
                fontSize: "14px",
                fill: "#4B3B59",
                align: "left",
                wordWrap: { width: 300 },
                lineSpacing: 5
            }
        );

        this.customerTitle.setDepth(1);
        this.customerGoal.setDepth(1);


        // WATCH YOUR REPUTATION
        this.reputationTitle = this.add.text(500, 385, "WATCH YOUR REPUTATION!", 
        {
            fontFamily: "Silkscreen",
            fontSize: "14px",
            fontStyle: "bold",
            fill: "#2E2A3B"
        });

        this.reputationGoal = this.add.text(500, 405,
                "- Keep customers happy.\n" +
                "- Disappoint them too often, and they'll stop visiting!",
            {
                fontFamily: "Silkscreen",
                fontSize: "14px",
                fill: "#4B3B59",
                align: "left",
                wordWrap: { width: 300 },
                lineSpacing: 5
            }
        );

        this.reputationTitle.setDepth(1);
        this.reputationGoal.setDepth(1);


        // FINAL MESSAGE
        this.finalGoal = this.add.text(180, 490,
            "NOW, GET PLANTING! BLACKBRIAR GROVE IS COUNTING ON YOU!",
            {
                fontFamily: "Silkscreen",
                fontSize: "16px",
                fill: "#2E2A3B",
                align: "center",
                wordWrap: { width: 650 }
            }
        );
        this.finalGoal.setDepth(1);

        //BUTTONS
        this.StartGame = new Button(this, 480, 535, 125, 40, "start", null, "Play", "PlayOn");

        this.Info = new Button(this, 60, 35, 100, 50, "menu", null, "Menu", "MenuOn");
    }
}