import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interfaces/files-service.interface';

@Injectable()
export class FilesService {
  async upload({ files }: IFilesServiceUpload): Promise<string[]> {
    console.log(files);

    const waitedFiles = [];
    waitedFiles[0] = await files[0];
    waitedFiles[1] = await files[1];

    console.log(waitedFiles);
    // 1. 파일을 쿨라우드 스토리지에 저장하는 로직

    // 1-1) 스토리지 셋팅하기
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: process.env.GCP_KEY_FILE_NAME,
    }).bucket(process.env.GCP_BUCKET);

    // 1-2) 스토리지에 파일 올라기
    console.time('시간');

    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () =>
                resolve(`${process.env.GCP_BUCKET}/${el.filename}`),
              )
              .on('error', () => reject('실패'));
          }),
      ),
    );

    console.timeEnd('시간');
    console.log('파일 전송이 완료되었습니다.');

    return results;
  }
}
