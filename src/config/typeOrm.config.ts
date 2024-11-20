import { ConfigService } from '@nestjs/config';
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { join } from 'path';

export default class TypeOrmConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        return {
            type: 'mysql',  
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_DATABASE'),
            entities: [join(__dirname, '/../**/*.entity.{ts,js}')],
            migrations: [join(__dirname, '/../../database/migrations/**/*{.ts,.js}')],
            migrationsTableName: 'migrations',
            migrationsRun: false,
            autoLoadEntities: true,
            synchronize: configService.get<string>('DB_SYNC') === 'true',
            logging: true,
            ssl: configService.get<string>('DB_SSL') === 'true'
        };
    }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [],
    useFactory: async (
        configService: ConfigService
    ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
    inject: [ConfigService],
};
