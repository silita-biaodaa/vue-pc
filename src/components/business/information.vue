<!-- 模型： DOM 结构 -->
<template>
    <div class="information">
        <!-- 基本信息 -->
        <div class="ic-basic">
            <div class="ic-line">
                <div class="left line-f">法定代表人</div>
                <div class="left f-color line-r">{{details.legalPerson}}</div>  
            </div>
            <div class="ic-line">
                <div class="left line-f">统一社会信用代码</div>
                <div class="left f-color line-r">{{details.creditCode}}</div>  
            </div>
            <div class="ic-line">
                <div class="left line-f">注册资本</div>
                <div class="left f-color line-r">{{details.regisCapital}}</div>  
            </div>
            <!-- 基本信息  新 -->
            <div class="ic-line" v-if="details.regisDate">
                <div class="left line-f">成立时间</div>
                <div class="left f-color line-r">{{details.regisDate}}</div>  
            </div>
            <div class="ic-line" v-if="details.businessStart&&details.businessEnd">
                <div class="left line-f">经营期限</div>
                <div class="left f-color line-r">{{details.businessStart}}至{{details.businessEnd}}</div>  
            </div>
            <div class="ic-line" v-if="details.regisAuthority">
                <div class="left line-f">登记机关</div>
                <div class="left f-color line-r">{{details.regisAuthority}}</div>  
            </div>
            <div class="ic-line" v-if="details.comAddress">
                <div class="left line-f">企业地址</div>
                <div class="left f-color line-r">{{details.comAddress}}</div>  
            </div>
            <!-- 基本信息 新 end -->
            <!-- <div class="ic-line">
                <div class="left line-f">
                注册号
                </div>
                <div class="left f-color line-r">
                {{details.businessNum}}
                </div>  
            </div> -->
            <div class="ic-line">
                <div class="left line-f">
                企业类型
                </div>
                <div class="left f-color line-r">
                {{details.comType}}
                </div>  
            </div>
            <div class="ic-line">
                <div class="left line-f">
                安许证号
                </div>
                <div class="left f-color line-r">
                {{details.certNo}}
                </div>  
            </div>
            <div class="ic-line">
                <div class="left line-f">
                安许期至
                </div>
                <div class="left f-color line-r">
                {{details.validDate}}
                </div>  
            </div>
            <div class="ic-line">
                <div class="left h-auto">
                经营范围
                </div>
                <div class="left f-color min-h">
                {{details.comRange}}
                </div>  
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'information', // 基本信息
    data() {
        return {
            // 数据模型
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        details:{

        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
        });
    },
    beforeUpdate() {
        // console.group('更新前状态  ===============》beforeUpdate');
    },
    updated() {
        // console.group('更新完成状态===============》updated');
    },
    beforeDestroy() {
        // console.group('销毁前状态  ===============》beforeDestroy');
    },
    destroyed() {
        // console.group('销毁完成状态===============》destroyed');
    },
    methods: {
        // 方法 集合
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.ic-basic {
    margin: 0 10px 15px 10px; 
    border: 1px solid #f2f2f2;
    box-sizing: border-box;
    .ic-line{
        font-size: 12px;
        color:#333;
        font-weight: 550;
        min-height: 40px;
        background-color: #FAFDFF;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f2f2f2;
        overflow: hidden;
        .line-f {
            background-color: #FAFDFF;
            padding-left: 19px;
            display: flex;
            align-items: center;
            border-right: 1px solid #f2f2f2;
            min-width: 150px;
            max-height: 200px;
            min-height: 40px;
            height: auto;
            box-sizing: border-box;
        }
        .h-auto {
            display: flex;
            align-items: center;
            min-width: 150px;
            padding-left: 19px;
            min-height: 40px;
            box-sizing: border-box;
        }
        .line-r {
            padding-left: 40px;
            width: 100%;
            height: 40px;
            line-height: 40px;
        }
        .min-h {
            min-height: 40px;
            box-sizing: border-box;
            padding: 16px 15px 15px 40px;
            border-left: 1px solid #f2f2f2;
        }
    }
}
</style>
