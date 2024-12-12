export type Cloud = 'default' | 'azure' | 'gcp';
export type Region = 'na' | 'eu';

export interface ContentstackEndpoints {
  contentDelivery: string;
  contentManagement: string;
  imageDelivery: string;
  assets: string;
  automate?: string;
  graphql: string;
  graphqlPreview: string;
  brandKit: string;
  brandKitGenAI: string;
  personalizeManagement: string;
  personalizeEdge: string;
}