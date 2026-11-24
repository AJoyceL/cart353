//NPC CLASS
import Button from "./Button.js";
import CropCount from "./CropCount.js";

export default class NPC 
{
    constructor (scene, x, y,)
    {
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.npc = scene.add.image(x, y, "npcFrame");
        this.npc.setDisplaySize(275, 375);
        this.npc.setOrigin(0);
        this.npc.setInteractive();
        this.npc.setDepth(50);
        
        this.TextBubble(); //dialogue bubble

        this.haggleCount = 0; //to count haggling attemps
    }

    //FETCH API DATA
    // ref: https://www.youtube.com/watch?v=VmQ6dHvnKIM
    // API: https://randomapi.dev/apis/products#route-root
    getPrice = async () => {
        try
        {
            let API;

            //Selects API based on crop amount requested
            if (this.cropAmount >= 1 && this.cropAmount <= 3)
            {
                API = "https://randomapi.dev/api/products?category=food&minPrice=10&maxPrice=50&currency=CAD&count=100";
            }
            else if (this.cropAmount >= 4 && this.cropAmount <= 6)
            {
                API = "https://randomapi.dev/api/products?category=food&minPrice=50&maxPrice=100&currency=CAD&count=100";
            }
            else if (this.cropAmount >= 7 && this.cropAmount <= 10)
            {
                API = "https://randomapi.dev/api/products?category=food&minPrice=100&maxPrice=150&currency=CAD&count=100";
            }

            const response = await fetch(API); //fetch data
            const data = await response.json(); //convert data

            const randomiseProduct = data.data[Math.floor(Math.random() * data.data.length)]; // randomly selects price

            return Math.round(randomiseProduct.price); // rounds price
        }
        
        catch (error)
        {
            console.error("Error fetching price:", error);
            return null;
        }
    }

    //CREATE NPC OBJECTS
    
    NPCObject()
    {
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

        //ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        names = names.filter(name => this.scene.angryNPCCounts[name] < 3);//removes npc who left permanently

        //stops calling npcs if everyone left
        if (names.length === 0) 
        {
            return false;
        }
        
        this.name = names[Math.floor(Math.random() * names.length)]; //randomly selects name

        console.log("Available names:", names);

        // Assigns NPC sprites
        const npcSprites = {
            Bunny: "npc_bunny",
            Cat: "npc_cat",
            Cryptid: "npc_cryptid",
            Demon: "npc_demon",
            Doctor: "npc_doctor",
            Elk: "npc_elk",
            Ent: "npc_ent",
            Ghost: "npc_ghost",
            Golemn: "npc_golemn",
            Shroom: "npc_shroom",
            Slime: "npc_slime",
            Wizard: "npc_wizard"
        };

        this.img = this.scene.add.image(
            this.x + 137,
            this.y + 135,
            npcSprites[this.name]
        );
        this.img.setDisplaySize(260, 255);
        this.img.setDepth(55);

        return true;
    }

    //CREATE CROP RELATED TEXT
    CropObject()
    {
        const cropNames = ["Sage", "Thyme", "Mugwort", "Hemlock", "Holy Basil", "Fairy Cups"]; //crop list

        //check yescount
        const yesCount = this.scene.registry.get("yesCount") || 0;

        //unlocks crops
        let maxCrops;
        if (yesCount >= 5)
        {
            maxCrops = 6;
        }
        else
        {
            maxCrops = 3;
        }

        //Randomely selects crop type and amount
        this.cropType = Math.floor(Math.random() * maxCrops) + 1;
        this.crops = cropNames[this.cropType - 1];
        this.cropAmount = Math.floor(Math.random() * 10) + 1;
    }

