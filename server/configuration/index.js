if (process.env.NODE_ENV === 'test') {
    module.exports = {
      JWT_SECRET: '',
      oauth: {
        google: {
          clientID: '',
          clientSecret: '',
        },
        facebook: {
          clientID: '2743524672542540',
          clientSecret: '0696895af843e2513eb70a50d9274c0d',
        },
      },
    };
  } else {
    module.exports = {
      JWT_SECRET: '',
      oauth: {
        google: {
          clientID:'',
          clientSecret: '',
        },
        facebook: {
          clientID: '',
          clientSecret: '',
        },
      },
    };
  }
