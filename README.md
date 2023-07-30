# Account Tracker

Account Tracker is a web app that allows users to add, update, and delete transactions, helping them organize their monthly finances and providing access to weekly, monthly, and yearly overviews. 

The primary purpose of this app is to serve as an example for my portfolio, showcasing the iomplementation of some technologies while, at the same time, replacing my Excel spreadsheet. 😊


## Features

- *Authentication using Next Auth:* 
The app utilizes Next Auth to provide secure authentication for users. It supports both JWT (JSON Web Tokens) strategy while saving user data, accounts, and sessions in the database, ensure a seamless and persistent user experience. One can register using credentials (email and password) or via Google oauth.

## Technologies Used

- Frontend + Backend: Next.js (new app directory structure) with TailwindCSS + Typescript
- Authentication: Next Auth (JWT, Credentials, Google OAuth)
- ORM: Prisma
- Database: MongoDB
- Host: Vercel

## Contribution Guidelines

This project is currently a work in progress. Feel free to contribute to its development by submitting pull requests. For major changes or new feature additions, please open an issue first to discuss the proposed changes.

## License

Account Tracker is open-source software licensed under the [MIT License](LICENSE).

---

### TODO:

- *Transaction Management:* 
Users will be able to easily add, update, and delete transactions.

- *Overview:* 
The app will offer comprehensive overviews, presenting users with weekly, monthly, and yearly breakdowns of their financial activities. This feature allows users to gain insights into their spending habits and financial trends.

- *Budget Planning:* 
Allow users to set monthly budgets for different expense categories and receive notifications when they are close to exceeding the limits.

- *Data Visualization:* 
Implement visually appealing charts and graphs to present financial data in a more intuitive and user-friendly manner.

- *Transaction Categorization:*
Allow users to manually assign categories to transactions.

- *Goal Setting:*
Allow users to set financial goals and track their progress towards achieving them.

- *Offline Version:* 
In the near future, an offline version of the app is planned, which will provide an additional layer of privacy. The offline version will ensure that no personal transaction data is recorded or stored in the user's local machine.