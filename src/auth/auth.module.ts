import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { api } from './entity/api.entity';
import { apixuser } from './entity/apixuser.entity';
import { log_api } from './entity/log_api.entity';
import { users } from './entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy';



@Module({
  imports:[TypeOrmModule.forFeature([
      api,apixuser,log_api,users
  ]),
    JwtModule.register({
       secret:jwtConstants.secret,
       signOptions: { expiresIn: '20H' }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
})
export class AuthModule {}
