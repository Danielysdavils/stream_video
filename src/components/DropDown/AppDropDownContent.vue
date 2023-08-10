<template>
    <transition name="dropdown-content">
        <div v-if="active" class="content-menu">
            <slot/>
        </div>
    </transition>
</template>
  
<script>
export default {
    name: "AppDropdownContent",

    inject: ["sharedState"],
    
    computed: {
        active() {
            return this.sharedState.active;
        }
    }
};

</script>
  
<style>
    .dropdown-content-enter-active,
    .dropdown-content-leave-active {
        transition: all 0.2s;
    }

    .dropdown-content-enter,
    .dropdown-content-leave-to {
        opacity: 0;
        transform: translateY(-5px);
    }

    .content-menu{
        display: flex;
        flex-direction: column;
        z-index: 10;
        background-color: var(--color4);
        margin-right: 10px;
        margin-top: 60px;
        position: absolute;
        border-radius: 5px;
        width: 15%;
    }
    @media (min-width: 0px) and (max-width: 800px){
        .content-menu{
            margin-bottom: 60px;
            width: 28%;
        }
    }

    @media (min-width: 0px) and (max-width: 477px){
        .content-menu{
            position: relative;
            margin-bottom: 200px;
            z-index: 20;
            width: 90%;
        }
    }

    @media (min-width: 801px) and (max-width: 1120px){
        .content-menu{
            width: 22%;
            margin-right: 30px;
        }
    }



</style>
  