//CLASSES
class Plot //draws plots
{
    constructor(scene, x, y)
    {
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.rectangle = scene.add.rectangle(x, y, 100, 100, 0x7d7482);
        this.rectangle.setInteractive();

        //MOUSE EVENTS
        this.rectangle.on("pointerover", () => {
            this.rectangle.setFillStyle(0x574f5c);
        });
        this.rectangle.on("pointerout", () => {
            this.rectangle.setFillStyle(0x7d7482);
        });
    };

    contains(x, y)
    {
        return (
            x >= this.x - 50 &&
            x <= this.x + 50 &&
            y >= this.y - 50 &&
            y <= this.y + 50
        );
    };
}

class Apple //apples class
{
    constructor (scene, x, y)
    {
        this.scene = scene;
        this.circle = scene.add.circle(x, y, 25, 0x70a9ba);
        this.circle.setInteractive();
        this.circle.setDepth(3);
        
        makeDraggable(this.circle, scene);
    };
}

class Orange //oranges class
{
    constructor (scene, x, y)
    {
        this.scene = scene;
        this.circle = scene.add.circle(x, y, 25, 0x78f6638);
        this.circle.setInteractive();
        this.circle.setDepth(3);
        
        makeDraggable(this.circle, scene);
    };
}

class Berry //berries class
{
    constructor (scene, x, y)
    {
        this.scene = scene;
        this.circle = scene.add.circle(x, y, 25, 0x914359);
        this.circle.setInteractive();
        this.circle.setDepth(3);
        
        makeDraggable(this.circle, scene);
    };
}

