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

        this.npc = scene.add.rectangle(x, y, 400, 350, 0xdbd0bd);
        this.npc.setOrigin(0.5, 0.5);
        this.npc.setInteractive();
        this.npc.setDepth(50);
        
        this.TextBubble();
    }

    //SPRITES
    preload()
    {
        //will add img
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
        //Text
        let text = "Hello! I'm " + this.name + ". I would like to buy " + this.cropAmount + " " + this.crops + " for " + this.price + "$.";
        
        //Add text
        this.scene.add.text(725, 350, text, { font: "15px", fill: "#000000", align: "left", wordWrap: { width: 225 } }).setDepth(51);
        
    }

}