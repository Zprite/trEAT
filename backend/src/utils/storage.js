import multer from "multer"

// Multer storage for image-uploads.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
//will be using this for uplading
const upload = multer({ storage: storage });

export default upload;