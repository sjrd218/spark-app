import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';
// import Config from '@/config'

class SparkLoginActions {
  poolData = {
    UserPoolId: 'us-east-1_SbetwQtB6',
    ClientId: '7t8avvqkdo26b8h2ohp63bkpcj'
  };

  login(email, password) {
    return new Promise((resolve, reject) => {
      var authenticationData = {
        Username: email,
        Password: password,
      };

      var authenticationDetails = new AuthenticationDetails(authenticationData);

      var userPool = new CognitoUserPool(this.poolData);
      var userData = {
        Username: email,
        Pool: userPool
      };
      var cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function () {
          resolve(userPool.getCurrentUser())
        },
        onFailure: function (err) {
          reject(err)
        }
      });
    })



  }

  logout() {
    return new Promise(resolve => {
      var userPool = new CognitoUserPool(this.poolData);
      userPool.getCurrentUser().signOut()
      resolve()
    });
  }

  fireSetCurrentUserEvent() {
    return new Promise((resolve, reject) => {
      var userPool = new CognitoUserPool(this.poolData);
      if (userPool.getCurrentUser()) {
        resolve(userPool.getCurrentUser())
      }
      reject()
    });


  }

  register(password, email) {
    return new Promise((resolve, reject) => {
      var userPool = new CognitoUserPool(this.poolData);

      var attributeList = [];

      var dataEmail = {
        Name: 'email',
        Value: email
      };
      var attributeEmail = new CognitoUserAttribute(dataEmail);

      attributeList.push(attributeEmail);

      userPool.signUp(email, password, attributeList, null, function (err) {
        if (err) {
          reject(err.message)
        }
        resolve(email)
      });
    })
  }

  verify(email, verificationCode) {
    return new Promise((resolve, reject) => {
      var userPool = new CognitoUserPool(this.poolData);
      var userData = {
        Username: email,
        Pool: userPool
      };

      var cognitoUser = new CognitoUser(userData);
      cognitoUser.confirmRegistration(verificationCode, true, function (err) {
        if (err) {
          reject(err.message)
        }
        resolve(true)
      });
    });
  }

  // eslint-disable-next-line
  resetPasswordRequest(email) {
    return new Promise((resolve) => {
      resolve(true)
    });
  }

  // eslint-disable-next-line
  resetPassword(password, passwordConfirmed, verificationCode) {
    return new Promise((resolve) => {
      resolve(true)
    });
  }
}

export const SparkService = new SparkLoginActions()
