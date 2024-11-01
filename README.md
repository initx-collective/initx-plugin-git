<h1 align="center">initx ⚙️</h1>

<p align="center"><code>initx</code> A more convenient scripting engine</p>

<pre align="center">npx <b>initx &lt;something&gt;</b></pre>

## @initx-plugin/git

Git plugin for `initx`

## Usage

```bash
npm install @initx-plugin/git -g
```

### Git Repository

Create a new repository or modify the remote repository address in the current directory

```bash
npx initx git@github.com:user/repository.git
```

### Git Branch

Specify a branch name

```bash
npx initx git@github.com:user/repository.git main
```

### Git User

Set git username and email

```bash
npx initx user mail@example.com your_name
```

### Git GPG

```bash
# npx initx gpg [true|false]
npx initx gpg true
```

Select `Enable or disable GPG signing for git commits`, Set git commit signature

If true, includes setting the Git GPG Key

### Git GPG Key

```bash
npx initx gpg
```

Select `Set GPG key for git commits`

## Documentation

[initx](https://github.com/initx-collective/initx)
