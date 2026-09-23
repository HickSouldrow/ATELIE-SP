// TODO: criar index.android.tsx com a versão mobile do header quando formos
// cuidar do app nativo. Por enquanto, todas as plataformas usam a
// implementação web.
import HeaderWeb from './index.web';

export { HeaderWeb as Header };
export * from './types';
