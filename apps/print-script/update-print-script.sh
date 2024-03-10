#! /bin/bash

REPO=jdwillemse
PRINT_FILE_GIST_ID=43216db55221f2d1d646b5b9fb99e914
PRINT_FILE_GIST_NAME=theres-never-time-print.sh

PINK='\033[1;35m'
NC='\033[0m' # No Color

printf "\n${PINK}Updating...${NC}\n"

echo "Download new file"

curl --location --output $PRINT_FILE_GIST_NAME "https://gist.github.com/${REPO}/${PRINT_FILE_GIST_ID}/raw/?$(date +%s)";

chmod +x $PRINT_FILE_GIST_NAME

printf "${PINK}Done.${NC}\n"
