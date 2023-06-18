export type Config = {
  databaseUrl: string;
  port: number;
};

export const config: Config = {
  databaseUrl:
    process.env.DATABASE_URL ?? 'postgres://postgres:secret@localhost:5432',
  port: parseInt(process.env.PORT ?? '8000'),
};
