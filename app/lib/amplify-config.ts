import { Amplify } from "aws-amplify";

const amplifyConfig = {
    Auth: {
      Cognito: {
        userPoolId: import.meta.env.VITE_USER_POOL_ID,
        userPoolClientId: import.meta.env.VITE_CLIENT_ID,
        region: 'us-east-1',
        loginWith: {
          email: true,
        },
      },
    },
  };

export function configureAmplify() {
    if (!import.meta.env.VITE_CLIENT_ID) {
        throw new Error('VITE_CLIENT_ID environment variable is required');
    }
    Amplify.configure(amplifyConfig);
}