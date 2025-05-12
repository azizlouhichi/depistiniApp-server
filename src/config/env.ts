/**
 * ENV is an object that contains configuration parameters for the application.
 * In this case, it defines a `MONGO_URI` property that comes from the environment variables
 * configured on the hosting platform. This variable should contain the URL for connecting
 * to a MongoDB database, which the application will use for persistence.
 */
export const ENV = {
  MONGO_URI: process.env.MONGO_URI,
  SERVER_PORT: parseInt(process.env.SERVER_PORT as string) || 3000,
  // make sure we use SLAT_ROUNDS different from development mode and production mode
  SLAT_ROUNDS: parseInt(process.env.SLAT_ROUNDS as string) || 15,
  // make sure we use SLAT_ROUNDS different from development mode and production mode
  JWT_SECRET: process.env.JWT_SECRET || 'l3DLWwOacP7JLYZq8xRdPOZa7MeLAP3RrPEMXmC4LXW4IUfmm4uokkYYkKn4mprYmmBaAkokXkhaPXzA',
} as const;
