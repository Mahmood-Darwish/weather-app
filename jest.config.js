module.exports = {
    testEnvironment: 'jsdom',
    testRegex: '/tests/.*\\.(test|spec)?\\.(js|jsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|webp)$": "identity-obj-proxy"
    },
    transformIgnorePatterns: ["node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"]

};