module.exports = {
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/no-unsafe-assignment': 'off',
            },
        },
    ],
    rules: {
        complexity: 'off',
        'no-magic-numbers': 'off',
        'react/prop-types': 'off',
        'sort-keys': 'off',
        'no-nested-ternary': 'off',
    },
};
