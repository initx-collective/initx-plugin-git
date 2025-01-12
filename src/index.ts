import { type InitxContext, InitxPlugin } from '@initx-plugin/core'

import { gpgHandle, gpgKeyHandle } from './handlers/gpg'
import { repositoryHandle } from './handlers/repository'
import { userHandle } from './handlers/user'
import { GitMatcher } from './types'

export default class GitPlugin extends InitxPlugin {
  rules = {
    [GitMatcher.Init]: {
      matching: [
        /^(https?|git):\/\/.*\.git$/,
        /^(git@.*\.git)$/,
        /^ssh:\/\/git@.*\.git$/
      ],
      description: 'Initialize a new git repository'
    },

    [GitMatcher.User]: {
      matching: 'user',
      description: 'Set user name and email for git configuration'
    },

    [GitMatcher.Gpg]: {
      matching: 'gpg',
      description: 'Enable or disable GPG signing for git commits'
    },

    [GitMatcher.GpgKey]: {
      matching: 'gpg',
      description: 'Set GPG key for git commits'
    }
  }

  async handle({ key }: InitxContext, type: GitMatcher, ...others: string[]) {
    switch (type) {
      case GitMatcher.Init: {
        await repositoryHandle(key, ...others)
        break
      }

      case GitMatcher.User: {
        await userHandle(others)
        break
      }

      case GitMatcher.Gpg: {
        const [switchFlag] = others
        await gpgHandle(switchFlag)

        if (switchFlag === 'true') {
          await gpgKeyHandle()
        }

        break
      }

      case GitMatcher.GpgKey: {
        await gpgKeyHandle()
        break
      }
    }
  }
}
