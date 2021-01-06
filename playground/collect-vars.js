const varRegex = /var\(--([^)]+)\)/g

function getVars (input) {
  console.log(
    Array.from(
      new Set(Array.from(input.matchAll(varRegex)).map((v) => '// --' + v[1]))
    )
      .sort()
      .join('\n')
  )
}

getVars(document.body.textContent)
