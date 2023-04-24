import { createWriteStream } from "fs";
import stream from "stream";

export const storeUpload = async ({
  buffer,
  filename,
  filePath,
  getFileEndpoint,
}: {
  buffer: ArrayBuffer;
  filename: string;
  filePath: string;
  getFileEndpoint: string;
}): Promise<string> => {
  const readStream = new stream.PassThrough();

  readStream.end(Buffer.from(buffer));

  return new Promise((resolve, reject) =>
    readStream
      .pipe(createWriteStream(`${filePath}/${filename}`))
      .on("finish", () =>
        resolve(
          `${process.env.GROOMYZ_API_BASE_URL}/${getFileEndpoint}/${filename}`
        )
      )
      .on("error", () => reject)
  );
};
