# Cookie Management Proxy

This proxy server is designed to facilitate the deletion of secure, HttpOnly cookies from a specified domain that cannot be deleted directly by a client-side application, such as a Single Page Application (SPA). This is particularly useful for situations where the SPA cannot modify these cookies due to browser security restrictions.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You'll need Node.js and npm installed on your local machine. To install these, you can follow the instructions at:

- Node.js: https://nodejs.org/
- npm: https://npmjs.com/

### Installing

To get a development environment running, follow these steps:

1. Clone the repository to your local machine.

   ```sh
   git clone https://gitlab.com/aschehoug/devops/auth-cookie-cleaner.git
   ```

2. Navigate to the cloned directory.

   ```sh
   cd auth-cookie-cleaner
   ```

3. Install the necessary packages.

   ```sh
   pnpm install
   ```

4. Start the server.

   ```sh
   node .
   ```

Your proxy server should now be running and accessible at `http://localhost:3000`.

## Usage

The server can be used to delete cookies by making a GET request to the `/delete-cookies` endpoint with the appropriate query parameters. Below is an example of how to structure the request:

### Parameters

- `cookies`: An object where the key is the name of the cookie and the value is the domain from which the cookie should be deleted.
- `returnUrl`: The URL to which the user should be redirected after the cookies have been deleted.

### Example Request

Here is an example of how to generate a URL for the request in JavaScript:

```javascript
const baseUrl = "https://your-proxy-server.com/delete-cookies";
const cookiesToDelete = {
  "am-frontend-sso": ".prod.aschehoug.cloud",
  "am-sticky": "am.core.prod.aschehoug.cloud",
  amlbcookie: ".prod.aschehoug.cloud",
};
const returnUrl = "https://your-spa.com/login";

const url = createCookieDeletionUrl(baseUrl, cookiesToDelete, returnUrl);

function createCookieDeletionUrl(baseUrl, cookies, returnUrl) {
  let queryString = Object.entries(cookies)
    .map(([cookieName, domain]) => {
      return `cookies[${encodeURIComponent(cookieName)}]=${encodeURIComponent(
        domain
      )}`;
    })
    .join("&");
  queryString += `&returnUrl=${encodeURIComponent(returnUrl)}`;
  return `${baseUrl}?${queryString}`;
}
```
