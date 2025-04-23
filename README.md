# There's never time

## Clock installation

### Structure

### Requirements

#### Environment variables

env vars are variables that the project needs to function but because they are sensitive so they cannot be stored in the code of the project or they change based on environment. These variables need to requested from someone who already has them.

These vars are store in a `.env` file in the root of create-output app

- `SERP_API_KEY` is used to verify a SERP account
- `TEST_MODE` optional boolean to use literal time as opposed to rounded to closest hour

Vars are identification tokens used in Github to give workflows permissions to run automated tasks. They are added to a repo's action variables REPO/settings/variables/actions

- `GIST_TOKEN` gives Github action the ability to modify Gists
- `FACT_INDEX_GIST_ID` stores the current index of the printed fact
- `FACT_INDEX_GIST_NAME` is the name of this Gist
- `PRINT_DATA_GIST_ID` is the ID of the formatted fact to be printed
- `PRINT_DATA_GIST_NAME` is the name of this Gist

### Create new version

## Website

This is the repo of the previous web version of the There's Never Time clock.
