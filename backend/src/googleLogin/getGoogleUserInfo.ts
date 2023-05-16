import fetch from 'node-fetch';

export async function getGoogleUserInfo(access_token: string) {
  const profile = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_INFO_HOST}oauth2/v2/userinfo`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  ).then((res) => res.json());
  console.log('get user info', profile);
  return profile;
}
