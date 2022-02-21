import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
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

import { AuthService } from 'src/auth/service/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
@Controller()
export class PersonController {
  constructor(
    public personService: PersonService,
    private authService: AuthService, // private jwtService: JwtService,
  ) {}
  /*Here i defined authentication function */
  auth() {}
  /*this route for register*/
  @Post('/register')
  async register(@Body() { name, age, email, password }: PersonDto) {
    let encryptpass = await bcrypt.hash(password, 12);
    password = encryptpass;
    return await this.authService.encryptPass(name, age, email, password);
  }

  /*this route for login */
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async authenticateUser(@Body() { email }: LoginDto, @Res() res) {
    const user = await this.authService.login(email, res);
    res.status(200).json(user);
    // let jwtToken = await this.authService.login({ id: personID._id });

    // console.log(jwtToken);

    // res.cookie('jwtCookie', jwtToken, { httpOnly: true });
    // res.status(200).json({ message: `you are Successfully Login 😀` });
  }

  /*here we are store  product data into database*/
  @UseGuards(JwtAuthGuard)
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
      // try {
      //   const cookie = req.cookies['jwtCookie'];
      //   data = await this.jwtService.verifyAsync(cookie);
      //   console.log(data);
      // } catch (err) {
      //   res.status(401).json({ error: 'Please Login for Access' });
      // }
      console.log(productInfo);
      res.status(200).json({ Message: 'Product Added SuccessFully' });
    } catch (err) {
      console.error(err);
    }
  }
  @Post('/bill')
  async generateBill(@Body() { productName, email }: generateBill, @Res() res) {
    try {
      let personId = await this.personService.findByUserId(email);
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
  /*LogOut route */
  @UseGuards()
  @Post('/logout')
  async logout(@Res({ passthrough: true }) res) {
    // res.clearCookie('jwtCookie');
    return {
      message: `Logout Successfully ✔`,
    };
  }
}
