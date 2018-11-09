import React, { Component } from "react";
import Amplify, { Auth, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import { Connect } from "aws-amplify-react";

import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";
import * as mutations from "./graphql/mutations";

import MessagesList from "./Components/MessagesList";
import SendMessage from "./Components/SendMessage";

const stack = require("./stack.json");

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: stack.Region,
    userPoolId: stack.UserPoolId,
    identityPoolId: stack.IdentityPoolId,
    userPoolWebClientId: stack.UserPoolClientId,
  },

  aws_appsync_graphqlEndpoint: stack.GraphQlApiUrl,
  aws_appsync_region: stack.Region,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
});

class App extends Component {
  async componentDidMount() {
    const { username } = await Auth.currentAuthenticatedUser();

    this.setState({
      username,
    });
  }

  render() {
    return (
      <div
        style={{
          height: "calc(100vh - 79px)",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        <Connect
          query={graphqlOperation(queries.getMessages)}
          subscription={graphqlOperation(subscriptions.addMessage)}
          onSubscriptionMsg={(prev, data) => ({
            getMessages: [...prev.getMessages, data.addMessage],
          })}
        >
          {({ data: { getMessages }, loading, error }) => {
            if (error) return <h3>Error</h3>;
            if (loading || !getMessages) return <h3>Loading...</h3>;

            return (
              <MessagesList
                messages={getMessages}
                username={this.state.username}
              />
            );
          }}
        </Connect>

        <Connect
          mutation={graphqlOperation(mutations.createMessage)}
        >
          {({ mutation }) => <SendMessage onCreate={mutation} />}
        </Connect>
      </div>
    );
  }
}

export default withAuthenticator(App);
