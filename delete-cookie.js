import express from "express";

const app = express();
const port = 3000;

app.get("/delete-cookies", (req, res) => {
  const { cookies, returnUrl } = req.query;

  if (cookies && typeof cookies === 'object') {
    for (const [cookieName, domain] of Object.entries(cookies)) {
      res.cookie(cookieName, '', {
        expires: new Date(0),
        domain: domain,
        path: "/",
        secure: true,
        httpOnly: true
      });
    }
  } else {
    res.status(400).send("No cookies provided for deletion.");
    return;
  }

  if (returnUrl) {
    res.redirect(returnUrl);
  } else {
    res.status(400).send("No returnUrl provided or URL is not valid.");
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
