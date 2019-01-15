import * as AWS from 'aws-sdk'
import { S3Event, SNSMessage } from 'aws-lambda';

import {AwsRegion, ServiceConfig} from './Constants'

const s3 = new AWS.S3()
const lambda = new AWS.Lambda({region: AwsRegion})
var sqs = new AWS.SQS({region : AwsRegion});

export default async (event: AWSLambda.SQSEvent) => {
    //console.log(JSON.stringify(event))
    try {
        const snsEvt = JSON.parse(event.Records[0].body) as SNSMessage
        var s3Evt = JSON.parse(snsEvt.Message) as S3Event
        const s3Info = s3Evt.Records[0].s3

        console.log("processing file: " + s3Info.object.key)
        const s3MetaFile = {
                Bucket: s3Info.bucket.name, 
                Key: s3Info.object.key
            }
        const meta = await s3.getObject(s3MetaFile).promise()
    
        const artifact = JSON.parse(meta.Body!.toString())
        console.log("artifact id: " + artifact.id)
        console.log("artifact name: " + artifact.name)
        console.log("artifact author: " + artifact.author)
        console.log("artifact authorId: " + artifact.authorId)
        console.log("artifact releaseDate: " + artifact.releaseDate)
        console.log("artifact binaryLink: " + artifact.binaryLink)
        console.log("artifact tags: " + artifact.releaseDate)
        console.log("artifact releaseDate: " + artifact.releaseDate)
        
        //disallow license change
        //disallow name change
        
                
        const valid = true
        if(valid) {
            const sqsparams = {
                MessageBody: JSON.stringify(s3MetaFile),
                QueueUrl: ServiceConfig.SignQueue!
            }
            const qrsp = await sqs.sendMessage(sqsparams).promise()
            if(artifact.binaryLink == undefined) {
                console.log("sending msg to sign binary")
                const s3BinFile = {
                    Bucket: s3Info.bucket.name, 
                    Key: s3Info.object.key.replace("/meta/","/binary/")
                }
                console.log(JSON.stringify(s3BinFile))
                const sqsBinparams = {
                    MessageBody: JSON.stringify(s3BinFile),
                    QueueUrl: ServiceConfig.SignQueue!
                }
                const qrspbin = await sqs.sendMessage(sqsBinparams).promise()
                console.log(JSON.stringify(qrspbin))
            }
            
            // const lparams = {
            //     FunctionName: 'repository-sign-and-save',
            //     InvocationType: 'RequestResponse',
            //     Payload: JSON.stringify(s3MetaFile)
                
            // }
            // const lambdaResponse = await invokeLambda(lparams)
            // console.log("response from sign and save: " + JSON.stringify(lambdaResponse))
        }
    
        const response = {
            statusCode: 200,
            body: JSON.stringify('valid')
        };
        return response;
    } catch(err) {
        console.error(err)
        throw err
    }
}