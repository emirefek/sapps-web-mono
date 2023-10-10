# Team [Hephaistos](https://www.spaceappschallenge.org/2023/find-a-team/hephaistos/)

[Nasa Spaceapps 2023 Bursa Hackathon](https://www.spaceappschallenge.org/2023/locations/bursa/).
Selected 2nd best project by local event jury.

# How to run

We are using fully cloud enviroments to deploy.

## Local dev

**npm run dev**
_runs backend and frontend dev env._

**cd apps/ml-pod && docker build -t hephaistos-ml-lighter . && docker run --rm --gpus=all hephaistos-ml-lighter**
this runs image recognition software on dockerized env, you need to configure image url in test_input.json

## Deploy

We are deploying our

- frontend, from render.com to global CDNs.
- backend, from railway to a single point region.
- using Postgres SQL from Neon Cloud Database

## .ENV file

you need to configure env file for dev and prod ENVs
