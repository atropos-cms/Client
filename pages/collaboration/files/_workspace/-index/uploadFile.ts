import ApolloClient from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'

interface uploadOptions {
  file: File,
  workspaceId: Number
  parentId: Number | null
}

export async function uploadFileOrFolder (client: ApolloClient<NormalizedCacheObject>, { file, workspaceId, parentId }: uploadOptions) {
  if (!(_validate(file))) {
    return
  }

  await client.mutate({
    mutation: require('~/graphql/mutations/createFile.graphql'),
    variables: {
      file,
      data: {
        workspace: { connect: workspaceId },
        parent: { connect: parentId }
      }
    },
    context: {
      hasUpload: true
    }
  })
}

const _validate = (file) => {
  // Check for maximal filesize
  if (file.size > 500 * 1000 * 1000) {
    console.log('error')

    return false
  }

  return true
}
