import * as fs from 'fs'
import * as openpgp from 'openpgp'
import * as util from 'util'

import * as AWS from 'aws-sdk'
import {S3} from 'aws-sdk'
import { SQSEvent } from 'aws-lambda'

import {SparkHandler} from '@/util/SparkContext'

const readFileAsync = util.promisify(fs.readFile)
const s3 = new AWS.S3()

interface Config {
  SigningPassphrase: string
  SigningKey: string
}

export default SparkHandler<Config>(async (event: SQSEvent, config, context) => {
  /** Process all records as there is no gaurentee of only 1 */
  for(const record of event.Records) {
    const s3File = JSON.parse(record.body)
    console.log(s3File)
    const istext = s3File.Key.indexOf("staging/meta") != -1
    console.log("istext: " + istext)

  
    const fileToSign = await s3.getObject(s3File).promise()
    
    const privKeysResp = (await loadKeys(config.SigningKey))
    const privKeys = await Promise.all(privKeysResp.keys.map(async k => {
      await k.decrypt(config.SigningPassphrase)
      return k
    }))

    const sig = await signBlob(fileToSign.Body as Buffer, privKeys)

    var fname = s3File.Key.replace("staging/","")

    let putParams = {
      Bucket: config.RepoBucket,
      Key: `oss/signed/${fname}.sig`,
      ContentType: 'text/plain',
      Body: sig.signature
    } as S3.PutObjectRequest

    await s3.putObject(putParams).promise()

    let copyParams = {
      Bucket: config.RepoBucket,
      CopySource: `${s3File.Bucket}/${s3File.Key}`,
      Key: `oss/signed/${fname}`,
      ContentType: istext ? 'application/json' : 'application/octet-stream',
    } as S3.CopyObjectRequest

    console.log("copying file to final destination: " + fname)
    console.log(copyParams)
    await s3.copyObject(copyParams).promise()
  }
})

export async function loadKeysFromFile(file: string) {
  const fileContents = await readFileAsync(file)
  return await loadKeys(fileContents.toString())
}

export async function loadKeys(armor: string) {
  return await openpgp.key.readArmored(armor)
}

export async function signFile(file: string, keys: openpgp.key.Key[]) {
  const bytes = await readFileAsync(file)
  return await signBlob(bytes, keys)
}

export async function signBlob(bytes: Uint8Array, keys: openpgp.key.Key[]) {
  var options = {
      message: openpgp.message.fromBinary(bytes),
      privateKeys: keys,
      detached: true
  };
  return await openpgp.sign(options)
}