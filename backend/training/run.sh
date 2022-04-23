#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No arguments provided"
    exit 1
fi

python3 ./capstone.py > /dev/null
python3 ./classification.py $1 | ts '[%Y-%m-%d %H:%M:%S]' > ./output$1