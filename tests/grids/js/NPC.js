//NPC CLASS
// IDEA: rather than having a shop for crafted items, NPCs will randomly apear in the garden to buy the player's crops. The player will have to answer the NPC before they leave. If the player doesn't have the required amount of crops, the NPC will leave and the player will lose out on money. The player can also choose to ignore the NPC and continue gardening.
// The NPC will have a random amount of crops that they want to buy, and a price corresponding to a realtime data. If the player sells the crops, the NPCs will come back. If the player ignores the NPC, they will leave and never come back.
// The player can negotiate with the NPCs to get a better price, but if the NPC disagrees too much, they will leave and never come back.
// Will have to see if it's possible

//data api I could use: 
// https://fakestoreapi.com 
// https://youtu.be/OrMFLc90TzI?si=idqDT-SCNHke2qvb  
// https://dev.to/williamsmithh/top-5-free-financial-data-apis-for-building-a-powerful-stock-portfolio-tracker-4dhj

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
    }

    //SPRITES
    preload()
    {
        //will add img
    }

    //CREATE NPC OBJECTS
    NPCObject()
    {
        this.name = ["John", "Jane", "Bob", "Alice", "Mike", "Emily"][Math.floor(Math.random() * 6)];

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
    }

    //CREATE CROP RELATED TEXT
    CropObject()
    {
        this.crops = ["", "Carrots", "Tomatoes", "Lettuce", "Potatoes", "Cucumbers", "Peppers"][Math.floor(Math.random() * 7)];
        this.cropAmount = Math.floor(Math.random() * 10) + 1;
        this.price = (Math.random() * 10).toFixed(2);
    }

    //INTERACTIONS
    // Will have to connect this to a JSON fil to get dialogues
    interact()
    {
        //will add interactions
    }

    //PRICING
    // Pricing will be based on real-time data from a finacial API. 
    getPrice()
    {
        //will add pricing
    }

    //SPEECH
    // ref: https://docs.phaser.io/phaser/concepts/gameobjects/text
    TextBubble()
    {
        this.NPCObject(); //calls the NPC names
        this.CropObject(); //calls the crop names, amount, and price

        //Text
        let text = "Hello! I'm " + this.name + ". I would like to buy " + this.cropAmount + " " + this.crops + " for " + this.price + "$.";
        
        //Add text
        this.scene.add.text(this.x + 30, this.y + 275, text, { font: "16px", fill: "#000000", align: "center", wordWrap: { width: 275 } }).setDepth(51);
        
    }

}