# Next.do

An accessible web application to organize your daily tasks, with ordering (drag-and-drop) and subtasks features. With a [Next.js](https://nextjs.org/) face and [NestJs](https://nestjs.com/) backend that uses [Prisma](https://www.prisma.io/).

**Deploys:**

- [Application](next-do.vercel.app/)
- [HTTP endpoints](https://next-do.onrender.com)

## Running Locally

**Prerequisites**

- [Docker](https://www.docker.com/get-started/) (with [Compose](https://docs.docker.com/compose/))

#### 1. Cloning repository

```bash
  git clone git@github.com:mb4ndeira/next.do.git && cd next.do
```

#### 2. Running from docker-compose

The _d_ flag activates detached mode, which runs the command on the background.

```bash
  docker-compose up -d
```

## License

This repository is under a MIT license. For more details, check the [license](LICENSE.md) file.
