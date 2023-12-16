# AHA AI Exam Demo.

## Overview

This is a monorepo base on pnpm. As you can see, the backend and frontend are split into different folder.
In each folder, code are split into folder according to their usage. For an example, the only service at this moment is
api-service which handle all the account and auth request.
If going forward this project grow really fast and big, we might need to further split the api-service into auth-service
and account-service.
Moreover, if both auth and account service depends on email related api, we might extract email-service as technical
component for other services.
same concept for the clients folder, it is designed to accomodate more client device like ios and android.

## Component and Framework

I would like to split this section into three sub part, project management tool, frontend, and backend

### Project Management Tool

This is a mono repo based on pnpm. pnpm is a pretty good tool for manage big repo especially depedency installation for
its child project.
The basic ususage is to create a pnpm-workspace.yaml to specify child component and then these component is under pnpm
management.
You could run the code below to install pnpm and install all the dependency among the root folder
* ```npm -g pnpm``` & ```pnpm install``` in the root folder.
* Installing new dependency, go to the folder like services/api-service
```cd services/api-service``` and run ```pnpm add depedency``` then pnpm will take control how the dependency should be
installed.

### Front End

Front End code is under clients folder and selected frameworks are:-

* Next.js and SWR as backbone for page routing, rendering, and api calling
* Material UI and Material UI Chart as UI Component
* Zustand as statement for tracking user sign-in status

Folder structure and explanation:-
the design notion is to split folder based on their domain so that every component
i.e. React.Component, hooks, or lib can be clearly founded and self-explained

* components: this is where all the UI component should be placed and further split by domain i.e. components/account and component/auth. I hope designing in this way can help developer locate the component faster.
* hook: including all the hook i.e. swr, or self wrapped hook for useState
* 

hooks: include all the hook i.e. wrapper useState hook for managment modal open close operation, or api request hook
wrapper swr.

pages: router structure according to Next.JS
stores: defining all the state required in this project.
utils:

### BackEnd

I choose Nest.JS for facilitating request validation and field parsing and prisma as a repo and database tool.
under the source, the code is structured as business domain so that account and auth are splited into differnet folder
to make sure there is no big class big responsibiltiy in each domain. for domain related folder,
the request flow as Router + Schema -> Controller -> Service -> Repo
Router + Schema is the first layer for handing request,
in this layer, Router + Schema validate if request has required field/format then pass that to the controller
In controller layer, it is just a facet to receieve router + service calling then redirect the function call
to service layer, service is where business logic is defined, if auth service need account data,
it will retreieve it by calling account controller, final layer is repo where do the database interaction.

For Dashboard, given it is a reporting based domain, so that there is no restriction for it to
interact with account and auth data directly (usually we will create a dashboard specific doamin/database/table through
the ETL)


