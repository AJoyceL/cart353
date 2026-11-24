//IMPORTS
import Button from "../Button.js";
import Wallet from "../Wallet.js";
import NPC from "../NPC.js";

export default class Shop extends Phaser.Scene {
    constructor() {
        super({ key: "Shop" });
    }

    preload()
    {
        //Shop Backgroun
        this.load.image('ShopBG', 'Images/Background/ShopBG.png');

        //Seller sprite
        this.load.image('Seller', 'Images/NPC/Seller.png');

        //Shop frame
        this.load.image('ShopFrame', 'Images/Container/ShopFrame.png');

        //Home btn
        this.load.image('Home', 'Images/Button/Home.png');
        this.load.image('HomeOn', 'Images/Button/HomeOn.png');

        //Seed Btn
        //Sage
        this.load.image('Sage', 'Images/Button/Sage.png');
        this.load.image('SageOn', 'Images/Button/SageOn.png');
        
        //Thyme
        this.load.image('Thyme', 'Images/Button/Thyme.png');
        this.load.image('ThymeOn', 'Images/Button/ThymeOn.png');

        //Mugwort
        this.load.image('Mugwort', 'Images/Button/Mugwort.png');
        this.load.image('MugwortOn', 'Images/Button/MugwortOn.png');

        //Hemlock
        this.load.image('Hemlock', 'Images/Button/Hemlock.png');
        this.load.image('HemlockOn', 'Images/Button/HemlockOn.png');

        //Yarrow
        this.load.image('Yarrow', 'Images/Button/Yarrow.png');
        this.load.image('YarrowOn', 'Images/Button/YarrowOn.png');

        //Fairy Cup
        this.load.image('FairyCup', 'Images/Button/FairyCup.png');
        this.load.image('FairyCupOn', 'Images/Button/FairyCupOn.png');
    }

    create() {
        //BACKGROUND
        this.shopBG = this.add.image(480, 300, "ShopBG");
        this.shopBG.setDisplaySize(960, 600);
        this.shopBG.setDepth(0);

        //SHOP FRAME
        this.shopFrame = this.add.image(480, 300, "ShopFrame");
        this.shopFrame.setDisplaySize(500, 375);
        this.shopFrame.setDepth(1);

        //TEXT
        this.add.text(480, 100, "Shop", {
            fontSize: "40px",
            color: "#ffffff"
        }).setOrigin(0.5);

        //BUTTONS
        //garden
        this.MenuBtn = new Button(this, 100, 50, 150, 50, "garden", null, "Home", "HomeOn");

        //WALLET
        this.wallet = new Wallet(this, 900, 50);

        //PURCHASE SEEDS
        this.buySeeds = [];

        this.buySeeds.push(new Button(this, 355, 210, 200, 50, "seed1", null, "Sage", "SageOn")); //seed 1

        this.buySeeds.push(new Button(this, 355, 300, 200, 50, "seed2", null, "Thyme", "ThymeOn")); //seed 2

        this.buySeeds.push(new Button(this, 355, 390, 200, 50, "seed3", null, "Mugwort", "MugwortOn")); //seed 3

        this.buySeeds.push(new Button(this, 605, 210, 200, 50, "seed4", null, "Hemlock", "HemlockOn"));

        this.buySeeds.push(new Button(this, 605, 300, 200, 50, "seed5", null, "Yarrow", "YarrowOn"));

        this.buySeeds.push(new Button(this, 605, 390, 200, 50, "seed6", null, "FairyCup", "FairyCupOn"));


        if ((this.registry.get("yesCount") || 0) < 5)
        {
            for (let i = 3; i < 6; i++)
            {
                this.buySeeds[i].image.setVisible(false);

            }
        }
    }
}