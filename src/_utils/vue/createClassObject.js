export default function createClassObject (classValue) {
  if (typeof classValue === 'string') {
    return classValue
      .split(' ')
      .filter(v => v.length)
      .reduce((prevValue, currentValue) => {
        prevValue[currentValue] = true
        return prevValue
      }, {})
  } else if (classValue && typeof classValue === 'object') {
    return classValue
  }
  return null
}
