import { Amplify } from "aws-amplify";

const amplifyConfig = {
    Auth: {
      Cognito: {
        userPoolId: 'us-east-1_qPlNi92Vm',
        userPoolClientId: '1185ddfcdmpk9hcd502j504lna',
        region: 'us-east-1',
        loginWith: {
          email: true,
        },
      },
    },
  };

export function configureAmplify() {
    Amplify.configure(amplifyConfig);
}