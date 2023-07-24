<template>
  <div class="w-100 p-3">

		<div class="btnGroup" >
			<b-button size="md" :variant="firstButtonStyle" @click="showAddButtons(state)">{{$i18n.t("new")}}</b-button>
			<b-button v-for="btn in buttons" :key="buttons.indexOf(btn)" :variant="btn.style"  class="btnAdd ml-1" :style="buttonScaleStyle" @click="toggleButton(btn)">
				{{$i18n.t(btn.text)}}
			</b-button>
		</div>

		<div class="mt-2 newComponent" :style="scaleStyle" v-if="isOpen">
			<component
			ref="infoComponent"
			:is="component"
			:info="info"
			isEditing
			:onDashboard="true" 
			@showModal="showModal"  
			@addElement="addElement"
			@updateElement="updateElement"
			@close="showAddButtons(1)"
			/>
		</div>
  </div>
</template>

<script>
export default {
	data(){
		return{
			state: 0,
			scale: 0,
			scaleButton: 0,
			firstButtonStyle: 'outline-success',
			height: 0,
			component: undefined,
			info: {},
			isOpen: false
		}
	},
	props:{
		buttons: {
			type: Array,
			requeried:false,
			default: () => [ 
				{
					text: "device",
					style: "outline-success",
					state: 1,
					component: 'device-info'

				},
				{
					text: "variable",
					style: "outline-success",
					state: 1,
					component: 'variable-info'

				},
				{
					text: "group",
					style: "outline-success",
					state: 1,
					component: 'group-info'

				},
				{
					text: "measurer",
					style: "outline-success",
					state: 1,
					component: 'dashboard-measurer-info'
				}
			]
		},
		tabInfo:{
			required:false,
			type:Object,
			default: () => {}
		}
	},
	computed:{
		scaleStyle(){
			return {
				'--scale-Y': this.scale,
				'--height': this.height
			}
		},

		buttonScaleStyle() {
			return {
				'--scaleButton-X': this.scaleButton	
			}
		}
	},

	methods:{
		showModal(request){
			this.$emit("showModal", request)
		},
		showAddButtons(state){
		
			this.state = !state
			if(!this.state){
				this.scaleButton = 0;
				this.firstButtonStyle = "outline-success"

				this.buttons.forEach(el => {
					el.state = 1;
					el.style = 'outline-success';
					this.scale = 0;
					this.height = 0
				})
			}
			else{
			
				this.scaleButton = 1;
				this.firstButtonStyle = "success"	
			}
		},

		async toggleButton(btn){
			this.info = this.tabInfo == undefined ? {} : this.tabInfo
			this.isOpen = !this.isOpen
			await this.$nextTick()
			if(btn.state) {
				btn.state = 0;
				btn.style = 'success';
				this.scale = 1;
				this.height = 'auto'
				this.component = btn.component
				this.isOpen = true
			} else {
				btn.state = 1;
				btn.style = 'outline-success';
				this.scale = 0;
				this.height = 0
				this.component = btn.component
				this.isOpen = false

			}
			
		},

		addElement(newElement) {
			console.log('NEWCOMPONENT')
			this.$emit('addElement', newElement);
			this.showAddButtons(true);
		},
		
		updateElement(element) {
			this.$emit('updateElement', element.value);
			this.showAddButtons(true);
		},

		async openEdit(info){
			this.isOpen = false
			await this.$nextTick()
			this.isOpen = true
			this.scale = 1;
			this.height = 'auto'
			this.info = info.element
			this.component = info.component
			console.log(info)
		}
	},

	created(){
		this.info = this.tabInfo

	}

};

</script>

<style scoped>
.newComponent{
    height: var(--height) !important;
	transform: scaleY(var(--scale-Y));
    transition: transform 0.2s ease;
    transform-origin: top;
    padding: 1rem;
    background-color: hsla(206deg, 29%, 17%, 0.66);
    border: 3px solid #25c9ff
}
.btnGroup{
	position:relative;
	z-index: 99999;
}
.btnAdd{
	transform: scaleX(var(--scaleButton-X));
	transform-origin: left;
	transition: transform 0.1s ease;
}
</style>

