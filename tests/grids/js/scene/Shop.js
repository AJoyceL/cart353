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
        this.buttons.push(
            new Button(this, -20,10, 150, 50, 0xe9e1f2, "garden")
        );

        //SHOP
        // this.outline = this.add.rectangle(480, 325, 415, 315, 0x574f5c)
        this.shopMenu = this.add.rectangle(480, 325, 400, 300, 0x7d7482).setDepth(2);

        //WALLET
        this.wallet = new Wallet(this, 900, 50);

        //Buying btn
        if (Wallet.spend(10)) {
            this.wallet.update();
        }

    }
}