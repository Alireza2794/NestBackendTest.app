import { Module } from '@nestjs/common';
import { AllTaskModule } from './all-task/all-task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'alireza123456',
      database: 'nestTestBackend',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AllTaskModule,
    UsersModule,
    AuthModule]
})
export class AppModule { }
