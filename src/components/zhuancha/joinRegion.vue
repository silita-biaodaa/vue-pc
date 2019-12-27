<!-- 模型： DOM 结构 -->
<template>
    <div class="joinRegion">
        <span class="r-delta internal fs14" v-for="(x,y) in data" :key="y" :class="{'external': x.includes('内')}">{{x}}</span>
    </div>
</template>
<script>
export default {
    name: 'joinRegion', // 结构名称
    data() {
        return {
            // 数据模型a
            colorList:[
                {
                    color:'#5383E4',
                    bgcolor:'#E4EBFF'
                },{
                    color:'#53E49B',
                    bgcolor:'#E4FFED'
                },{
                    color:'#EF873A',
                    bgcolor:'#FDEFE3'
                },{
                    color:'#D65588',
                    bgcolor:'#FFE5F0'
                }
            ],
        }
    },
    props: {
        // 集成父级参数
        data:{
            type:Array
        },
    },
    methods: {
        // 方法 集合
    },

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.internal,.external {
    display: inline-block;
    width: 52px;
    height: 25px;
    line-height: 25px;
    border-radius: 4px;
    text-align: center;
}
.internal {
    color: #F08082;
    border: 1px solid #F08082;
}
.external {
    color: #46BF72;
    border: 1px solid #46BF72;
}
</style>
