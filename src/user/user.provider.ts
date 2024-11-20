// import {
//     BadRequestException,
//     ConflictException,
//     Injectable,
//     NotFoundException,
//   } from '@nestjs/common';
//   import { User } from './entity/user.entity';
//   import { UserRepository } from './repository/user.repository';
//   import { CreateUserDto } from './dto/createUser.dto';
//   import * as bcrypt from 'bcrypt';
//   import { RoleProvider } from '../role/role.provider';
//   import { UpdateUserDto } from './dto/updateUser.dto';
//   import { plainToInstance } from 'class-transformer';
//   import { Role } from '../role/entity/role.entity';
//   import  { IUser, IStudentsByTeacherId, IGetSchoolUsersfindConditions, ISchoolAdminResponse, IGetStudentsResponse, IStudent, IGetTeachersResponse, IGetStudentByTeachersResponse } from './interface/user.interface';
//   import { UserService } from './service/user.service';
//   import { GetAllDto } from 'src/shared/dto/GetAll.dto';
  
//   @Injectable()
//   export class UserProvider {
//     constructor(
//       private readonly userRepository: UserRepository,
//       private readonly roleProvider: RoleProvider,
//       private readonly userService: UserService
//     ) {}
  
//     async findByIdWithRoles(id: number): Promise<User | undefined> {
//       try {
//         return await this.userRepository.findByIdWithRoles(id);
//       } catch (error) {
//         throw new BadRequestException(
//           'Something went wrong while fetching user with roles',
//           error
//         );
//       }
//     }
  
//     async findStudentsByTeacherId(
//       id: number
//     ): Promise<IStudentsByTeacherId | []> {
//       try {
//         return await this.userRepository.findStudentsByTeacherId(id);
//       } catch (error) {
//         throw new BadRequestException(
//           'Something went wrong while fetching user by student id and teacher id',
//           error
//         );
//       }
//     }
  
//     async findPublicUserByIdWithRoles(id: number): Promise<IUser> {
//       try {
//         const user = await this.userRepository.findByIdWithRoles(id);
//         return this.userService.publicUser(user);
//       } catch (error) {
//         throw new BadRequestException(
//           'Something went wrong while fetching user with roles',
//           error
//         );
//       }
//     }
  
//     async findAll(): Promise<User[]> {
//       return this.userRepository.findAll();
//     }
  
//     async saveRefreshToken(user: User, refreshToken: string): Promise<User> {
//       try {
//         user.refreshToken = refreshToken;
//         return await this.userRepository.save(user);
//       } catch (error) {
//         throw new BadRequestException(
//           'Something went wrong while saving refresh token',
//           error
//         );
//       }
//     }
  
//     async add(user: CreateUserDto): Promise<User> {
//       try {
//         const { password, ...userData } = user;
//         const saltRounds = 10;
  
//         //eslint-disable-next-line
//         const [hashedPassword, roles, existingUser]: [string, Role[], User] =
//           await Promise.all([
//             //eslint-disable-next-line
//             bcrypt.hash(password, saltRounds),
//             this.roleProvider.findRoleByIds(user.roleId),
//             this.userRepository.findOne({ email: user.email }),
//           ]);
  
//         if (existingUser) {
//           throw new ConflictException('Email already exists');
//         }
  
//         if (roles.length != user.roleId.length) {
//           throw new NotFoundException('One or more roles not found');
//         }
  
//         const newUser = await this.userRepository.create({
//           ...userData,
//           password: hashedPassword,
//           roles: roles,
//         });
  
//         return newUser;
//       } catch (error) {
//         throw new BadRequestException(
//           'Something went wrong while adding user',
//           error
//         );
//       }
//     }
  
//     async update(id: number, payload: UpdateUserDto): Promise<User> {
//       try {
//         let payloadRoles: Role[];
  
//         const [user, existingUser] = await Promise.all([
//           this.userRepository.findById(id),
//           this.userRepository.findOne({ email: payload.email }),
//         ]);
  
//         if (existingUser) {
//           throw new ConflictException('Email already exists');
//         }
  
//         if (!user) {
//           throw new NotFoundException('User not found');
//         }
  
//         const { roleId, ...userData } = payload;
//         const payloadData = plainToInstance(User, { ...user, ...userData });
//         const updatedUser = await this.userRepository.update(id, payloadData);
  
//         if (payload.roleId) {
//           payloadRoles = await this.roleProvider.findRoleByIds(payload.roleId);
//           if (payloadRoles.length != roleId.length) {
//             throw new NotFoundException('One or more roles not found');
//           }
//           await this.userRepository.updateUserRoles(updatedUser, payloadRoles);
//         }
  
//         const responseData = await this.userRepository.findByIdWithRoles(id);
//         return responseData;
//       } catch (error) {
//         throw new BadRequestException(
//           'Something went wrong while updating user',
//           error
//         );
//       }
//     }
  
//     async findByEmail(email: string): Promise<User | undefined> {
//       try {
//         return await this.userRepository.findByEmail(email);
//       } catch (error) {
//         throw new BadRequestException(
//           'Something went wrong while fetching user',
//           error
//         );
//       }
//     }
  
//     async findById(id: number): Promise<User | undefined> {
//       return await this.userRepository.findById(id);
//     }
  
//     async findOne(where: Partial<User>): Promise<User | undefined> {
//       return this.userRepository.findOne(where);
//     }
  
