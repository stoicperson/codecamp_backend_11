const sharp = require('sharp')
const Storage = require('@google-cloud/storage')
/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.generateThumb = async (event, context) => {
  // file 이름이 thumb/으로 시작될 때
  if (event.name.split('/')[0] === 'thumb') {
    return; // 탈출
  }

  // google-cloud 스토리지 인스턴스 생성
  const storage = new Storage();

  // 사이즈 배열 리스트
  const SIZES = [
    ['s', 320],
    ['m', 640],
    ['l', 1280],
  ];

  const results = await Promise.all(
    // 3가지 이미지 생성 프로미스 반환
    SIZES.map(
      ([sub, width]) =>
        new Promise((resolve, reject) => {
          storage
            // 버켓 설정
            .bucket(event.bucket)
            // 파일 설정
            .file(event.name)
            // 파일 스트림화
            .createReadStream()
            // sharp로 이미지 리사이즈
            .pipe(sharp().resize({ width }))
            // 버킷에 해당폴더로 저장로 저장
            .pipe(
              storage.bucket(event.bucket).file(`thumb/${sub}/${event.name}`).createWriteStream(),
            )
            // 성공
            .on('finish', () => resolve('성공'))
            // 실패
            .on('error', () => reject('실패'));
        }),
    ),
  );

  return results;
}
