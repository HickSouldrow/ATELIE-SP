// TODO: criar index.android.tsx com a versão mobile (provavelmente um Modal
// nativo) quando formos cuidar do app fora do web. Por enquanto, todas as
// plataformas usam a implementação web.
import SideMenuWeb from './index.web';

export { SideMenuWeb as SideMenu };
export * from './types';
