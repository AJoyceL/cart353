// //INTRO MENU

//IMPORTS
import Button from "../Button.js";

export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: "Menu" });
    }

    preload()
    {
        //will add
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
        this.StartGame = new Button(this, 400, 350, 150, 50, 0xe9e1f2, "start");

        this.Info = new Button(this, 25, 25, 50, 50, 0xe9e1f2, "info");
    }
}