<template>
    <div class="d-flex w-100">
        <div class="select">
            <div class="options" :class="{'block': isFieldNotNull()}">
                <div class="cpfOption" @click="select">CPF</div>
                <div class="cnpjOption" @click="select">CNPJ</div>
            </div>
            <div class="slider"></div>
        </div>
        <text-input class="cpfOrCnpjInput" name="info" label="" @changeValue="changeValue" :value="fieldValue"/>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isCpfSelected: true,
            fieldValue: undefined
        }
    },
    props:{
        cpfOrCnpj:{
            required:true,
            type: Object
        }
    },
    computed:{
        value(){
            const {cpf, cnpj} = this.cpfOrCnpj
            if(this.isFieldNotNull(cnpj)) {
                this.isCpfSelected = false
                return cnpj
            }
            this.isCpfSelected = true
            return cpf
        },
    },
    methods:{
        select(){
            if(this.isFieldNotNull()) return
            this.isCpfSelected = !this.isCpfSelected
            this.changeSliderPlace()
        },
        changeSliderPlace(){
            const slider = this.$el.querySelector(".slider");
            if(this.isCpfSelected){
                slider.style.left = "0px"
            } else {
                slider.style.left = "4.5rem"
            }
        },
        isFieldNotNull(field=this.fieldValue){
            return field != undefined && field != ''
        },
        changeValue(newValue){
            this.fieldValue = newValue
            if(this.isCpfSelected) this.$emit("changeCPF", newValue.replace(/\D/g, ""))
            else this.$emit("changeCNPJ", newValue.replace(/\D/g, ""))
        },
        maskField(){
            const element = this.$el.querySelector(".cpfOrCnpjInput")
            element.addEventListener("keyup", (e)=>{
                if(this.isCpfSelected){
                    var v= e.target.value.replace(/\D/g,"") 
                    v=v.replace(/\D/g,"")
                    v=v.replace(/(\d{3})(\d)/,"$1.$2")
                    v=v.replace(/(\d{3})(\d)/,"$1.$2")
                    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
                    e.target.value = v;
                }
                else{
                    e.target.value = e.target.value.replace(/\D/g, '').replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, "$1 $2 $3/$4-$5");
                }
            })
        }
    },
    mounted(){
        this.fieldValue = this.value
        console.warn(this.isCpfSelected)
        this.changeSliderPlace()
        this.maskField();
    }
}
</script>

<style lang="scss" scoped>
    .options{
        margin-right: 0.5rem;
        display: flex;
        border: 1px solid white;
        border-radius: 5px;
        & > *{
            width: 4.5rem;
            height: 3rem;
            padding: 0.5rem 1rem;
            background: #00000024;
            cursor: pointer;
        }
        .cpfOption{
            border-right: 1px solid white;
        }
        &.block > *{
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
    .slider{
        width: 4.5rem;
        height: 3rem;
        background: rgba(6, 6, 6, 0.6901960784);
        border-radius: 4px;
        z-index: -1;
        position: relative;
        top: -3rem;
        left: 0rem;
        transition: left 0.5s ease;
    }
</style>