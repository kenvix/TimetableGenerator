require('laravel-mix')
    .webpackConfig({
        output: {
            publicPath: '/Public/',
            chunkFilename: 'chunks/[chunkhash].js',
        },
    })
    .sass('src/scss/main.scss', 'Public')
    .js('src/js/main.js', 'Public')

    .setPublicPath('Public')
    .disableNotifications();
