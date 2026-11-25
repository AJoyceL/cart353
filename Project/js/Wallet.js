export default class Wallet 
{
    //ref: https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static
    static money = 200;//stores money

    constructor(scene, x, y, text) 
    {
        this.scene = scene;

        //Money background
        this.walletBG = scene.add.image(x, y, "Money");
        this.walletBG.setDisplaySize(120, 50);
        this.walletBG.setDepth(1);

        //Text
        this.text = scene.add.text(x, y, text, 
            {
                fontSize: "32px", 
                fill: "#2E2A3B"
            });
        this.text.setOrigin(.5, .5);
        this.text.setDepth(2);

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

    //Update wallet
    update()
    {
        this.text.setText(Wallet.money + "$");
    }

    //Gaining
    static add(amount) 
    {
        Wallet.money += amount;
    }
}

window.Wallet = Wallet;