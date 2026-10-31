//IMPORTS
import Wallet from "./Buying.js";
import Seed from "./Seed.js";

export default class Button 
{
    //will have to change for an img or sprite
    constructor(scene, x, y, w, h, color, type)
    {
        this.scene = scene;
        this.type = type;

        this.rect = scene.add.graphics();
        this.rect.fillStyle(color, 1);
        this.rect.fillRoundedRect(x, y, w, h, 20);
        this.rect.setDepth(20);
        
        //Interactible zone
        this.zone = scene.add.zone(x + w / 2, y + h / 2, w, h);
        this.zone.setDepth(21);
        this.zone.setInteractive();

        //Mouse Event
        this.zone.on("pointerover", () =>{
            this.rect.clear();
            this.rect.fillStyle(0x6f6678, 1);
            this.rect.fillRoundedRect(x, y, w, h, 20);
        })

        this.zone.on("pointerout", () => {
            this.rect.clear();
            this.rect.fillStyle(color, 1);
            this.rect.fillRoundedRect(x, y, w, h, 20);
        });

        this.zone.on("pointerdown", () => {
            if (this.type === "shop") {
                this.ShopBtn();
            }
            else if (this.type === "garden") {
                this.GardenBtn();
            }
            else if (this.type === "seed1") {
                this.BuySeed1();
            }
            else if (this.type === "seed2") {
                this.BuySeed2();
            }
            else if (this.type === "seed3") {
                this.BuySeed3();
            }
        });
    }

    //CALLS SCENES
    ShopBtn()
    {
        this.scene.scene.launch("Shop");
        this.scene.scene.pause("Garden"); //pause scene
    }
    GardenBtn()
    {
        this.scene.scene.resume("Garden");
        this.scene.scene.stop("Shop");

        //refresh wallet
        const garden = this.scene.scene.get("Gardeb");
        garden.wallet.update();
    }

    //PURCHASE SEEDS
    BuySeed1() 
    {
        this.BuySeed("1", 5);
    }

    BuySeed2() 
    {
        this.BuySeed("2", 8);
    }

    BuySeed3()
    {
        this.BuySeed("3", 15);
    }

    BuySeed(type, price)
    {
        if (!Wallet.spend(price))
        {
            console.log("U BROKE");
            return;
        }

        //data manager seed
        //ref: https://docs.phaser.io/phaser/concepts/data-manager
        const registry = this.scene.game.registry;
        let pendingSeeds = registry.get("pendingSeeds"); //get list

        //create the list if not existant
        if (!pendingSeeds)
        {
            pendingSeeds = [];
            registry.set("pendingSeeds", pendingSeeds);
        }

        pendingSeeds.push(type); //add purhcased type to list

        this.scene.wallet.update(); //update wallet

        console.log("Seed purchased:", type);
        console.log("Pending seeds:", pendingSeeds);
    }     
}

window.Button = Button;