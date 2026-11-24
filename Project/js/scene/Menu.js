// //INTRO MENU

//IMPORTS
import Button from "../Button.js";

export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: "Menu" });
    }

    preload()
    {
        //Intro page
        this.load.image('Intro', 'Images/Intro.png');
        this.load.image('IntroOn', 'Images/IntroOn.png');
        //Play 
        this.load.image('Play', 'Images/Play.png');
        this.load.image('PlayOn', 'Images/PlayOn.png');
    }    


    create() {
        //BACKGROUND
        this.background = this.add.rectangle(0, 0, 960, 600, 0x00000, 1);
        this.background.setOrigin(0, 0);

        this.title = this.add.text(480, 300, "welcome", 
            { 
                fontSize: "80px", 
                fill: "#7300ff" 
            }
        );
        this.title.setOrigin(.5);

        //BUTTONS
        this.StartGame = new Button(this, 480, 375, 150, 50, "start", null, "Play", "PlayOn");

        this.Info = new Button(this, 80, 50, 100, 50, "info", null, "Intro", "IntroOn");
    }
}