// //INTRO MENU

//IMPORTS
import Button from "../Button.js";

export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: "Info" });
    }

    preload()
    {
        //Play 
        this.load.image('Play', 'Images/Button/Play.png');
        this.load.image('PlayOn', 'Images/Button/PlayOn.png');  

        //Menu
        this.load.image('Menu', 'Images/Button/Menu.png');
        this.load.image('MenuOn', 'Images/Button/MenuOn.png');  
    }

    create() {
        //BACKGROUND
        this.background = this.add.rectangle(0, 0, 960, 600, 0x00000, 1);
        this.background.setOrigin(0, 0);

        this.title = this.add.text(480, 50, "Instructions", 
            { 
                fontSize: "80px", 
                fill: "#7300ff" 
            }
        );
        this.title.setOrigin(.5);
        
        //Instruction text



        //BUTTONS
        this.StartGame = new Button(this, 480, 550, 150, 50, "start", null, "Play", "PlayOn");

        this.Info = new Button(this, 60, 35, 100, 50, "menu", null, "Menu", "MenuOn");
    }
}