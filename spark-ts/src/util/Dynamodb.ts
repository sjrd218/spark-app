import {DocumentClient} from 'aws-sdk/clients/dynamodb'

export interface TypedScanOutput<T> {
    Items?: T[];
    Count?: DocumentClient.Integer
    ScannedCount?: DocumentClient.Integer
    LastEvaluatedKey?: DocumentClient.Key
    ConsumedCapacity?: DocumentClient.ConsumedCapacity;
  }


interface TypedItemOutput<T> {
    Item?: T;
    ConsumedCapacity?: DocumentClient.ConsumedCapacity;
}

interface IFunctionConfig {
    SigningKey: string
    SigningPassword: string
}

export const getTyped = <TReturn>(doc: DocumentClient, params: DocumentClient.GetItemInput) => {
    return doc.get(params).promise() as Promise<TypedItemOutput<TReturn>>
}

export const scanTyped = <TReturn>(doc: DocumentClient, params: DocumentClient.ScanInput) => {
    return doc.scan(params).promise() as Promise<TypedScanOutput<TReturn>>
}