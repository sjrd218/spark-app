import { Callback, Context, Handler } from "aws-lambda"

import {AwsRegion, ServiceConfig} from '../Constants'

import {LambdaSsmLoader} from './ParameterStore'
import { Service } from "aws-sdk";


export interface ISparkContext extends Context {
    sparkFunctionName: () => string
}

type SparkHandler<TConfig, TEvent = any, TResult = any> = (
    event: TEvent,
    config: TConfig & typeof ServiceConfig,
    context: ISparkContext,
) => Promise<TResult>;


export function SparkHandler<TConfig, TEvent = any, TReturn = any>(handler: SparkHandler<TConfig, TEvent, TReturn>): Handler<TEvent, TReturn> {
    return async (event: TEvent, context: Context, callback: Callback<TReturn>): Promise<TReturn> => {
        const sparkContext: ISparkContext = {
            sparkFunctionName: () => {return context.functionName.split('-').slice(2).join('-')},
            ...context
        }

        const ssmLoader = LambdaSsmLoader.Single({
            region: AwsRegion,
            stage: ServiceConfig.Stage,
            service: 'spark',
            lambda: sparkContext.sparkFunctionName(),
            ttl: 60000
        })

        const ssmConfig = await ssmLoader.GetFromPath<TConfig>()

        const config = {...ServiceConfig, ...ssmConfig}

        return await handler(event, config, sparkContext)
    }
}