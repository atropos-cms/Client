import ApolloClient from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { Folder, File } from '~/typescript/graphql'

interface downloadOptions {
  object: File | Folder
}

export async function downloadFileOrFolder (client: ApolloClient<NormalizedCacheObject>, { object }: downloadOptions) {
  const mutation = (object.__typename === 'Folder')
    ? require('~/graphql/mutations/downloadFolder.graphql')
    : require('~/graphql/mutations/downloadFile.graphql')

  const { data } = await client.mutate({
    mutation,
    variables: {
      id: object.id
    }
  })

  location.href = (object.__typename === 'Folder')
    ? (data.downloadFolder.downloadLink)
    : (data.downloadFile.downloadLink)
}
