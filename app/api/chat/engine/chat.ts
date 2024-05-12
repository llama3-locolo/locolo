import { ContextChatEngine, Settings } from "llamaindex";
import { getDataSource } from "./index";

export async function createChatEngine() {
  const index = await getDataSource();
  if (!index) {
    throw new Error(
      `StorageContext is empty - call 'npm run generate' to generate the storage first`,
    );
  }
  const retriever = index.asRetriever();
  retriever.similarityTopK = process.env.TOP_K
    ? parseInt(process.env.TOP_K)
    : 3;

  return new ContextChatEngine({
    chatModel: Settings.llm,
    retriever,
    contextSystemPrompt({ context }) {
      return `Context information is below.
      ---------------------
      ${context}
      ---------------------
      Given the context information and not prior knowledge, answer the query.
      Only answer in JSON.
      Answer the query without hallucinating, and only using the context given.`
    }
  });
}
