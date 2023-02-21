import { Storage } from '@google-cloud/storage';
import sharp from 'sharp';
/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.generateThumbnail = (event, context) => {
  console.log('===========================');
  console.log('안녕하세요! 저는 트리거입니다!!!');
  console.log(`event: ${JSON.stringify(event)}`);
  console.log(`context: ${JSON.stringify(context)}`);
  console.log('===========================');

  const originStorage = new Storage().bucket('origin');
  const thumbStorage = new Storage().bucket('thumb');

  const arr = [
    { size: 320, name: 'thumb/s' },
    { size: 640, name: 'thumb/m' },
    { size: 1280, name: 'thumb/l' },
  ];

  arr.forEach((el) => {
    originStorage
      .file(event.name)
      .createReadStream()
      .pipe(sharp().resize({ width: el.size }))
      .pipe(thumbStorage.file(`${el.name}/${event.name}`).createWriteStream())
      .on('finish', () => console.log('성공'))
      .off('error', () => console.log('실패'));
  });
};
