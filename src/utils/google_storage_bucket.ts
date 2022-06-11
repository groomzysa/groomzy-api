import { Storage } from "@google-cloud/storage";

export const googleProfilesStorageBucket = () => {
  const storage = new Storage({
    projectId: process.env?.GROOMZY_GOOGLE_PROJECT_ID || "",
    keyFilename: process.env?.GROOMZY_GOOGLE_KEY_FILE_NAME || "",
  });

  const bucket = storage.bucket(
    process.env?.GROOMZY_GOOGLE_BUCKET_PROFILES || ""
  );

  return {
    storage,
    bucket,
  };
};

export const googleGalleryStorageBucket = () => {
  const storage = new Storage({
    projectId: process.env?.GROOMZY_GOOGLE_PROJECT_ID || "",
    keyFilename: process.env?.GROOMZY_GOOGLE_KEY_FILE_NAME || "",
  });

  const bucket = storage.bucket(
    process.env?.GROOMZY_GOOGLE_BUCKET_GALLERY || ""
  );

  return {
    storage,
    bucket,
  };
};
