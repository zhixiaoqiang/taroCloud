import Time from "@/utils/time";
import { languages } from "@/utils/languages";

const formatQuery = obj => {
  let str = [];
  for (let k in obj) {
    if (typeof obj[k] !== "undefined") {
      str.push(k + "=" + encodeURIComponent(obj[k]));
    }
  }
  return str.join("&");
};

export { Time, languages, formatQuery };

export default {
  Time,
  languages,
  formatQuery
};
