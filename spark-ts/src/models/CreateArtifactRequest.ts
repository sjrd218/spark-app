import {Length, IsIn, IsString, IsNotEmpty, MaxLength} from 'class-validator'

export enum ArtifactType {
    JavaPlugin = 'java-plugin',
    ScriptPlugin = 'script-plugin',
}

export class CreateArtifactRequest {
    @Length(8, 128)
    @IsString()
    name!: string

    @MaxLength(128)
    version!: string

    @IsIn(Object.values(ArtifactType))
    artifactType!: ArtifactType

    @IsString()
    author!: string

    @IsString()
    authorId!: string

    @IsString()
    binaryLink!: string

    @IsString()
    description!: string

    @IsString()
    license!: string

    @IsString()
    organization!: string

    @IsString()
    originalFilename!: string

    @IsString({each: true})
    providesServices!: string[]

    @IsString()
    releaseDate!: string

    @IsString()
    rundeckCompatibility!: string

    @IsString()
    sourceLink!: string

    @IsString()
    support!: string

    @IsString({each: true})
    @Length(3,32, {each: true})
    tags!: string[]

    @IsString()
    targetHostCompatibility!: string

    @IsString()
    thirdPartyDependencies!: string[]
}