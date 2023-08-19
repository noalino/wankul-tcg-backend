export function removeEmptyValues(obj: Record<string, any[]>) {
  Object.keys(obj)
    .filter((key) => !obj[key] || obj[key].length <= 0)
    .forEach((key) => delete obj[key]);
}
