if (process.env.NODE_ENV === 'test') {
    module.exports = {
      JWT_SECRET: 'codeWorkrauthentication',
      oauth: {
        google: {
          clientID: '1031797538806-m5i5vp76r2sgsl9q19asjv0o1ml4bedt.apps.googleusercontent.com',
          clientSecret: 'k8QoHdhBrvkbxuN7gmaLNqfF',
        },
        facebook: {
          clientID: '2743524672542540',
          clientSecret: '0696895af843e2513eb70a50d9274c0d',
        },
      },
    };
  } else {
    module.exports = {
      JWT_SECRET: 'codeWorkrauthentication',
      oauth: {
        google: {
          clientID:'1031797538806-m5i5vp76r2sgsl9q19asjv0o1ml4bedt.apps.googleusercontent.com',
          clientSecret: 'k8QoHdhBrvkbxuN7gmaLNqfF',
        },
        facebook: {
          clientID: '2743524672542540',
          clientSecret: '0696895af843e2513eb70a50d9274c0d',
        },
      },
    };
  }