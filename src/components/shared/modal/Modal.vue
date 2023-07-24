<template>
    <b-modal :id="id" class="modal" title="Modal with Popover" ok-only :size="size" :centered="center" ref="modal">
        <template #modal-title>
            <slot name="header"></slot>
        </template>
        <slot name="body"></slot>
        <template #modal-footer>
            <slot name="footer"></slot>
        </template>
    </b-modal>
</template>

<script>
export default {
    props:{
        id: {
            type: String,
            required:true,
        },
        size:{
            required:false,
            default: "md",
            type:String
        },
        center:{
            type:Boolean,
            required:false,
            default:false
        },
        fullscreen:{
            type:Boolean,
            required:false,
            default: false
        },
    },

    methods:{
        fullscreenModal(){

            var bodyZoomScale = document.body.style.zoom
            bodyZoomScale = bodyZoomScale ? bodyZoomScale : 1
            var multiplier = 1 / bodyZoomScale
            var timeout = setTimeout(()=>{
                let sizing = 100 * multiplier
                console.warn(sizing)
                let modalContent = document.querySelector(`#${this.id}___BV_modal_content_`)
                let modalHeader = document.querySelector(`#${this.id}___BV_modal_header_`)


                modalContent.style.height = `${sizing}vh`
                modalContent.style.width = `${sizing}vw`
                modalHeader.style.width = `${sizing}vw`
                
                clearTimeout(timeout)
            },10)
        },
    },

}
</script>

<style lang="scss">
div.modal{
    background-color: rgb(29, 40, 53, 0.95);
    
}
div.modal-content {
    color: white;
    background: transparent;
    border-color: rgba(255, 255, 255, 0.3);
    // width: 100vw
}
button.close{
    color: white;
}
button.close:hover{
    color:red
}
div.modal-content > * {
    border-color: rgba(255, 255, 255, 0.3);
    color: white;
}
.modal-dialog.modal-xl.modal-dialog-centered {
    margin: 0;
}

</style>