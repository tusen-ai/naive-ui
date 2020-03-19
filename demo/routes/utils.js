export const withPrefix = (prefix, routes) => {
  return routes.map(route => {
    route.path = prefix + route.path
    return route
  })
}
