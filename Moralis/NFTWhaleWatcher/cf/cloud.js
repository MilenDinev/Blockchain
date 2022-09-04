
Moralis.settings.setAPIRateLimit({
    anonymous:1000, authenticated:2000, windowMs:60000
  });

// import {FirebaseFunctionsRateLimiter} from 'firebase-functions-rate-limiter';

// const firestore = admin.firestore(app);
// const limiter = FirebaseFunctionsRateLimiter.withFirestoreBackend(
//   {
//     name: 'rateLimiter',
//     maxCalls: 100,
//     periodSeconds: 5,
//  },
//  firestore);