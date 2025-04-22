export type User = {
    email:string,
    password: string,
    notes: any
}

export type Notes = {
    title: string,
    description: string,
    checked: boolean
}

export type userToken = {
    uid:string,
    iat:string
}