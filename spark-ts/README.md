Spark Serverless
================

This project bundles the various lambdas and event sources for handling the Spark
artifact submission and processing pipeline.

Serverless framework is used to streamline the development,
testing, and deployment process.

## Getting started

**VSCode**  
VSCode is highly recommended for its excellent Javascript and TypeScript support.

**Serverless**   
Required:
```
npm install -g serverless
```

**NPM Dependencies**  
As well as the rest :)
```
npm install
```

### Drive

**Test**
```
npm run test -- --watch
```
Tests ending in `.(spec|test).ts` will be picked up. A common conventions
is to include tests in a `__tests__` directory in the directory of the files
under test.

**Deploy**
```
sls deploy
```

**Package**  
see `.serverless/` after:
```
sls package
```