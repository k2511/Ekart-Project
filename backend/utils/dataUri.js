import DataUriParser from "datauri/parser.js";
import path from "path";

const getUri = (file) => {
    const parser = new DataUriParser();
    // File ka extension nikalna (jaise .png, .jpg, .webp)
    const extName = path.extname(file.originalname).toString();
    
    // Parser buffer aur extension ko mila kar format karta hai
    return parser.format(extName, file.buffer);
};

export default getUri;