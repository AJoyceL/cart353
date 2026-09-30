//CLASSES
class Plot
{
    constructor(scene, x, y)
    {
        this.scene = scene;
        this.rectangle = scene.add.rectangle(x, y, 100, 100, 0x7d7482)
        this.rectangle.setInteractive()

        //MOUSE EVENTS
        this.rectangle.on("pointerover", (e) => {
            this.rectangle.setFillStyle(0x574f5c);
        });
        this.rectangle.on("pointerout", (e) => {
            this.rectangle.setFillStyle(0x7d7482);
        })
    }
}

class Crop
{
    constructor (scene, x, y)
    {
        this.scene = scene;
        this.circle = scene.add.circle(x, y, 25, 0x70a9ba)
        this.circle.setInteractive()

        makeDraggable(this.circle)
    }
}

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
    this.grid = this.add.grid(400, 200, 300, 300, 100, 100, 0x543f13, 0, 0x574f5c, 1)
    this.grid.setDepth(2) //z-index

    //PLOT
    this.plot1 = new Plot(this, 300, 200)
    this.plot2 = new Plot(this, 400, 200)
    this.plot3 = new Plot(this, 500, 200)
    this.plot4 = new Plot(this, 300, 100)
    this.plot5 = new Plot(this, 400, 100)
    this.plot6 = new Plot(this, 500, 100)
    this.plot7 = new Plot(this, 300, 300)
    this.plot8 = new Plot(this, 400, 300)
    this.plot9 = new Plot(this, 500, 300)

    //CROPS
    this.crop1 = new Crop(this, 50, 100)
    this.crop2 = new Crop(this, 50, 200)
    this.crop3 = new Crop(this, 50, 300)
}

function update()
{

}

//ref: https://youtu.be/jWglIBp4usY?si=ewJsWkuTyCx2tdrG
function makeDraggable(gameObject , enableLogs = false) 
{
    gameObject.setInteractive();

    function log(message)
    {
        if (enableLogs)
        {
            console.log(message)
        }
    }

    function onDrag(pointer) 
    {
        log(`[makeDraggable:onDrag] invoked for game object: ${gameObject.name}`)

        gameObject.x = pointer.x
        gameObject.y = pointer.y
    }

    function stopDrag(pointer) 
    {
        log(`[makeDraggable:stopDrag] invoked for game object: ${gameObject.name}`)

        gameObject.on(Phaser.Input.Events.POINTER_DOWN, startDrag);
        gameObject.off(Phaser.Input.Events.POINTER_UP, stopDrag);
        gameObject.off(Phaser.Input.Events.POINTER_MOVE, onDrag);


    }

    function startDrag(pointer) 
    {
        log(`[makeDraggable:startDrag] invoked for game object: ${gameObject.name}`)

        gameObject.off(Phaser.Input.Events.POINTER_DOWN, startDrag);
        gameObject.on(Phaser.Input.Events.POINTER_UP, stopDrag);
        gameObject.on(Phaser.Input.Events.POINTER_MOVE, onDrag);
    }

    gameObject.on(Phaser.Input.Events.POINTER_DOWN, startDrag);
}