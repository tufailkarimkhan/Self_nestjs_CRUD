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
  async addUser(name: string, age: number, email: string, password: string) {
    const userInfo = await this.db
      .collection('person', 'user')
      .insertOne({ name, age, email, password });
    console.log(userInfo);
    return userInfo;
  }
  async genrateBill(userId, transactionId) {
    const bill = await this.db
      .collection('bills')
      .insertOne({ userId, transactionId, timestamp: new Timestamp() });
  }

  peopleId = new ObjectId('42432342432432432');
  async addPeople(userId) {
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
  }
}
