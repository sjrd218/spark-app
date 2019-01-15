import * as AWS from 'aws-sdk'

export const AwsRegion = process.env.AWS_REGION!

/**
 * TODO: Change this be returned by a method that throws if undefined
 */
export const ServiceConfig = {
    Stage: process.env.RUNDECK_STAGE!,
    RepoBucket: process.env.RUNDECK_REPO_BUCKET!,
    SignQueue: process.env.RUNDECK_SIGN_QUEUE!,
    GenerateManifestQueue: process.env.RUNDECK_MANIFEST_QUEUE!,
    ArtifactTable: process.env.RUNDECK_ARTIFACT_TABLE!,
    CognitoUserPool: process.env.COGNITO_USER_POOL!,
}