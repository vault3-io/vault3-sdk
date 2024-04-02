export function HelloWorld(name: string | undefined) {
  return `Hello ${name || "World"}!`;
}
