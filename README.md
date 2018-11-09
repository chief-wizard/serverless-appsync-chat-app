# Serverless AppSync Realtime Chat

### Setting up

##### Prerequisites
- [Node.js 8](https://nodejs.org/en/)
- Yarn
- Amplify-CLI `npm install -g @aws-amplify/cli`
- Serverless Framework `npm install -g serverless`
- AWS credentials setup
  - Fast option: credentials have Administrator access (not
    recommended).
  - Slower option: add the following permissions to your account:
      - IAM
      - S3
      - CloudWatch
      - DynamoDB
      - CloudFormation - Read/Write (custom policy)
      - AppSync - Administrator
      - Cognito - Power User

##### Installation
0. Clone repo
1. Install backend dependencies
```sh
npm install 
# or 
yarn
```

2. Deploy serverless stack
```sh
serverless deploy
```

This command will create DynamoDB table with messages, Cognito User and Identity Pool and AppSync project.

After completing, this will create `stack.json` file inside `front/src/` directory which will be later used for frontend part.

3. Go to frontend part and install dependencies
```sh
cd front && yarn
```

4. Now we need to generate API client for the frontend basing on GraphQL schema from AppSync service. First, we need to initialize Amplify in frontend directory.
```sh
amplify init
```

_Note: Make sure to select Javascript as your language and React as framework._

5. And then associate to our AppSync API.
```
amplify add codegen --apiId <API_ID_HERE>
```

You can retrieve API_ID from [https://console.aws.amazon.com/appsync/home?region=us-east-1](https://console.aws.amazon.com/appsync/home?region=us-east-1).

6. Finally, generate GraphQL documents (queries, mutations, and subscriptions) and generate types for your JavaScript, TypeScript, or Flow application. If you modify the generated documents or your API's schema, you can regenerate the client code anytime with:
```sh
amplify codegen
```

This should create following files inside your `front` directory:
```
front
├── .amplifyrc
├── .graphqlconfig.yml
├── src
    ├── API.ts
    └── graphql
        ├── mutations.js
        ├── queries.js
        ├── schema.json
        └── subscriptions.js
```

7. Now you can start your project by running `npm start` or `yarn start` or `npm run front` if you are currently in root directory.

8. Head to [http://localhost:3000](http://localhost:3000), create your account, confirm, login and chat!
