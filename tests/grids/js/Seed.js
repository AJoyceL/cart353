export default class Seeds 
{
    constructor (scene, x, y, type)
    {
        this.scene = scene;
        this.type = type;
        let color;

        if (this.type === "1")
        {
           color = 0x70a9ba;
        }

        else if (this.type === "2")
        {
           color = 0x78f6638;
        }

        else if (this.type === "3")
        {
            color = 0x914359;
        }

        this.circle = scene.add.circle(x, y, 5, color);
        this.circle.setInteractive();
        this.circle.setDepth(3);
        this.circle.type = type;
        
        // makeDraggable(this.circle, scene); //allow apple to be dragged
    };

    // Seed1(x, y)
    // {
    //     this.circle = this.add.circle(x, y, 5, 0x70a9ba);
    // }

    // Seed2(x, y)
    // {
    //     this.circle = this.add.circle(x, y, 5, 0x78f6638);
    // }

    // Seed3(x, y)
    // {
    //     this.circle = this.add.circle(x, y, 5, 0x914359);
    // }
    
}