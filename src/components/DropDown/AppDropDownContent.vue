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
        margin-top: 50px;
        position: absolute;
        border-radius: 5px;
        width: 15%;
    }

</style>
  