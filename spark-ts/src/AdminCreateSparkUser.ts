import * as AWS from 'aws-sdk'
import { APIGatewayEvent } from 'aws-lambda'

import {ServiceConfig} from './Constants'
import {AdminCreateUserRequest} from 'aws-sdk/clients/cognitoidentityserviceprovider'

interface UserRegistrationData {
    username: string
    tmpPass: string
    roles: string
    company: string
}

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

const createUser = (params:AdminCreateUserRequest) => {
    return new Promise((resolve, reject) => {
      cognitoidentityserviceprovider.adminCreateUser(params,(err, data) => {
        if(err) reject(err)
        else resolve(data)
      })
    })
  }

export default async (event: APIGatewayEvent) => {
    if(!event.body) {
        return { 
            statusCode: 400,
            body: JSON.stringify("username, tmpPass, roles, and company are required data")
        }
    }
  var regData = JSON.parse(event.body) as UserRegistrationData

  var params = {
    UserPoolId: ServiceConfig.CognitoUserPool, 
    Username: regData.username, 
    DesiredDeliveryMediums: [
      'EMAIL',
    ],
    ForceAliasCreation: true,
    TemporaryPassword: regData.tmpPass,
    UserAttributes: [
      {
        Name: 'email', 
        Value: regData.username
      },
      {
        Name: 'email_verified', 
        Value: 'True'
      },
      {
        Name: 'custom:rundeck_roles', 
        Value: regData.roles
      },
      {
        Name: 'custom:org', 
        Value: regData.company
      },
      {
        Name: 'custom:registration_src', 
        Value: 'ToD'
      }
    ]
  } as AdminCreateUserRequest
    
  const createResponse = await createUser(params)

  return {
    statusCode: 200,
    body: JSON.stringify(createResponse),
  };
}