import multer from "multer";

// File Storage

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/assets");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.filename +
//         "-" +
//         Date.now() +
//         "." +
//         file.originalname.split(".").pop()
//     );
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpeg") {
//     cb(null, true);
//   } else {
//     cb(
//       new Error("Invalid file type. Please Select the type of JPEG or png file")
//     );
//   }
// };

const imageStorage = multer.diskStorage({
  destination: "images", // Destination to store image
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    console.log(file);

    // file.fieldname is name of the field (image), path.extname get the uploaded file extension
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 4000000, // 4000000 Bytes = 4 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg and jpeg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});

// Video Upload
const videoStorage = multer.diskStorage({
  destination: "videos", // Destination to store video
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 10000000, // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp4|MPEG-4)$/)) {
      // upload only mp4 and mkv format
      return cb(new Error("Please upload a Video"));
    }
    cb(undefined, true);
  },
});

const store = multer({ imageUpload, videoUpload });
export default store;
