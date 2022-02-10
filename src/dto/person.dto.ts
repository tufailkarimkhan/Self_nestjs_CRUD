import { IsInt, IsNotEmpty, Min, Max, IsEmail } from 'class-validator';

export class PersonDto {
  @IsNotEmpty({ message: `Please fill name field` })
  name: string;

  @IsNotEmpty({ message: `Please fill age field` })
  age: number;

  @IsNotEmpty({ message: `Please fill email field` })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: `Please fill password field` })
  password: string;
}

export class LoginDto {
  @IsNotEmpty({ message: `Please fill email field` })
  @IsEmail()
  email: string;
  @IsNotEmpty({ message: `Please fill password field` })
  password: string;
}

export class ProductDto {
  @IsNotEmpty({ message: `Please fill title field` })
  title: string;

  @IsNotEmpty({ message: `Please fill ProductName field` })
  productName: string;

  @IsNotEmpty({ message: `Please fill price field` })
  price: number;
}

export class generateBill {
  @IsNotEmpty({ message: `Please fill email field` })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: `Please fill ProductName field` })
  productName: string;
}
