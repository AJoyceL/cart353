// IDEAS: 
// Use L-Systems t animate the growth of the plants.
 
export default class Seeds 
{
    constructor (scene, x, y, type)
    {
        this.scene = scene;
        this.type = type;
        let color;

        if (type === "1")
        {
           color = 0x70a9ba;
        }

        else if (type === "2")
        {
           color = 0x78f6638;
        }

        else if (type === "3")
        {
            color = 0x963562;
        }

        else if (type === "4")
        {
            color = 0xd1c569;
        }  

        else if (type === "5")
        {
            color = 0x57a15c;
        }   

        else if (type === "6")
        {
            color = 0x44246e;
        }

        this.circle = scene.add.circle(x, y, 5, color);
        this.circle.setInteractive();
        this.circle.setDepth(5);
        this.circle.type = type;
    };

    static createSeed(garden, type, x, y) 
    {
        if (type === "1")
        {
            x = 50;
            y = 125;
        }

        else if (type === "2")
        {
            x = 50
            y = 175;
        }

        else if (type === "3")
        {
            x = 50; 
            y = 225;
        }
        else if (type === "4")
        {
            x = 125; 
            y = 125;
        }   
        else if (type === "5")
        {
            x = 125;
            y = 175;
        }   
        else if (type === "6")
        {
            x = 125;
            y = 225;
        }

        else
        {
            return null;
        }

        const seed = new Seeds(garden, x, y, type);
        garden.crops.push(seed.circle);

        return seed;
    }

}