import HashMap from "@components/hashMap/index";

var map = new HashMap();

const isearch = {
    state: {
        //菜单状态对象
        menuState: 1,
        //路由和对应iframe的mapping
        routerToUrl: map
    },

    getters: {
        //menuState
        menuState: state => state.menuState,

        //app
        routerToUrl: state => state.routerToUrl

    },

    //必须通过提交 mutation 的方式，而非直接改变 store.state，各组件才能明确地追踪到状态的变化。
    mutations: {

        SET_MENU_STATE: (state, val) => {
            state.menuState = val;
        }

    },

    actions: {
        setMenuState({
            commit
        }, state) {
            commit('SET_MENU_STATE', state)
        }
    }
}

export default isearch