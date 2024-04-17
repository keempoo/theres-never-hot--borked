#! /bin/bash
REPO=jdwillemse
OUTPUT_DIR="$(dirname $0)/output"
PRINT_FILE_GIST_ID=8d3e2bbe443b3312e257d8a856caa29d
PRINT_FILE_GIST_NAME=theres-never-time-printer-output.html
PRINT_FILE="$OUTPUT_DIR/$PRINT_FILE_GIST_NAME"
PRINTER_OUTPUT_FILE="$OUTPUT_DIR/printer-output.pdf"

RED='\033[0;31m'
GREEN='\033[0;32m'
PINK='\033[1;35m'
NC='\033[0m' # No Color

printf "\n${PINK}Here we go...${NC}\n"

# prepare output directory
rm -rf $OUTPUT_DIR
mkdir -p $OUTPUT_DIR


# override input file if one is passed as argument
if [ ! -z "$1" ] && [ -f $1 ]
  then
  echo "using file $1"
    PRINT_FILE=$1
  else
    echo "the file you passed does not exist"
    echo "Download print data (https://gist.github.com/${REPO}/${PRINT_FILE_GIST_ID}/raw/)"
    curl --location --output $PRINT_FILE "https://gist.github.com/${REPO}/${PRINT_FILE_GIST_ID}/raw/?$(date +%s)";
fi

echo "converting ${PRINT_FILE} to $PRINTER_OUTPUT_FILE"
wkhtmltopdf --page-width 152 --margin-top 0 --margin-right 0 --margin-bottom 0 --margin-left 0 --print-media-type $PRINT_FILE $PRINTER_OUTPUT_FILE

lp $PRINTER_OUTPUT_FILE


# print all files in output directory
# for FILENAME in $OUTPUT_DIR/*; do
#   lp $FILENAME
# done

printf "${PINK}Done.${NC}\n"
