export function isEmail(email: string) {
  return /^[\w-]+@[\w-]+(?:.[\w-])+/.test(email)
}
