<template>
  <div ref="container" class="text-center w-100" :style="[responsiveSizing, textColor]" >
    <div class="valueContainer d-flex align-items-center w-100 justify-content-center">
      <b-icon v-if="valueHasChanged" 
      :class="{'hasIncreased': valueHasIncreased, 'hasDecreased': !valueHasIncreased}"
      :icon="arrowIcon"/>
      <h1>{{value}}</h1>
    </div>
    <h6>{{unit}}</h6>
  </div>
</template>

<script>
export default {
  data(){
    return{
      cardWidth: 300,
      lastValue: 0,
    }
  },
      props:{
        value: {
            type: Number,
            required: false,
            default: 80,
        },
        info:{
            type: Object,
            required: true
        },
        fullscreen:{
					required:false,
					type:Boolean,
					default:false,
				},
        divisionsColorList:{
          type: Array,
          required:true
        }

    },
  computed:{
    arrowIcon(){
      return this.valueHasIncreased ? "arrow-up-short" : "arrow-down-short"
    },
    responsiveSizing(){
      const valueNewSize = this.cardWidth * 0.33
      const valueMaxSize = 125

      const unitNewSize = this.cardWidth * 0.055
      const unitMaxSize = 50

  
      if(this.fullscreen){
        return {
          "--valueFontSize": `${window.innerWidth / 100 * 25}px`,
          "--unitFontSize": `${window.innerWidth / 100 * 10}px`
        }
      }
      return{
        "--valueFontSize": `${valueNewSize > valueMaxSize ? valueMaxSize : valueNewSize}px`,
        "--unitFontSize" : `${unitNewSize > unitMaxSize ? unitMaxSize : unitNewSize}px`
      }
    },

    textColor(){
      var color = undefined
      this.divisionsColorList.forEach((division) => {
				if(this.value >= division.start && this.value <= division.end){
          color = division.color
        }
			})
      return {
        "--textColor" : color
      }
    },
    unit(){
      return this.info.unit ? this.info.unit : 'unidade'
    },
    valueHasChanged(){
      return this.value != this.lastValue
    },
    valueHasIncreased(){
      return this.value > this.lastValue
    },
    arrowDirection(){
      return this.valueHasIncreased ? "arrow-up-short" : "arrow-down-short"
    }

  },
  methods:{
    resizeMeasurer(width){
      this.cardWidth = width
    }
  },
  mounted(){
    this.cardWidth = this.$refs.container.offsetWidth
    this.textUpdateInterval = setInterval(()=>{
      if(this.value != 0){
        this.lastValue = this.value
      }
    },4000)
  },

  beforeDestroy(){
    clearInterval(this.textUpdateInterval)
  }



}
</script>

<style scoped lang="scss">
  h1{
    font-size: var(--valueFontSize);
    color: var(--textColor);
  }
  h6{
    font-size: var(--unitFontSize);
    color: var(--textColor);
  }
  .valueContainer{
    svg{
      font-size: var(--valueFontSize);
      position:relative;
      color:red;
      top: -5px;
      &.hasIncreased{
        color: green
      }
      &.hasDecreased{
        color: red
      }
    }
  }
</style>