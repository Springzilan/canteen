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
export type UserOrderDTO = {
    user: string,
    /// 选择窗口的种类
    kind: number,
    /// 选择的菜
    content: number[],
    /// 下周具体周几
    day: number,
}

export type UserOrderVO = {
    code: number,
    msg: string,
    data: boolean
}