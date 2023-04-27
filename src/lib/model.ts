export type WantEatDTO = {
    user: string | undefined,
    content: string[]
}

export type WantCheckDTO = {
    user: string | undefined
}
export type WantCheckVO ={
    code: number,
    msg: string,
    data: boolean
} 