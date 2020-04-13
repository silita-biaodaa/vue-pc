<template>
    <div class="dataCusto">
        <v-head :headTxt="'数据定制'"></v-head>
        <div class="main dfrcb">
            <div class="l">
                <h5 class="fs34 color-150 mb20">数据定制化查询服务</h5>
                <p class="fs14 mb40 color-282">
                    你是否在为招投标项目找合作伙伴发愁？<br>
                    你是否在为项目联系人方式发愁？<br>
                    你是否还在寻找哪些业绩是没有项目负责人发愁？
                </p>
                <p class="fs24 mb40 color-282">
                    只要您提出需求，一切烦恼标大大为你解决！<br>
                    咨询热线：0731-85076077
                </p>
                <button class="bg-theme color-fff cp fs20"  @click="modalHelper.afterOpen();mask=true">立即体验</button>
            </div>
            <div class="r">
                <img src="../assets/img/data/bg1.png"/>
            </div>
        </div>
        <div class="main dfrcb">
            <div class="l">
                <img src="../assets/img/data/bg2.png"/>
            </div>
            <div class="r" style="width:380px">
                <h5 class="fs34 color-150 mb20">什么是项目定制查询</h5>
                <p class="fs14 color-424">数据定制化服务是依靠庞大建筑行业数据以及专业的技术团队，帮助建筑行业上下游企业提供数据定制化专家服务，让企业花更少的时间、更少的成本，达成目标。</p>
            </div>
        </div>
        <div class="main2">
            <h5 class="fs34 color-150 mb30 text-c">定制化数据应用场景</h5>
            <div class="img-box dfrb">
                <p class="fs14 color-424">为用户在海量的数据里面找到自己真正需要的，不再焦头烂额</p>
                <P class="fs14 color-424">为用户提供精准的业绩数据，解决四处求人的窘境</P>
                <p class="fs14 color-424">用户提出个性化需求，我们给出精准的解决方案</p>
            </div>
        </div>
        <div class="main2">
            <div class="img-box1 dfrcb">
                <h5 class="fs34 color-150 text-c">服务数据</h5>
                <div>
                    <h2 class="mb10">150万<font class="color-000 fs20">+</font></h2>
                    <p class="fs20">全国四库一业绩数据</p>
                </div>
                <div>
                    <h2 class="mb10">1000万<font class="color-000 fs20">+</font></h2>
                    <p class="fs20">招中标公告</p>
                </div>
                <div>
                    <h2 class="mb10">430万<font class="color-000 fs20">+</font></h2>
                    <p class="fs20">建筑行业注册人员</p>
                </div>
            </div>
        </div>
        <div class="bottom-box">
            <h5 class="fs34 color-150 text-c mb40">成功案例</h5>
            <div class="carousel">
                <el-carousel :interval="4000" arrow="always" type="card" indicator-position="none"  height="212px">
                    <el-carousel-item v-for="(o,i) of list" :key="i" class="card dfrb">
                        <div class="drc l">
                            <img :src="o.img"/>
                        </div>
                        <div class="drc r fs14">{{o.txt}}</div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="bg-theme color-fff btn fs36" @click="modalHelper.afterOpen();mask=true">立即体验</div>
        </div>
        <div class="fix-box" v-if="mask">
            <div class="content-box">
                <h5 class="dfrcb bor-b">
                    <font class="fs18 color-150">请填写信息</font>
                    <i class="el-icon-close cp" @click="modalHelper.beforeClose();mask=false"></i>
                </h5>
                <div class="from-box">
                    <div class="ipt-box mb20">
                        <h4 class="fs18 mb20">联系人</h4>
                        <el-input placeholder="请输入您的名字" v-model="data.name"></el-input>
                    </div>
                    <div class="ipt-box mb20">
                        <h4 class="fs18 mb20">手机号码</h4>
                        <el-input placeholder="请留下您的联系方式" v-model="data.phone"></el-input>
                    </div>
                    <div class="ipt-box mb40">
                        <h4 class="fs18 mb20">查询内容</h4>
                        <textarea class="bg-f4f borde fs14" placeholder="请输入您需要定制的内容" v-model="data.content"></textarea>
                    </div>
                    <button class="fs18 bg-theme cp" :class="loading?'ban':''" @click="sumbitData">确定提交</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	export default {
		data() {
			return {
                list:[
                    {
                        txt:'查询陈**一级房建建造师联系方式',
                        img:require("../assets/img/data/pp3.png")
                    },{
                        txt:'重庆星******有限公司查询要求：全国四库一入库数据，市政一级及以上，合同金额2000万以上企业业绩',
                        img:require("../assets/img/data/pp2.png")
                    },{
                        txt:'湖南红******有限公司查询要求：长沙市交易中心入库数据，建筑工程一级及以上，十万平米建筑面积',
                        img:require("../assets/img/data/pp1.png")
                    },{
                        txt:'湖南思******有限公司查询要求：全国四库一入库数据，消防设施工程专业二级及以上，关键词：消防、火灾、自动、灭火、防烟、该业绩中没有项目经理的数据',
                        img:require("../assets/img/data/pp2.png")
                    },{
                        txt:'查询四川中*******有限公司财务部联系方式',
                        img:require("../assets/img/data/pp3.png")
                    }
                ],
                data:{
                    phone:'',
                    name:'',
                    content:'',
                },
                mask:false,
                loading:false
			}
		},
		methods: {
            sumbitData(){
                if(!this.phoneFn(this.data.phone)){
                    return false
                }
                if(this.data.name==''){
                    this.$notify.info({
                        title: '消息',
                        message: '请输入您的称呼'
                    });
                    return false
                }
                if(this.data.content==''){
                    this.$notify.info({
                        title: '消息',
                        message: '请输入您的查询内容'
                    });
                    return false
                }
                this.loading=true;
                let data=JSON.parse(JSON.stringify(this.data));
                let that=this;
                this.$http({
                    method:"post",
                    url:'/api/v1/custom/save/form',
                    data:data
                }).then(res =>{
                    that.loading=false;
                    if(res.data.code==1){
                        that.modalHelper.beforeClose();
                        that.mask=false;
                        that.data.phone='';
                        that.data.name='';
                        that.data.content='';
                    }else{
                        that.alert(res.data.msg)
                    }
                }).catch(req => {
                    that.loading=false;
                    that.alert('网络链接不稳定，请重新发送')
                });
            },
            phoneFn(phone){
                if(phone.trim() == '') {
                    this.$notify.info({
                        title: '消息',
                        message: '请输入您的手机号'
                    });
                    return false
                }
                if(this.funcom.textIP(phone.trim())) {
                    this.$notify.info({
                        title: '消息',
                        message: '请输入正确的手机号'
                    });
                    return false
                }
                return true
            },
		},
		beforeDestroy() { //销毁前删除本地
		},
		watch: {

		},
		props: {
			state: ''
		},
		created() {
		},
	}
