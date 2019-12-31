<template>
    <el-input type="text" :value="value" @input="input" :placeholder="placeholder"></el-input>
</template>
<script>
export default {
    props: {
		value: {
			default: ""
        },
        placeholder: {
            type: String
        }
	},
	data(){
		return{
			
		}
	},
	methods:{
		input(){
            event.target.value=event.target.value.replace(/[^\d.]/g,"");
            event.target.value=event.target.value.replace(/\.+/ ,".");
            if(event.target.value.charAt(0)=="0"&&event.target.value.charAt(1)!="."&&event.target.value.length>=2){
                event.target.value=event.target.value.replace(/0/ ,"")
            }
            var index=event.target.value.indexOf('.');
            var lastIndex=event.target.value.lastIndexOf('.')
            if(index==0){
                event.target.value=event.target.value.replace(/\./ ,"")
            }
            if(index>=1){
                event.target.value=event.target.value.substring(0,index+3)
            }
            if(index!=lastIndex){
                event.target.value=event.target.value.substring(0,index+2)
            }
			this.$emit('input',event.target.value);
		}
    },
    created() {
        console.info('this',this.$parent);
    }

}
</script>