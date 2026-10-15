// class MagicBar{
//     constructor(scene, x, y) {
//         this.scene = scene;
//         this.harvested = 0;
//         this.maxHarvested = 50;

//         //background
//         this.background = scene.add.rectangle (x, y, 204, 24, 0x333333);

//         //progression bar
//         this.bar = scene.add.rectangle(x - 100, y, 0, 16, 0x9b59b6);
//         this.bar.setorigin(0, .5);

//         this.label = scene.add.text(x -100, y -25, "Magic: 0/50", {fontSize: "15px", fill: "#7dcbef"});

//         this.background.setDepth(5);
//         this.bar.setDepth(6);
//         this.label.setDepth(6);
//     }

//     addPoint(){
//         this.harvested++;

//         //update bar
//         const progress = Math.min(this.harvested / this.maxHarvested, 1);
//         this.bar.width = 200 * progress;

//         //lable count
//         this.label.setText(`Magic: ${this.harvested} / ${this.maxHarvested}` )

//     }
// }


window.MagicBar = MagicBar;