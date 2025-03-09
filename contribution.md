# Contributing to Ezex Front-End

Thank you for considering contributing to this project! Follow this guide to
ensure a smooth contribution process.

## 🛠 Project Setup

Fork the repository and clone your fork.

Install dependencies:

```bash
yarn install
```

Start the development server:

```bash
yarn dev
```

## 🚀 Folder Structure

```
📦 src
┣ 📂 app
┃ ┣ 📂 (landing)
┃ ┣ 📂 dashboard
┃ ┃ ┣ 📂 \_components
┃ ┃ ┣ 📂 \_utils
┃ ┃ ┗ 📜 page.tsx
┃ ┣ 📜 favicon.ico
┃ ┣ 📜 globals.css
┃ ┣ 📜 layout.tsx
┃ ┗ 📜 page.tsx
┣ 📂 components
┣ 📂 hooks
┣ 📂 layouts
┣ 📂 providers
┣ 📂 stores
┗ 📂 utils
```

## 📝 Commit Messages

We follow Conventional Commits for commit messages. You can use commitlint's
[config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
to ensure your commit messages follow the convention.

You can also use [commitizen](https://www.npmjs.com/package/commitizen) to help
you write your commit messages based on the above convention.

Format:

```
<type>(<scope>): <description>
```

Example:

- feat(dashboard): add user analytics widget

- fix(landing): resolve broken navigation links

- chore(deps): upgrade react to v18

Common Types:

- feat: Introduces a new feature

- fix: Fixes a bug

- docs: Documentation updates

- style: Code style changes (formatting, missing semi-colons, etc.)

- refactor: Code refactoring without changing functionality

- test: Adding or updating tests

- chore: Miscellaneous changes (dependencies, build process, etc.)

## 🔥 Contribution Guidelines

### 1. Issues & Feature Requests

- If you find a bug or have a feature request, open an issue.

- Provide clear steps to reproduce the issue.

### 2. Creating a Pull Request (PR)

- Create a branch from main:

```bash
git checkout -b feat/new-feature
```

- Write tests for any new features or bug fixes:

```bash
yarn test
```

- Ensure that new functionality is covered with appropriate tests.

- Commit your changes following the commit message conventions.

- Push your branch and create a pull request.

Ensure your PR follows these checks:

- Code follows the project's coding style

- No console warnings or errors

- No lint or type error

- Tests pass successfully

Happy coding! 🚀
