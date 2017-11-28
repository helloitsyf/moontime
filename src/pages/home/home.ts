import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyServiceProvider } from '../../providers/my-service/my-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public holdingsArr;
  public total;
  public priceArr;

  constructor(public msp: MyServiceProvider, public navCtrl: NavController) {


  }
  ionViewDidEnter() {

    this.total = 0;
    this.priceArr = [];
    //get holdingsArr from storageRef
    this.msp.getHoldings().then((data) => {
      this.holdingsArr = data;
    }).then(() => {
      //get price 
      //update total
      //https://api.coinmarketcap.com/v1/ticker/bitcoin/
      for (let i = 0; i < this.holdingsArr.length; i++) {
        let url = "https://api.coinmarketcap.com/v1/ticker/" + this.holdingsArr[i].id;
        this.msp.getRemoteData(url).then((data) => {
          //this.dataArr.push(data);
          this.priceArr.push(data);
          this.total = this.total + this.holdingsArr[i].qty*data[0].price_usd;
        });
      }
    }).then(()=>{


    });

  }


  addNew() {
    this.navCtrl.push("CreatePage");
  }


  load() {
    //this.msp.getRemoteData();
  }

  clear() {
    this.msp.storageRef().clear();
    this.holdingsArr = [];
  }



}
