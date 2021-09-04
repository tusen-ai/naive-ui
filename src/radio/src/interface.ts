export type OnUpdateValue = <T extends string & number>(value: T) => void

export type OnUpdateValueImpl = <T extends string | number>(value: T) => void
