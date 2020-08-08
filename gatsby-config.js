module.exports = {
    siteMetadata: {
        title: `Harver`,
        description: `This is HAR File Viewer!`,
        author: `huuyafwww`,
    },
    plugins: [
        `gatsby-plugin-sharp`,
        `gatsby-plugin-offline`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-styled-components`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `standalone`,
                icon: `src/images/gatsby-icon.png`,
            },
        },
        {
            resolve: `gatsby-plugin-lodash`,
            options: {
                disabledFeatures: [`shorthands`, `cloning`],
            },
        },
        {
            resolve: `gatsby-plugin-alias-imports`,
            options: {
                alias: {
                    '@components': 'src/components',
                    '@images': 'src/images',
                    '@styles': 'src/styles',
                    '@helpers': 'src/helpers',
                    '@config': 'src/config',
                    '@stores': 'src/stores',
                    '@services': 'src/services',
                },
                extensions: ['js'],
            },
        },
    ],
};
