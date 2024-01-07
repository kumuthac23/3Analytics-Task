import * as jose from "jose";

const secret = new TextEncoder().encode(import.meta.env.VITE_SECRET_KEY);

const alg = "HS256";

//Authenticate the user and set the token to the localstorage
export async function authenticate(username: string, password: string) {
  if (
    username === import.meta.env.VITE_ADMIN_USERNAME &&
    password === import.meta.env.VITE_ADMIN_PASSWORD
  ) {
    const jwt = await new jose.SignJWT({ "urn:example:claim": true })
      .setSubject(username)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("2h")
      .sign(secret);

    localStorage.setItem("3analystics_token", jwt);

    return jwt;
  }

  return null;
}

//Verify the token and it's expiration
export async function verifyToken(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, secret, {
      issuer: "urn:example:issuer",
      audience: "urn:example:audience",
    });

    if (payload) {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (
        payload.exp! > currentTimestamp &&
        payload.sub == import.meta.env.VITE_ADMIN_USERNAME
      ) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.log(error);
  }
}
