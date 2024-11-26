/**
 * Constant indicating the completion signal for streaming responses.
 */
export const STREAMING_RESPONSE_END_MARKER = '[DONE]';

/**
 * Enum representing the available actions in a conversational flow.
 */
export enum ConversationActionType {
  Next = 'next',
  Variant = 'variant',
}

/**
 * Enum representing the types of content supported in a conversation.
 */
export enum ConversationContentType {
  Text = 'text',
  MultimodalText = 'multimodal_text',
}

// image_asset_pointer
