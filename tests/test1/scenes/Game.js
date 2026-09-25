export default class Game extends Phaser.Scene
{
    preload()
    {

    }

    create()
    {
        // const text = this.add.text(400, 200, 'Game')
        // text.setOrigin(.5, .5)

        // BALL
        const ball = this.add.circle(400, 200, 10, 0xffffff, 1)
        this.physics.add.existing(ball)

        ball.body.setBounce(1,1)
        ball.body.setCollideWorldBounds(true, 1, 1)
        ball.body.setVelocity(200, 0)

        //PADDLES
        const paddleLeft = this.add.rectangle(50, 200, 15, 100, 0xffffff, 1)
        this.physics.add.existing(paddleLeft, true)
        this.physics.add.collider(paddleLeft, ball)
        

    }
}


