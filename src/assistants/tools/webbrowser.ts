import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { WebBrowser } from 'langchain/tools/webbrowser';

const model = new ChatOpenAI({ temperature: 0 });
const embeddings = new OpenAIEmbeddings(
  process.env.AZURE_OPENAI_API_KEY ? { azureOpenAIApiDeploymentName: 'Embeddings2' } : {},
);

export const browser = new WebBrowser({ model, embeddings });
