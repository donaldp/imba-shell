# Contribution Guide

## Bug Reports

Imba Shell is a new developer tool for Imba and we're always looking for ways to improve it. There are several ways you can help with improvements. One of the easiest ways to help is to report bugs.

You can report a bug by creating under [Github Issues](https://github.com/donaldp/imba-shell/issues/new/choose).

## Support Questions

Imba-Shell's GitHub issue trackers are not intended to provide Imba-shell help or support. Instead, use [Github Discussions](https://github.com/donaldp/imba-shell/discussions)

## Submitting a Pull Request

When contributing to Imba-Shell, first discuss the change you wish to make via [Github Discussions](https://github.com/donaldp/imba-shell/discussions) with the maintainers.

### Process

1. Ensure your PR is up to date with the latest changes of the `develop` branch.

   > Note: you must always branch off the `develop` branch and your PR must be created against the `develop` branch.

2. Ensure you have read and understood the [Commit Guidelines](#git-commit-message-convention) and the [Code of Conduct](#code-of-conduct).

3. Ensure the [documentation](https://github.com/donaldp/imba-shell#readme) has been updated to reflect the latest changes you have made and the PR description includes a link to the PR of the documentation changes.

4. You may merge the Pull Request once you have the sign-off of one of the core mainteners, or if you do not have permission to do that, you may request the second reviewer merge it for you.

### Git Commit Message Convention

> This is adapted from [Angular's commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular).

Using conventional commit messages, we can automate the process of generating the CHANGELOG file. All commits messages will automatically be validated against the following regex.

``` js
/^(revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|ci|chore|types|build|improvement)((.+))?: .{1,50}/
```

#### Commit Message Format
A commit message consists of a **header**, **body** and **footer**. The header has a **type**, **scope** and **subject**:

> The **scope** is optional

```
feat(router): add support for prefix

Prefix makes it easier to append a path to a group of routes
```

1. `feat` is type.
2. `router` is scope and is optional
3. `add support for prefix` is the subject
4. The **body** is followed by a blank line.
5. The optional **footer** can be added after the body, followed by a blank line.

#### Types
Only one type can be used at a time and only following types are allowed.

- feat
- fix
- docs
- style
- refactor
- perf
- test
- workflow
- ci
- chore
- types
- build

If a type is `feat`, `fix` or `perf`, then the commit will appear in the CHANGELOG.md file. However if there is any BREAKING CHANGE, the commit will always appear in the changelog.

##### Revert
If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>`., where the hash is the SHA of the commit being reverted.

#### Scope
The scope could be anything specifying place of the commit change. For example: `router`, `view`, `querybuilder`, `database`, `model` and so on.

#### Subject
The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes".
- don't capitalize first letter
- no dot (.) at the end

#### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

## Security Vulnerabilities

If you discover a security vulnerability within Imba-Shell, please send an email to Donald Pakkies at donaldpakkies@gmail.com. All security vulnerabilities will be promptly addressed.

## Coding Style

Please see [imba.io](https://imba.io/language/basic-syntax) for the basic syntax of Imba.

## Code of Conduct

### Our Pledge

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone, regardless of age, body
size, visible or invisible disability, ethnicity, sex characteristics, gender
identity and expression, level of experience, education, socio-economic status,
nationality, personal appearance, race, caste, color, religion, or sexual identity
and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming,
diverse, inclusive, and healthy community.

### Our Standards

Examples of behavior that contributes to a positive environment for our
community include:

* Demonstrating empathy and kindness toward other people
* Being respectful of differing opinions, viewpoints, and experiences
* Giving and gracefully accepting constructive feedback
* Accepting responsibility and apologizing to those affected by our mistakes,
  and learning from the experience
* Focusing on what is best not just for us as individuals, but for the
  overall community

Examples of unacceptable behavior include:

* The use of sexualized language or imagery, and sexual attention or
  advances of any kind
* Trolling, insulting or derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or email
  address, without their explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of
acceptable behavior and will take appropriate and fair corrective action in
response to any behavior that they deem inappropriate, threatening, offensive,
or harmful.

Community leaders have the right and responsibility to remove, edit, or reject
comments, commits, code, wiki edits, issues, and other contributions that are
not aligned to this Code of Conduct, and will communicate reasons for moderation
decisions when appropriate.

### Scope

This Code of Conduct applies within all community spaces, and also applies when
an individual is officially representing the community in public spaces.
Examples of representing our community include using an official e-mail address,
posting via an official social media account, or acting as an appointed
representative at an online or offline event.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported to the community leaders responsible for enforcement at
donaldpakkies@gmail.com.
All complaints will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the
reporter of any incident.

### Enforcement Guidelines

Community leaders will follow these Community Impact Guidelines in determining
the consequences for any action they deem in violation of this Code of Conduct:

#### 1. Correction

**Community Impact**: Use of inappropriate language or other behavior deemed
unprofessional or unwelcome in the community.

**Consequence**: A private, written warning from community leaders, providing
clarity around the nature of the violation and an explanation of why the
behavior was inappropriate. A public apology may be requested.

#### 2. Warning

**Community Impact**: A violation through a single incident or series
of actions.

**Consequence**: A warning with consequences for continued behavior. No
interaction with the people involved, including unsolicited interaction with
those enforcing the Code of Conduct, for a specified period of time. This
includes avoiding interactions in community spaces as well as external channels
like social media. Violating these terms may lead to a temporary or
permanent ban.

#### 3. Temporary Ban

**Community Impact**: A serious violation of community standards, including
sustained inappropriate behavior.

**Consequence**: A temporary ban from any sort of interaction or public
communication with the community for a specified period of time. No public or
private interaction with the people involved, including unsolicited interaction
with those enforcing the Code of Conduct, is allowed during this period.
Violating these terms may lead to a permanent ban.

#### 4. Permanent Ban

**Community Impact**: Demonstrating a pattern of violation of community
standards, including sustained inappropriate behavior,  harassment of an
individual, or aggression toward or disparagement of classes of individuals.

**Consequence**: A permanent ban from any sort of public interaction within
the community.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage],
version 2.1, available at
[https://www.contributor-covenant.org/version/2/1/code_of_conduct.html][v2.1].

Community Impact Guidelines were inspired by
[Mozilla's code of conduct enforcement ladder][Mozilla CoC].

For answers to common questions about this code of conduct, see the FAQ at
[https://www.contributor-covenant.org/faq][FAQ]. Translations are available
at [https://www.contributor-covenant.org/translations][translations].

[homepage]: https://www.contributor-covenant.org
[v2.1]: https://www.contributor-covenant.org/version/2/1/code_of_conduct.html
[Mozilla CoC]: https://github.com/mozilla/diversity
[FAQ]: https://www.contributor-covenant.org/faq
[translations]: https://www.contributor-covenant.org/translations
