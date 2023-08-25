//CARROUSEL

const ToolSelected = {
    namespace: true,

    state: {
        valueId : 0,
        nameSlide: '' 
    },

    getters: {
        getId : (state) => {
            return state.valueId;
        },

        getSlide: (state) => {
            return state.nameSlide;
        }
    },

    mutations:{
        getInfoTool(state, data){
            state.valueId = data.valueId;
            state.nameSlide = data.valueElement;
        }
    },

    actions: {
        setSlide({commit}, data){
            commit('getInfoTool', data);
        }
    }
}

export default ToolSelected;

/*
const ToolSelected = {
    namespace: true,

    state: {
        id: 0,
        name: ''
    },

    getters:{
        getId: (state) => {
            return state.id
        },

        nameSlide: (state) => {
            return state.name
        }
    },

    mutations: {
        getToolsSelected(state, data){
            state.id = data.valueId;
            state.name = data.valueElement;
        }
    },

    actions:{
        setSlide({commit}, data){
            commit('getToolsSelected', data)
        },
    }
}

export default ToolSelected;
*/