<template>
    <div class="section-menu" >
        <span 
        class="menu-point" 
        v-bind:class="{active:activeSecton==index}" 
        v-on:click="scrollToSection(index)"
        v-for="(offset, index) in offsets" 
        v-bind:key = "index"
        v-tittle = " 'Go to section' + (index + 1)">
        </span>
    </div>
</template>

<script>

    export default{
        data(){
            return{
                recording: [],
                qtdRecording: 0,
                inMove: false,
                inMoveDelay: 400,
                activeSection: 0,
                offsets: [],
                touchStarY:0,
            }
        },
        methods:{
            calculateSectionOffSet(){
                let section = document.getElementsByTagName('section');
                for(let i = 0; i < section.length; i++){
                    let sectionOffSet = section[i].offsetTop;
                    this.offsets.push(sectionOffSet);
                }
            },

        }
    }
</script>