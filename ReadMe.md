# AHA AI Demo

## Overview

This project is to
implement [candidate exam](https://rootdomain.notion.site/Candidate-Exam-Back-End-Full-Stack-Engineer-bc9e910d3c0f477287cda3ad874ee572).
This documentation would cover all the design notion and as much as detail possible.

## Table of Contents

- [Overview](#overview)
- [Infrastructure & Third Party API](#infrastructure--third-party-api)
- [Project Structure](#project-structure)
- [Components](#components)
    - [API Service](#api-service)
        - [Folder Structure](#folder-structure)
        - [Framework and Usage](#framework-and-usage)
        - [How Data Flow?](#how-data-flow)
    - [How to Run Locally](#how-to-run-locally)

## Infrastructure & Third Party API

* Cloud Flare: the domain and dns provider where I bought a domain (scytale.pro) for my previous project and re-used it
  for aha ai demo (aha.scytale.pro)
* Digital Ocean: the cloud service provider where I run the postgres and kubernetes.
* Kubernetes + Helm: the application is deployed into kubernetes cluster for pod & service creation, upgrade, and other
  management. Services are exposed by using ingress with routing rule for frontend and backend.
* Google Auth: OAuth Provider
* Mail Sender: Email sending service Provider

## Project Structure

This is a mono repo managed by [pnpm](https://pnpm.io/) and the folder is structured in micro service way.
By looking at the project, the root folder have clients and services folder which are frontend and backend respectively.
Inside the services folder, instead of putting code into services folder directly, I put it into api-service folder.
This can be benefit from further split going forward.
For example, api service provide auth and account related business. if the throughput of application is growing, and
there are more users request to account data. By using this structure, account related business could be structured as a
independent service to achieve single responsibility design.
Considering another scenario if account and auth service both require email functionality, then mail service can be
further separated from api service. And the outcome is account,api, and mail service under services folder.
Clients also conform this design when more device is required i.e. ios, android, react-native, and website.
By Structuring folder this way, it might cost some time in the beginning of project, especially when define which domain
should be separated and which business belong to which domain. But this structure provide more return in long term when
business grow big and fast.

## Components

### API Service

#### Folder Structure

the api service structure folder into three category domain, lib, and utils.

* domain: domain is split into account, auth, and dashboard according to their business belonging.
* lib: lib contains every third party api required by this project including database connection, mail api, and google
  auth.
* utils: a utility support domain and lib.

#### Framework and Usage

the api service is constructed by Nest.js and Prisma

* [Nest.js](https://nestjs.com/): a framework built on express. I use it as a request routing & validating,
  parameter parser, swagger documentation generator.
* [Prisma](https://www.prisma.io/): a ORM framework for Node.js. I use it as a database migration tool and orm for
  querying database.

#### How Data Flow?

taking account for example, for evey account api request, the data flow is Router + Schema -> Controller -> Service ->
Repo.

* Router + Schema: the first layer receive request, validate request, and filter invalid request
* Controller: dispatch the request from router and method call from other service to service layer
* Service: business logic handler
* Repo: database interaction for querying & updating

##### Router and Controller

Router is designed to be faceted for api endpoint. its purpose is to open api end point to outsider.
controller is the intermediate layer for:

1. router for its own domain.
2. other service like auth service need account data for some of its operation.

