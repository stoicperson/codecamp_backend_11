import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlinesModule } from './apis/airlines/airlines.module';
import { AirPortsModule } from './apis/airports/airports.module';
import { AuthModule } from './apis/auth/auth.module';
import { TicketsModule } from './apis/tickets/tickets.module';
import { UsersModule } from './apis/users/users.module';

@Module({
  imports: [
    AuthModule,
    TicketsModule,
    AirlinesModule,
    AirPortsModule,
    UsersModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'myapp',
      autoLoadEntities: true,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      timezone: 'local',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
