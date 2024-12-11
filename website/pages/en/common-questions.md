# Common Questions

A quick list of common questions you might want answered to understand what changesets is doing, without going into minutiae or workflow.

## Changesets are automatically generated

Changesets are generated by the `yarn changeset` or `npx changeset` command. As long as you are following a changeset release flow, you shouldn't have any problems.

## Each changeset is its own file

We use random human readable names by default for these files to avoid collisions when generating them, but there's no harm that will come from renaming them.

## Changesets are automatically removed

When `changeset version` or equivalent command is run, all the changeset folders are removed. This is so we only ever use a changeset once. This makes this a very bad place to store any other information.

## Changesets are markdown files with YAML front matter

The two parts of the file are for different purposes. You should feel free to edit both parts as much as you want.

- The markdown text is a summary of the changes that will be prepended to your changelog when you next run your version command.
- The YAML front matter describes what should be versioned by the version command

## I want to edit the summary or package bump types - is it safe to do that?

Editing the summary or package bump types is completely safe. You can even write changesets without the command if you want.

## Can I manually delete changesets?

You can, but you should be aware this will remove the intent to release communicated by the changeset, and should be done with caution.