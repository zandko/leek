-- CreateTable
CREATE TABLE "Dataset" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "provider" TEXT NOT NULL DEFAULT 'vendor',
    "dataSourceType" TEXT,
    "indexStruct" JSONB,
    "embeddingModel" TEXT NOT NULL DEFAULT 'text-embedding-ada-002',
    "embeddingModelProvider" TEXT NOT NULL DEFAULT 'openai',
    "retrievalModel" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dataset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DatasetProcessRule" (
    "id" TEXT NOT NULL,
    "datasetId" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "rules" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DatasetProcessRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentSegment" (
    "id" TEXT NOT NULL,
    "datasetId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "wordCount" INTEGER NOT NULL,
    "tokens" INTEGER NOT NULL,
    "keywords" JSONB,
    "indexNodeId" TEXT,
    "indexNodeHash" TEXT,
    "hitCount" INTEGER NOT NULL DEFAULT 0,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "disabledAt" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "error" TEXT,
    "answer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentSegment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "datasetId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "dataSourceType" TEXT NOT NULL,
    "dataSourceInfo" JSONB,
    "datasetProcessRuleId" TEXT,
    "name" TEXT NOT NULL,
    "createdFrom" TEXT NOT NULL,
    "createdApiRequestId" TEXT,
    "fileId" TEXT,
    "wordCount" INTEGER,
    "tokens" INTEGER,
    "indexingLatency" DOUBLE PRECISION,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "disabledAt" TIMESTAMP(3),
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "archivedReason" TEXT,
    "archivedAt" TIMESTAMP(3),
    "docType" TEXT,
    "docMetadata" JSONB,
    "docForm" TEXT,
    "docLanguage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadFile" (
    "id" TEXT NOT NULL,
    "storageType" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "size" INTEGER NOT NULL,
    "extension" TEXT NOT NULL,
    "mimeType" TEXT,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "usedAt" TIMESTAMP(3),
    "hash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadFile_pkey" PRIMARY KEY ("id")
);

-- Create extension for vector operations (e.g., for similarity search)
CREATE EXTENSION IF NOT EXISTS vector;

-- CreateTable
CREATE TABLE "Embeddings" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "embedding" vector,
    "modelName" TEXT NOT NULL DEFAULT 'text-embedding-3-small',
    "providerName" TEXT NOT NULL DEFAULT 'openai',
    "classPrefix" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Embeddings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dataset_name_key" ON "Dataset"("name");

-- CreateIndex
CREATE INDEX "Dataset_provider_idx" ON "Dataset"("provider");

-- CreateIndex
CREATE INDEX "Dataset_dataSourceType_idx" ON "Dataset"("dataSourceType");

-- CreateIndex
CREATE UNIQUE INDEX "DatasetProcessRule_datasetId_key" ON "DatasetProcessRule"("datasetId");

-- CreateIndex
CREATE INDEX "DatasetProcessRule_datasetId_idx" ON "DatasetProcessRule"("datasetId");

-- CreateIndex
CREATE INDEX "DatasetProcessRule_mode_idx" ON "DatasetProcessRule"("mode");

-- CreateIndex
CREATE INDEX "DocumentSegment_datasetId_idx" ON "DocumentSegment"("datasetId");

-- CreateIndex
CREATE INDEX "DocumentSegment_documentId_idx" ON "DocumentSegment"("documentId");

-- CreateIndex
CREATE INDEX "DocumentSegment_enabled_idx" ON "DocumentSegment"("enabled");

-- CreateIndex
CREATE INDEX "DocumentSegment_datasetId_enabled_idx" ON "DocumentSegment"("datasetId", "enabled");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentSegment_datasetId_indexNodeHash_key" ON "DocumentSegment"("datasetId", "indexNodeHash");

-- CreateIndex
CREATE INDEX "Document_datasetId_idx" ON "Document"("datasetId");

-- CreateIndex
CREATE INDEX "Document_enabled_idx" ON "Document"("enabled");

-- CreateIndex
CREATE INDEX "Document_archived_idx" ON "Document"("archived");

-- CreateIndex
CREATE INDEX "Document_datasetId_enabled_archived_idx" ON "Document"("datasetId", "enabled", "archived");

-- CreateIndex
CREATE UNIQUE INDEX "UploadFile_key_key" ON "UploadFile"("key");

-- CreateIndex
CREATE INDEX "UploadFile_storageType_idx" ON "UploadFile"("storageType");

-- CreateIndex
CREATE INDEX "UploadFile_used_idx" ON "UploadFile"("used");

-- CreateIndex
CREATE INDEX "Embeddings_classPrefix_idx" ON "Embeddings"("classPrefix");

-- CreateIndex
CREATE UNIQUE INDEX "Embeddings_classPrefix_hash_key" ON "Embeddings"("classPrefix", "hash");

-- AddForeignKey
ALTER TABLE "DatasetProcessRule" ADD CONSTRAINT "DatasetProcessRule_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "Dataset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentSegment" ADD CONSTRAINT "DocumentSegment_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "Dataset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentSegment" ADD CONSTRAINT "DocumentSegment_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "Dataset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
