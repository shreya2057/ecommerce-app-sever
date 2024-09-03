import mutler from "multer";
const storage = mutler.memoryStorage();

export const upload = mutler({ storage });
