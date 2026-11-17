export default class CropCount
{
    static counts = [0, 0, 0, 0, 0, 0]; //int crop count

    constructor(scene, x, y, text, type) 
    {
        this.scene = scene;
        this.type = type;

        this.text = scene.add.text(x, y, text, {fontSize: "20px", fill: "#18082d"});
        this.text.setOrigin(.5, .5);
        this.text.setDepth(20);
        this.update();
    }

    //add crops
    static add(type, amount)
    {
        CropCount.counts[type] += amount;
    }

    //sells crops
    static sell(type, amount)
    {
        if (CropCount.counts[type] >= amount)
        {
            CropCount.counts[type] -= amount;
            return true;
        }
        return false;
    }

    update()
    {
        this.text.setText(CropCount.counts[this.type]);
    }
}
window.CropCount = CropCount;