import * as Crypto from 'crypto'

import * as S3 from 'aws-sdk/clients/s3'

import { SparkHandler } from "./util/SparkContext"
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda"

import {plainToClass} from 'class-transformer'
import {validate} from 'class-validator'

import { CreateArtifactRequest } from "./models/CreateArtifactRequest"

const s3 = new S3()

export default SparkHandler(
    async (event: APIGatewayEvent, config): Promise<APIGatewayProxyResult> => {
        console.log(event)
        const req = JSON.parse(event.body!) as {}
        const artifact = plainToClass(CreateArtifactRequest, req)

        const errors = await validate(artifact)

        const IDHash = Crypto.createHash('sha256').update(artifact.name).digest('base64')

        const s3KeyBase = `${IDHash}-${Date.now()}`

        // TODO: Authorize user for plugin

        const params: S3.PutObjectRequest = {
            Bucket: config.RepoBucket,
            Key: `stage/binary/${s3KeyBase}`
        }

        // TODO: Create our own signer so we can include Content-Length header
        const signedRequest = await s3.getSignedUrl('putObject', params)

        if (errors)
            return {statusCode: 400, body: JSON.stringify(errors) } as APIGatewayProxyResult
        else 
            return {statusCode: 200, body: ''}
    }
)