import multer from 'multer';
import path from 'path';
import { getPublicDirPath } from './pathUtils';

// Multer storage for image-uploads.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${getPublicDirPath()}/uploads`);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});
// will be using this for uplading
const upload = multer({ storage });

export default upload;