//     async validatePassword(user: User, password: string): Promise<boolean> {
//       // eslint-disable-next-line
//       return await bcrypt.compare(password, user.password);
//     }
  
//     async save(user: User): Promise<User> {
//       return await this.userRepository.save(user);
//     }
  
//     async delete(id: number, deletedBy: User) {
//       const user = await this.userRepository.findOne({ id });
  
//       if (!user) {
//         throw new NotFoundException(`User with ID ${id} not found`);
//       }
  
//       try {
//         user.deletedAt = new Date();
//         user.deletedBy = deletedBy.id;
//         await this.userRepository.save(user);
//         return 'User deleted successfully';
//       } catch (error) {
//         throw new BadRequestException(
//           `Something went wrong while deleting the User with ID ${id}`
//         );
//       }
//     }
  
//     async getSchoolAdmins(
//       schoolId: number,
//       getSchoolAdminsDto: GetAllDto
//     ): Promise<ISchoolAdminResponse> {
//       const {
//         search,
//         orderBy = getSchoolAdminsDto.orderBy || 'createdAt',
//         order = getSchoolAdminsDto.order || 'ASC',
//         page = getSchoolAdminsDto.page || 1,
//         limit = getSchoolAdminsDto.limit || 10,
//       } = getSchoolAdminsDto;
//       const findConditions: IGetSchoolUsersfindConditions = { schoolId };
//       if (search) {
//         findConditions.keyword = search;
//       }
//       try {
//         const { data, total } =
//           await this.userRepository.findAndCountSchoolAdmins(
//             findConditions,
//             orderBy,
//             order,
//             page,
//             limit
//           );
//         const getSchoolAdminsResponse: ISchoolAdminResponse =
//           this.userService.parseSchoolAdmins({ data, total });
//         return getSchoolAdminsResponse;
//       } catch (error) {
//         throw new BadRequestException(
//           'Something went wrong while fetching school admin'
//         );
//       }
//     }
  
//     async getAllStudents(
//       schoolId: number,
//       getStudentsDto: GetAllDto
//     ): Promise<IGetStudentsResponse> {
//       const {
//         search,
//         orderBy = getStudentsDto.orderBy || 'createdAt',
//         order = getStudentsDto.order || 'ASC',
//         page = getStudentsDto.page || 1,
//         limit = getStudentsDto.limit || 10,
//       } = getStudentsDto;
//       const findConditions: IGetSchoolUsersfindConditions = { schoolId };
//       if (search) {
//         findConditions.keyword = search;
//       }
//       try {
//         const { data, total } = await this.userRepository.findAndCountStudents(
//           findConditions,
//           orderBy,
//           order,
//           page,
//           limit
//         );
//         const getStudentsResponse: IGetStudentsResponse =
//           this.userService.parseStudents({ data, total });
//         return getStudentsResponse;
//       } catch (error) {
//         throw new BadRequestException(
//           'Something went wrong while fetching students'
//         );
//       }
//     }
  
//     async findOneStudent(id: number): Promise<IStudent> {
//       let student: IStudent;
//       try {
//         student = await this.userRepository.findOneStudent(id);
//       } catch (error) {
//         throw new BadRequestException(
//           'Something went wrong while fetching student'
//         );
//       }
//       if(!student) {
//         throw new NotFoundException(
//           'Student not found'
//         )
//       }
//       return student
//     }
  
//     async getAllTeachers(
//       schoolId: number,
//       getTeachersDto: GetAllDto
//     ): Promise<IGetTeachersResponse> {
//       const {
//         search,
//         orderBy = getTeachersDto.orderBy || 'createdAt',
//         order = getTeachersDto.order || 'ASC',
//         page = getTeachersDto.page || 1,
//         limit = getTeachersDto.limit || 10,
//       } = getTeachersDto;
//       const findConditions: IGetSchoolUsersfindConditions = { schoolId };
//       if (search) {
//         findConditions.keyword = search; 
//       }
//       try {
//         const { data, total }: IGetTeachersResponse = await this.userRepository.findAndCountTeachers(
//           findConditions,
//           orderBy,
//           order,
//           page,
//           limit
//         );
//         return { data, total };
//       } catch (error) {
//         throw new BadRequestException(
//           'Something went wrong while fetching teachers'
//         );
//       }
//     }
  
//     async getAllStudentsByTeacherId(
//       teacherId: number,
//       getStudentsByTeacherDto: GetAllDto
//     ): Promise<IGetStudentByTeachersResponse> {
//       const {
//         search,
//         orderBy = getStudentsByTeacherDto.orderBy || 'createdAt',
//         order = getStudentsByTeacherDto.order || 'ASC',
//         page = getStudentsByTeacherDto.page || 1,
//         limit = getStudentsByTeacherDto.limit || 10,
//       } = getStudentsByTeacherDto;
//       const findConditions: IGetSchoolUsersfindConditions = { teacherId };
//       if (search) {
//         findConditions.keyword = search; 
//       }
//       try {
//         const { data, total } = await this.userRepository.findAndCountStudentsByTeacherId(
//           findConditions,
//           orderBy,
//           order,
//           page,
//           limit
//         );
//         return { data, total };
//       } catch (error) {
//         throw new BadRequestException(
//           'Something went wrong while fetching students'
//         );
//       }
//     }
//   }
  