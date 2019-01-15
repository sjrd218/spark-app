import * as FS from 'fs'
import * as Util from 'util'

import * as openpgp from 'openpgp'
import 'jest'

// import '@/test'
import {loadKeys, signBlob, loadKeysFromFile} from '@/SignAndSave'

const readFileAsync = Util.promisify(FS.readFile)

describe('loadKeys', async () => {
    it('Loads and returns keys', async () => {
        const keysRes = await loadKeysFromFile('./lib/test/private.key')

        const keys = keysRes.keys.map(k => {k.decrypt('Scoobydoo'); return k})

        expect(keys[0].getUserIds()).toEqual(['ProTip, Spark Test'])
    })
})

describe('signBlob', async () => {
    it('Sings verifiable blob', async () => {
        const MESSAGE = 'SIGN ME!!!'

        const keysRes = await loadKeysFromFile('./lib/test/private.key')

        const keys = keysRes.keys.map(k => {k.decrypt('Scoobydoo'); return k})

        const publicKeys = await loadKeysFromFile('./lib/test/public.key')

        const sig = await signBlob(Buffer.from(MESSAGE), keys)

        const verify = await openpgp.verify({
            // @ts-ignore
            message: await openpgp.cleartext.fromText(MESSAGE),
            publicKeys: publicKeys.keys,
            // @ts-ignore
            signature: await openpgp.signature.readArmored(sig.signature)
        })

        expect(verify.signatures[0].valid).toBe(true)
    })
})