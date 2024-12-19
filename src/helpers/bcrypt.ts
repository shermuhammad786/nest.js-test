/* eslint-disable prettier/prettier */
import * as bcrypt from "bcrypt";
import { sendMessage } from "./sendMessage";

export const bcryptHashingData = (data: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(data, salt)
  return hash;
}

export const bcryptCompareData = (data: string, userData: string) => {
  console.log('userData: ', userData);
  console.log('data: ', data);
  console.log("compare...");
  const matching = bcrypt.compareSync(data, userData);

  console.log('matching: ', matching);
  if (matching) {
    return sendMessage(true, "data matched")
  } else {
    return sendMessage(false, "data does not matched")
  }
}