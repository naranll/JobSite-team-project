import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';

export const multerConfig: MulterModuleOptions = {
  storage: diskStorage({
    destination: '/tmp', //change destination folder when using windows
    filename: (req, file, cb) => {
      const ext = getExtension(file.originalname);
      const newName = nanoid() + '.' + ext;
      cb(null, newName);
    },
  }),
};
function getExtension(name) {
  const arr = name.split('.');
  return arr[arr.length - 1];
}
