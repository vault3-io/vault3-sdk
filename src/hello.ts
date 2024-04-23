export function HelloWorld({name}: {name: string | undefined}) {
  return `Hello ${name || "World"}!`;
}
