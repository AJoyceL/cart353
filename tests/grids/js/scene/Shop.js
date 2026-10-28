export default class Shop extends Phaser.Scene {
    constructor() {
        super({ key: "Shop" });
    }

    create() {
        this.add.text(400, 250, "Shop", {
            fontSize: "40px",
            color: "#ffffff"
        }).setOrigin(0.5);
    }
}

// // export default Shop;
// window.Shop = Shop;