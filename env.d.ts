declare namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_HOST: string;
    POSTGRES_PORT: number;
    POSTGRES_USER: string;
    POSTGRES_DATABASE: string;
    POSTGRES_PASSWORD: string;
  }
}
