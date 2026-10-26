# WEB

The `apps/web` directory is for the website that a user will use to interface with our system. It should display information about the tools, and their presence in the edge devices, as well as some basic information about the edge devices themselves.

## Runtime

The web-app is a Cloudflare Worker, just as the API is. It has the same setup, with a `wrangler.jsonc` file, describing its bindings, name, and all its other config options.

This time, it just serves static assets, and handles caching and whatever else the frontend requires. It doesn't have (and shouldn't have) direct access to the database, or any other secrets, as its only the presentation layer between the user and the API.

## Deployment

Just like all other cloudflare projects, it's deployed with their CLI tool `wrangler`, specifically with the `wrangler deploy` command.
