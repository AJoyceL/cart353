//NPC CLASS
// IDEA: rather than having a shop for crafted items, NPCs will randomly apear in the garden to buy the player's crops. The player will have to answer the NPC before they leave. If the player doesn't have the required amount of crops, the NPC will leave and the player will lose out on money. The player can also choose to ignore the NPC and continue gardening.
// The NPC will have a random amount of crops that they want to buy, and a price corresponding to a realtime data. If the player sells the crops, the NPCs will come back. If the player ignores the NPC, they will leave and never come back.
// The player can negotiate with the NPCs to get a better price, but if the NPC disagrees too much, they will leave and never come back.
// Will have to see if it's possible

//data api I could use: 
// https://fakestoreapi.com 
// https://youtu.be/OrMFLc90TzI?si=idqDT-SCNHke2qvb  
// https://dev.to/williamsmithh/top-5-free-financial-data-apis-for-building-a-powerful-stock-portfolio-tracker-4dhj

import Button from "./Button.js";

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
        
        this.TextBubble();
        this.PlayerReply();

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

            const response = await fetch(API); // waits to fetch data
            const data = await response.json(); // waits to convert data

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
        let names = ["John", "Jane", "Bob", "Alice", "Mike", "Emily"];

        names = names.filter(name => !this.scene.angryNPCs.includes(name)); //ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

        if (names.length === 0) 
        {
            return false;
        }
        
        this.name = names[Math.floor(Math.random() * names.length)];

        this.noCount = this.scene.npcNoCounts[this.name] || 0;

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
        this.crops = ["Sage", "Rosemary", "Mugwort", "Yarrow", "Holy Basil", "Marigold"][Math.floor(Math.random() * 6)];
        this.cropAmount = Math.floor(Math.random() * 10) + 1;
        // this.price = (Math.random() * 10).toFixed(2);
    }

    //SPEECH
    // ref: https://docs.phaser.io/phaser/concepts/gameobjects/text
    async TextBubble()
    {
        //calls the NPC names
        if (!this.NPCObject())
        {
            return;
        } 

        this.CropObject(); //calls the crop names, amount, and price

        this.price = await this.getPrice(); //calls the price API

        //Text
        let text;
        
        //name specific text
        if (this.name === "John")
        {
            text = "Hello! I'm " + this.name + ". I would like to buy " + this.cropAmount + " " + this.crops + " for " + this.price + "$.";
        }
        else if (this.name === "Jane")
        {
            text = "Good Morning! I'm " + this.name + ". It's a pleasure to meet you. I would like to buy " + this.cropAmount + " " + this.crops + " for " + this.price + "$.";
        }
        else if (this.name === "Bob")
        {
            text = "G'Day'! " + this.name + " here! I'll get " + this.cropAmount + " " + this.crops + " for " + this.price + "$.";
        }
        else if (this.name === "Alice")
        {
            text = "G'Day! " + this.name + " here! I'll get " + this.cropAmount + " " + this.crops + " for " + this.price + "$.";
        }
        else if (this.name === "Mike")
        {
            text = "Hey! I'm " + this.name + "! Can I get " + this.cropAmount + " " + this.crops + " for " + this.price + "$.";
        }
        else if (this.name === "Emily")
        {
            text = "Good Morrow! I am the esteemed" + this.name + ". I would like to purchase " + this.cropAmount + " " + this.crops + " for " + this.price + "$.";
        }
        
        //Add text
        this.dialogue = this.scene.add.text(this.x + 30, this.y + 250, text, { font: "16px", fill: "#000000", align: "center", wordWrap: { width: 270 } }).setDepth(51);
        
    }

    PlayerReply()
    {
        this.ReplyBtn = [];

        this.ReplyBtn.push(new Button(this.scene, this.x + 20, this.y + 315, 50, 25, 0xe9e1f2, "Yes", this));

        this.ReplyBtn.push(new Button(this.scene, this.x + 100, this.y + 315, 50, 25, 0xe9e1f2, "No", this));

        this.ReplyBtn.push(new Button(this.scene, this.x + 180, this.y + 315, 100, 25, 0xe9e1f2, "Haggle", this));
    }

    RemoveNPC()
    {
        this.npc.destroy();

        if (this.dialogue) this.dialogue.destroy();
        if (this.img) this.img.destroy();

        this.ReplyBtn.forEach(button => {
            button.rect.destroy();
            button.zone.destroy();
        });

        this.scene.npcs = this.scene.npcs.filter(npc => npc !== this); //ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    }
    
    BoughtNPC()
    {
        this.RemoveNPC();
    }

    AngryNPC()
    {
        if (!this.scene.angryNPCs.includes(this.name))
        {
            this.scene.angryNPCs.push(this.name);
        }

        this.RemoveNPC();
    }
}