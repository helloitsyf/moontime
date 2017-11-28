import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { NativeStorage } from '@ionic-native/native-storage';



/*
  Generated class for the MyServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyServiceProvider {

  constructor(
    //public http: HttpClient,
    public http: Http,
    private nativeStorage: NativeStorage,




  ) {
    console.log('Hello MyServiceProvider Provider');
  }

  storageRef() {
    return this.nativeStorage;
  }

  getRemoteData(url) {

    console.log("getting remote data")

    //url = 'https://jsonplaceholder.typicode.com/posts/1';

    return new Promise((resolve, reject) => {
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          //console.log(JSON.stringify(data))
          console.log("get data")
          resolve(data);
        }, error => {
          console.log(error);
          reject();
        });
    });

  }

  getHoldings() {
    return new Promise((resolve, reject) => {
      this.nativeStorage.getItem('holdingsArr')
        .then(
        data => {
          console.log(JSON.stringify(data));
          resolve(data);
        },
        error => {
          console.error(error)
          reject();
        });
    });
  }

  updateHoldings(newCoin) {
    return new Promise((resolve, reject) => {
      this.nativeStorage.getItem('holdingsArr')
        .then(
        data => {
          console.log("data exists");
          //check if existing
          let existing = false;
          let index = 0;
          for(let i=0;i<data.length;i++){
            if(data[i].id==newCoin.id){
              existing = true;
              index = i;
            }
          }

          let holdingsArr = data;
          if(existing){
            //get index and replace
            holdingsArr[index] = newCoin;
          }else{
            holdingsArr.push(newCoin);
          }
          
          this.nativeStorage.setItem('holdingsArr', holdingsArr)
            .then(
            () => {
              console.log('Stored item!')
              resolve();
            },
            error => {
              console.error('Error storing item', error)
              reject();
            });
        },
        error => {
          console.error(error)
          if (error.exception == null) {
            let holdingsArr = [];
            holdingsArr.push(newCoin);
            this.nativeStorage.setItem('holdingsArr', holdingsArr)
              .then(
              () => {
                console.log('Stored item!')
                resolve();
              },
              error => {
                console.error('Error storing item', error)
              reject();
              });
          }
        });

    });

  }

}
