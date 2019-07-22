import { ActionContext, ActionTree } from 'vuex/types';
import { UIState } from './types';
import { RootState } from '../type';

interface UIActionContext extends ActionContext<UIState, RootState>{}

/**
 * Counter actions
 */
export const actions: ActionTree<UIState, RootState> = {
  increment: ({ commit }: UIActionContext) => {
    commit('increment');
  }
};

export default actions;
