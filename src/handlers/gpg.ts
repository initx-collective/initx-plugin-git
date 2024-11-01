import { c, gpgList, inquirer, log, where } from '@initx-plugin/utils'

export async function gpgHandle(switchFlag?: string) {
  if (!switchFlag || !~['true', 'false'].indexOf(switchFlag)) {
    log.error('Please enter true or false')
    return
  }

  let gpgPath: string

  try {
    gpgPath = where('gpg')
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (e) {
    log.error('GPG is not installed')
    return
  }

  if (switchFlag === 'true') {
    await c('git', ['config', '--global', 'gpg.program', gpgPath])
    await c('git', ['config', '--global', 'commit.gpgsign', switchFlag])
    log.success(`GPG signing enabled, gpg program set to "${gpgPath}"`)
    return
  }

  await c('git', ['config', '--global', '--unset', 'gpg.program'])
  await c('git', ['config', '--global', '--unset', 'commit.gpgsign'])
  log.success('GPG signing disabled')
}

export async function gpgKeyHandle() {
  const keys = await gpgList()

  if (keys.length === 0) {
    log.error('No GPG keys found')
    return
  }

  const key = keys.length === 1
    ? keys[0].key
    : await inquirer.select('Select a GPG key', keys.map(
      item => ({
        name: `${item.key} - ${item.name}<${item.email}>`,
        value: item.key
      })
    ))

  await setGpgKey(key)
}

async function setGpgKey(key: string) {
  await c('git', ['config', '--global', 'user.signingkey', key])
  log.success('GPG key successfully set')
}
