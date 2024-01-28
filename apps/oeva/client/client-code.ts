export enum ClientCode {
    OEBB = 'oebb',
    DB = 'db',
    STV = 'stv',
    VAO = 'vao'
}

export enum ClientCodeDefault {
    DEFAULT = 'default',
}

export type ClientCodeParameter = ClientCode | ClientCodeDefault

