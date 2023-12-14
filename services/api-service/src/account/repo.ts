import { prisma } from "../db";
import  md5 from "md5";
import {type SignUpMethod} from "@prisma/client";

export async function createAccount(name: string, email: string, password: string, method : SignUpMethod) {

  return prisma.account.create({
    data : {
      name: name,
      email : email,
      password : md5(password),
      signUpMethod : method
    }
  })
}
