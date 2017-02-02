#!/bin/sh

OUTPUT='bundle.js'
SOURCE_MAP="$OUTPUT.map"

# --compilation_level ADVANCED \
closure-compiler \
    --warning_level VERBOSE \
    --js 'src/*.js' \
    --js_output_file $OUTPUT \
    --create_source_map $SOURCE_MAP

echo "\n//# sourceMappingURL=/$SOURCE_MAP" >> "./$OUTPUT"
