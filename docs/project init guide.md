# Project set up:

1.	Clone the project into whatever directory you want on your machine.
2.	Run `npm install` followed by `npm postinstall` to init the demo schema on your machine. It currently matches the dev schema on Railway. Ideally, we'll push the updated schema on Railway after we merge the pull request containing the Prisma schema updates.
3.	Then, clone `.env.example` in the root directory and rename the new file to `.env`
- This is your local copy of the `.env` file. You will need to manually update this file as we add new secret key/value pairs
- Do not check `.env` to source. Add it to your `.gitignore` file if it’s not already there.
- Check the Discord channel for secrets as we add them. Initially, there are 3 secret pairs: two Discord Auth pairs and the dev Railway DB connection string.
4.	Finally, I left all of the stock boilerplate code in the project. Nearly all of it is commented fairly well. We’ll be removing this as we start to develop the site. Most of us will be working in vertical 'slices' so it's a good idea to know what goes where.

# Familiarize yourself with the project file structure.

Visit https://create.t3.gg/en/folder-structure for a breakdown on the file structure of the project.

TL;DR:
1.	`~/pages` is the front end portion of the project. tRPC calls such as queries or mutations invoked here are resolved on the server side
2.	`~/server` is the back end. tRPC resolvers are functions talk to Prisma to fetch data from our DB on Railway.
- For each page component, we’ll have an accompanying `.ts` file where we resolve any data queries
3.	`~/styles` would likely be untouched until we want to start changing global CSS. Most CSS should be tailwind within their components.
- Mostly for global colors and text fonts.
4.  I added `~/components` for front end shared React components. We can add subdirectories to further organize components if required.

## Some notes on the documentation:

-	I don’t think we’ll be utilizing the API stuff under `~/pages/` so don’t worry too much about that portion of the framework.
-	Most of the auth logic is already scaffolded for us. We’ll just need to make adjustments as we go.
-	We can refer to this blog post I found when we integrate Stripe https://nkrkn.me/writing/t3-stripe

### For VSCode users:
If you have errors on any `.ts` or `.tsx` file that is trying to import a node module, make sure your editor is configured to use the workspace’s typescript version. See https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript

~ Ivan
