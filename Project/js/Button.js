//IMPORTS
import Wallet from "./Wallet.js";
import Seed from "./Seed.js";
import NPC from "./NPC.js"; //npc class
import CropCount from "./CropCount.js";

export default class Button 
{
    //will have to change for an img or sprite
    constructor(scene, x, y, w, h, color, type, npc)
    {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.type = type; // btn type

        this.npc = npc; // calls npc vars
        this.npcBtnAvailable = true;
        this.npcBtnCooldown = false;

        this.rect = scene.add.graphics();
        this.rect.fillStyle(color, 1);
        this.rect.fillRoundedRect(x, y, w, h, 20);
        this.rect.setDepth(20);
        
        //Interactible zone
        this.zone = scene.add.zone(x + w / 2, y + h / 2, w, h);
        this.zone.setDepth(21);
        this.zone.setInteractive();

        //Set Depth og btn
        if (this.type === "Yes" || this.type === "No" || this.type === "Haggle")
        {
            this.rect.setDepth(60);
            this.zone.setDepth(61);
        }
        else
        {
            this.rect.setDepth(20);
            this.zone.setDepth(21);
        }


        //Mouse Event
        this.zone.on("pointerover", () =>{
            this.rect.clear();
            this.rect.fillStyle(0x6f6678, 1);
            this.rect.fillRoundedRect(x, y, w, h, 20);

            if (this.type === "NPC" && !this.scene.npcBtnAvailable)
            {
                return;
            }
        })

        this.zone.on("pointerout", () => {
            if (this.type === "NPC")
            {
                this.NPCBtnState();
            }
            else
            {
                this.rect.clear();
                this.rect.fillStyle(color, 1);
                this.rect.fillRoundedRect(x, y, w, h, 20);
            }
        });

        this.zone.on("pointerdown", () => {
            // SCENES
            if (this.type === "shop") {
                this.ShopBtn();
            }
            else if (this.type === "garden") {
                this.GardenBtn();
            }

            // SEEDS
            else if (this.type === "seed1") {
                this.BuySeed1();
            }
            else if (this.type === "seed2") {
                this.BuySeed2();
            }
            else if (this.type === "seed3") {
                this.BuySeed3();
            }
            else if (this.type === "seed4") {
                this.BuySeed4();
            }
            else if (this.type === "seed5") {
                this.BuySeed5();
            }
            else if (this.type === "seed6") {
                this.BuySeed6();
            }

            // NPCS
            else if(this.type === "NPC"){
                this.NPCBtn();
            }

            // PLAYER REPLY
            else if (this.type === "Yes")
            {
                this.YesBtn();
            }
            else if (this.type === "No")
            {
                this.NoBtn();
            }
            else if (this.type === "Haggle")
            {
                this.HaggleBtn();
            }
        });
    }

    //CALLS SCENES
    //ref: https://docs.phaser.io/api-documentation/event/scenes-events
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
        const garden = this.scene.scene.get("Garden");
        garden.wallet.update();
    }

    //PURCHASE SEEDS
    BuySeed1() 
    {
        this.BuySeed("1", 6);
    }

    BuySeed2() 
    {
        this.BuySeed("2", 8);
    }

    BuySeed3()
    {
        this.BuySeed("3", 12);
    }
    
    BuySeed4() 
    {
        this.BuySeed("4", 15);
    }

    BuySeed5() 
    {
        this.BuySeed("5", 10);
    }

    BuySeed6() 
    {
        this.BuySeed("6", 20);
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
        // ref: https://phaser.io/devlogs/162?utm_source=chatgpt.com 
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
    
    //CALL NPC
    NPCBtn()
    {
        if (!this.scene.npcBtnAvailable)
        {
            return;
        }

        let names = ["John", "Jane", "Bob", "Alice", "Mike", "Emily"];

let availableNPCs = names.filter(name => {
    console.log(name, this.scene.angryNPCCounts[name]);

    return this.scene.angryNPCCounts[name] < 3;
});

        // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

        if (this.scene.npcs.length === 0 && availableNPCs.length > 0)
        {
            this.scene.npcBtnAvailable = false;
            this.NPCBtnState();

            this.scene.npcs.push(
                new NPC(this.scene, 660, 100)
            );
        }

        console.log("Available NPCs:", availableNPCs);
        console.log("Active NPCs:", this.scene.npcs);
    }

    NPCBtnState()
    {
        this.rect.clear();

        if (this.scene.npcBtnAvailable)
        {
            this.rect.fillStyle(0xe9e1f2, 1);
        }
        else
        {
            this.rect.fillStyle(0x6f6678, 1);
        }
        this.rect.fillRoundedRect(this.x, this.y, this.w, this.h, 20);
    }

    NPCBtnCooldown()
    {
        let randomTime = Math.floor(Math.random() * 10000) + 5000; //time randomiser

        //delay time for npc availability
        // ref: https://docs.phaser.io/phaser/concepts/time
        this.scene.time.delayedCall(randomTime, () => {
            this.scene.npcBtnAvailable = true;
            this.NPCBtnState();
        })
    }

    //REPLY NPC
    YesBtn()
    {
        if (this.npc.price === null || this.npc.price === "")
        {
            return;
        }

        const type = this.npc.cropType - 1;
        const amount = this.npc.cropAmount;

        if (CropCount.sell(type, amount))
        {
            Wallet.add(this.npc.price);
            this.scene.wallet.update();

            this.scene[`type${this.npc.cropType}Text`].update();

             //counts times pressed
            this.scene.registry.set(
                "yesCount",
                (this.scene.registry.get("yesCount") || 0) + 1
            );

            this.npc.BoughtNPC();
        }
        else
        {
            this.npc.dialogue.setText("You don't have enough " + this.npc.crops + "? I'll come back next time.")

            this.scene.time.delayedCall(1500, () => {this.npc.AngryNPC();})
        }
    }

    NoBtn()
    {
        // let name = this.npc.name;

        // this.scene.npcNoCounts[name]++;

        // if (this.scene.npcNoCounts[name] >= 3)
        // {
        //     this.npc.AngryNPC();
        // }
        // else
        // {
        //     this.npc.BoughtNPC();
        // }
        this.npc.AngryNPC();
    }

    async HaggleBtn()
    {
        this.npc.haggleCount++;
        console.log("Haggling with npc")

        if (this.npc.haggleCount === 1)
        {
            this.npc.price = await this.npc.getPrice();

            this.npc.dialogue.setText("All right, then for " + this.npc.price + "$?");
        }

        else if (this.npc.haggleCount === 2)
        {
            this.npc.price = await this.npc.getPrice();

            this.npc.dialogue.setText("No? Fine, " + this.npc.price + "$ for these.");
        }

        else if (this.npc.haggleCount === 3)
        {
            this.npc.price = await this.npc.getPrice();

            this.npc.dialogue.setText("That's my final offer! Take it or leave it. " + this.npc.price + "$.");
        }

        else if (this.npc.haggleCount === 4)
        {
            this.npc.AngryNPC();
        }
    }
}

window.Button = Button;