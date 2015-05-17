#!/usr/bin/env bash
if [ -z "${1}" ]; then
    file='sandbox.js'
else
    file=${1}
fi
iojs --use_strict --es_staging --harmony_modules --harmony_arrow_functions --harmony_proxies --harmony_arrays --harmony_array_includes --harmony_regexps --harmony-computed-property-names --harmony-rest-parameters --harmony_unicode --harmony_unicode_regexps $file