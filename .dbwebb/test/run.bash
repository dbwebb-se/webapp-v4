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

echo "======================================="
echo "  Testing Output webapp-v4   "
echo "  Testing $KMOM for $ACRONYM    "
echo -e "=======================================\n"


# Checks for specified KMOM
if [ -z "$KMOM" ]; then
   echo -e "\U0001F928\tPlease specify kmom. dbwebb test kmom**"
   exit 1
fi


# Catches and replaces for GitHub
# --url is served from autocorrection
# directly from canvas
GITHUB_URL=""
case "$5" in
    "-u" | "--url" )
        GITHUB_URL="$6"        ;;
esac

if [ "$GITHUB_URL" != "" ]; then
    rm -rf "$COURSE_REPO_BASE"/me/lager/{*,.*} 2> /dev/null
    git clone "$GITHUB_URL" "$COURSE_REPO_BASE/me/lager/" --quiet
fi

CONF_FILE="$COURSE_REPO_BASE/me/lager/.dbwebb-conf.json"
if test -f "$CONF_FILE"; then
    echo -e "\U0001F973\tConfiguration file exists."
else
    echo -e "\U0001F928\t$CONF_FILE does not exists."
    exit 1
fi

EXPO_LINK="$(cat "$CONF_FILE" | jq .expo | sed -e "s/\"//ig")"
GITHUB_LINK="$(cat "$CONF_FILE" | jq .github | sed -e "s/\"//ig")"

if [ "$EXPO_LINK" != "" ]; then
    echo -e "\U0001F973\tExpo link found."
else
    echo -e "\U0001F928\tNo Expo link."
    exit 1
fi

if [ "$GITHUB_LINK" != "" ]; then
    if [ "$GITHUB_LINK" != "https://github.com/dbwebb-se/webapp-v4.git" ]; then
        echo -e "\U0001F973\tGitHub link found."
    else
        echo -e "\U0001F928\tGitHub link not changed from default."
        exit 1
    fi
else
    echo -e "\U0001F928\tNo GitHub link."
    exit 1
fi

echo -e "\U0001F973\tAll files and links found."

echo -e "\n======================================="
echo "  JEST testing output   "
echo -e "=======================================\n"

cp "$COURSE_REPO_BASE/.dbwebb/test/jest/$KMOM.test.js" "$COURSE_REPO_BASE/me/lager"

TEST_OUTPUT=$(cd "$COURSE_REPO_BASE/me/lager" && npm test)
JEST_EXIT_CODE="$?"

if [ $JEST_EXIT_CODE -ne 0 ]; then
    echo -e "\U0001F928\tTests did not pass."
    echo "$TEST_OUTPUT"
else
    echo -e "\U0001F973\tTests did pass. Well done!"
fi

exit $JEST_EXIT_CODE
