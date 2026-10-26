# SERVER

The `apps/server` directory is for all the code related to the backend api, and server-edge device communication.

## Runtime

The server is a Cloudflare Worker, just like the web app. This worker however, has access to the database, the client mTLS certificates, and similar secrets. It has a `wrangler.jsonc` to configure its bindings with databases, and other Cloudflare specific configuation options, and

## Deployment

It gets deployed with `wrangler deploy` same as the web-app.
