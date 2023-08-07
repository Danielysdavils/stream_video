import {GET_DATA} from '@/store/Mutations/mutations-type'

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
        [GET_DATA](state, id){
            state.id = id
        }
    },

    actions:{
        setIdSlide({commit}, id){
            commit(GET_DATA, id)
        }
    }

}

export default ToolSelected;