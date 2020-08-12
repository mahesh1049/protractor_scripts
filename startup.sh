#!/bin/bash

webdriver-manager start --detach;
echo -e "\n\nprotractor file args = $@\n\n";
protractor $@