</script>
<style lang="less" scoped>
.dataCusto{
    .main{
        padding: 30px 0;
        width: 1020px;
        margin: 0 auto 20px;
        button{
            width: 182px;
            line-height: 48px;
            text-align: center;
            border-radius: 24px
        }
    }
    .main2{
        padding: 20px 0;
        width: 1020px;
        margin: 0 auto;
        .img-box{
            padding-top: 50px;
            height: 323px;
            background: url('../assets/img/data/bg3.png') no-repeat;
            background-size: 100% 100%;
            box-sizing: border-box;
            p{
                max-width: 320px;
                text-align: center;
            }
        }
        .img-box1{
            height: 695px;
            background: url('../assets/img/data/bg4.png') no-repeat;
            background-size: 100% 100%;
            position: relative;
            h5{
                position: absolute;
                top: 112px;
                left: 442px;
            }
            h2{
                font-size: 72px;
                font-weight: normal;
            }
        }
    }
    .bottom-box{
        width: 1020px;
        margin: 0 auto 80px;
        .btn{
            width:402px;
            line-height:80px;
            border-radius: 40px;
            margin: 0 auto;
            text-align: center;
            cursor: pointer;
        }
        .carousel{
            margin-bottom: 112px;
            .card{
                width: 480px;
                height: 212px;
                box-shadow:0px 0px 31px 0px rgba(0,0,0,0.11);
                &.is-active{
                    box-shadow:0px 0px 31px 0px rgba(0,0,0,0.11);
                }
                .l{
                    background: #FCF7F1;
                    width: 212px;
                    padding: 0 10px;
                    box-sizing: border-box;
                    line-height: 212px;
                    img{
                        width: 192px;
                    }
                }
                .r{
                    background: url('../assets/img/data/bg5.png') no-repeat;
                    background-position: 20px 16px;
                    background-color: #fff;
                    padding:0 30px;
                    box-sizing: border-box;
                }
            }
        }
    }
    .fix-box{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1999;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        .content-box{
            width: 980px;
            height: 633px;
            background: #fff;
            box-shadow:0px 0px 21px 0px rgba(0,0,0,0.5);
            border-radius:12px;
            padding-bottom: 40px;
            box-sizing: border-box;
            h5{
                height: 65px;
                padding: 0 30px;
            }
            .from-box{
                padding: 30px 30px 0;
                .el-input{
                    width: 394px;
                    /deep/ input{
                        height: 48px;
                        line-height: 48px;
                        background: #F4F4F4;
                        border: 1px solid #DDDFE4;
                        font-size: 14px
                    }
                }
                textarea{
                    width: 100%;
                    height: 136px;
                    padding: 14px 10px;
                    border-radius:4px;
                    box-sizing: border-box;
                    resize: none;
                }
                button{
                    width: 340px;
                    line-height: 48px;
                    text-align: center;
                    color: #fff;
                    border-radius: 4px;
                    display: block;
                    margin: 0 auto;
                }
            }
        }
        .ban{
            cursor: wait;
            opacity: .8;
        }
    }
}
</style>
