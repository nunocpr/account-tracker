### UTIL

. Updates and saves the updated versions in package.json. Installs them afterwards.

npm update --save && npm outdated --save | awk '{if(NR>1)print $1"@"$4}' | xargs npm install --save

### TODO

    - Create a modal for the New Transaction
