module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        indent: [
            'error',
            4,
            { SwitchCase: 1 },
        ],
        'import/no-unresolved': 'off',
        'max-len': ['error', { code: 300 }],
    },
};
