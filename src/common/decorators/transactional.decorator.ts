import { Prisma } from '@prisma/client';

import { TransactionManager } from '@leek/prisma';

/**
 * Options for configuring the transactional behavior.
 */
export interface TransactionOptions {
  /**
   * The maximum time (in milliseconds) to wait for a transaction to begin.
   * If the transaction cannot begin within this time, it will fail.
   */
  maxWait?: number;

  /**
   * The maximum time (in milliseconds) a transaction can run before it is automatically rolled back.
   */
  timeout?: number;

  /**
   * The isolation level for the transaction.
   * Determines how the transaction interacts with other concurrent transactions.
   */
  isolationLevel?: Prisma.TransactionIsolationLevel;
}

/**
 * Transactional method decorator.
 *
 * This decorator wraps the target method in a transactional context using a `TransactionManager`.
 * It ensures that the method's execution is performed within a database transaction and
 * applies the specified transaction options.
 *
 * @param {TransactionOptions} [options] - Optional configuration for the transaction.
 * @returns {MethodDecorator} - A method decorator to enable transactional execution.
 */
export function Transactional(options?: TransactionOptions) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    // Override the original method with transactional logic
    descriptor.value = async function (...args: any[]) {
      const transactionManager: TransactionManager = this.transactionManager;

      // Ensure a TransactionManager is available in the current context
      if (!transactionManager) {
        throw new Error('TransactionManager not found in the current context.');
      }

      // Execute the method within a transaction
      return transactionManager.runInTransaction(async () => {
        return originalMethod.apply(this, args);
      }, options);
    };
  };
}
