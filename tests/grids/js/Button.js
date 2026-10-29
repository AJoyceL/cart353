export default class Button 
{
    //will have to change for an img or sprite
    constructor(scene, x, y, w, h, color, type)
    {
        this.scene = scene;
        this.type = type;

        this.rect = scene.add.graphics();
        this.rect.fillRoundedRect(x, y, w, h, 20);
        this.rect.fillStyle(color, 1);
        this.rect.setDepth(20);
        
        //Interactible zone
        this.zone = scene.add.zone(x + w / 2, y + h / 2, w, h);
        this.zone.setDepth(21);
        this.zone.setInteractive();

        //Mouse Event
        this.zone.on("pointerover", () =>{
            this.rect.clear();
            this.rect.fillStyle(0x6f6678, 1);
            this.rect.fillRoundedRect(x, y, w, h, 20);
        })

        this.zone.on("pointerout", () => {
            this.rect.clear();
            this.rect.fillStyle(color, 1);
            this.rect.fillRoundedRect(x, y, w, h, 20);
        });

        this.zone.on("pointerdown", () => {
            if (this.type === "shop") {
                this.ShopBtn();
            }
            else if (this.type === "garden") {
                this.GardenBtn();
            }
        });
    }

    ShopBtn()
    {
        // switch to the Shop scene
        this.scene.scene.start("Shop");
    }
    GardenBtn()
    {
        this.scene.scene.start("Garden");
    }
}

window.Button = Button;