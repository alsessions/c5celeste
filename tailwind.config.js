const defaultTheme = require('tailwindcss/defaultTheme')


module.exports = {
    
    theme: {
      extend: {
        typography: (theme) => ({
          DEFAULT: {
            css: {
              
              h1: {
                fontWeight: 300,
                color: theme('colors.gray-400'),
              },
              h2: {
                fontWeight: 300,
                color: theme('colors.gray-600'),
              },
              h3: {
                fontWeight: 300,
                color: theme('colors.gray-600'),
              },
              p: {
                color: theme('colors.gray-600'),
              },
              blockquote: {
                fontWeight: 400,
              },

              pre: {
                backgroundColor: theme('colors.gray.700'),
              },
             
              
              a: {
                fontWeight: 400,
                color: theme('colors.blue.400'),
                textDecoration: 'no-underline',
                '&:hover': {
                  color: theme('colors.blue.800'),
                  textDecoration: 'underline',
                },
              },
            },
          },
        })
      },
      fontFamily: {
        'sans': ['Roboto', ...defaultTheme.fontFamily.sans],
        'serif': ['Roboto Serif', ...defaultTheme.fontFamily.serif],
      },
  
    },
      
    
  }
