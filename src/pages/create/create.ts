import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyServiceProvider } from '../../providers/my-service/my-service';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the CreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  public holdingsArr = [];
  public coinsArr;
  public nameArr;
  public symbolArr;
  public myInput;
  public resultsArr=[];


  constructor(private alertCtrl: AlertController, public msp: MyServiceProvider, public navCtrl: NavController, public navParams: NavParams) {

    //generate list of coins from CMC
    this.generateCoins();
    /*
    https://api.coinmarketcap.com/v1/ticker/?start=0&limit=0
    https://api.coinmarketcap.com/v1/ticker/bitcoin/
     {
        "id": "bitcoin",
        "name": "Bitcoin",
        "symbol": "BTC",
        "rank": "1",
        "price_usd": "573.137",
        "price_btc": "1.0",
        "24h_volume_usd": "72855700.0",
        "market_cap_usd": "9080883500.0",
        "available_supply": "15844176.0",
        "total_supply": "15844176.0",
        "percent_change_1h": "0.04",
        "percent_change_24h": "-0.3",
        "percent_change_7d": "-0.57",
        "last_updated": "1472762067"
    },
    ...
    */
    //filter results based on search (Name or Symbol)
    //onselect, popup quantiy input
    //onsave, save to holdingsArr
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
  }


  generateCoins() {
    //ion load
    this.msp.getRemoteData("https://api.coinmarketcap.com/v1/ticker/?start=0&limit=0").then((data) => {
      console.log("Retrieved from CMC:");
      console.log(data);
      this.coinsArr = data;
      //ion dismiss
    });
  }

  narrowSearch(str) {
    console.log("filtering input")
    this.resultsArr=[];
    let strArray = this.coinsArr;

    for (let j = 0; j < strArray.length; j++) {
     
      if (strArray[j].id.includes(str)||strArray[j].name.includes(str)||strArray[j].symbol.includes(str)){
        this.resultsArr.push(strArray[j]);
      }

      
    }
    console.log(this.resultsArr)
  }


  showPrompt(id) {
    let prompt = this.alertCtrl.create({
      title: 'Much mooncoin?',
      inputs: [
        {
          name: 'Quantity',
          placeholder: '1'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            console.log('Saved clicked');
            console.log(data.Quantity);
            let coinObj = {
              "id":id,
              "qty":data.Quantity
            }
            //update into holdingsArr
            this.msp.updateHoldings(coinObj).then(()=>{
              this.navCtrl.pop();
            });
            
          }
        }
      ]
    });
    prompt.present();
  }

}
