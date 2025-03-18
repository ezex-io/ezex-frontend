# Contributing to ezeX Frontend

Thank you for considering contributing to the ezeX Frontend project! We
appreciate your interest and effort in helping us improve. To ensure a smooth
contribution process, please follow the guidelines below.

## 🛠 Project Setup

**Fork the Repository**: Start by forking the repository to your GitHub account.

**Clone Your Fork**: Clone the forked repository to your local machine.

```bash
git clone git@github.com:ezex-io/ezex-frontend.git
cd ezex-frontend
```

**Install Dependencies**: Install the required dependencies using Yarn.

```bash
yarn install
```

**Start the Development Server**: Run the development server to test your
changes locally.

```bash
yarn dev
```

## 🗄️ Folder Structure

```
📦 src
┣ 📂 app
┃ ┣ 📂 (landing)
┃ ┣ 📂 dashboard
┃ ┃ ┣ 📂 \_tests
┃ ┃ ┣ 📂 \_components
┃ ┃ ┣ 📂 \_utils
┃ ┃ ┣ 📂 \_constants
┃ ┃ ┗ 📜 page.tsx
┃ ┃ ┗ 📜 error.tsx
┃ ┃ ┗ 📜 layout.tsx
┃ ┣ 📜 favicon.ico
┃ ┣ 📜 globals.css
┃ ┣ 📜 layout.tsx
┃ ┗ 📜 page.tsx
┣ 📂 components
┃ ┣ 📂 icons
┃ ┗ 📂 ui
┣ 📂 hooks
┣ 📂 layouts
┣ 📂 providers
┣ 📂 stores
┣ 📂 lib
┗ 📂 utils
```

## 📝 Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
for commit messages. You can use commitlint's
[config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
to ensure your commit messages follow the convention.

You can also use [commitizen](https://www.npmjs.com/package/commitizen) to help
you write your commit messages based on the above convention.

### Commit Message Format

```
<type>(<scope>): <description>
```

### Examples

- `feat(dashboard): add user analytics widget`
- `fix(landing): resolve broken navigation links`
- `chore(deps): upgrade react to v18`

### Common Commit Types

| **Type**     | **Description**                                            |
| ------------ | ---------------------------------------------------------- |
| **feat**     | Introduces a new feature                                   |
| **fix**      | Fixes a bug                                                |
| **docs**     | Documentation updates                                      |
| **style**    | Code style changes (formatting, missing semi-colons, etc.) |
| **refactor** | Code refactoring without changing functionality            |
| **test**     | Adding or updating tests                                   |
| **chore**    | Miscellaneous changes (dependencies, build process, etc.)  |

## 🖋 Coding Style

We follow the
**[Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)**
for clean, consistent, and maintainable TypeScript code.

## 🔥 Contribution Guidelines

### Issues & Feature Requests

- If you find a bug or have a feature request, please open an issue on GitHub.
- Provide clear and detailed steps to reproduce the issue or describe the
  feature request.

### Creating a Pull Request (PR)

**Create a Branch**: Start by creating a new branch from the `main` branch for
your changes.

```bash
git checkout -b feat/new-feature
```

**Implement Your Changes:** Make your changes, whether it's implementing a new
feature, fixing a bug, or improving documentation.

**Write Tests**: Ensure that new functionality or bug fixes are covered by
appropriate tests.

```bash
yarn test
```

**Commit Your Changes**: Commit your changes following the commit message
conventions.

```bash
git add .
git commit -m "feat(<scope>): <new feature description>"
```

**Push Your Branch**: Push your branch to your forked repository.

```bash
git push origin feat/new-feature
```

**Open a Pull Request**: Create a pull request from your branch to the `main`
branch of the main repository.

### PR Checklist

Before submitting your PR, ensure the following:

- Code follows the project’s coding style.
- There are no console warnings or errors.
- No linting or type errors are present.
- All tests pass successfully.

## 🚦 Code of Conduct

This project has adapted the
[Contributor Covenant, version 2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)
to ensure that our community is welcoming and inclusive for all. Please read it
before contributing to the project.

## 🙌 Thank You!

We appreciate your contributions and look forward to collaborating with you.
Happy coding! 🚀
