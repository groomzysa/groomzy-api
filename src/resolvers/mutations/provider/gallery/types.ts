import { ProviderGallery } from "@prisma/client";

export interface IAddGalleryArgs
  extends Omit<ProviderGallery, "id" | "fileName"> {
  galleryImageFile: File;
}

export interface IDeleteGalleryArgs {
  galleryId: number;
  fileName: string;
}
