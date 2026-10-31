//IMPORTS
import Button from "../Button.js";
import Wallet from "../Buying.js";

export default class Shop extends Phaser.Scene {
    constructor() {
        super({ key: "Shop" });
    }

    create() {
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

        this.buySeeds.push(new Button(this, 480, 200, 150, 50, 0xe9e1f2, "seed1")); //seed 1

        this.buySeeds.push(new Button(this, 480, 300, 150, 50, 0xe9e1f2, "seed2")); //seed 2

        this.buySeeds.push(new Button(this, 480, 400, 150, 50, 0xe9e1f2, "seed3")); //seed 3

        //LABELS
        //Seed 1
        this.add.text(550, 225, "Apple $5", {
            fontSize: "18px",
            color: "#1f1a25"
        }).setOrigin(0.5).setDepth(22);

        //Seed 2
        this.add.text(550, 325, "Orange $8", {
            fontSize: "18px",
            color: "#1f1a25"
        }).setOrigin(0.5).setDepth(22);

        //Seed3
        this.add.text(550, 425, "Berry $15", {
            fontSize: "18px",
            color: "#1f1a25"
        }).setOrigin(0.5).setDepth(22);

    }
}