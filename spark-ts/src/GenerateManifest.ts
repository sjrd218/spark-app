import * as AWS from 'aws-sdk'

import * as _ from 'lodash'
import {scanTyped} from './util/Dynamodb'
import { SQSEvent } from 'aws-lambda'
import { IArtifact, IManifestArtifact } from './interfaces'
import { SparkHandler } from './util/SparkContext'

const doc = new AWS.DynamoDB.DocumentClient()
const s3 = new AWS.S3()

const manifestAttributes: Array<keyof IManifestArtifact> = [
    "id","name","description","organization","artifactType","support","currentVersion","rundeckCompatibility",
    "targetHostCompatibility","binaryLink","lastRelease","tags","providesServices","oldVersions","rating","installs"
]

const artifactAttributes: Array<keyof IArtifact> = [
    "id","name","description","organization","artifactType","support","rundeckCompatibility",
    "targetHostCompatibility","binaryLink","tags","providesServices","oldVersions"
]

export const pruneArtifact = (artifact: IArtifact) => {
  const pruned = _.pick(artifact, artifactAttributes)
  const manifestArtifact: IManifestArtifact = {
      ...pruned,
      currentVersion: artifact.version,
      lastRelease: '',
      rating: 'Super!',
      installs: 0,
  }
  return manifestArtifact
}

export default SparkHandler(async (event: SQSEvent, config) => {
    let params = { TableName: config.ArtifactTable, FilterExpression: 'excluded <> :excluded', ExpressionAttributeValues: {':excluded':true} };

    let artifacts: IManifestArtifact[]

    while(true) {
        const dbartifacts = await scanTyped<IArtifact>(doc, params)
        artifacts = dbartifacts.Items!.map(pruneArtifact)
        /** Documented method for detecting end of scan */
        if(dbartifacts.LastEvaluatedKey == undefined)
            break
    }

    let manifest = {
        entries: artifacts
    }

    const s3response = await s3.putObject({
        Bucket: config.RepoBucket,
        Key: `oss/manifest.json`,
        ContentType: 'application/json',
        Body: JSON.stringify(manifest),
    }).promise()

    console.log(s3response)
})