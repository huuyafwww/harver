module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parser: 'babel-eslint',
    extends: [
        'standard',
        'eslint:recommended',
        'plugin:prettier/recommended',
        'prettier/react',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            legacyDecorators: true,
        },
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
        'new-cap': 0,
        'no-console': 0,
        'no-unused-vars': [0],
        'no-irregular-whitespace': [0],
        'no-useless-constructor': 'off',
    },
};
