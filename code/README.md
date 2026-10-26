# [rfidtool.app](rfidtool.app)

This is the root directory, where most commands will be run. It's managed using `pnpm` workspaces.

## Gettings Started

### Requirements

You need [pnpm](pnpm.io) installed to take advantage of the pnpm workspaces. This can be done with `npm`, using the following command

```bash
npm install --global pnpm
```

This will install pnpm "globally" for your entire computer, such that it can be used in any directory, even in future projects.

### Dependencies

Once `pnpm` is installed, you can run `pnpm install` in the root directory (the `code/` folder) to install the dependencies for both the apps, and the packages.

## Development

To start the development servers, run `pnpm run dev` in the same root directory, and it will start all the required dev-servers, and open up a browser with the web-app already open.

## Deployment

Deployment should be largely automatic, handled by Github Workflows located in the `.github/workflows` directory. If you however want to deploy the project manually, you will require the following.

- Run `pnpm wrangler login`, and login with a user that has access to the [rfidtool.app](rfidtool.app) Cloudflare workspace
- Access to the relevant Github Container registry (TBD?)
- Have docker ready to build any new images
- Possibly some other things.

The goal is that a full deployment, to all the targets, should be possible with a single `pnpm run deploy` in the root directory.
