module.exports = {  
    css: {
        loaderOptions: {
            // передача настроек в sass-loader
            // @/ это псевдоним к каталогу src/ поэтому предполагается,
            // что у вас в проекте есть файл `src/variables.scss`
            // Примечание: эта опция называется "prependData" в sass-loader v8
            sass: {
                prependData: `
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500;700;900&display=swap');
                @import "~@/assets/styles/reset.scss";
                @import "~@/assets/styles/vars.scss";
                @import "~@/assets/styles/styles.scss";`
            },
        }
    },
    chainWebpack: config => {
        config.module
            .rule('svg-sprite')
            .use('svgo-loader')
            .loader('svgo-loader')
    }   
}