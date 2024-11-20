// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
// import { Role } from 'src/identity/role/entity/role.entity';

// export class CreateUserDto {
//   @IsNotEmpty()
//   @ApiProperty()
//   firstName: string;

//   @IsNotEmpty()
//   @ApiProperty()
//   lastName: string;

//   @IsEmail()
//   @ApiProperty()
//   email: string;

//   @IsOptional()
//   @ApiProperty({ required: false })
//   phoneNo: string;

//   @IsNotEmpty()
//   @ApiProperty()
//   password: string;

//   @IsOptional()
//   @ApiProperty({ required: false })
//   profilePicture: string;

//   @IsOptional()
//   @ApiProperty({ required: false })
//   status: boolean;

//   @IsOptional()
//   @ApiProperty({ required: false })
//   location: string;

//   @IsOptional()
//   @ApiProperty({ required: false })
//   refreshToken: string;

//   @IsOptional()
//   createdBy: number;

//   @IsOptional()
//   updatedBy: number;

//   @IsOptional()
//   @ApiProperty({ required: false })
//   roleId: number[];

//   @IsOptional()
//   roles: Role[];
// }
