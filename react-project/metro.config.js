// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// O index.ts de cada tela importa as versões Android e Web, então o código
// Android também entra no bundle Web. O react-native-maps só tem implementação
// nativa e quebra ao ser carregado no navegador; na Web ele vira um módulo
// vazio (a tela Web do mapa nunca renderiza os componentes dele).
const NATIVE_ONLY_MODULES = ['react-native-maps'];

config.resolver.resolveRequest = (context, moduleName, platform) => {
    if (platform === 'web' && NATIVE_ONLY_MODULES.includes(moduleName)) {
        return { type: 'empty' };
    }

    return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
