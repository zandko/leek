import { ClsServiceManager, ClsStore } from 'nestjs-cls';
import { TypeIfUndefined } from 'nestjs-cls/dist/src/types/type-if-type.type';

/**
 * A utility class for managing context data using `nestjs-cls`.
 *
 * This class provides methods to set and retrieve values from the CLS (Continuity Local Storage)
 * store with namespaced keys. It is particularly useful for managing transactional or
 * request-specific data.
 */
export class ContextProvider {
  /**
   * The namespace used to prefix all keys in the CLS store.
   */
  private static readonly nameSpace = 'request';

  /**
   * Retrieve a value from the CLS store by its key.
   *
   * @param {string} key - The key to retrieve, namespaced under the `request` namespace.
   * @returns {T | null} - The value associated with the key, or `null` if not found.
   */
  private static get<T>(key: string) {
    const store = ClsServiceManager.getClsService();

    return store.get<T>(ContextProvider.getKeyWithNamespace(key));
  }

  /**
   * Store a value in the CLS store under a namespaced key.
   *
   * @param {string} key - The key under which the value will be stored.
   * @param {any} value - The value to store.
   */
  private static set(key: string, value: any): void {
    const store = ClsServiceManager.getClsService();

    store.set(ContextProvider.getKeyWithNamespace(key), value);
  }

  /**
   * Generate a namespaced key for the CLS store.
   *
   * @param {string} key - The original key.
   * @returns {string} - The key prefixed with the namespace.
   */
  private static getKeyWithNamespace(key: string): string {
    return `${ContextProvider.nameSpace}.${key}`;
  }

  /**
   * Store a Prisma transactional instance in the CLS store.
   *
   * @param {any} prisma - The Prisma transactional instance to store.
   */
  static setTransactionPrisma(prisma: any): void {
    this.set('prisma', prisma);
  }

  /**
   * Retrieve the Prisma transactional instance from the CLS store.
   *
   * @template T - The expected type of the Prisma instance.
   * @returns {TypeIfUndefined<T, ClsStore, T> | null} - The Prisma instance, or `null` if not found.
   */
  static getTransactionPrisma<T>(): TypeIfUndefined<T, ClsStore, T> | null {
    return this.get<T>('prisma');
  }
}
