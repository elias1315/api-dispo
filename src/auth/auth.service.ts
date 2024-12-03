import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';

import { api } from './entity/api.entity';
import { apixuser } from './entity/apixuser.entity';
import { log_api } from './entity/log_api.entity';
import { users } from './entity/users.entity';
import { apiConstants } from 'src/api.constant';
import { loginAuthDto } from './dto/loginAuth.dto';
import { registerAuthDto } from './dto/registerAuth.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(log_api) private logApiRepository: Repository<log_api>,
        @InjectRepository(api) private apiRepository: Repository<api>,
        @InjectRepository(apixuser) private apixuserRepository: Repository<apixuser>,
        @InjectRepository(users) private authRepository: Repository<users>,
        private jwtService:JwtService

    ){

    }


    async registerAuth(authObject: registerAuthDto) {
        const { user, pass, email } = authObject;
        const plainToHash = await hash(pass, 10);
        authObject = { ...authObject, pass: plainToHash };
        const newAuth = this.authRepository.create(authObject);
        const newUser = await this.authRepository.save(newAuth);
    
        const apiData = await this.apiRepository.findOne({
          where: {
            name: apiConstants.name,
            status: 0,
          },
        });
        if (!apiData) throw new HttpException('check_api_access', 404);
        //Creamos apixuser
        const newApixUser = new apixuser();
        newApixUser.id_api = apiData.id;
        newApixUser.id_user = newUser.id_users;
        newApixUser.status = 0;
        const apixuserData = await this.apixuserRepository.save(newApixUser);
    
        //Creamos log
        console.log(apixuserData.id_apixuser);
        const newLogApi = new log_api();
        newLogApi.id_apixuser = apixuserData.id_apixuser;
        newLogApi.desc = 'Registro de nuevo usuario para api ' + apiData.name;
        this.logApiRepository.save(newLogApi);
    
        return newUser;
      }
    
      async loginAuth(loginAuth:loginAuthDto){
        const {user,pass} = loginAuth;
        const findAuth = await this.authRepository.findOne({
            where:{
                user,
                status:0
            }
        });
      //  console.log(findAuth);
        if(!findAuth) throw new HttpException('User_not_found',404);
        const checkPassword = await compare(pass,(await findAuth).pass);
        if(!checkPassword) throw new HttpException('Password_inconrrect',403);
    
        const apiData = await this.apiRepository.findOne({
            where:{
                name:apiConstants.name,
                status:0
            }
        });
        console.log(apiConstants.name);
        if(!apiData) throw new HttpException('check Api name',404);
    
        const checkApi = await this.apixuserRepository.findOne({
            where:{
                id_user: findAuth.id_users,
                id_api: apiData.id,
                status:0
            }
        });
        console.log(findAuth.id_users);
        console.log(apiData.id);
        if(!checkApi) throw new HttpException('check user access',404);
        const payload = {id: findAuth.id_users,user:findAuth.user};
           const token = this.jwtService.sign(payload);
        const data = {
            user:findAuth,
            token
        }
        return data;
    
    }


}
