# vpex-auth-starter
Vue, Parcel, Express starter app with Firebase Authentication

This repo is a somewhat barebones starting point for buildling a web app with a front-end powered by VueJS and a backend powered by ExpressJS. For simplicities sake, the front-end javascript is bundled using ParcelJS. User authentication is built with the Firebase SDK and by default is setup to the email/password sign-in method.


## Local Development
Clone the repo to your machine and change to the directory, then..
```
cp .env.example .env
npm install
npm run dev
```

## Firebase Setup
If you do not have a Firebase Account, you will need to [create one here](https://console.firebase.google.com/). Once your account is setup and you have enabled the Email/Password signin method, you will need to add the Firebase config variables to the `.env` file
