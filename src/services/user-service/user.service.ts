import { User } from "../../entities/user/user";
import { PlayerRepository } from "../../fake-data/fake-user-repository";
import { CharactersEnum } from "../../enums/characters.enum";
import { buildUserRO } from "../../entities/user/utils/build-user-response-object";
import { ERRORS_TEXT } from "../../errors/errors-text";

const userRepository = new PlayerRepository();

export async function userRegistrationService(
  nickname: string,
  email: string,
  password: string,
  confirmPassword: string,
  character: CharactersEnum) {
  const player = new User(nickname, email, password, confirmPassword, character);
  return await userRepository.saveNewPlayer(player);
}

export async function userLoginService(email: string) {
  const foundUser = await userRepository.findOnePlayerByEmail(email);

  if (!foundUser) {
    throw new Error(ERRORS_TEXT.USER_NOT_FOUND);
  }
  return foundUser;
}

export async function userUpdateService(
  id: string,
  nickname: string,
  password: string,
  newPassword: string,
  confirmNewPassword: string,
  character: CharactersEnum
) {
  const foundUser = await userRepository.findOnePlayerById(id);
  if (!foundUser) {
    throw new Error(ERRORS_TEXT.USER_NOT_FOUND);
  }
  if (newPassword === password) {
    throw new Error(ERRORS_TEXT.CREATE_NEW_PASSWORD);
  }

  if (newPassword !== confirmNewPassword) {
    throw new Error(ERRORS_TEXT.PASSWORDS_DO_NOT_MATCH);
  }

  foundUser.nickname = nickname;
  foundUser.password = newPassword;
  foundUser.confirmPassword = confirmNewPassword;
  foundUser.character = character;

  await userRepository.savePlayer(foundUser);
  return buildUserRO(foundUser);
}
