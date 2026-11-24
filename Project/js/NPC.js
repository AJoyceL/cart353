//NPC CLASS
import Button from "./Button.js";
import CropCount from "./CropCount.js";

export default class NPC 
{
    constructor (scene, x, y)
    {
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.npc = scene.add.rectangle(x, y, 300, 350, 0xdbd0bd);
        this.npc.setOrigin(0);
        this.npc.setInteractive();
        this.npc.setDepth(50);
        
        this.TextBubble(); //dialogue bubble

        this.haggleCount = 0; //to count haggling attemps
    }

    //SPRITES
    preload()
    {
        //will add img
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
        let names = ["John", "Jane", "Bob", "Alice", "Mike", "Emily"]; //name liest

        //ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        names = names.filter(name => this.scene.angryNPCCounts[name] < 3);//removes npc who left permanently

        //stops calling npcs if everyone left
        if (names.length === 0) 
        {
            return false;
        }
        
        this.name = names[Math.floor(Math.random() * names.length)]; //randomly selects name

        // this.noCount = this.scene.npcNoCounts[this.name] || 0; //gets counts of rejection

        console.log("Available names:", names);

        //Assigns colours by type.
        //Will replace with sprites
        if (this.name === "John") {
            // this.img = "npc1";
            this.img = this.scene.add.rectangle(this.x + 150, this.y + 150, 50, 50, 0xff0000); // Placeholder for John
            this.img.setDepth(55);
        }
        else if (this.name === "Jane") {
            // this.img = "npc2";
            this.img = this.scene.add.rectangle(this.x + 150, this.y + 150, 50, 50, 0x00ff00); // Placeholder for Jane    
            this.img.setDepth(55);
        }
        else if (this.name === "Bob") {
            // this.img = "npc3";
            this.img = this.scene.add.rectangle(this.x + 150, this.y + 150, 50, 50, 0x0000ff); // Placeholder for Bob
            this.img.setDepth(55);
        }
        else if (this.name === "Alice") {
            // this.img = "npc4";
            this.img = this.scene.add.rectangle(this.x + 150, this.y + 150, 50, 50, 0xffff00); // Placeholder for Alice
            this.img.setDepth(55);
        }
        else if (this.name === "Mike") {
            // this.img = "npc5";
            this.img = this.scene.add.rectangle(this.x + 150, this.y + 150, 50, 50, 0xff00ff); // Placeholder for Mike
            this.img.setDepth(55);
        }
        else if (this.name === "Emily") {
            // this.img = "npc6";
            this.img = this.scene.add.rectangle(this.x + 150, this.y + 150, 50, 50, 0x00ffff); // Placeholder for Emily
            this.img.setDepth(55);
        }

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
        //Assign dialogue by npc names
        if (this.name === "John")
        {
            return "Hello! I'm " + this.name + ". I would like to buy " + this.cropAmount + " " + this.crops + " for " + this.price + "$.";
        }
        else if (this.name === "Jane")
        {
            return "Good Morning! I'm " + this.name + ". It's a pleasure to meet you. I would like to buy " + this.cropAmount + " " + this.crops + " for " + this.price + "$.";
        }
        else if (this.name === "Bob")
        {
            return "G'Day'! " + this.name + " here! I'll get " + this.cropAmount + " " + this.crops + " for " + this.price + "$.";
        }
        else if (this.name === "Alice")
        {
            return "G'Day! " + this.name + " here! I'll get " + this.cropAmount + " " + this.crops + " for " + this.price + "$.";
        }
        else if (this.name === "Mike")
        {
            return "Hey! I'm " + this.name + "! Can I get " + this.cropAmount + " " + this.crops + " for " + this.price + "$.";
        }
        else if (this.name === "Emily")
        {
            return "Good Morrow! I am the esteemed " + this.name + ". I would like to purchase " + this.cropAmount + " " + this.crops + " for " + this.price + "$.";
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
        this.dialogue = this.scene.add.text(this.x + 30, this.y + 250, this.GetDialogue(), { font: "16px", fill: "#000000", align: "center", wordWrap: { width: 270}}).setDepth(51);

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
        this.yesBtn = new Button(this.scene, this.x + 50, this.y + 330, 50, 25, "Yes", this, "Yes", "YesOn");

        this.noBtn = new Button(this.scene, this.x + 125, this.y + 330, 50, 25, "No", this, "No", "NoOn");

        this.haggleBtn = new Button(this.scene, this.x + 225, this.y + 330, 100, 25, "Haggle", this, "Haggle", "HaggleOn");
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