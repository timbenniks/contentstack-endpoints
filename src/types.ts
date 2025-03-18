export enum Region {
  US = "us",
  EU = "eu",
  AZURE_NA = "azure-na",
  AZURE_EU = "azure-eu",
  GCP_NA = "gcp-na",
  GCP_EU = "gcp-eu"
}

export interface ContentstackEndpoints {
  contentDelivery?: string;
  contentManagement?: string;
  imageDelivery?: string;
  assets?: string;
  automate?: string;
  graphql?: string;
  graphqlPreview?: string;
  brandKit?: string;
  brandKitGenAI?: string;
  personalizeManagement?: string;
  personalizeEdge?: string;
  application?: string;
  preview?: string;
}
