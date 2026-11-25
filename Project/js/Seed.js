// IDEAS: 
// Use L-Systems t animate the growth of the plants.
 
export default class Seeds 
{
    constructor (scene, x, y, type)
    {
        this.scene = scene;
        this.type = type;
        let image;

        //Assign image by type
        //Will replace with sprites
        if (type === "1")
        {
           image = "SeedSage";
        }
        else if (type === "2")
        {
           image = "SeedThyme";
        }
        else if (type === "3")
        {
            image = "SeedMugwort";
        }
        else if (type === "4")
        {
            image = "SeedHemlock";
        }  
        else if (type === "5")
        {
            image = "SeedYarrow";
        }   
        else if (type === "6")
        {
            image = "SeedFairyCup";
        }

        this.circle = scene.add.image(x, y, image);
        this.circle.setDisplaySize(20, 20);
        this.circle.setInteractive();
        this.circle.setDepth(5);
        this.circle.type = type;
    };

    //Creates seeds based on type
    static createSeed(garden, type, x, y) 
    {
        //Assign position by type
        if (type === "1")
        {
            x = 75;
            y = 150;
        }
        else if (type === "2")
        {
            x = 75
            y = 200;
        }
        else if (type === "3")
        {
            x = 75; 
            y = 250;
        }
        else if (type === "4")
        {
            x = 125; 
            y = 150;
        }   
        else if (type === "5")
        {
            x = 125;
            y = 200;
        }   
        else if (type === "6")
        {
            x = 125;
            y = 250;
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