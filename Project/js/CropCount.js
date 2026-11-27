export default class CropCount
{
    static counts = [0, 0, 0, 0, 0, 0];

    // Plant names for each crop type
    static names = [
        "Sage",
        "Thyme",
        "Mugwort",
        "Hemlock",
        "Yarrow",
        "Fairy Cup"
    ];

    constructor(scene, x, y, text, type) 
    {
        this.scene = scene;
        this.type = type;

        this.text = scene.add.text(x, y, text, {
            fontSize: "20px",
            fill: "#2E2A3B",
            align: "center",
            lineSpacing: "5"
        });

        this.text.setOrigin(.5, .5);
        this.text.setDepth(20);
        this.update();
    }

    // Add crops
    static add(type, amount)
    {
        CropCount.counts[type] += amount;
    }

    // Sells crops
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
        this.text.setText(
            CropCount.names[this.type] + "\n" + CropCount.counts[this.type]
        );
    }
}

window.CropCount = CropCount;