// import { Injectable } from '@nestjs/common';
// import { User } from '../entity/user.entity';
// import {
//   IGetStudentsResponse,
//   ISchoolAdmin,
//   ISchoolAdminResponse,
//   IUser,
// } from '../interface/user.interface';
// @Injectable()
// export class UserService {

//   publicUser(user: User): IUser {
//     const modifiedUserObj = {
//       id: user.id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       phoneNo: user.phoneNo,
//       profilePicture: user.profilePicture,
//       status: user.status,
//       location: user.location,
//       createdBy: user.createdBy,
//       createdAt: user.createdAt,
//       updatedBy: user.updatedBy,
//       updatedAt: user.updatedAt,
//       roles: user.roles,
//     };
//     return modifiedUserObj;
//   }

//   parseSchoolAdmins(schoolAdmin: ISchoolAdminResponse): ISchoolAdminResponse {
//     const { total, data } = schoolAdmin;
//     const parseSchoolAdmins: ISchoolAdmin[] = data.map(sA => ({
//       id: sA.id,
//       firstName: sA.firstName,
//       lastName: sA.lastName,
//       email: sA.email,
//       phoneNo: sA.phoneNo,
//       profilePicture: sA.profilePicture,
//       location: sA.location,
//     }));
//     return { data: parseSchoolAdmins, total };
//   }

//   parseStudents(students: IGetStudentsResponse): IGetStudentsResponse {
//     const { data, total } = students;
//     const parseStudents = data.map(s => ({
//       id: s.id,
//       firstName: s.firstName,
//       lastName: s.lastName,
//       email: s.email,
//       phoneNo: s.phoneNo,
//       profilePicture: s.profilePicture,
//       location: s.location,
//       totalTasksCount: s.totalTasksCount,
//     }));
//     return { data: parseStudents, total };
//   }
// }
