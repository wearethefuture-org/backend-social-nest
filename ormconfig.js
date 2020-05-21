module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: [
    `${__dirname}/src/**/*.entity.ts`
  ],
  migrations: [
    `${__dirname}/database/migrations/**/*.ts`
  ],
  seeds: [
    `${__dirname}/database/seeds/**/*.ts`
  ],
  factories: [
    `${__dirname}/database/factories/**/*.ts`
  ],
  subscribers: [
    `${__dirname}/database/subscribers/**/*.ts`
  ],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'database/migrations',
    subscribersDir: 'database/subscriber'
  }
};
