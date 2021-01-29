interface characterMap {
  1: '1'
  2: '2'
  3: '3'
  4: '4'
  5: '5'
  6: '6'
  7: '7'
  8: '8'
  9: '9'
  0: '0'
  q: 'Q'
  w: 'W'
  e: 'E'
  r: 'R'
  t: 'T'
  y: 'Y'
  u: 'U'
  i: 'I'
  o: 'O'
  p: 'P'
  a: 'A'
  s: 'S'
  d: 'D'
  f: 'F'
  g: 'G'
  h: 'H'
  j: 'J'
  k: 'K'
  l: 'L'
  z: 'Z'
  x: 'X'
  c: 'C'
  v: 'V'
  b: 'B'
  n: 'N'
  m: 'M'
  [key: string]: string
}

type char =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '0'
  | 'q'
  | 'w'
  | 'e'
  | 'r'
  | 't'
  | 'y'
  | 'u'
  | 'i'
  | 'o'
  | 'p'
  | 'a'
  | 's'
  | 'd'
  | 'f'
  | 'g'
  | 'h'
  | 'j'
  | 'k'
  | 'l'
  | 'z'
  | 'x'
  | 'c'
  | 'v'
  | 'b'
  | 'n'
  | 'm'

type RestChars<T> = T extends `${char}${infer P}` ? P : ''

type UpperFirst<T> = T extends `${infer P}${string}`
  ? `${characterMap[P]}${RestChars<T>}`
  : T

export function createKey<P extends string, S extends string> (
  prefix: P,
  suffix: S
): S extends 'default' ? P : `${P}${UpperFirst<S>}` {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (prefix +
    (suffix === 'default'
      ? ''
      : suffix.replace(/^[a-z]/, (startChar) =>
        startChar.toUpperCase()
      ))) as any
}

createKey('abc', 'def')
