#!/bin/bash


BUILD_DIR=build/
LIB_DIR=lib/
DEVELOPMENT=$BUILD_DIR/dcs.js
PRODUCTION=$BUILD_DIR/dcs.min.js
MIN_LIC="/**
 * Dummy Class System (DCS)
 * Copyright (c) 2012 Jorge Ramírez <jorgeramirez1990 at gmail.com>
 * Licensed under GPLv3
 **/
"

LIC="$LIB_DIR/License.js"

CORE="
$LIB_DIR/dcs.js
$LIB_DIR/Class.js
$LIB_DIR/ClassManager.js
"

cat $LIC $CORE > $DEVELOPMENT


printf "$MIN_LIC"  > $PRODUCTION
uglifyjs -nc $DEVELOPMENT >> $PRODUCTION
