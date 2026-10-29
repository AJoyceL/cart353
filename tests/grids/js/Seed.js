export default class Seeds 
{
    constructor (scene, x, y)
    {
        this.scene = scene;
        this.circle = scene.add.circle(x, y, 5, 0x70a9ba);
        this.circle.setInteractive();
        this.circle.setDepth(3);
        
        // makeDraggable(this.circle, scene); //allow apple to be dragged
    };
    
}