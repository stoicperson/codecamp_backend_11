import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interfaces/files-service.interface';

@Injectable()
export class FilesService {
  upload({ file }: IFilesServiceUpload): string {
    // 1. 파일을 쿨라우드 스토리지에 저장하는 로직

    // 1-1) 스토리지 셋팅하기
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: process.env.GCP_KEY_FILE_NAME,
    }).bucket(process.env.GCP_BUCKET);

    // 1-2) 스토리지에 파일 올라기
    file
      .createReadStream()
      .pipe(storage.file(file.filename).createWriteStream())
      .on('finish', () => console.log('성공!!'))
      .on('error', () => console.log('실패'));

    console.log('파일 전송이 완료되었습니다.');

    return '끝';
  }
}
