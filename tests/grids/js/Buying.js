export default class Wallet 
{
    //ref: https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static
    static money = 100;//initial amount

    constructor(scene, x, y, text) 
    {
        this.scene = scene;
        this.text = scene.add.text(x, y, text, {fontSize: "32px", fill: "#c9b5e5"});
        this.text.setOrigin(.5, .5);
        this.update();
    }

    //Spending
     static spend(amount)
    {
        if (Wallet.money >= amount)
        {
            Wallet.money -= amount;
            return true;
        }

        return false;
    }

    update()
    {
        this.text.setText(Wallet.money + "$");
    }

    //Gaining
    static add(amount) 
    {
        Wallet.money += amount;
    }

    update() 
    {
        this.text.setText(Wallet.money + "$");
    }

}
window.Wallet = Wallet;