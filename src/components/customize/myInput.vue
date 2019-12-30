<template>
    <el-input type="text" :value="value" @input="input"></el-input>
</template>
<script>
export default {
    props: {
		value: {
			default: ""
		}
	},
	data(){
		return{
			
		}
	},
	methods:{
		input(){
            event.target.value=event.target.value.replace(/\D^./,"");
            event.target.value=event.target.value.replace(/[^u4e00-u9fa5w]/g,"");
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
	}

}
</script>