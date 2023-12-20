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
        - [Data Flow](#data-flow)
        - [Difference Between Router and Controller](#difference-between-router-and-controller)
    - [AHA AI Demo - Client](#aha-ai-demo---client)
        - [Folder Structure](#folder-structure-1)
        - [Framework and Usage](#framework-and-usage-1)
- [How to Run Locally](#how-to-run-locally)
    - [Prerequisites](#prerequisites)
    - [API Service Setup](#api-service-setup)
    - [AHA AI Demo - Client Setup](#aha-ai-demo---client-setup)

## Infrastructure & Third Party API

- **Cloud Flare**: Utilized as the domain and DNS provider. The domain `scytale.pro` was initially acquired for a
  previous project and has been repurposed for `aha.scytale.pro`, facilitating reliable DNS management and enhanced
  security features.

- **Digital Ocean**: chosen cloud service provider, hosting the PostgreSQL database and Kubernetes clusters. Digital
  Ocean offers a balance of performance, scalability, and ease of use, crucial for the efficient running of our
  services.

- **Kubernetes + Helm**: The application is deployed within a Kubernetes cluster, leveraging Helm for streamlined
  deployment and management. Kubernetes orchestrates our microservices, ensuring scalability and resilience, while Helm
  simplifies the deployment process with templated configurations.

- **Google Auth**: Integrated as the OAuth provider for secure and convenient user authentication. This allows users to
  sign in using their Google accounts, ensuring a seamless authentication experience.

- **Mail Sender**: A service for handling email communications. It's vital for features like user notifications and
  password resets, providing reliable email delivery.

## Project Structure

This monorepo is managed using [pnpm](https://pnpm.io/) and follows a microservices architectural approach. The
repository is organized into two main directories:

- **`/clients`**: Contains frontend applications.
- **`/services`**: Houses backend services.

### Services Structure

Within the `/services` directory, the code is subdivided into specific service folders rather than placing it
directly under `/services`. For instance:

- **`/api-service`**: Central service handling authentication (`auth`) and account management (`account`).

This structure facilitates scalability and separation of concerns:

- **Scalability**: As the application grows, and the demand for account-related features increases, we can easily split
  these into independent services. This ensures efficient handling of increased throughput and user requests.

- **Single Responsibility Principle**: Each service is focused on a specific domain, aligning with the single
  responsibility principle. For example, if both account and authentication services require email functionality, a
  separate `/mail-service` can be introduced to handle all email-related operations.

### Client Structure

The `/clients` directory is prepared to accommodate various client applications such as:

- Web applications (React, Angular, etc.)
- Mobile applications (iOS, Android, React Native)

### Long-term Benefits

While initially, this structure might require more time to set up and decide on domain separation, it offers significant
long-term benefits:

- **Flexibility**: Easier to adapt and expand as new requirements emerge or new services are needed.
- **Maintainability**: Each service or client can be updated, scaled, or maintained independently, reducing complexity.
- **Efficiency**: Facilitates focused development and testing within each domain or service.

This thoughtful organization of the repository ensures that as our business scales, our codebase remains manageable,
efficient, and ready for future expansions.

## Components

### API Service

#### Folder Structure

The API service is organized into three main categories: `domain`, `lib`, and `utils`.

- **`domain`**: This includes specific business logic areas like `account`, `auth`, and `dashboard`.
- **`lib`**: Contains integrations with third-party APIs, including database connections, mail APIs, and Google Auth.
- **`utils`**: Utility functions that support both the `domain` and `lib`.

#### Framework and Usage

The API service is built using [Nest.js](https://nestjs.com/) and [Prisma](https://www.prisma.io/):

- **Nest.js**: A progressive Node.js framework for building efficient and scalable server-side applications. It is used
  for request routing, validation, parameter parsing, and generating Swagger documentation.
- **Prisma**: An ORM for Node.js, used for database migrations and as an ORM for querying the database.

#### Data Flow

Illustrating with the `account` API as an example, the data flow follows this pattern: Router + Schema -> Controller ->
Service -> Repo.

- **Router + Schema**: Responsible for receiving, validating, and filtering requests.
- **Controller**: Acts as a dispatcher, handling requests from the router and calls from other services.
- **Service**: The core of business logic processing.
- **Repo**: Manages database interactions, such as queries and updates.

##### Difference Between Router and Controller

- **Router**: Defines API endpoints and directs requests to the appropriate controllers. It acts as the entry point for
  external requests.
- **Controller**: Serves as an intermediary, processing requests from the router and facilitating interactions between
  different services (e.g., the account service might require data from the auth service).

### AHA AI Demo - Client

#### Folder Structure

The client-side structure is organized as follows:

- **`components`**: UI and layout components.
- **`hooks`**: Custom hooks for API and UI-related logic.
- **`lib`**: Third-party dependencies and libraries.
- **`pages`**: Page components structured according to Next.js routing.
- **`stores`**: State management for the application.
- **`utils`**: Utility functions for various tasks.

#### Framework and Usage

The client-side application uses several key frameworks and tools:

- **Next.js**: A React-based framework for server-side rendering and page routing.
- **Material UI**: A React UI framework offering pre-defined components like buttons and navigation bars.
- **Zustand**: A state management tool used for managing login states and user interactions.
- **SWR**: A React hook library for data fetching, caching, and revalidation.

## How to Run Locally

### Prerequisites

Before running the project locally, ensure you have the following prerequisites:

- **Clone the Project**: Clone the repository to your local machine.
- **Postgres Database**: Ensure you have a running Postgres database.
- **PNPM Package Manager**: Install PNPM package management globally by running `npm install -g pnpm`.
- **Install Dependencies**: In the root folder of the project, run `pnpm install` to install dependencies for all
  components.

### API Service Setup

To set up the API service:

1. **Environment File**:

- Navigate to the `api-service` folder.
- Create a `.env` file with the following configurations:
  ```
  DATABASE_URL=#database url#
  JWT_SECRET_KEY=#secret key for signing jwt#
  CLIENT_URL=#frontend url#
  CLIENT_ID=#google oauth client id#
  CLIENT_SECRET=#google oauth client secret#
  CLIENT_REDIRECT_URL=#google oauth client redirect url#
  API_URL=#api service url#
  ```

2. **Database Migration**:

- Run `npx prisma migrate deploy && npx prisma generate` to execute database migrations.

3. **Start the API Service**:

- Run `pnpm start:dev` to start the API service in development mode.

### AHA AI Demo - Client Setup

To set up the AHA AI Demo client:

1. **Environment File**:

- Navigate to the `aha-ai-demo` folder.
- Create a `.env` file with the following configurations:
  ```
  NEXT_PUBLIC_BACKEND_API_URL=#api service url#
  NEXT_PUBLIC_CLIENT_ID=#google oauth client id#
  NEXT_PUBLIC_REDIRECT_URL=#google oauth redirect url#
  ```

2. **Start the Client**:

- Run `pnpm dev` to start the AHA AI Demo client in development mode.
- open browser and navigate to ```http://localhost:3000``` to play with it.
