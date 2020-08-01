module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: ['standard', 'eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                trailingComma: 'es5',
            },
        ],
        'no-console': 0,
        'no-unused-vars': [0],
        'no-irregular-whitespace': [0],
    },
};
