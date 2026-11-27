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
        this.load.image('Intro', 'Images/Button/Intro.png');
        this.load.image('IntroOn', 'Images/Button/IntroOn.png');

        //Play 
        this.load.image('Play2', 'Images/Button/Play2.png');
        this.load.image('Play2On', 'Images/Button/Play2On.png');
    }    


    create() {
        //BACKGROUND
        this.background = this.add.rectangle(0, 0, 960, 600, 0x00000, 1);
        this.background.setOrigin(0, 0);

        this.title = this.add.text(480, 275, "welcome", 
            { 
                fontFamily: "Silkscreen",
                fontSize: "80px", 
                fill: "#7300ff" 
            }
        );
        this.title.setOrigin(.5);

        //BUTTONS
        this.StartGame = new Button(this, 480, 375, 150, 50, "start", null, "Play2", "Play2On");

        this.Info = new Button(this, 80, 50, 100, 50, "info", null, "Intro", "IntroOn");
    }
}