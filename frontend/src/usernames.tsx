import {
  uniqueNamesGenerator,
  names,
} from "unique-names-generator";

export default function generateRandomUsername() {
  return uniqueNamesGenerator({
    dictionaries: [names],
    separator: " ",
    style: "capital",
    length: 1,
  });
}
