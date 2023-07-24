<template>
    <div class="digitalInputContainer">
        <h1 ref="text">Ligado</h1>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isOn: undefined
        }
    },
    props:{
        value: {
            type: Number,
            required: false,
        },
        info:{
            type: Object,
            required: true
        },
        divisionsColorList:{
            type:Array,
            required:true
        }
    },
    methods:{
        resizeMeasurer(){
            const container = this.$el 
            var area = (container.offsetHeight * container.offsetWidth) / 1200 
            area = area > container.offsetHeight/2 ? container.offsetHeight/2 : area 
            this.$refs.text.style.fontSize = `${area}px`
        },
        toggle(status){
            const element = this.$el
            if(status){
                element.classList.remove("off")
                element.children[0].innerHTML =  this.$i18n.t('on')
            }else{
                element.classList.add("off")
                element.children[0].innerHTML = this.$i18n.t('off')
            }
        }
    },
    mounted(){
        this.toggleSwitchIterval = setInterval(()=>{
            this.toggle(this.value)
        },1000)
    },
    beforeDestroy(){
        clearInterval(this.toggleSwitchIterval)
    }
}
</script>

<style scoped lang="scss">
.digitalInputContainer{
    padding: 1rem;
    height: 60%;
    width: 80%;
    align-items: center;
    display: flex;
    justify-content: center;
    background-color: rgba(29, 84, 38, 0.8);
    border-radius: 1rem;
    border: 1px solid white;
    outline: 2px solid rgb(29, 84, 38);
    outline-offset: 7px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    &.off{
        background-color: rgb(220 53 69 /80%);
        outline-color: rgb(220 53 69);
    }
}
</style>