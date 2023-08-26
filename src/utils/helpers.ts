export function removeEmptyValues(obj: Record<string, any[]>) {
  Object.keys(obj)
    .filter((key) => !obj[key] || obj[key].length <= 0)
    .forEach((key) => delete obj[key]);
}

export function createEnumDescription(enumObj: Record<string, any>): string {
  const example =
    'You can pass a single value (3) or a list of values (0,1,2). Available values are: ';
  return (
    example +
    Object.keys(enumObj)
      .filter((key) => isNaN(Number(key)))
      .map((key) => `${enumObj[key]} = "${key}"`)
      .join(', ')
  );
}
