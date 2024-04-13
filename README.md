
<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">
  <a href="https://github.com/chingu-voyages/v48-tier3-team-24">
    <img src="https://raw.githubusercontent.com/chingu-voyages/v48-tier3-team-24/main/public/logo/EventSync.svg" alt="Logo" width="300" height="auto">
  </a>

<h3 align="center">EventSync</h3>

  <p align="center">
    An Event Management Application
    <br />
    <a href="https://github.com/chingu-voyages/v48-tier3-team-24"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://eventsync-prod.vercel.app">View Demo</a>
    ·
    <a href="https://github.com/chingu-voyages/v48-tier3-team-24/issues">Report Bug</a>
    ·
    <a href="https://github.com/chingu-voyages/v48-tier3-team-24/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#development-team">Development Team</a></li>
    <li><a href="#ui-ux-designer">UI/UX Designer</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

EventSync - A dynamic event management platform that connects people with similar interests to promote collaborative growth
* See our [planning document](https://docs.google.com/document/d/1U1xNdcZloskA_KN_jPP8E4z9euuyyDgqDfd3iH1IBbM/edit).
* See our [Figma design](https://www.figma.com/file/nr0Mr71L0pVPnm3bURlQzK/EventSync?type=design&node-id=4-3&mode=design).
<p>App Demo for Visitors</p>

* URL: https://eventsync-prod.vercel.app
* Email: visitor
* Password: password

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With
[![Nodejs][Node.js]][Nodejs-url]
[![Nextjs][Next.js]][Nextjs-url]
[![Prismaio][Prisma.io]][Prismaio-url]
[![MySQL][Mysql]][Mysql-url]
[![TailwindCSS][Tailwindcss]][Tailwindcss-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started
### Prerequisites
* Clone the repository
* Install [node.js](https://nodejs.org/en).
* Set up a MySQL instance either locally or in the cloud ([Railway](https://railway.app)).
* Create a .env file in the root and specify the following values.
  * `DATABASE_URL`=[Your MySQL database connection string]
  * `NEXTAUTH_SECRET`=[Your Auth Key]
  * `NEXTAUTH_URL`=[Your Application Domain]
  * `DISCORD_CLIENT_ID`=[Discord OAuth Client ID]
  * `DISCORD_CLIENT_SECRET`=[Discord OAuth Client Secret]
  * `EMAIL_SERVER_HOST`=[SMTP Server Host]
  * `EMAIL_SERVER_PORT`=[SMTP Server Port]
  * `EMAIL_SERVER_USER`=[Username of Email Account Used for Sending Emails]
  * `EMAIL_SERVER_PASSWORD`=[Password of the Email Account]
### Installation
* Root Directory
  * Install dependencies
  ```
  npm i
  ```
  * Generate Prisma schema
  ```
  npm run postinstall
  ```
  * Push to PostgreSQL database
  ```
  npm run db:push
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage
- Port: 3000
- NPM Scripts
  - dev: Used for development
  - build: Builds next js
  - start: Starts next js

The [Next JS](https://eventsync-prod.vercel.app/) application (Frontend) is hosted on [Vercel](https://vercel.com/). The database instance is hosted on [Railway](https://railway.app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Team -->
## Development Team
* @Ivan A
* @BrianTam
* @rank5pepe
* @Michael P

## UI UX Designer
* @Moriah

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Chingu](https://www.chingu.io/)
* @andresc for guiding our Voyage

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/chingu-voyages/v48-tier3-team-24.svg?style=for-the-badge
[contributors-url]: https://github.com/chingu-voyages/v48-tier3-team-24/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/chingu-voyages/v48-tier3-team-24.svg?style=for-the-badge
[forks-url]: https://github.com/chingu-voyages/v48-tier3-team-24/network/members
[stars-shield]: https://img.shields.io/github/stars/chingu-voyages/v48-tier3-team-24.svg?style=for-the-badge
[stars-url]: https://github.com/chingu-voyages/v48-tier3-team-24/stargazers
[issues-shield]: https://img.shields.io/github/issues/chingu-voyages/v48-tier3-team-24.svg?style=for-the-badge
[issues-url]: https://github.com/chingu-voyages/v48-tier3-team-24/issues
[license-shield]: https://img.shields.io/github/license/chingu-voyages/v48-tier3-team-24.svg?style=for-the-badge
[license-url]: https://github.com/chingu-voyages/v48-tier3-team-24/blob/main/LICENSE.md
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Nodejs-url]: https://nodejs.org/en
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Nextjs-url]: https://nextjs.org/
[Prisma.io]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prismaio-url]: https://www.prisma.io/
[Mysql]: https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white
[Mysql-url]: https://www.mysql.com/
[Tailwindcss]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwindcss-url]: https://tailwindcss.com/
