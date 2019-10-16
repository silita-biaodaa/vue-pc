<template>
    <div class="companyJump">
        <template v-if="type==0">
            <span :class="tapName?'tap-after':'tap-before'" @click="jumpCompany(name)" class="color">{{name}}</span>
        </template>
        <template v-else>
            <span :class="tapName?'tap-after':'tap-before'" @click="jumpCompany(name)">第一候选人：{{name}}</span>
        </template>
    </div>
</template>
<script>
export default {
    name:'companyJump',    
    data () {
        return {
            tapName:false
        }
    },
    props:{
        type:{//0为普通的企业点击跳转，1为第一候选人
            default:0
        },
        name:{//企业名称，必传
            type: String,
        }
    },
    methods: {
        jumpCompany(name){
            if (this.tapName) {
                this.$alert('正在跳转中，请勿重复点击');
                return false
            }
            this.tapName = true;
            let that = this;
            this.$http({
                method: 'post',
                url: 'company/detail',
                data: {
                    comName: name
                }
            }).then(res => {
                that.tapName = false;
                if (res.data.code == 1) {
                    let id = res.data.data.comId;
                    let source=res.data.data.regisAddress;
                    const {
                        href
                    } = that.$router.resolve({
                        path: '/introduce/icbc',
                        query: {
                            id: id,
                            name: name,
                            source:source,
                        }
                    })
                    window.open(href, '_blank')
                } else {
                    that.$alert(res.data.msg)
                }
            }).catch(err => {
                that.$alert('网络链接不稳定，请重新点击');
                that.tapName = false;
            })
        }
    },
}
</script>
<style lang="less" scoped>
.companyJump{
    display: inline-block;
    .tap-before {
		cursor: pointer;
	}
	.tap-after {
		cursor: wait;
    }
    .color{
        color: #fe6603;
    }
}
</style>