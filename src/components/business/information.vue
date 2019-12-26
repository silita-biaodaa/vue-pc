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
    border: 1px solid #DDDFE4;
    box-sizing: border-box;
    .ic-line{
        font-size: 14px;
        color:#000;
        min-height: 40px;
        background-color: #F4F4F4;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #DDDFE4;
        overflow: hidden;
        .line-f {
            background-color: #F4F4F4;
            display: flex;
            font-weight: 550;
            align-items: center;
            justify-content: center;
            border-right: 1px solid #DDDFE4;
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
            justify-content: center;
            min-height: 40px;
            font-weight: 550;
        }
        .line-r {
            padding-left: 40px;
            width: calc(100% - 150px);
            width: 100%;
            height: 40px;
            background: #fff;
            line-height: 40px;
        }
        .min-h {
            background: #fff;
            min-height: 40px;
            width: 100%;
            box-sizing: border-box;
            padding: 15px 16px 16px 40px;
            border-left: 1px solid #DDDFE4;
        }
    }
}
</style>
