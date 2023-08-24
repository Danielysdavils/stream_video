//CARROUSEL
const ToolSelected = {
    namespace: true,

    state: {
        id: 0
    },

    getters:{
        getId: (state) => {
            return state.id
        }
    },

    mutations: {
        getToolsSelected(state, id){
            state.id = id
        }
    },

    actions:{
        setIdSlide({commit}, id){
            commit('getToolsSelected', id)
        }
    }

}

export default ToolSelected;