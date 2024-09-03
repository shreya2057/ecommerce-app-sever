import mutler from "multer";
const storage = mutler.memoryStorage();

const upload = mutler({ storage });

export const uploadImage = upload.single("image");
