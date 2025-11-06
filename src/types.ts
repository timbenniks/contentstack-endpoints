export enum Region {
  NA = "na",
  EU = "eu",
  AU = "au",
  AZURE_NA = "azure-na",
  AZURE_EU = "azure-eu",
  GCP_NA = "gcp-na",
  GCP_EU = "gcp-eu"
}

/**
 * A region identifier - can be a string or Region enum.
 * Supports all official Contentstack region aliases:
 * - "na", "us", "aws-na", "aws_na" (all map to NA region)
 * - "eu", "aws-eu", "aws_eu" (all map to EU region)  
 * - "au", "aws-au", "aws_au" (all map to AU region)
 * - "azure-na", "azure_na" (Azure North America)
 * - "azure-eu", "azure_eu" (Azure Europe)
 * - "gcp-na", "gcp_na" (GCP North America)
 * - "gcp-eu", "gcp_eu" (GCP Europe)
 */
export type RegionInput = Region | string;

export interface ContentstackEndpoints {
  application?: string;
  assets?: string;
  auth?: string;
  automate?: string;
  brandKit?: string;
  contentDelivery?: string;
  contentManagement?: string;
  developerHub?: string;
  genAI?: string;
  graphqlDelivery?: string;
  graphqlPreview?: string;
  images?: string;
  launch?: string;
  personalize?: string;
  personalizeEdge?: string;
  preview?: string;

  // Deprecated properties (v1.x compatibility)
  /** @deprecated Use graphqlDelivery instead */
  graphql?: string;
  /** @deprecated Use images instead */
  imageDelivery?: string;
  /** @deprecated Use genAI instead */
  brandKitGenAI?: string;
  /** @deprecated Use personalize instead */
  personalizeManagement?: string;
}
