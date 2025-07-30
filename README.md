# CV Generator

This is a React application for generating CVs. This guide will help you set up and run the app on your local machine.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or above recommended)
- npm (comes with Node.js) or yarn

## Setup Instructions

1. **Clone the repository**

```bash
git clone <repository-url>
cd cv-generator
```

2. **Install dependencies**

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

3. **Run the application locally**

```bash
npm start
```

This will start the development server and open the app in your default browser at [http://localhost:3000](http://localhost:3000).

4. **Build the application for production**

```bash
npm run build
```

This will create an optimized production build in the `build` folder.

5. **Run tests**

```bash
npm test
```

## Additional Information

- This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.
- The app is bootstrapped with [Create React App](https://create-react-app.dev/).
- If you want to eject the app configuration (not recommended unless necessary), you can run:

```bash
npm run eject
```

## Troubleshooting

- Ensure you have a compatible Node.js version installed.
- If you encounter issues with dependencies, try deleting `node_modules` and `package-lock.json` and reinstalling.
- For Tailwind CSS to work properly, ensure the `postcss.config.js` and `tailwind.config.js` files are present in the root directory.

## Contact

For any issues or questions, please contact the project maintainer.
