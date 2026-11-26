type WithAttrs<I extends { $props: object }, A> = I & {
  $props: Omit<A, keyof I['$props']>
}

type Statics<C> = { [K in keyof C]: C[K] }

// Adds the native attrs a component forwards to an element to its props type.
// The component's own props win over native attrs of the same name.
// The static members are kept, the constructor is rebuilt with the same
// parameters.
export type WithNativeAttrs<C, A> = C extends abstract new (
  ...args: never
) => infer I
  ? I extends { $props: object }
    ? Statics<C> & (new (...args: ConstructorParameters<C>) => WithAttrs<I, A>)
    : C
  : C
