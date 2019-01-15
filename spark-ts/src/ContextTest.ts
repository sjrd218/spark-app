import {SparkHandler} from './util/SparkContext'
import { SQSEvent } from 'aws-lambda';

interface ISsmConfig {
    SigningPassword: string
}

export default SparkHandler<ISsmConfig>(async (event: SQSEvent, config, context) => {
    console.log(config.SigningPassword)
    console.log(context.sparkFunctionName())
})
