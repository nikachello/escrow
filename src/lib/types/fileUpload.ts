export type FileUploadContext = "tracking" | "avatar" | "other";

export type FileUploadProps = {
  context: FileUploadContext;
  dealId?: string;
  userId?: string;
};
