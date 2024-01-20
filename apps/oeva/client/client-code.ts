export enum ClientCode {
    OEBB = 'oebb',
    DB = 'db',
    STV = 'stv'
}

export enum ClientCodeDefault {
    DEFAULT = 'default',
}

export type ClientCodeParameter = ClientCode | ClientCodeDefault

