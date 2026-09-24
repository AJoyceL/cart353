var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        create: create
    }
};

var game = new Phaser.Game(config);

function create () {
    const grid = this.add.grid(400, 300, 600, 400, 50, 50, 0x0000ff, 1, 0x00ff00, 1);
}