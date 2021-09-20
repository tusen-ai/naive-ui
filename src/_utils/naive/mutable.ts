export type Mutable<T> = T extends Record<string, unknown>
  ? {
      -readonly [P in keyof T]: T[P] extends ReadonlyArray<infer U>
        ? Array<Mutable<U>>
        : Mutable<T[P]>
    }
  : T
