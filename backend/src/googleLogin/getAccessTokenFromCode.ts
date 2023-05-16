import fetch from 'node-fetch';
import * as queryString from 'query-string';

export async function getAccessTokenFromCode(code: any) {
  const postData = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: `http://localhost:${process.env.BACKEND_PORT}/google/callback`,
    code,
  });

  const { access_token }: any = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_HOST}token`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length + '',
      },
      body: postData,
    },
  ).then((response) => response.json());

  return access_token;
}
