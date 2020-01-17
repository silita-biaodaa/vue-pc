<!-- 模型： DOM 结构 -->
<template>
	<div class="feedback">
        <v-head :headTxt="'意见反馈'"></v-head>
        <section>
            <div class="box">
                <img src="../assets/img/feedback.png" class="mb40"/>
                <div class="main">
                    <div class="mb40">
                        <h5>意见类别</h5>
                        <div class="select-box dr">
                            <p class="borde cp" v-for="(o,i) of btnList" :key="i" :class="o==btnNum?'active':''" @click="btnNum=o">{{o}}</p>
                        </div>
                    </div>
                    <div class="mb40">
                        <h5>反馈内容</h5>
                        <textarea 
                            class="borde"
                            placeholder="请简述您在使用时遇到的问题或意见建议（最多500字），我们将不断改进~"
                            maxlength="500"
                            minlength='15'
                            v-model="remark"
                        ></textarea>
                    </div>
                    <div class="mb40">
                        <h5>联系电话</h5>
                        <input class="borde" type="text" v-model="tel" placeholder="请留下您的联系方式，以便我们将处理结果及时告知您~"/>
                    </div>
                </div>
                <button @click="upData" :class="isTap?'ban':''">{{btnTxt}}</button>
            </div>
            <div class="bottom">© 2017 思利他, Inc. All rights reserved . 湘ICP备17019911号-1</div>
        </section>
	</div>
</template>
<script>
	export default {
		name: 'feedback', // 结构名称
		data() {
			return {
                // 数据模型
                btnList:['产品建议','程序错误','吐槽'],
                btnNum:'产品建议',
                remark:'',
                tel:'',
                isTap:false,
                btnTxt:'提交反馈'
			}
		},
		watch: {
			// 监控集合
		},
		props: {
			// 集成父级参数
        },
        components: {
		},
		created() {
			// console.group('创建完毕状态===============》created');
		},
		methods: {
            // 方法 集合
            upData(){
                if(this.isTap){
                    return false
                }
                if(this.remark==''){
                    this.$alert('请填写反馈内容')
                    return false
                }
                this.isTap=true;
                this.btnTxt='提交中'
                let that=this;
                this.$http({
                    method:'post',
                    url:'/foundation/addFeedback',
                    data:{
                        problem:this.remark,
                        type:this.btnNum,
                        loginChannel:'1003',
                        contactWay:this.tel
                    }
                }).then(res =>{
                    this.isTap=false;
                    this.btnTxt='提交反馈'
                    if(res.data.code==1){
                        this.$alert('提交成功', '提示', {
                            confirmButtonText: '确定',
                            callback:function(){
                                that.$router.push('/')
                            }
                        })
                    }else{
                        this.$alert(res.data.msg)
                    }
                })
            }
		}

	}
</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style lang='less' scoped>
.feedback{
    section{
        min-height: calc(100vh - 58px);
        background: url("../assets/img/feedback-bg.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        padding-bottom: 22px;
        .box{
            // position: absolute;
            // transform: translateX(-50%);
            // top: 40px;
            // left: 50%;
            // text-align: center;
            width: 1020px;
            margin: 40px auto 0;
            img{
                width: 100%;
                display: block;
            }
            .main{
                margin-bottom: 60px;
                text-align: left;
                .mb40{
                    h5{
                        font-size: 18px;
                        margin-bottom: 20px;
                    }
                    .select-box{
                        p{
                            padding: 0 20px;
                            line-height: 32px;
                            font-size: 18px;
                            border-radius: 32px;
                            margin-right: 30px;
                        }
                        .active{
                            background: #EB651B;
                            border-color: #EB651B;
                            color: #fff;
                        }
                    }
                    textarea{
                        background: #F4F4F4;
                        border-radius: 4px;
                        width: 100%;
                        height: 200px;
                        box-sizing: border-box;
                        padding: 10px;
                        resize:none;
                        font-size: 14px;
                    }
                    input{
                        font-size: 14px;
                        background: #F4F4F4;
                        border-radius: 4px;
                        line-height: 46px;
                        width:374px;
                        padding:0 10px;
                    }
                }
            }
            button{
                width:340px;
                line-height: 48px;
                background: #150000;
                border-radius: 4px;
                text-align: center;
                color: #fff;
                display: block;
                margin: 0 auto 135px;
            }
            .ban{
                opacity: .8;
                background: #999;
                cursor: no-drop;
            } 
        }
        .bottom{
            font-size: 14px;
            color: #999;
            text-align: center;
        }
    }
    @media screen and (min-width:1921px){
        .feedback{
            section{
                height: calc(100vh - 58px);
                padding-bottom: 0;
                .box{
                    position: absolute;
                    transform: translateX(-50%);
                    top: 40px;
                    left: 50%;
                    margin: 0;
                }
                .bottom{
                    position: absolute;
                    bottom: 22px;
                    font-size: 14px;
                    color: #999;
                    transform: translateX(-50%);
                    left: 50%;
                }
            }
        }
    }
}
</style>
