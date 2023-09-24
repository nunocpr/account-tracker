### UTIL

. Updates and saves the updated versions in package.json. Installs them afterwards.

npm update --save && npm outdated --save | awk '{if(NR>1)print $1"@"$4}' | xargs npm install --save



### TODO

    - before creating the "create transaction" stuff, we need to create a form with all the input fields. While thinking about them, I've decided to start building the mainCategory functions and API routes (/api/mainCategory/add).
    The MultiSelect component will be rendering the available Categories for each user.
    I need to add a button to create a category - this button will call the API, which in turn will sanitize the input and insert in the database. The fetch to the API to create the entry in the database will have to call revalidateTag('mainCategory') AFTER the insertion of the category in the database. The idea is that this will purge the cache for the categories in the page.tsx file and return the updated category list.
    
    - Add a "disabled" // "no pointer events" whenever any button is pressed to fetch something (use state or a function to set a class or a variable that whenever active add a class: cn(active && 'disabled no-pointer-events')). Also, think of a way to limit the API calls.





    - Create a dashboard page to redirect the user once he is logged in. The dashboard will have account details (name, email, transactions, logo, etc.)
    
    - Create a reconfirmation modal (when user clicks to delete his account or another  important actions, make sure user reconfirms his a action.)

    - ...




