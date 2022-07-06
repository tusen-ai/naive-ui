const eventSet = new WeakSet<Event>()

export function markEventEffectPerformed (event: Event): void {
  eventSet.add(event)
}

export function eventEffectNotPerformed (event: Event): boolean {
  return !eventSet.has(event)
}
