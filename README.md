# readme.rocks

_All your statistics at once._

## Your development metrics
![](https://readme.rocks/api/view/641b5deaa6550999ac4331d0)
![](https://readme.rocks/api/view/641b5e30a6550999ac4331d2)
![](https://readme.rocks/api/view/642dfbff39f5d6e5e5f45c3b)
![](https://readme.rocks/api/view?queryConfig%5Busername%5D=sametcodes&id=641b2efa3e90e7e555cdacd7)
![](https://readme.rocks/api/view?queryConfig%5Busername%5D=_aka5h&id=64414ea69c1f3df3b3e01264)
![](https://readme.rocks/api/view?queryConfig%5Busername%5D=arthurcolle&id=6442108c4320fb5c413f663c)

## Recent projects and used languages

![](https://readme.rocks/api/view/6431b08616981eaebfd030f9)
![](https://readme.rocks/api/view/6431b559ddde9c1558a16fe6)

## Project progress with milestones

<a href="https://github.com/sametcodes/readme.rocks/milestone/4">
   <img width="450px" src="https://readme.rocks/api/view/6434324683b8f4f727a83c32" />
<a href="https://github.com/sponsorships/d-fischer">
<a href="https://github.com/sametcodes/readme.rocks/milestone/2">
   <img width="450px" src="https://readme.rocks/api/view/64a70675d1e3cba955dc7df9" />
</a>

## Line stats
![](https://readme.rocks/api/view/6440669e4c5d605274994a4b)

## Calendar and streaks

![](https://readme.rocks/api/view?queryConfig%5Busername%5D=_aka5h&viewConfig%5Btitle%5D=LeetCode%20submissions&viewConfig%5Bsubtitle%5D=Last%205%20months&viewConfig%5BweekCount%5D=20&viewConfig%5BboxColor%5D=%2340c463&viewConfig%5BshowMonthLabels%5D=true&viewConfig%5BshowStreak%5D=true&id=64415382192eb283354af5a1)
![](https://readme.rocks/api/view?queryConfig%5Busername%5D=arthurcolle&viewConfig%5Btitle%5D=HackerNews%20Activity&viewConfig%5Bsubtitle%5D=Comments,%20jobs%20and%20polls&viewConfig%5BweekCount%5D=20&viewConfig%5BboxColor%5D=%23ff7a00&viewConfig%5BshowMonthLabels%5D=true&viewConfig%5BshowStreak%5D=false&id=6442166417556cdd9b746ff5)

## Your latest `daily.dev` and `dev.to` articles

<img src="https://readme.rocks/api/view?queryConfig%5Busername%5D=honeypot&queryConfig%5Bcount%5D=3&id=641cd30dbe50187858f7d61a" />
<img src="https://readme.rocks/api/view?queryConfig%5Busername%5D=isaacdlyman&queryConfig%5Bcount%5D=2&id=641c6e78c50c62ccdb646278" />

## Contributors

<img src="https://readme.rocks/api/view?queryConfig%5Bowner_name%5D=facebook&queryConfig%5Brepository_name%5D=react&viewConfig%5Btitle%5D=Our%20contributors&viewConfig%5Bsubtitle%5D=Thank%20you%20for%20all%20your%20contributions.%20We%20appreciate%20that.&viewConfig%5Bitems_per_row%5D=15&id=642f70a3104ae4fd80d6efac" />

## Milestones

[![](https://readme.rocks/api/view/6434324683b8f4f727a83c32)](milestone/3)

## Sponsors and goals
<a href="https://github.com/sponsorships/d-fischer">
<img src="https://readme.rocks/api/view?queryConfig%5Busername%5D=d-fischer&id=64248c899d4315a82e3cb3f7" />
</a>

<img src="https://readme.rocks/api/view?queryConfig%5Busername%5D=ljharb&viewConfig%5Btitle%5D=My%20sponsors&viewConfig%5Bsubtitle%5D=Thank%20you%20for%20sponsoring%20me.&viewConfig%5Bitems_per_row%5D=15&id=64300f9e4160c69275201776" />

### Running locally

Make sure you install the dependencies first.

```bash
npm install
```

You need the `.env` file that have environment variables. You can get it from the [Vercel](https://vercel.com) project settings, or just by running `vercel env pull .env` command if you have the access to the vercel project. If you don't have, ask admin to get it.

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

Here are possible commit headers with descriptions. Choose the one that fits the changes you made.

```
build: Changes related to the build system or external dependencies, such as updating a build script or adding/removing a package.
config: Changes related to the configuration of the application, such as updating environment variables, modifying configuration files, or adjusting settings that alter the behavior of the application.
docs: Updates or additions to the documentation, such as user guides, API documentation, or code comments.
feat: New features or enhancements that add functionality to the application.
fix: Bug fixes or patches that address issues in the codebase.
perf: Performance improvements or optimizations, such as code refactoring to enhance execution speed or memory usage.
refactor: Code changes that neither fix a bug nor add a feature but improve code quality, readability, or maintainability.
revert: Reverting a previous commit or change, effectively undoing the changes made in that commit.
style: Cosmetic changes to the code that do not affect its functionality, such as fixing indentation, removing whitespace, or updating code formatting.
test: Changes related to testing, such as adding, updating, or removing test cases or updating testing frameworks.
security: Changes related to security, such as fixing vulnerabilities or adding security features.
```

### Scripts

The metric methods require name and descriptions on the database records, and they are provided on as JSDoc comments on the methods. You can run the following command to migrate metric methods to the related database records.

```bash
npm run migrate:platform
```

## Versions and changelogs

Please check the [releases page](https://github.com/sametcodes/devstats/releases) to see the versions and changelogs.
