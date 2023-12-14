import {google} from "googleapis";
import {throwHttpException} from "../utils/errors";

const authClient = new google.auth.OAuth2(
    "904366458688-hrnhaak1c9juadkcqqn5kgl27muos363.apps.googleusercontent.com",
    "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",
    "http://localhost:3000/login",
);

export async function getGoogleUserInfo(code: string) {

    try {

        const accessTokenResponse = await authClient.getToken(code);
        authClient.setCredentials(accessTokenResponse.tokens);
        const service = google.people({version: "v1", auth: authClient});
        const people = await service.people.get({
            resourceName: "people/me",
            personFields: "emailAddresses,names,photos",
        }).then(res => res.data)

        return {
            name: people?.names?.at(0)?.displayName ?? "",
            email: people?.emailAddresses?.at(0)?.value ?? "",
        };

    } catch (e) {
        throwHttpException("the code can't be validated by google");
    }

}
