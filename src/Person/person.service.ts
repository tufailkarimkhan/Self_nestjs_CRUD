import { Injectable, Res } from '@nestjs/common';
import { DbRepository } from 'src/Database/db.repositery';

@Injectable()
export class PersonService {
  constructor(private dbRepository: DbRepository) {}

  /*this funcion return User's data */
  async findByUserId(email: string) {
    let userId = await this.dbRepository.findUserByEmail(email);
    return userId;
  }

  
  /*This function add product into DB */
  async addProduct(title: string, productName: string, price: number) {
    let productInfo = await this.dbRepository.addProduct(
      title,
      productName,
      price,
      );
      return productInfo;
    }
    
    /*find All user*/ 
    async findAllProducts(){
      let allProductsData= await this.dbRepository.findAllProducts()
     return allProductsData
    } 

  /*this funcion is use to find product id */
  async findProductId(productName: string) {
    return await this.dbRepository.findProductId(productName);
  }
  /*Here i store person ID and Product ID Inside the generateBill*/

  async genBill(userId, prodId) {
    let bill = this.dbRepository.genrateBill(userId, prodId);
    return bill;
  }
  // for Cookies
  // generateCookie(cookieName,token){
  //   return cookie(cookieName,token,{ httpOnly: true })
  // }
}
