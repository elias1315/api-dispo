import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from './dotenv';
import { api } from './auth/entity/api.entity';
import { apixuser } from './auth/entity/apixuser.entity';
import { log_api } from './auth/entity/log_api.entity';
import { users } from './auth/entity/users.entity';
import { DisponibilidadModule } from './disponibilidad/disponibilidad.module';


//modulos luego

@Module({
  imports: [
              TypeOrmModule.forRoot( {
                  type: 'mariadb',
                  host: env.dbHost1,
                  port: env.dbPort1,
                  database:env.dbApis,
                  username:env.dbUser1,
                  password:env.dbPass1,
                  synchronize:false,
                  entities: [
                    api,
                    apixuser,
                    log_api,
                    users
                  ] // todas las clases que entran a la BD
              }),
              TypeOrmModule.forRoot({
                name:'cerbero',
                type: 'mariadb',
                host : env.dbHost1,
                port : env.dbPort1,
                database: env.dbCerbero,
                username: env.dbUser1,
                password: env.dbPass1,
                synchronize: false,
                entities:[
                
                ]
              }),
              TypeOrmModule.forRoot({
                name:'hoteles',
                type: 'mariadb',
                host : env.dbHost1,
                port : env.dbPort1,
                database: env.dbHotel,
                username: env.dbUser1,
                password: env.dbPass1,
                synchronize: false,
                entities:[
                
                ]
              }),
              HttpModule.register({
                baseURL: 'http://127.0.0.1:3006', // URL base de tu API
                timeout: 5000, // Opcional: tiempo de espera de la solicitud
                maxRedirects: 5, // Opcional: cantidad máxima de redireccionamientos permitidos
                headers: {
                  'Access-Control-Allow-Origin': 'http://localhost:3000', // Dominio de tu cliente
                  // Otras cabeceras si es necesario
                },
          }),
              AuthModule, 
              DisponibilidadModule
           ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
