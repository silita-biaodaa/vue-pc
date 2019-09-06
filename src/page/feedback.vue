<!-- 模型： DOM 结构 -->
<template>
	<div class="feedback">
        <v-head :headTxt="'意见反馈'"></v-head>
        <div class="box">
            <img src="../assets/img/feedback.png"/>
            <div class="main">
                <div class="main-box">
                    <span>意见类别：</span>
                    <div>
                        <p v-for="(o,i) of btnList" :key="i" :class="o==btnNum?'active':''" @click="btnNum=o">
                            <em>{{o}}</em>
                            <i class="el-icon-check"></i>
                        </p>
                    </div>
                </div>
                <div class="main-box" style="margin:18px 0 24px">
                    <span>反馈内容：</span>
                    <div>
                        <textarea 
                            placeholder="请简述您在使用时遇到的问题或意见建议（最多500字），我们将不断改进~"
                            maxlength="500"
                            minlength='15'
                            v-model="remark"
                        ></textarea>
                    </div>
                </div>
                <div class="main-box">
                    <span>联系电话：</span>
                    <input type="type" v-model="tel" placeholder="请留下您的联系方式，以便我们将处理结果及时告知您~"/>
                </div>
            </div>
            <button @click="upData" :class="isTap?'ban':''">提交反馈</button>
        </div>
	</div>
</template>
<script>
    import heads from '@/components/head3'
	export default {
		name: 'feedback', // 结构名称
		data() {
			return {
                // 数据模型
                btnList:['产品建议','程序错误','吐槽'],
                btnNum:'产品建议',
                remark:'',
                tel:'',
                isTap:false
			}
		},
		watch: {
			// 监控集合
		},
		props: {
			// 集成父级参数
        },
        components: {
			'v-head': heads,
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
                this.isTap=true;
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
                    if(res.data.code==1){
                        this.isTap=false;
                        this.$alert('提交成功', '提示', {
                            confirmButtonText: '确定',
                            callback:function(){
                                that.$router.push('/')
                            }
                        })
                    }
                })
            }
		}

	}
</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style lang='less' scoped>
.feedback{
    .box{
        width: 1020px;
        margin: 0 auto 48px;
        text-align: center;
        img{
            width: 100%;
            display: block;
            margin-bottom: 10px;
        }
        .main{
            padding: 36px 10px;
            background: #fff;
            box-sizing: border-box;
            box-shadow:4px 2px 10px 0px rgba(0, 0, 0, 0.1);
            .main-box{
                display:flex;
                align-items: flex-start;
                span{
                    display: inline-block;
                    padding-top: 7px;
                    font-size: 14px;
                    margin-right: 14px;
                }
                p{
                    width: 128px;
                    line-height: 30px;
                    text-align: center;
                    margin-right: 16px;
                    display: inline-block;
                    font-size: 12px;
                    border: 1px solid #999;
                    color: #666;
                    position: relative;
                    cursor: pointer;
                    em{
                        font-style: normal;
                    }
                    .el-icon-check{
                        position: absolute;
                        color: #fff;
                        right: 0;
                        z-index: 1;
                        top: 0;
                    }
                }
                .active{
                    border-color: #FE6603;
                    color: #FE6603;
                }
                .active:after{
                    content: '';
                    width: 0;
                    height: 0;
                    border-top: 22px solid #FE6603;
                    border-left:22px solid transparent;
                    position: absolute;
                    top: 0;
                    right: 0;
                }

                textarea{
                    width:886px;
                    height: 212px;
                    outline: none;
                    border: 1px solid #999;
                    border-radius: 3px;
                    padding: 16px 18px;
                    box-sizing: border-box;
                    resize:none;
                    color: #666;
                }

                input{
                    padding: 10px 16px;
                    color: #666;
                    outline: none;
                    border: 1px solid #999;
                    box-sizing: border-box;
                    border-radius: 3px;
                    width:362px;
                    height: 30px;
                }
            }
        }
        button{
            margin-top: 64px;
            width: 180px;
            line-height: 34px;
            color: #fff;
            border-radius: 10px;
            background: #FE6603;
            cursor: pointer;
        }
        .ban{
            opacity: .8;
            cursor: wait;
        } 
    }
}
</style>
