
import jsSHA from "jssha";

export default {
    SHA256 (str) {
        let shaObj = new jsSHA("SHA-256", "TEXT");
        shaObj.update(str);
        return shaObj.getHash("HEX");
    },
};