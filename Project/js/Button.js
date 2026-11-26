//IMPORTS
import Wallet from "./Wallet.js";
import NPC from "./NPC.js"; //npc class
import CropCount from "./CropCount.js";

export default class Button 
{
    //will have to change for an img or sprite
    constructor(scene, x, y, w, h, type, npc, InitImg, HoverImg)
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

        //Assign btn images
        this.InitImg = InitImg;
        this.HoverImg = HoverImg;

        this.image = scene.add.image(x, y, this.InitImg);
        this.image.setDisplaySize(w, h);
        this.image.setInteractive();

        //Set depth of btns
        if (this.type === "Yes" || this.type === "No" || this.type === "Haggle")
        {
            this.image.setDepth(60);
        }
        else
        {
            this.image.setDepth(20);
        }

        //Mouse Event
        this.image.on("pointerover", () =>{
            this.image.setTexture(this.HoverImg);

            if (this.type === "NPC" && !this.scene.npcBtnAvailable)
            {
                return;
            }
        })

        this.image.on("pointerout", () => {
            if (this.type === "NPC")
            {
                this.NPCBtnState();
            }
            else
            {
                this.image.setTexture(this.InitImg);
            }
        });

        this.image.on("pointerdown", () => {
            // SCENES
            if (this.type === "shop") {
                this.ShopBtn();
            }
            else if (this.type === "garden") {
                this.GardenBtn();
            }
            else if (this.type === "menu")
            {
                this.MenuBtn();
            }
            else if (this.type === "start")
            {
                this.StartGame();
            }
            else if (this.type === "info")
            {
                this.InfoPage();
            }
            else if (this.type === "option")
            {
                this.OptionWidget();
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
        this.scene.scene.bringToTop("Shop");
    }

    GardenBtn()
    {
        this.scene.scene.resume("Garden");
        this.scene.scene.stop("Shop");

        //refresh wallet
        const garden = this.scene.scene.get("Garden");
        garden.wallet.update();
    }

    MenuBtn()
    {
        this.scene.scene.launch("Menu");
        this.scene.scene.pause("Garden");
        this.scene.scene.bringToTop("Menu");
    }

    StartGame()
    {
        this.scene.scene.stop("Menu");

        if (this.scene.scene.isPaused("Garden"))
        {
            this.scene.scene.resume("Garden");
        }
        else
        {
            this.scene.scene.start("Garden");
        }
    }

    InfoPage()
    {
        this.scene.scene.launch("Info");
        this.scene.scene.pause("Garden");
        this.scene.scene.bringToTop("Info");

        if (this.scene.scene.isPaused("Garden"))
        {
            this.scene.scene.resume("Garden");
        }
        else
        {
            this.scene.scene.start("Garden");
        }
    }

    OptionWidget()
    {
        if (this.widget)
        {
            return;
        }

        this.widget = this.scene.add.image(70, 80, "Option");
        this.widget.setDisplaySize(125, 150);
        this.widget.setDepth(100);

        //menu
        this.menuButton = this.scene.add.image(60, 70, "Menu", "MenuOn");
        this.menuButton.setDisplaySize(70, 35);
        this.menuButton.setDepth(101);
        this.menuButton.setInteractive();

        //animating hover 
        this.menuButton.on("pointerover", () => {
            this.menuButton.setTexture("MenuOn");
        });
        this.menuButton.on("pointerout", () => {
            this.menuButton.setTexture("Menu");
        });
        this.menuButton.on("pointerdown", () => {
            this.MenuBtn();
        })

        //garden
        this.infoButton = this.scene.add.image(60, 115, "Intro");
        this.infoButton.setDisplaySize(70, 35);
        this.infoButton.setDepth(101);
        this.infoButton.setInteractive();

        //animating hover 
        this.infoButton.on("pointerover", () => {
            this.infoButton.setTexture("IntroOn");
        });
        this.infoButton.on("pointerout", () => {
            this.infoButton.setTexture("Intro");
        });

        this.infoButton.on("pointerdown", () => {
            this.InfoPage();
        })

        //close option
        this.closeButton = this.scene.add.image(110, 35,"Exit", "ExitOn");
        this.closeButton.setDisplaySize(25, 25);
        this.closeButton.setDepth(101);
        this.closeButton.setInteractive();

        //animating hover 
        this.closeButton.on("pointerover", () => {
            this.closeButton.setTexture("ExitOn");
        });
        this.closeButton.on("pointerout", () => {
            this.closeButton.setTexture("Exit");
        });

        this.closeButton.on("pointerdown", () => {
            this.widget.destroy();
            this.menuButton.destroy();
            this.infoButton.destroy();
            this.closeButton.destroy();

            this.widget = null;
        })
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

        //name list
        let names = [
            "Bunny",
            "Cat",
            "Cryptid",
            "Demon",
            "Doctor",
            "Elk",
            "Ent",
            "Ghost",
            "Golemn",
            "Shroom",
            "Slime",
            "Wizard"
        ]; 

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
                new NPC(this.scene, 685, 85)
            );
        }

        console.log("Available NPCs:", availableNPCs);
        console.log("Active NPCs:", this.scene.npcs);
    }

    NPCBtnState()
    {

        if (this.scene.npcBtnAvailable)
        {
            this.image.setTexture(this.InitImg);
        }
        else
        {
            this.image.setTexture(this.HoverImg);
        }
    }

    NPCBtnCooldown()
    {
        this.scene.npcBtnAvailable = false;
        this.image.visible = false;

        let randomTime = Math.floor(Math.random() * 10000) + 5000;

        this.scene.time.delayedCall(randomTime, () => {
            this.scene.npcBtnAvailable = true;
            this.image.visible = true;
            this.NPCBtnState();
        });
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