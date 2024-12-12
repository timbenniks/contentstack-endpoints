export enum Region {
  US,
  EU,
  AZURE_NA,
  AZURE_EU,
  GCP_NA
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
