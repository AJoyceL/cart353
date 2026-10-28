export default class Shop extends Phaser.Scene {
    constructor() {
        super({ key: "Shop" });
    }

    create() {
        //shop text
        this.add.text(480, 100, "Shop", {
            fontSize: "40px",
            color: "#ffffff"
        }).setOrigin(0.5);

        //shop menu
        this.shopMenu();

    }

    shopMenu()
    {
        const menu = this.add.rect(480, 200, 300, 300, 0x6f6678);
    }
}
