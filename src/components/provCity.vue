<template>
	<div class="provCity">
		<div class="select dfrb bor-b">
            <div>省级区域</div>
            <ul>
                <li v-for='(el,i) in areas' :key='i' :class="el.code==area? 'current':''" @click='areaTap(el)'>{{el.areaShortName}}</li>
            </ul>
		</div>
		<div class="select dfrb bor-b" v-if="list.length>0&&iscity">
            <div>市级区域</div>
            <ul>
                <li v-for='(el,i) in list' :key='i' :class="str.indexOf(el.name)>-1?'current':'' " @click="cityTap(el)">{{el.name}}</li>
            </ul>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
                areas:[],
                area:'',
                list:[],
                str:'全部',
                cityName:[]
			}
		},
		props: {
            source:{
                default:''
            },
            isall:{//是否有全部
                default:false
            },
            iscity:{//是否有市区
                default:false
            },
            address:{
                default:''
            },
            type:{
                default:'gg'
            }
		},
		watch: {
		},
		methods: {
            areaTap(el){//省级选择
                this.area=el.code;
                if(el.code==''){
                    this.list=[]
                }else{
                    el.data.unshift({
                        name:'全部',
                        istap:true
                    })
                    this.list=el.data;
                }
                this.returnFn();
            },
            cityTap(el){//市级选择
                if(el.name=='全部'){
                    this.str='全部'
                    this.cityName=[]
                }else{
                    if(this.str=='全部'){
                        if(this.type=='gg'){//公告
                            this.cityName.push(el.code)
                        }else{
                            this.cityName.push(el.name)
                        }
                    }else{
                        if(this.type=='gg'){//公告
                            if(this.cityName.indexOf(el.code)>-1){//重复选中delete
                                this.cityName.splice(this.cityName.indexOf(el.code), 1)
                            }else{//add
                                if(this.cityName.length==3){
                                    this.$confirm('最多只能选择三个市级', '提示', {
                                        type: 'warning',
                                        showCancelButton: false,
                                        showConfirmButton: false
                                    })
                                    return
                                }else{
                                    this.cityName.push(el.code)
                                }
                            }
                        }else{
                            if(this.cityName.indexOf(el.name)>-1){//重复选中delete
                                this.cityName.splice(this.cityName.indexOf(el.name), 1)
                            }else{//add
                                if(this.cityName.length==3){
                                    this.$confirm('最多只能选择三个市级', '提示', {
                                        type: 'warning',
                                        showCancelButton: false,
                                        showConfirmButton: false
                                    })
                                    return
                                }else{
                                    this.cityName.push(el.name)
                                }
                            }
                        }
                    }
                    this.str=this.cityName.join(',');
                }
                this.returnFn();
            },
            returnFn(){
                if(this.str=='全部'){
                    this.$emit('returnAddress',this.area)
                }else{
                    let str=this.area+'||'+this.str
                    this.$emit('returnAddress',str)
                }
            }
		},
		created() {
            let data = JSON.parse(localStorage.getItem('filter'));
            if(this.isall){//如果有全部则添加全部
                data.area.unshift({
                    areaShortName: '全部',
                    code:''
                })
            }
            this.areas = data.area;
            if(this.source!=''){//如果有省份则用定位省份
                this.area=this.source
            }
            if (this.address.indexOf('||') > -1) { //刷新保存功能 省市还原
                let arr = this.address.split('||');
                this.area = arr[0];
                this.str = arr[1];
                this.cityName=arr[1].join(',')
            } else {
                this.area = this.address;
            }

            if(this.area!=''){
                for(let x of data.area){
                    if(x.code.indexOf(this.area)>-1){
                        x.data.unshift({
                            name:'全部',
                            istap:true
                        })
                        this.list=x.data
                        break
                    }
                }
            }
		},
		mounted() {

		},
		components: {}
	}
</script>
<style lang="less" scoped>
.provCity{
    .select{
        div{
            width: 64px;
            font-weight: 600;
            color: #150000;
        }
        ul{
            width: calc(100% - 84px);
            margin-top: 2px;
            display: flex;
            padding-bottom: 6px;
            flex-wrap: wrap;
            li{
                min-width: 42px;
                margin-right: 40px;
                margin-bottom: 14px;
                font-size: 14px;
                color: #5A5A5A;
                cursor: pointer;
            }
            .current{
                color: #EB651B;
                font-weight: 600
            }
        }
    }
}
</style>
