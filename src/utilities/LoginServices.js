import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';
// import Config from '@/config'

class SparkLoginActions {
  poolData = {
    UserPoolId: 'us-west-2_XJOzDBdDX',
    ClientId: '32dsgkoen5vfi8kf7u2ub2h6p6'
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
      var rundeckRoles = {
        // Name: 'rundeck_roles',
        Name: 'custom:rundeck_roles',
        Value: 'admin,user'
      };
      var attributeRoles = new CognitoUserAttribute(rundeckRoles);

      attributeList.push(attributeEmail);
      attributeList.push(attributeRoles);

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
    return new Promise((resolve, reject) => {
      var userPool = new CognitoUserPool(this.poolData);
      var userData = {
        Username: email,
        Pool: userPool
      };
      var cognitoUser = new CognitoUser(userData);
      cognitoUser.forgotPassword({
        onSuccess: function () {
          resolve(true)
        },
        onFailure: function (err) {
          reject(err.message);
        }
      })
    });
  }

  // eslint-disable-next-line
  resetPassword(email, password, passwordConfirmed, verificationCode) {
    return new Promise((resolve, reject) => {
      var userPool = new CognitoUserPool(this.poolData);
      var userData = {
        Username: email,
        Pool: userPool
      };
      var cognitoUser = new CognitoUser(userData);
      cognitoUser.confirmPassword(verificationCode, password, {
        onSuccess: function () {
          resolve(true)
        },
        onFailure: function (err) {
          reject(err.message);
        }
      });
    });
  }
}

export const SparkService = new SparkLoginActions()
