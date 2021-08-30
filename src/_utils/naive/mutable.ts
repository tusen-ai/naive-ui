export type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends ReadonlyArray<infer U> ? Array<Mutable<U>> : Mutable<T[P]>
}
