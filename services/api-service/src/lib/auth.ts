import {google} from 'googleapis';
import {throwHttpException} from '../utils/errors';
import * as process from 'process';

const authClient = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.CLIENT_REDIRECT_URL
);

export async function getGoogleUserInfo(code: string) {
  try {
    const accessTokenResponse = await authClient.getToken(code);
    authClient.setCredentials(accessTokenResponse.tokens);
    const service = google.people({version: 'v1', auth: authClient});
    const people = await service.people
      .get({
        resourceName: 'people/me',
        personFields: 'emailAddresses,names,photos',
      })
      .then(res => res.data);

    return {
      name: people?.names?.at(0)?.displayName ?? '',
      email: people?.emailAddresses?.at(0)?.value ?? '',
    };
  } catch (e) {
    console.error('google auth error', e);
    throwHttpException("the code can't be validated by google");
  }
}
