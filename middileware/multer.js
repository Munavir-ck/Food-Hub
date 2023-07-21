const multer = require("multer");
const path = require("path");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    
    callback(null, 'public/uploadImage'); 
  },
  filename: (req, file, callback) => {
   
    callback(null, Date.now() + '--' + file.originalname);
  }
});

const upload = multer({
  storage: fileStorageEngine,
  fileFilter: (req, file, callback) => {
  
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      callback(null, true);
    } else {
    
      callback("Error: Only images are allowed!");
    }
  },
});

const storeImage = upload.array('image', 1);
module.exports = { storeImage };
