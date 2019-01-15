export interface IManifestArtifact {
    id: string
    name: string
    description: string
    organization: string
    artifactType: string
    support: string
    currentVersion: string
    rundeckCompatibility: string
    targetHostCompatibility: string
    binaryLink: string
    lastRelease: string
    tags: string[]
    providesServices: string[]
    oldVersions: string[]
    rating: string
    installs: number
}