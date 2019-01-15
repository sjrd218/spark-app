import {LambdaSsmLoader} from './util/ParameterStore'

interface Config {
    Foo: string
}

async function main() {
    const loader = new LambdaSsmLoader({
        region: 'us-west-2',
        stage: 'stage',
        service: 'spark',
        lambda: 'context-test'})
    const config = await loader.GetFromPath<Config>()
    console.log(config)
}

main().catch(e => console.error(e))