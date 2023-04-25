export interface IAddGallery {
  name: string;
  galleryImage: Blob;
}

export interface IUpdateGallery {
  galleryId: number;
  name?: string;
  galleryImage?: Blob;
  galleryurl?: string;
}

export interface IDeleteGallery {
  galleryId: number;
}
