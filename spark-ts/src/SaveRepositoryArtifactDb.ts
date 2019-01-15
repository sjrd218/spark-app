import * as AWS from 'aws-sdk'

import { SNSMessage, S3Event, SQSEvent, Context } from 'aws-lambda';

import {AwsRegion, ServiceConfig} from './Constants'

import { IArtifact } from './interfaces';
import {getTyped} from './util/Dynamodb'

const s3 = new AWS.S3()
const doc = new AWS.DynamoDB.DocumentClient({region: AwsRegion})
var sqs = new AWS.SQS({region : AwsRegion})

export default async (event: SQSEvent, context: Context) => {
  //get artifact from s3
 
  const snsEvt = JSON.parse(event.Records[0].body) as SNSMessage
  var s3Evt = JSON.parse(snsEvt.Message) as S3Event
  const s3Info = s3Evt.Records[0].s3

  console.log("processing file: " + s3Info.object.key)
  if(s3Info.object.key.endsWith(".sig")) {
    console.log('Ignoring signature file...')
    return
  }
  const s3MetaFile = {
      Bucket: s3Info.bucket.name,
      Key: s3Info.object.key
  }

  const meta = await s3.getObject(s3MetaFile).promise()
  const artifact = JSON.parse(meta.Body!.toString()) as IArtifact
  //find artifact record
  var scanparams = { TableName: ServiceConfig.ArtifactTable!, Key: {id: artifact.id } };
  const artifactRec = await getTyped<IArtifact>(doc, scanparams)

  if(artifactRec.Item) {

    console.log("old rec")
    console.log(JSON.stringify(artifactRec.Item))
    //if record update it
    // var params = { TableName: ServiceConfig.ArtifactTable!, Key: { id:artifact.id } } as DocumentClient.UpdateItemInput
    var oldVersions = artifactRec.Item.oldVersions ? artifactRec.Item.oldVersions : [] as string[]
    const versionSet = new Set(oldVersions)
    versionSet.add(artifactRec.Item.version)
    
    artifact.oldVersions = Array.from(versionSet)
    artifact.id = artifactRec.Item.id

    // params.UpdateExpression         = "SET #d = :desc, #a = :auth, #o = :org, #rd = :rDate, #v = :ver, #ov = :oldVer, #rc = :rdc, #thc = :thc, #s = :s, #t = :tags, #ps = :ps, #tpd = :tpd, #sl = :slink "
    // params.ExpressionAttributeNames = { "#d":"description","#a":"author","#o":"organization","#rd":"releaseDate",
    //                                     "#v":"version", "#ov":"oldVersions", "#rc":"rundeckCompatibility",
    //                                     "#thc":"targetHostCompatibility","#s":"support", "#t":"tags",
    //                                     "#ps":"providesServices","#tpd":"thirdPartyDependencies", "#sl":"sourceLink"
    //                                     }
    // params.ExpressionAttributeValues = { ":desc": artifact.description, ":auth":artifact.author, ":org": artifact.organization,
    //                                       ":rDate":artifact.releaseDate,":ver":artifact.version,":oldVer":oldVersions,":rdc":artifact.rundeckCompatibility,
    //                                       ":thc": artifact.targetHostCompatibility, ":s": artifact.support, ":tags": artifact.tags, ":ps":artifact.providesServices,
    //                                       ":tpd": artifact.thirdPartyDependencies,":slink": artifact.sourceLink
    //                                     }
    // const updateResp = await updateArtifactRecord(params)
  } 
    //if no record create one
  const params = { TableName: ServiceConfig.ArtifactTable!, Item: artifact };
  const createResp = await doc.put(params).promise()
 
  const sqsparams = {
      MessageBody: JSON.stringify(s3MetaFile),
      QueueUrl: ServiceConfig.GenerateManifestQueue!
  }
  const qrsp = await sqs.sendMessage(sqsparams).promise()

}