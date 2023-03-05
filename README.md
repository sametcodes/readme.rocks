## devstats

_You worked hard, it's time to manifest._

[![Vercel](https://vercelbadge.vercel.app/api/sametcodes/devstats?style=flat-square)](https://vercelbadge.vercel.app/api/sametcodes/devstats?style=flat-square)

### Running locally

Make sure you install the dependencies first.

```bash
npm install
```

You need the `.env.local` file that have environment variables. You can get it from the [Vercel](https://vercel.com) project settings, or just by running `vercel env pull .env.local` command if you have the access to the vercel project. If you don't have, ask admin to get it.

Before running, you need to generate the database schema and prepare `husky` hooks.

```bash
npm run prepare
```

```bash
npm run prisma:generate
```

You are ready to go to run the development server.

```bash
npm run dev
```

Good hacking.

### Code linting and prettifying

This project uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for code linting and formatting. You can run the following command to lint the code and check if there are any errors.

```bash
npm run lint
```

If you want to fix the errors automatically, you can run the following command.

```bash
npm run lint:fix
```

### Commit linting

This project uses [Husky](https://typicode.github.io/husky/#/) to run the linting and formatting before every commit. If commits do not fit the conventional commit format, the commit will be rejected. Check the rules [here](https://www.conventionalcommits.org/en/v1.0.0/#specification).

### Scripts

The metric methods require name and descriptions on the database records, and they are provided on as JSDoc comments on the methods. You can run the following command to migrate metric methods to the related database records.

```bash
npm run migrate:methods
```

## Versions and changelogs

Please check the [releases page](https://github.com/sametcodes/devstats/releases) to see the versions and changelogs.