import * as AWS from 'aws-sdk'
import { APIGatewayEvent } from 'aws-lambda';

import {ServiceConfig} from './Constants'
import {CreateUserPoolClientRequest,CreateUserPoolClientResponse} from 'aws-sdk/clients/cognitoidentityserviceprovider'

interface TodRegistrationData {
    company: string,
    todUrlBase: string
}

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

const createApp = (params:CreateUserPoolClientRequest) => {
    return new Promise<CreateUserPoolClientResponse>((resolve, reject) => {
      cognitoidentityserviceprovider.createUserPoolClient(params,(err, data) => {
        if(err) reject(err)
        else resolve(data)
      })
    })
  }

export default async (event: AWSLambda.APIGatewayEvent) => {
    if(!event.body) {
        return { 
            statusCode: 400,
            body: JSON.stringify("company and todUrlBase are required data")
        }
    }
  var regData = JSON.parse(event.body) as TodRegistrationData

  var params = {
    ClientName: regData.company+"-rundeck-ToD-"+new Date().getTime(),
    UserPoolId: ServiceConfig.CognitoUserPool, 
    AllowedOAuthFlows: [
      'code'
    ],
    AllowedOAuthFlowsUserPoolClient: true,
    AllowedOAuthScopes: [
      "phone", 
      "email", 
      "openid",
      "profile"
    ],
    CallbackURLs: [
      regData.todUrlBase+"/user/oauth/okta"
    ],
    DefaultRedirectURI: regData.todUrlBase+"/user/oauth/okta",
    ExplicitAuthFlows: [
      'ADMIN_NO_SRP_AUTH'
    ],
    GenerateSecret: true,
    LogoutURLs: [
      regData.todUrlBase+"/user/logout"
    ],
    ReadAttributes: [
      'email',
      'given_name',
      'family_name',
      'profile',
      'custom:rundeck_roles',
      'custom:org',
    ],
    RefreshTokenValidity: 30,
    SupportedIdentityProviders: [
      'COGNITO'
    ],
  } as CreateUserPoolClientRequest
    
  const addAppResponse = await createApp(params)

  return {
    statusCode: 200,
    body: JSON.stringify(addAppResponse),
  };
}