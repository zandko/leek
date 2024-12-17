import { ConversationContentType, STREAMING_RESPONSE_END_MARKER, Role } from '@leek/constants';

/**
 * Creates an SSE (Server-Sent Events) payload for a token-based completion message.
 *
 * This function formats a token completion message for SSE by wrapping the provided parts
 * into a structured JSON format.
 *
 * @param {object} params - The parameters for the token completion.
 * @param {string[]} params.parts - The array of text parts that make up the completion.
 * @returns {Record<string, string>} - The SSE payload containing the formatted token completion data.
 *
 * @example
 * const sseData = createTokenCompletion({ parts: ['Hello', 'World'] });
 * console.log(sseData);
 * // Output:
 * // {
 * //   data: '{"message":{"author":{"role":"assistant"},"content":{"content_type":"Text","parts":["Hello","World"]}}}'
 * // }
 */
export function createTokenCompletion({ parts }: { parts: string[] }): Record<string, string> {
  return {
    data: JSON.stringify({
      message: {
        author: { role: Role.ASSISTANT },
        content: {
          content_type: ConversationContentType.Text,
          parts,
        },
      },
    }),
  };
}

/**
 * Creates an SSE payload signaling the end of the completion process.
 *
 * @returns {Record<string, string>} - The SSE payload signaling the end of completion.
 *
 * @example
 * const sseData = createEndCompletion();
 * console.log(sseData);
 * // Output: { data: "[STREAMING_RESPONSE_END_MARKER]" }
 */
export function createEndCompletion(): Record<string, string> {
  return {
    data: STREAMING_RESPONSE_END_MARKER,
  };
}

/**
 * Creates an SSE payload for an error message.
 *
 * This function formats an error message to be sent via SSE, useful for notifying
 * the client about issues during the completion process.
 *
 * @param {string} errorMessage - The error message to be included in the payload.
 * @returns {Record<string, string>} - The SSE payload containing the error message.
 *
 * @example
 * const sseData = createErrorCompletion('An unexpected error occurred.');
 * console.log(sseData);
 * // Output:
 * // { data: '{"error":"An unexpected error occurred."}' }
 */
export function createErrorCompletion(errorMessage: string): Record<string, string> {
  return {
    data: JSON.stringify({ error: errorMessage }),
  };
}

/**
 * Creates an SSE payload for an intermediate progress update.
 *
 * This function is used to send partial progress updates during a long-running completion process.
 *
 * @param {string} progressMessage - The progress message to include in the payload.
 * @returns {Record<string, string>} - The SSE payload containing the progress update.
 *
 * @example
 * const sseData = createProgressCompletion('Processing your request...');
 * console.log(sseData);
 * // Output:
 * // { data: '{"progress":"Processing your request..."}' }
 */
export function createProgressCompletion(progressMessage: string): Record<string, string> {
  return {
    data: JSON.stringify({ progress: progressMessage }),
  };
}

/**
 * Creates an SSE payload for a custom event.
 *
 * This function allows the inclusion of arbitrary data in a custom event payload.
 *
 * @param {string} eventName - The name of the custom event.
 * @param {object} eventData - The data to include in the custom event payload.
 * @returns {Record<string, string>} - The SSE payload containing the custom event data.
 *
 * @example
 * const sseData = createCustomEvent('update', { key: 'value' });
 * console.log(sseData);
 * // Output:
 * // { event: "update", data: '{"key":"value"}' }
 */
export function createCustomEvent(eventName: string, eventData: Record<string, any>): Record<string, string> {
  return {
    event: eventName,
    data: JSON.stringify(eventData),
  };
}
