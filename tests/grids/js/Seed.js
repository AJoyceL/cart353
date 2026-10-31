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
            color = 0x914359;
        }

        this.circle = scene.add.circle(x, y, 5, color);
        this.circle.setInteractive();
        this.circle.setDepth(5);
        this.circle.type = type;
    };

    static createSeed(garden, type, y) 
    {
        // let y;

        if (type === "1")
        {
           y = 100;
        }

        else if (type === "2")
        {
           y = 200;
        }

        else if (type === "3")
        {
            y = 300;
        }

        else
        {
            return null;
        }

        const seed = new Seeds(garden, 50, y, type);
        garden.crops.push(seed.circle);

        return seed;
    }

}