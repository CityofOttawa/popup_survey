const tasks = list => list.join(" && ");

module.exports = {
  hooks: {
    "pre-commit": tasks([
      "echo committing as $(git config user.name)",
      "npm run lint:php",
    ]),
    "post-commit": tasks([
      "echo $HUSKY_GIT_STDIN | hooks/post-commit-lfs $HUSKY_GIT_PARAMS",
      "bin/composer diagnose || true",
    ]),
    "pre-push": "echo $HUSKY_GIT_STDIN | hooks/pre-push-lfs $HUSKY_GIT_PARAMS",
    "post-checkout":
      "echo $HUSKY_GIT_STDIN | hooks/post-checkout-lfs $HUSKY_GIT_PARAMS",
    "post-merge":
      "echo $HUSKY_GIT_STDIN | hooks/post-merge-lfs $HUSKY_GIT_PARAMS",
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
  },
};
