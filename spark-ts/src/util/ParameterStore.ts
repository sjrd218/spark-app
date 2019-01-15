import {SSM} from 'aws-sdk'


export interface ILambdaSsmLoaderConfig {
    region: string
    stage: string
    service: string
    lambda?: string
    /**Cache ttl */
    ttl?: number
}

export class LambdaSsmLoader {
    ssm: SSM

    cache: {[index: string]: {created: number, config: any} | undefined} = {}

    private static singleton: LambdaSsmLoader

    constructor(readonly config: ILambdaSsmLoaderConfig) {
        this.ssm = new SSM({region: config.region})
    }

    static Single(config: ILambdaSsmLoaderConfig) {
        if (!this.singleton)
            this.singleton = new LambdaSsmLoader(config)
        return this.singleton
    }

    async GetFromPath<T>(path = '') {
        const {service, stage, lambda} = this.config

        const reqPath = '/' + [
            service,
            stage,
            lambda,
            path,
        ].filter(Boolean).join('/') + '/'

        const cache = this.cache[reqPath]
        if (cache && !this.cacheExpired(cache))
            return cache.config

        let params: SSM.Parameter[] = []

        let nextToken: string | undefined
        do {
            const resp = await this.ssm.getParametersByPath({
                Path: reqPath,
                Recursive: true,
                WithDecryption: true,
                NextToken: nextToken,
            }).promise()

            if (resp.Parameters)
                params = params.concat(resp.Parameters)

            nextToken = resp.NextToken
        } while(nextToken != undefined)

        const config = {} as any

        params.forEach(param => {
            let cursor = config

            const parts = param.Name!.split(reqPath)[1].split('/')
            const last = parts.pop()!

            parts.forEach(part => {
                if(cursor[part] == null)
                    cursor[part] = {}
                cursor = cursor[part]
            })
            cursor[last] = param.Value
        })

        this.cache[reqPath] = {created: Date.now(), config}

        return config as T
    }

    cacheExpired(cache: {created: number}) {
        const elapsed = Date.now() - cache.created

        const ttl = this.config.ttl || elapsed

        if (elapsed - ttl > 0)
            return true
        else
            return false
    }
}