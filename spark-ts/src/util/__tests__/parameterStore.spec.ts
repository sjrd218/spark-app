import '@/test/index'

import 'jest'

const paramResponse = [
    {
        Name: '/spark/stage/test/Signing',
        Value: 'foo'
    },
    {
        Name: '/spark/stage/test/Nested/Foo',
        Value: 'bar'
    }
]

class SsmMock {
    getParametersByPath = jest.fn( () => ({
        promise: async () => ({
            Parameters: paramResponse
        })
    }))
}

jest.mock('aws-sdk', () => ({
    __esModule: true,
    SSM: SsmMock
}))

import {LambdaSsmLoader} from '../ParameterStore'

describe('LambdaSsmLoader', async () => {
    it('Loads Parameters', async () => {
        const loader = new LambdaSsmLoader({
            region: 'us-west-2',
            service: 'spark',
            stage: 'stage',
            lambda: 'test'
        })

        const config = await loader.GetFromPath()
        expect(config).toEqual({
            Signing: 'foo',
            Nested: { Foo: 'bar' }
        })
    })
})