// import { InjectRepository } from '@nestjs/typeorm';
// import { Injectable } from '@nestjs/common';]

// @Injectable()
// export class UserRepository {
//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>
//   ) {}

//   async findByIdWithRoles(id: number): Promise<User | undefined> {
//     return this.userRepository.findOne({
//       where: { id },
//       relations: ['roles'],
//     });
//   }

//   findAll(): Promise<User[]> {
//     return this.userRepository.find();
//   }

//   create(user: CreateUserDto): Promise<User> {
//     return this.userRepository.save(user);
//   }

//   update(id: number, user: User): Promise<User> {
//     return this.userRepository.save({ id, ...user });
//   }

//   updateUserRoles(user: User, roles: Role[]): Promise<User> {
//     user.roles = roles;
//     return this.userRepository.save(user);
//   }

//   findByEmail(email: string): Promise<User | undefined> {
//     return this.userRepository.findOne({ where: { email } });
//   }

//   findById(id: number): Promise<User | undefined> {
//     return this.userRepository.findOne({ where: { id } });
//   }

//   findStudentsByTeacherId(id: number): Promise<IStudentsByTeacherId | []> {
//     return this.userRepository.findOne({ where: { id } });
//   }

//   findOne(where: Partial<User>): Promise<User | undefined> {
//     return this.userRepository.findOne({ where });
//   }

//   save(user: User): Promise<User> {
//     return this.userRepository.save(user);
//   }

//   async findAndCountSchoolAdmins(
//     findConditions: IGetSchoolUsersfindConditions,
//     orderBy: string,
//     order: 'ASC' | 'DESC',
//     page: number,
//     limit: number
//   ): Promise<{ data: ISchoolAdmin[]; total: number }> {
//     const queryBuilder = this.userRepository
//       .createQueryBuilder('user')
//       .select()
//       .leftJoinAndSelect('user.roles', 'role')
//       .leftJoin('user.idUserToAssignSchoolUser', 'assignSchoolUser')
//       .where('role.id = :roleId', { roleId: 2 })
//       .andWhere('assignSchoolUser.schoolId = :schoolId', {
//         schoolId: findConditions.schoolId,
//       });

//     if (findConditions.keyword) {
//       queryBuilder.andWhere(
//         '(user.firstName LIKE :keyword OR user.lastName LIKE :keyword OR user.email LIKE :keyword)',
//         { keyword: `%${findConditions.keyword}%` }
//       );
//     }
//     queryBuilder.orderBy(`user.${orderBy}`, order);
//     queryBuilder.skip((page - 1) * limit).take(limit);
//     const [data, total] = await queryBuilder.getManyAndCount();
//     return { data, total };
//   }

//   async findAndCountStudents(
//     findConditions: IGetSchoolUsersfindConditions,
//     orderBy: string,
//     order: 'ASC' | 'DESC',
//     page: number,
//     limit: number
//   ): Promise<{ data: IStudents[]; total: number }> {
//     const queryBuilder = this.userRepository
//       .createQueryBuilder('user')
//       .select([
//         'user.id AS "id"',
//         'user.first_name AS "firstName"',
//         'user.last_name AS "lastName"',
//         'user.email AS "email"',
//         'user.profile_picture AS "profilePicture"',
//         'user.phone_no AS "phoneNumber"',
//         'user.location AS "location"',
//         'CAST(COUNT(studentTask.id) AS INT) AS "totalTasksCount"',
//       ])
//       .leftJoin('user.roles', 'role')
//       .leftJoin('user.idUserToAssignSchoolUser', 'assignSchoolUser')
//       .leftJoin('user.idUserToStudentTask', 'studentTask')
//       .where('role.id = :roleId', { roleId: 4 })
//       .andWhere('assignSchoolUser.schoolId = :schoolId', {
//         schoolId: findConditions.schoolId,
//       })
//       .groupBy('user.id');

//     if (findConditions.keyword) {
//       queryBuilder.andWhere(
//         '(user.first_name LIKE :keyword OR user.last_name LIKE :keyword OR user.email LIKE :keyword)',
//         { keyword: `%${findConditions.keyword}%` }
//       );
//     }
//     queryBuilder.orderBy(`user.${orderBy}`, order);
//     queryBuilder.offset((page - 1) * limit);
//     queryBuilder.limit(limit);

//     const [data, total] = await Promise.all([
//       queryBuilder.getRawMany(),
//       queryBuilder.getCount(),
//     ]);

//     return { data, total };
//   }

//   async findOneStudent(id: number): Promise<IStudent> {
//     const queryBuilder = this.userRepository
//       .createQueryBuilder('user')
//       .select([
//         'user.id AS "id"',
//         'user.firstName AS "firstName"',
//         'user.lastName AS "lastName"',
//         'user.email AS "email"',
//         'user.location AS "location"',
//         'user.profilePicture AS "profilePicture"',
//         `json_agg(json_build_object(
//           'id', a.id,
//           'name', a.name,
//           'icon', a.icon,
//           'class', json_build_object(
//             'id', c.id,
//             'name', c.name,
//             'icon', c.icon
//           )
//         )) AS awards`
//       ])
//       .leftJoin('user.idUserToStudentClass', 'sc')
//       .leftJoin('sc.classIdStudentClassToClass', 'c')
//       .leftJoin('c.awardIdClassToAward', 'a')
//       .where('user.id = :userId', { userId: id })
//       .groupBy('user.id');
  
