//IMPORTS
import Button from "../Button.js";
import Wallet from "../Wallet.js";

export default class Shop extends Phaser.Scene {
    constructor() {
        super({ key: "Shop" });
    }

    create() {
        //BACKGROUND
        this.background = this.add.rectangle(0, 0, 960, 600,0x00000, 1);
        this.background.setOrigin(0, 0);

        //TEXT
        this.add.text(480, 100, "Shop", {
            fontSize: "40px",
            color: "#ffffff"
        }).setOrigin(0.5);

        //BUTTONS
        this.buttons = [];

        //garden
        this.buttons.push(
            new Button(this, -20,10, 150, 50, 0xe9e1f2, "garden")
        );

        //SHOP MENU
        // this.outline = this.add.rectangle(480, 325, 415, 315, 0x574f5c)
        this.shopMenu = this.add.rectangle(480, 325, 400, 300, 0x7d7482).setDepth(2);

        //WALLET
        this.wallet = new Wallet(this, 900, 50);

        //PURCHASE SEEDS
        this.buySeeds = [];

        this.buySeeds.push(new Button(this, 300, 200, 150, 50, 0xe9e1f2, "seed1")); //seed 1

        this.buySeeds.push(new Button(this, 300, 300, 150, 50, 0xe9e1f2, "seed2")); //seed 2

        this.buySeeds.push(new Button(this, 300, 400, 150, 50, 0xe9e1f2, "seed3")); //seed 3

        this.buySeeds.push(new Button(this, 500, 200, 150, 50, 0xe9e1f2, "seed4"));

        this.buySeeds.push(new Button(this, 500, 300, 150, 50, 0xe9e1f2, "seed5"));
        
        this.buySeeds.push(new Button(this, 500, 400, 150, 50, 0xe9e1f2, "seed6"));

        //LABELS
        //Seed 1
        this.add.text(375, 225, "Seed 1 $5", {
            fontSize: "18px",
            color: "#1f1a25"
        }).setOrigin(0.5).setDepth(22);

        //Seed 2
        this.add.text(375, 325, "Seed 2 $8", {
            fontSize: "18px",
            color: "#1f1a25"
        }).setOrigin(0.5).setDepth(22);

        //Seed3
        this.add.text(375, 425, "Seed 3 $15", {
            fontSize: "18px",
            color: "#1f1a25"
        }).setOrigin(0.5).setDepth(22);

        //Seed 4
        this.add.text(575, 225, "Seed 4 $20", {
            fontSize: "18px",
            color: "#1f1a25"
        }).setOrigin(0.5).setDepth(22);

        //Seed 5
        this.add.text(575, 325, "Seed 5 $28", {
            fontSize: "18px",
            color: "#1f1a25"
        }).setOrigin(0.5).setDepth(22);

        //Seed 6
        this.add.text(575, 425, "Seed 6 $35", {
            fontSize: "18px",
            color: "#1f1a25"
        }).setOrigin(0.5).setDepth(22);
    }
}