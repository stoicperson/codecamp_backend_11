import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlinesModule } from './apis/airlines/airlines.module';
import { AirPortsModule } from './apis/airports/airports.module';
import { AuthModule } from './apis/auth/auth.module';
import { FilesModule } from './apis/files/files.module';
import { PaymentModule } from './apis/payments/payments.module';
import { TicketsModule } from './apis/tickets/tickets.module';
import { UsersModule } from './apis/users/users.module';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';

@Module({
  imports: [
    AuthModule,
    AirlinesModule,
    AirPortsModule,
    FilesModule,
    TicketsModule,
    PaymentModule,
    UsersModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: process.env.REDIS_URL,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
