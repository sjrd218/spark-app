/**
 * Common entry to setup sourcemaps and long stack traces.
 * Could be done a different way if we really want to split the code for each function.
 */
import 'source-map-support/register'

// Use bluebird for long stack traces
import * as Promise from 'bluebird'
Promise.config({
    longStackTraces: true
})

global.Promise = Promise

export {default as CheckArtifact} from './CheckArtifact'
export {default as SignAndSave} from './SignAndSave'
export {default as SaveArtifactDb} from './SaveRepositoryArtifactDb'
export {default as GenerateManifest} from './GenerateManifest'
export {default as AdminCreateSparkUser} from './AdminCreateSparkUser'
export {default as AdminAddCognitoApp} from './AdminAddCognitoApp'
export {default as ContextTest} from './ContextTest'



export {default as PostArtifact} from './PostArtifact'