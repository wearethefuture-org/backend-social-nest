module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: [
    `${__dirname}/src/**/*.entity.ts`,
    `${__dirname}/dist/**/*.entity.js`
  ],
  migrations: [
    `${__dirname}/src/db/migrations/**/*.ts`,
  ],
  seeds: [`${__dirname}/src/db/seeds/**/*.ts`],
  factories: [`${__dirname}/src/db/factories/**/*.ts`],
  subscribers: [
    `${__dirname}/subscriber/**/*.ts`,
    `${__dirname}/dist/subscriber/**/.js`,
  ],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'migrations',
    subscribersDir: 'subscriber'
  }
};
