export default class TitleScreen extends Phaser.Scene
{
    preload()
    {

    }

    create()
    {
        const text = this.add.text(400, 200, 'hello world!')
        text.setOrigin(.5, .5)
        
    }
}