import { availableCharacters } from "../../constants";

export class ClassService {
  async getClass() {
    return availableCharacters;
  }
}
