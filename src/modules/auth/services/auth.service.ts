// import { HttpException, Injectable, Global } from '@nestjs/common';
// import { JwtService } from "@nestjs/jwt";
// import { InjectModel, InjectConnection } from "@nestjs/mongoose";
// import mongoose, { Model } from "mongoose";
// import { DateProcessService, ProcessDataService } from "../../../common/adapters";
// import { _response_I } from "../../../common/interfaces";
// import { _argsUpdate } from "../../../common/interfaces/responseUpdate.interface";
// import { _argsFind } from "../../../common/interfaces/_responseFindParameters.interface";
// import { RolesService } from "../../roles/services/roles.service";
// import { Users } from "../../users/schemas";
// import { JwtPayload_I, session_I } from "../interfaces";


// import { LoginUserDto } from "../dto/login-user.dto";
// import { CreateUserDto } from "../../users/dto/create-user.dto";

// import * as bcrypt from "bcrypt";
// import { ProfileUser } from "../../users/schemas/profile.schema";
// import { UsersService } from '../../users/services/users.service';



// @Injectable()
// export class AuthService {

//     constructor(
//         @InjectModel(Users.name) private UsersModel: Model<Users>,
//         private readonly _jwtService: JwtService,
//         private readonly _dateProcessService: DateProcessService,
//         private readonly _processData: ProcessDataService,
//         private readonly _usersService: UsersService,
//         @InjectConnection() public connection: mongoose.Connection,
//     ) {

//     }

//     async create(CreateUserDto: CreateUserDto): Promise<_response_I> {

//         let _Response: _response_I;

//             await this._usersService.create(CreateUserDto).then(r => {
//                 _Response = r;
//             })

//         return _Response

//     }

//     async signin(LoginUserDto: LoginUserDto): Promise<_response_I> {

//         const { email, pass } = LoginUserDto;

//         let _Response: _response_I;

//         const args: _argsFind = {
//             findObject: {
//                 email: email
//             },
//             populate: [
//                 {
//                     path: 'rol',
//                     select: 'rol alias',
//                     model: 'Roles', // <- si es un array de ids se debe especificar el model
//                 },
//                 {
//                     path: 'profile',
//                     model: 'ProfileUser', // <- si es un array de ids se debe especificar el model
//                 }
//             ]
//         }

//         await this._processData._findOneDB(this.UsersModel, args).then(async (r: _response_I) => {
//             _Response = r;

//             if (!_Response.data) {

//                 _Response = {
//                     ok: false,
//                     statusCode: 404,
//                     message: [
//                         {
//                             message: 'El usuario no existe',
//                             type: 'global'
//                         }
//                     ]
//                 };
//                 throw new HttpException(_Response, _Response.statusCode);

//             }

//             if (!bcrypt.compareSync(pass, r.data.pass)) {

//                 _Response = {
//                     ok: false,
//                     statusCode: 400,
//                     message: [
//                         {
//                             message: 'Contraseña incorrecta',
//                             type: 'global'
//                         }
//                     ]
//                 };

//                 throw new HttpException(_Response, _Response.statusCode);

//             } else {

//                 const payload: JwtPayload_I = {
//                     _id: r.data._id,
//                     email: r.data.email,
//                     rol: r.data.rol.rol
//                 };

//                 const token = await this._jwtService.sign(payload);

//                 const l: session_I = {
//                     _id: r.data._id,
//                     name: r.data.name,
//                     userName: r.data.userName,
//                     lastName: r.data.lastName,
//                     rol: r.data.rol.alias,
//                     rolName: r.data.rol.rol,
//                     // profilePic: _.get(r.data.profile, 'files.profilePic', null),
//                     token: token,

//                 }
//                 _Response.data = l;

//                 _Response.message = [
//                     {
//                         message: `Te damos la bienvenida, ${r.data.name}`,
//                         type: 'global'
//                     }
//                 ]

//                 await this.updateLastSession(r.data._id).then(r => { }, e => { });

//             }

//         }, (err: _response_I) => {


//             if (err.statusCode != 500) {
//                 err.message = [
//                     {
//                         message: 'Usuario o contraseña inválidos',
//                         type: 'global'
//                     }
//                 ]
//             } else {
//                 err.message = [
//                     {
//                         message: 'Algo ha salido mal, intente más tarde',
//                         type: 'global'
//                     }
//                 ]
//             }

//             throw new HttpException(err, err.statusCode);

//         })

//         return _Response;

//     }

//     updateLastSession(id: string) {

//         return new Promise(async (resolve, reject) => {

//             const data = {
//                 "last_session.date": this._dateProcessService.setDate()
//             }

//             const args: _argsUpdate = {
//                 findObject: {
//                     _id: String(id),
//                 },
//                 set: {
//                     $set: data
//                 },
//                 populate: {
//                     path: 'rol',
//                     select: 'alias'
//                 }
//             }

//             await this._processData._updateDB(this.UsersModel, args).then((r: _response_I) => {
//                 resolve(true);
//             }, (err: _response_I) => {
//                 reject(false);
//                 throw new HttpException(err, err.statusCode);

//             });

//         });

//     }

// }
