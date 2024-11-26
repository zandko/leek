/**
 * Filters an array of objects, removing duplicates based on a specific property value.
 * Only the first occurrence of each unique property value is retained.
 *
 * @template T - The type of the objects in the array.
 * @param {T[]} array - The original array of objects to filter.
 * @param {keyof T} key - The property key to use for determining uniqueness.
 * @returns {T[]} A new array with duplicates removed, retaining only the first occurrence of each unique key value.
 *
 * @example
 * const data = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 1, name: 'Alice' },
 * ];
 * const result = filterUnique(data, 'id');
 * // result: [
 * //   { id: 1, name: 'Alice' },
 * //   { id: 2, name: 'Bob' },
 * // ]
 */
export function filterUnique<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter((item) => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}
