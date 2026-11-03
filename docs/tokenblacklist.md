# Token Blacklisting with Redis

## 1. The Problem with JWT

### The "Stolen Ticket" Analogy

Think of a standard JWT like a printed concert ticket with an expiration date.
• Once the server signs the ticket and hands it to a user, the user just shows the ticket at the door (the API gateway) to get in.
• The door security guard only checks if the signature is valid and if the date hasn't passed. The guard does not call the box office to verify the ticket every single time.

### The Nightmare Scenarios:
• The User Logs Out: If a user clicks "Log Out", the client app deletes the token from its local memory. However, if a hacker intercepted and copied that token before the logout, the token is still completely valid. The hacker can keep using it until it naturally expires.

• Password Resets: If a user realizes their account is compromised and resets their password, their old logged-in sessions (tokens) on other devices will stay active and valid.

• Account Banning: If an administrator bans a malicious user, that user can still access the API until their current token expires because the token itself doesn't know it has been banned.
To fix this, you need a Blacklist—a security checkpoint that lists all stolen or revoked tickets.

### Common Scenarios

- **Logout:** Deleting a token from the client does not invalidate a stolen copy.
- **Password Reset:** Previously issued tokens may remain valid on other devices.
- **Account Banning:** A banned user may continue accessing APIs until their token expires.

## 2. What is Token Blacklisting?

Token blacklisting is a technique used to invalidate JWTs before their natural expiration.

When a user logs out or an account needs to be revoked, the server adds the token (or its unique identifier, JTI) to a blacklist.

On subsequent requests, the server checks whether the token has been blacklisted. If it has, access is denied.

## 3. Why Use Redis?

Redis is an in-memory key-value store commonly used for token blacklisting because of three advantages:

- **High Speed:** Stores data in RAM, allowing fast blacklist lookups during API authentication.
- **Automatic Cleanup (TTL):** Automatically removes blacklist entries when their associated JWT expires.
- **Reduced Database Load:** Handles frequent authentication checks without repeatedly querying the primary application database.

## 4. How It Works

1. User requests logout or their session is revoked.
2. Backend identifies the JWT or its unique identifier.
3. The token identifier is added to the Redis blacklist.
4. Redis stores it with a TTL matching the token's remaining lifetime.
5. Middleware checks the blacklist during subsequent authenticated requests.
6. If the token is blacklisted, the request is rejected.

