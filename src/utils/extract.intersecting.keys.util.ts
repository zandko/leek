type GenericObject<T = any> = { [key: string]: T };

export function extractIntersectingKeys<S extends GenericObject, T extends GenericObject>(
  source: S,
  target: T,
): GenericObject<S[keyof S]> {
  return Object.keys(source)
    .filter((key) => key in target)
    .reduce((result: GenericObject<S[keyof S]>, key: string) => {
      result[key] = source[key];
      return result;
    }, {});
}
