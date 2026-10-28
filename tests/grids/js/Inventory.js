class Inventory
{
    constructor(scene, x, y, w, h)
    {
        this.scene = scene;
        
        this.rect = scene.add.rectangle(x, y, w, h, 0xe9e1f2);
        this.rect.setDepth(2);
        this.rect.setOrigin(0, 0);
        this.rect.setAlpha(.5);
    }
}

window.Inventory = Inventory;