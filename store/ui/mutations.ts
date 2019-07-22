import { MutationTree } from 'vuex';
import { UIState } from './types';

/**
 * Counter mutations
 */
export const mutations: MutationTree<UIState> = {
  setDrawer: (state, value : boolean) => {
    state.drawer = value;
  }
};

export default mutations;
