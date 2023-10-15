### UTIL

. Updates and saves the updated versions in package.json. Installs them afterwards.

npm update --save && npm outdated --save | awk '{if(NR>1)print $1"@"$4}' | xargs npm install --save



### TODO

    - Create subCategory add, update or remove functionality.
    
    - Add a "disabled" // "no pointer events" whenever any button is pressed to fetch something (use state or a function to set a class or a variable that whenever active add a class: cn(active && 'disabled no-pointer-events')). Also, think of a way to limit the API calls.

    - Create a dashboard page to redirect the user once he is logged in. The dashboard will have account details (name, email, transactions, logo, etc.)
    
    - Create a reconfirmation modal (when user clicks to delete his account or another  important actions, make sure user reconfirms his a action.)

    - ...