class text //text class
{
    constructor(scene, x, y, text)
    {
        this.scene = scene;
        this.text = scene.add.text(x, y, text, { fontSize: "32px", fill: "#7e699b" });
        this.text.setOrigin(.5, .5);
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
        init: init,
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload()
{

}

function init()
{
    //initilise fruit counts
    this.appleCount = 0;
    this.orangeCount = 0;
    this.berryCount = 0;
}

function create()
{
    //GRID
    this.grid = this.add.grid(400, 200, 300, 300, 100, 100, 0x543f13, 0, 0x574f5c, 1);
    this.grid.setDepth(2); //z-index

    //PLOT
    this.plot1 = new Plot(this, 300, 200);
    this.plot2 = new Plot(this, 400, 200);
    this.plot3 = new Plot(this, 500, 200);
    this.plot4 = new Plot(this, 300, 100);
    this.plot5 = new Plot(this, 400, 100);
    this.plot6 = new Plot(this, 500, 100);
    this.plot7 = new Plot(this, 300, 300);
    this.plot8 = new Plot(this, 400, 300);
    this.plot9 = new Plot(this, 500, 300);

    //plot arrays
    this.plots = [
        this.plot1,
        this.plot2,
        this.plot3,
        this.plot4,
        this.plot5,
        this.plot6,
        this.plot7,
        this.plot8,
        this.plot9
    ];

    
    // FRUITS WILL BE CREATED WHEN ARROW UP, DOWN AND LEFT ARE PRESSED. 
    // THIS WORKS DESPITE THE FACT THAT THE FRUITS ARE NOT CREATED IN THE CREATE FUNCTION.

    //APPLES
    // this.apple1 = new Apple(this, 50, 100);
    // this.apple2 = new Apple(this, 50, 100);
    // this.apple3 = new Apple(this, 50, 100);

    // this.apples = [
    //     this.apple1,
    //     this.apple2,
    //     this.apple3
    // ];

    // //ORANGES
    // this.orange1 = new Orange(this, 50, 200);
    // this.orange2 = new Orange(this, 50, 200);
    // this.orange3 = new Orange(this, 50, 200);

    // this.oranges = [
    //     this.orange1,
    //     this.orange2,
    //     this.orange3
    // ];

    // this.berry1 = new Berry(this, 50, 300);
    // this.berry2 = new Berry(this, 50, 300);
    // this.berry3 = new Berry(this, 50, 300);

    // this.berries = [
    //     this.berry1,
    //     this.berry2,
    //     this.berry3
    // ];

    //TEXT
    this.applesText = new text(this, 700, 150, "0");
    this.orangesText = new text(this, 700, 250, "0");
    this.berriesText = new text(this, 700, 350, "0");

    //KEYBOARD INPUT
    this.arrows = this.input.keyboard.createCursorKeys();
}

function update()
{
    //when pressed, create a new fruit and add it to the scene
    if (Phaser.Input.Keyboard.JustDown(this.arrows.up))
    {
        this.apple = new Apple(this, 50, 100);
        console.log("buy apple")
    }

    if (Phaser.Input.Keyboard.JustDown(this.arrows.down))
    {
        this.orange = new Orange(this, 50, 200);
        console.log("buy orange")
    }

    if (Phaser.Input.Keyboard.JustDown(this.arrows.left))
    {
        this.berry = new Berry(this, 50, 300);
        console.log("buy berry")
    }
}

//ref: https://youtu.be/jWglIBp4usY?si=ewJsWkuTyCx2tdrG
function makeDraggable(gameObject, scene, enableLogs = false) 
{
        let planted = false;
        let fullyGrown = false;

    gameObject.setInteractive();

    function log(message)
    {
        if (enableLogs)
        {
            console.log(message);
        }
    };

    function onDrag(pointer) 
    {
        log(`[makeDraggable:onDrag] invoked for game object: ${gameObject.name}`);

        if(planted && !fullyGrown)
            {
                return;
            };

        gameObject.x = pointer.x;
        gameObject.y = pointer.y;
    }

    function stopDrag(pointer) 
    {
        log(`[makeDraggable:stopDrag] invoked for game object: ${gameObject.name}`);

        scene.plots.forEach(plot => {
            if (plot.contains(gameObject.x, gameObject.y))
            {
                scene.tweens.add({
                    targets: gameObject,
                    scale: 1.5,
                    duration: 5000,
                    ease: "Sine.easeInOut",

                    onComplete: () => {
                        fullyGrown = true;

                        //for apples
                        if(gameObject.fillColor === 0x70a9ba)
                        {
                            gameObject.on("pointerdown", () => {
                                gameObject.x = 700;
                                gameObject.y = 100;
                                gameObject.setScale(1);

                                gameObject.disableInteractive();

                                // increase text
                                scene.appleCount += 1;
                                scene.applesText.text.text = scene.appleCount;
                            });
                        }

                        //for oranges
                        if(gameObject.fillColor === 0x78f6638)
                        {
                            gameObject.on("pointerdown", () => {
                                gameObject.x = 700;
                                gameObject.y = 200;
                                gameObject.setScale(1);

                                gameObject.disableInteractive();

                                // increase text
                                scene.orangeCount += 1;
                                scene.orangesText.text.text = scene.orangeCount;
                            });
                        }
                        
                        //for berries
                        if(gameObject.fillColor === 0x914359)
                        {
                            gameObject.on("pointerdown", () => {
                                gameObject.x = 700;
                                gameObject.y = 300;
                                gameObject.setScale(1);

                                gameObject.disableInteractive();

                                // increase text
                                scene.berryCount += 1;
                                scene.berriesText.text.text = scene.berryCount;
                            });
                        }
                    }
                });

                gameObject.x = plot.x;
                gameObject.y = plot.y;

                planted = true;

                console.log("crop in");
            };
        });

        gameObject.on(Phaser.Input.Events.POINTER_DOWN, startDrag);
        gameObject.off(Phaser.Input.Events.POINTER_UP, stopDrag);
        gameObject.off(Phaser.Input.Events.POINTER_MOVE, onDrag);

    }

    function startDrag(pointer) 
    {
        log(`[makeDraggable:startDrag] invoked for game object: ${gameObject.name}`);

        gameObject.off(Phaser.Input.Events.POINTER_DOWN, startDrag);
        gameObject.on(Phaser.Input.Events.POINTER_UP, stopDrag);
        gameObject.on(Phaser.Input.Events.POINTER_MOVE, onDrag);
    }

    gameObject.on(Phaser.Input.Events.POINTER_DOWN, startDrag);
}
