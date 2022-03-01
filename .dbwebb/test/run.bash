#!/usr/bin/env bash
#
# This script is called by 'dbwebb test <target>' and can be used to prepare
# and execute additional scripts.
#
# Arguments:
#  course_dir           Absolute path to the basedir of the course repo.
#  course               Nickname of the course.
#  acronym              Acronym of the user executing the script.
#  <test_suite>         Kmom or Assignment of the testsuite to execute.
#                       If -g, --generate is passed here,
#                           it will call generate.d.bash instead.
#  <optional args>      Optional arguments
#


# Usage
if (( $# < 3 )); then
    printf "Usage: %s <course_dir> <course> <acronym> <test-suite> <optional args...>\n" \
        "$( basename -- "$0" )"
    exit 1
fi

COURSE_REPO_BASE="$1"
COURSE_NICK="$2"
KMOM="$4"
ACRONYM="$3"

# Catches and replaces for student acronym
case "$5" in
    "-a" | "--acronym" )
        ACRONYM="$6"        ;;
esac

echo "======================================="
echo "  Testing Output webapp-v4   "
echo "  Testing $KMOM for $ACRONYM    "
echo "======================================="

CONF_FILE="$COURSE_REPO_BASE/me/lager/.dbwebb-conf.json"
if test -f "$CONF_FILE"; then
    echo "Configuration file exists."
else
    echo "$CONF_FILE does not exists."
    exit 1
fi

EXPO_LINK="$(cat "$CONF_FILE" | jq .expo)"
GITHUB_LINK="$(cat "$CONF_FILE" | jq .github)"

if [ "$EXPO_LINK" != "" ]; then
    echo "Expo link found."
else
    echo "No Expo link."
    exit 1
fi

if [ "$GITHUB_LINK" != "" ]; then
    if [ "$GITHUB_LINK" != "https://github.com/dbwebb-se/webapp-v4.git" ]; then
        echo "GitHub link found."
    else
        echo "GitHub link not changed from default."
        exit 1
    fi
else
    echo "No GitHub link."
    exit 1
fi

exit 0