//     return await queryBuilder.getRawOne();
//   }

//   async findAndCountTeachers(
//     findConditions: IGetSchoolUsersfindConditions,
//     orderBy: string,
//     order: 'ASC' | 'DESC',
//     page: number,
//     limit: number,
//   ): Promise<IGetTeachersResponse> {
//     const queryBuilder = this.userRepository
//       .createQueryBuilder('user')
//       .select([
//         'user.id AS "id"',
//         'user.first_name AS "firstName"',
//         'user.last_name AS "lastName"',
//         'user.email AS "email"',
//         'user.profile_picture AS "profilePicture"',
//         'user.phone_no AS "phoneNumber"',
//         'user.location AS "location"',
//         'CAST(COUNT(DISTINCT sc.user_id) AS INT) AS "totalStudentsCount"',
//         'CAST(COUNT(t.id) AS INT) AS "totalTasksCount"',
//     ])
//     .leftJoin('user.roles', 'r')
//     .leftJoin('user.idUserToAssignSchoolUser', 'asu')
//     .leftJoin('user.idTeacherClassToUser', 'tc')
//     .leftJoin(StudentClass, 'sc', 'tc.class_id = sc.class_id AND sc.deleted_at IS NULL')
//     .leftJoin(Task, 't', 't.class_id = tc.class_id AND tc.deleted_at IS NULL')
//     .where('r.id = :roleId AND asu.school_id = :schoolId AND user.deleted_at IS NULL', { roleId: 3, schoolId: 1 })
//     .groupBy('user.id')
  
//     if (findConditions.keyword) {
//       queryBuilder.andWhere('(user.first_name LIKE :keyword OR user.last_name LIKE :keyword OR user.email LIKE :keyword)', { keyword: `%${findConditions.keyword}%` });
//     }
//     queryBuilder.orderBy(`user.${orderBy}`, order);
//     queryBuilder.offset((page - 1) * limit)
//     queryBuilder.limit(limit)
  
//     const [data, total] = await Promise.all([
//       queryBuilder.getRawMany(),
//       queryBuilder.getCount(),
//     ]);
//     return { data, total };
//   }

//   async findAndCountStudentsByTeacherId(
//     findConditions: IGetSchoolUsersfindConditions,
//     orderBy: string,
//     order: 'ASC' | 'DESC',
//     page: number,
//     limit: number,
//   ): Promise<IGetStudentByTeachersResponse> {
//     const queryBuilder = this.userRepository
//     .createQueryBuilder()
//     .select([
//       'u.id AS "id"',
//       'u.first_name AS "firstName"',
//       'u.last_name AS "lastName"',
//       'u.email AS "email"',
//       'u.profile_picture AS "profilePicture"',
//     ])
//     .addSelect("CAST(COUNT(DISTINCT t.id) AS INT)", "totalTasksCount")
//     .addSelect("CAST(COUNT(DISTINCT st2.id) AS INT)", "submittedTasksCount")
//     .addSelect("CAST(COUNT(DISTINCT st3.id) AS INT)", "completedTasksCount")
//     .from(TeacherClass, "tc")
//     .leftJoin(StudentClass, "sc", "tc.class_id = sc.class_id")
//     .leftJoin(User, "u", "sc.user_id = u.id")
//     .leftJoin(User, "u2", "tc.user_id = u2.id")
//     .leftJoin("u.roles", 'r')
//     .leftJoin(Task, "t", "sc.class_id = t.class_id")
//     .leftJoin(StudentTask, "st", "st.task_id = t.id AND st.user_id = u.id")
//     .leftJoin(StudentTask, "st2", "st.task_id = t.id AND st.user_id = u.id AND st.status = 2")
//     .leftJoin(StudentTask, "st3", "st.task_id = t.id AND st.user_id = u.id AND st.status = 3")
//     .where("r.id = :roleId", { roleId: 4 })
//     .andWhere("tc.user_id = :userId", { userId: findConditions.teacherId })
//     .groupBy("u.id");

  
//     if (findConditions.keyword) {
//       queryBuilder.andWhere('(u.first_name LIKE :keyword OR u.last_name LIKE :keyword OR u.email LIKE :keyword)', { keyword: `%${findConditions.keyword}%` });
//     }
//     queryBuilder.orderBy(`u.${orderBy}`, order);
//     queryBuilder.offset((page - 1) * limit)
//     queryBuilder.limit(limit)
  
//     const [data, total] = await Promise.all([
//       queryBuilder.getRawMany(),
//       queryBuilder.getCount(),
//     ]);
//     return { data, total };
//   }
// }
