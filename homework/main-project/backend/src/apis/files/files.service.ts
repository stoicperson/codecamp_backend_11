import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import {
  IFilesServiceDelete,
  IFilesServiceUpload,
} from './interfaces/files-service.interface';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
  async upload({ files }: IFilesServiceUpload): Promise<string[]> {
    const waitedFiles = await Promise.all(files);

    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: process.env.GCP_KEY_FILE_NAME,
    }).bucket(process.env.GCP_BUCKET);

    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () =>
                resolve(
                  `https://${process.env.GCP_BUCKET}.storage.googleapis.com/${el.filename}`,
                ),
              )
              .on('error', () => reject('실패'));
          }),
      ),
    );

    return results;
  }

  async delete({ filenames }: IFilesServiceDelete): Promise<any> {
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: process.env.GCP_KEY_FILE_NAME,
    }).bucket(process.env.GCP_BUCKET);

    const result = await Promise.all(
      filenames.map((filename) => storage.file(filename).delete()),
    );

    return result;
  }
}
