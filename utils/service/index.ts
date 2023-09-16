import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

// Resource: https://docs.uploadthing.com/api-reference/react#generatereacthelpers
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}
