import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  NotFoundException,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import {
  PersonDto,
  ProductDto,
  generateBill,
  LoginDto,
} from 'src/dto/person.dto';
import { PersonService } from './person.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Controller()
export class PersonController {
  constructor(
    public personService: PersonService,
    private jwtService: JwtService,
  ) {}
  /*Here i defined authentication function */
  auth() {}
  /*this route for register*/
  @Post('/register')
  async register(@Body() { name, age, email, password }: PersonDto) {
    let encryptpass = await bcrypt.hash(password, 12);
    password = encryptpass;
    return await this.personService.register(name, age, email, password);
  }
  /*this route for login */
  @Post('/login')
  async getUseId(
    @Body() { email, password }: LoginDto,
    @Res({ passthrough: true }) res,
  ) {
    let personID = await this.personService.findUserId(email);
    if (!personID.email) {
      throw new BadRequestException({ message: `Invalid Email` });
    }

    let comparePass = await bcrypt.compare(password, personID.password);
    console.log(comparePass);
    if (!comparePass) {
      throw new BadRequestException({ message: `Invalid Password` });
    }
    const jwtToken = await this.jwtService.signAsync({ id: personID._id });
    res.cookie('jwtCookie', jwtToken, { httpOnly: true });
    return { message: `you are Successfully Login 😀` };
  }
  /*LogOut route */
  @Post('/logout')
  async logout(@Res({ passthrough: true }) res) {
    res.clearCookie('jwtCookie');
    return {
      message: `Logout Successfully ✔`,
    };
  }
  /*here we are store  product data into database*/
  @Post('/product')
  async product(
    @Body() { title, productName, price }: ProductDto,
    @Req() req,
    @Res() res,
  ) {
    try {
      let data;

      let productInfo = await this.personService.addProduct(
        title,
        productName,
        price,
      );
      try {
        const cookie = req.cookies['jwtCookie'];
        data = await this.jwtService.verifyAsync(cookie);
        console.log(data);
      } catch (err) {
        res.json({ error: 'Please Login for Access' });
      }
      console.log(productInfo);
      res.status(200).json({ Message: 'Product Added SuccessFully' });
    } catch (err) {
      console.error(err);
    }
  }
  @Post('/bill')
  async generateBill(@Body() { productName, email }: generateBill, @Res() res) {
    try {
      let personId = await this.personService.findUserId(email);
      if (!personId) {
        new NotFoundException(`Sorry user Id not found`);
      }
      console.log('userID: ' + personId._id);

      let productId = await this.personService.findProductId(productName);
      if (!productId) {
        new NotFoundException(`Sorry Product Id not found`);
      }
      console.log('productID: ' + productId._id);
      let userId = personId._id;
      let prodId = productId._id;
      let bill = await this.personService.genBill(userId, prodId);
      res.status(200).json(userId, prodId, bill);
    } catch (err) {
      console.error(`This error show from bill route ${err}`);
    }
  }
}
