const config = {
    width: 800,
    height: 400,
    type: Phaser.AUTO,
    physics:
    {
        default: "arcade",
        arcade: 
        {
            gravity:{y: 0},
            debug: true
        }
    },
    scene: 
    {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload()
{

}

function create()
{
    //GRID
    this.grid = this.add.grid(200, 200, 300, 300, 100, 100, 0x543f13, 1, 0xffffff, 1)
}

function update()
{

}

