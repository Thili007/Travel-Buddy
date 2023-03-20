import multer from "multer";

// File Storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.filename +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Please Select the type of JPEG or png file")
    );
  }
};

const store = multer({ storage, fileFilter });
export default store;
