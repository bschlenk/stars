#!/bin/sh

BUILD_DIR="./build"
OUTPUT_FILE="bundle.js"
OUTPUT="$BUILD_DIR/$OUTPUT_FILE"
SOURCE_MAP="$BUILD_DIR/$OUTPUT_FILE.map"

# --debug \
# --formatting=PRETTY_PRINT \
# --formatting=PRINT_INPUT_DELIMITER
# --compilation_level ADVANCED \
closure-compiler \
    --language_in ECMASCRIPT6_STRICT \
    --warning_level VERBOSE \
    --assume_function_wrapper true \
    --output_wrapper "(function() {%output%})();//# sourceMappingURL=/$SOURCE_MAP" \
    --js 'src/*.js' \
    --js_output_file $OUTPUT \
    --create_source_map $SOURCE_MAP

