import { google } from "googleapis";
import { throwHttpException } from "../utils/errors";
import * as repo from "./repo";
import { prisma } from "../db";

const auth_client = new google.auth.OAuth2(
  "904366458688-hrnhaak1c9juadkcqqn5kgl27muos363.apps.googleusercontent.com",
  "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",
  "http://localhost:3000/login",
);

export async function userPasswordSignUp(user: string, email: string, password: string) {

  const account = await repo.createAccount(user, email, password, "USERPASSWORD");
}

async function googleSignIn(code: string) {
  const result = await getGoogleUserInfoByCode(code);

}

async function getGoogleUserInfoByCode(code: string) {

  const accessTokenResponse = await auth_client.getToken(code);
  auth_client.setCredentials(accessTokenResponse.tokens);
  const service = google.people({ version: "v1", auth: auth_client });
  const people = await service.people.get({
    resourceName: "people/me",
    personFields: "emailAddresses,names,photos",
  }).then(res => res.data)

  return {
    name: people?.names?.at(0)?.displayName ?? "",
    email: people?.emailAddresses?.at(0)?.value ?? "",
  };


}