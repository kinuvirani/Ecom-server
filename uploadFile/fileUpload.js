const multer=require('multer');

exports.upload = multer({storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './assets/images/')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
});
