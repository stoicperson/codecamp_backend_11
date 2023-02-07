import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlinesModule } from './apis/airlines/airlines.module';
import { AirPortsModule } from './apis/airports/airlines.module';
import { TicketsModule } from './apis/tickets/tickets.module';

@Module({
  imports: [
    TicketsModule,
    AirlinesModule,
    AirPortsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
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
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
