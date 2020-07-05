# package.json



```jsx
{
"proxy": "http://localhost:9000", // 代理
  "eslintConfig": {
    "extends": [
      "react-app",
      "eslint:recommended"
    ],
    "rules": {
      // 2个空格缩进
      "react/jsx-indent": ["error", 2]
    }
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx}": ["prettier --write", "eslint --fix", "git add"],
      "*.{css,less,scss,md}": ["prettier --write", "git add"]
  },
  "babel": {
    "presets": [
      "react-app"
    ]
  },
  "scripts": {
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js",
    "format": "prettier src/**/*.{js,jsx,css,less,scss,md} --write && eslint src/**/*.{jsx, js} --fix"
  },
}
```







## prettier.config.js



```jsx
module.exports = {
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'es5'
}

```