    //INTERACTION
    GetDialogue()
    {
        if (this.name === "Bunny")
        {
            return "Hello! Could I have " + this.cropAmount + " " + this.crops + " for " + this.price + "$?";
        }
        else if (this.name === "Cat")
        {
            return "My Master wants" + this.cropAmount + " " + this.crops + ". " + this.price + "$ should do.";
        }
        else if (this.name === "Cryptid")
        {
            return "The forest requires " + this.cropAmount + " " + this.crops + ". I offer " + this.price + "$.";
        }
        else if (this.name === "Demon")
        {
            return "I demand " + this.cropAmount + " " + this.crops + "! " + this.price + "$. Deal?";
        }
        else if (this.name === "Doctor")
        {
            return "I need " + this.cropAmount + " " + this.crops + " for my remedies. " + this.price + "$.";
        }
        else if (this.name === "Elk")
        {
            return "Greetings. Might I buy " + this.cropAmount + " " + this.crops + " for " + this.price + "$?";
        }
        else if (this.name === "Ent")
        {
            return "After many seasons, I seek " + this.cropAmount + " " + this.crops + ". " + this.price + "$?";
        }
        else if (this.name === "Ghost")
        {
            return "Ooooooh... May I have " + this.cropAmount + " " + this.crops + " for " + this.price + "$?";
        }
        else if (this.name === "Golemn")
        {
            return "I require " + this.cropAmount + " " + this.crops + ". Payment: " + this.price + "$.";
        }
        else if (this.name === "Shroom")
        {
            return "Hehehe! I'll take " + this.cropAmount + " " + this.crops + " for " + this.price + "$!";
        }
        else if (this.name === "Slime")
        {
            return "H-hello! Could I please have " + this.cropAmount + " " + this.crops + "? " + this.price + "$!";
        }
        else if (this.name === "Wizard")
        {
            return "I seek " + this.cropAmount + " " + this.crops + ", young gardener. " + this.price + "$!";
        }
    }

    //SPEECH
    async TextBubble()
    {
        //calls the NPC names
        if (!this.NPCObject())
        {
            return;
        } 

        this.CropObject(); //calls the crop names, amount, and price

        this.price = ""; //temp value while it updates
        
        //Display dialogue
        this.dialogue = this.scene.add.text(this.x + 30, this.y + 280, this.GetDialogue(), 
        { 
            font: "16px", 
            fill: "#000000", 
            align: "justify", 
            wordWrap: { width: 250}
        }).setDepth(51);

        this.PlayerReply(); //player response btns

        //Timer before npc leaves
        this.timer = this.scene.time.delayedCall(60000, () => {
            if (this.scene.npcs.includes(this))
            {
                this.AngryNPC();
            }
        })

        this.price = await this.getPrice(); //calls the price API

        // Update dialogue 
        if (this.dialogue)
        {
            this.dialogue.setText(this.GetDialogue());
        }
        else{return;}
    }

    //PLAYER REPLY
    PlayerReply()
    {
        this.yesBtn = new Button(this.scene, this.x + 40, this.y + 350, 50, 25, "Yes", this, "Yes", "YesOn");

        this.noBtn = new Button(this.scene, this.x + 115, this.y + 350, 50, 25, "No", this, "No", "NoOn");

        this.haggleBtn = new Button(this.scene, this.x + 210, this.y + 350, 100, 25, "Haggle", this, "Haggle", "HaggleOn");
    }

    //NPC REACTION
    RemoveNPC()
    {
        this.npc.destroy(); //removes npc

        if (this.dialogue) this.dialogue.destroy();
        if (this.img) this.img.destroy();

        //removes response btn
        this.ReplyBtn.forEach(button => {
            this.yesBtn.image.destroy();
            this.noBtn.image.destroy();
            this.haggleBtn.image.destroy();
        });

        //removes npc from list
        this.scene.npcs = this.scene.npcs.filter(npc => npc !== this); //ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

        //calls cooldown for btn
        const npcButton = this.scene.npcButton;

        if (npcButton)
        {
            npcButton.NPCBtnCooldown();
        }

        if (this.timer)
        {
            this.timer.remove();
        }
    }
    
    //Called when player sells
    BoughtNPC()
    {
        this.RemoveNPC();
    }

    //Called when npc leaves without buying
    AngryNPC()
    {
        this.scene.angryNPCCounts[this.name]++;

        console.log(
            this.name + " angry count: " +
            this.scene.angryNPCCounts[this.name]
        );

        if (this.scene.angryNPCCounts[this.name] >= 3)
        {
            console.log(this.name + " is permanently banned!");
        }

        this.RemoveNPC();
    }
}