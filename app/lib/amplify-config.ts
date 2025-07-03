import { Amplify } from "aws-amplify";

const amplifyConfig = {
    Auth: {
      Cognito: {
        userPoolId: 'ap-northeast-1_YqlVcbCtk',
        userPoolClientId: '4fq95s8bn126sm56e769tunmk6',
        region: 'ap-northeast-1',
        loginWith: {
          email: true,
        },
      },
    },
  };

export function configureAmplify() {
    Amplify.configure(amplifyConfig);
}