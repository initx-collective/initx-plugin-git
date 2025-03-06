import { type InitxContext, type InitxMatcherRules, InitxPlugin } from '@initx-plugin/core'

import { gpgHandle, gpgKeyHandle } from './handlers/gpg'
import { repositoryHandle } from './handlers/repository'
import { userHandle } from './handlers/user'
import { GitMatcher } from './types'
import { isEmail } from './utils'

export default class GitPlugin extends InitxPlugin {
  rules: InitxMatcherRules = {
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
      description: 'Set user name and email for git configuration',
      verify(_, ...values) {
        if (values.length !== 2) {
          return false
        }

        return values.some(isEmail)
      }
    },

    [GitMatcher.Gpg]: {
      matching: 'gpg',
      description: 'Enable or disable GPG signing for git commits',
      optional: ['true', 'false']
    },

    [GitMatcher.GpgKey]: {
      matching: 'gpg',
      description: 'Set GPG key for git commits',
      optional: [undefined, /^[A-Z0-9]{40}$/]
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
