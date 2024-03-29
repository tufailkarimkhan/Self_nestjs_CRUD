import { Injectable } from '@nestjs/common';
import { MongoClient, ObjectId, Timestamp } from 'mongodb';

const url = 'mongodb://localhost:27017/nestSelfCrud';

@Injectable()
export class DbRepository {
  db;
  constructor() {
    const databaseClient = new MongoClient(url);
    databaseClient
      .connect()
      .then((connect) => {
        this.db = connect.db();

        console.log('MongoDb connected');
      })
      .catch((err) => {
        console.log(`Error from Database Connection ${err}`);
      });
  }
  /*this function is use to add person's data\*/
  
  async addUser(name: string, age: number, email: string, password: string) {
    try{ 
     
      
      let userDataFind= await this.findUserByEmail(email)
      
      if(userDataFind){
        return `${userDataFind.email} Already Exits Please Try Another`
      }
      else{
        console.log(`show db.Repository line 40 email add Section ${email}`);
        const userInfo = await this.db
        .collection('person')
        .insertOne({ name, age, email, password });
        console.log(userInfo);
        return ` You are Registered Successfully`
        
      }
    } catch(err){
      console.warn(err);
    }
  }
  /*here we get the User id */
  async findUserByEmail(email: string) {
    let userId = await this.db
    .collection('person')
    .findOne({ email: email });

    return userId;
  }
  
  /*Here we insert product information inside DB*/
  async addProduct(title: string, productName: string, price: number) {
    await this.db
    .collection('product')
    .insertOne({ title, productName, price });
    return `${productName} add SuccessFully`;
  }
  /*here find all products */
    async findAllProducts(){
     let allProductsData = await this.db.collection('product').find({}).sort({title:1}).toArray()
     return allProductsData
      
    }
  /*Here we get product Id */
  async findProductId(productName: string) {
    let productId = await this.db
      .collection('product')
      .findOne(
        { productName: productName },
        { title: 0, productName: 0, price: 0 },
      );
    return productId;
  }

  async genrateBill(userId, prodId) {
    const bill = await this.db
      .collection('bills')
      .insertOne({ userId, prodId, orderDate: new Date() });
    return bill;
  }

  /* async addPeople(userId) {
    const data = await this.db.collection('people').aggregate([
      {
        $match: {
          _id: userId,
        },
      },
      {
        lookup: {
          from: 'people',
          localField: 'peopleId',
          foreignField: '_Id',
          as: '',
        },
      },
    ]);
    return data;
  }*/
}
