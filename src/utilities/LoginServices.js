import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';
import Config from '@/config'
import {
  EventBus,
  Events
} from './vueEventBus';

class SparkLoginActions {
  poolData = {
    UserPoolId: 'us-east-1_SbetwQtB6',
    ClientId: '7t8avvqkdo26b8h2ohp63bkpcj'
  };

  login(username, password) {
    console.log('hello')
    var authenticationData = {
      Username: username,
      Password: password,
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);

    var userPool = new CognitoUserPool(this.poolData);
    var userData = {
      Username: username,
      Pool: userPool
    };
    var cognitoUser = new CognitoUser(userData);
    console.log('cognitoUser', cognitoUser)
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        //var accessToken = result.getAccessToken().getJwtToken();
        //console.log("access token " + accessToken)
        /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
        //var idToken = result.idToken.jwtToken;
        console.log("id token " + idToken)
        EventBus.$emit(Events.CURRENT_USER, userPool.getCurrentUser())
      },

      onFailure: function (err) {
        EventBus.$emit(Events.LOGIN_FAILURE, err.message || "Login Failure")
      },

    });

  }

  logout() {
    var userPool = new CognitoUserPool(this.poolData);
    userPool.getCurrentUser().signOut()
    EventBus.$emit(Events.CURRENT_USER, null)
  }

  fireSetCurrentUserEvent() {
    var userPool = new CognitoUserPool(this.poolData);
    EventBus.$emit(Events.CURRENT_USER, userPool.getCurrentUser())
  }

  register(un, pwd, email) {
    var userPool = new CognitoUserPool(this.poolData);

    var attributeList = [];

    var dataEmail = {
      Name: 'email',
      Value: email
    };

    // var dataPhoneNumber = {
    //     Name : 'phone_number',
    //     Value : phone
    // };
    var attributeEmail = new CognitoUserAttribute(dataEmail);
    //var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);

    attributeList.push(attributeEmail);
    //  attributeList.push(attributePhoneNumber);

    userPool.signUp(un, pwd, attributeList, null, function (err, result) {
      if (err) {
        EventBus.$emit(Events.REGISTRATION_FAILURE, err.message || JSON.stringify(err))
        return;
      }
      EventBus.$emit(Events.REGISTRATION_COMPLETE, true)
    });
  }

  verify(username, verificationCode) {
    var userPool = new CognitoUserPool(this.poolData);
    var userData = {
      Username: username,
      Pool: userPool
    };

    var cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(verificationCode, true, function (err, result) {
      if (err) {
        EventBus.$emit(Events.REGISTRATION_FAILURE, err.message || JSON.stringify(err))
        return;
      }
      EventBus.$emit(Events.VERIFICATION_COMPLETE, true)
    });
  }
}

export const SparkLogin = new SparkLoginActions()
