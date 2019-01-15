export default interface IArtifact {
    id: string
    artifactType: 'java-plugin' | 'script-plugin'
    author: string
    authorId: string
    binaryLink: string
    description: string
    license: string
    name: string
    organization: string
    originalFilename: string
    providesServices: string[]
    releaseDate: string
    rundeckCompatibility: string
    sourceLink: string
    support: string
    tags: string[]
    targetHostCompatibility: string
    thirdPartyDependencies: string[]
    version: string
    oldVersions: string[]
}
