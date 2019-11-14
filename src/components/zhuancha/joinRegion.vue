<!-- 模型： DOM 结构 -->
<template>
    <div class="joinRegion">
        <span class="label r-delta" v-for="(x,y) in data" :key="y" :style="colorFn(x,y)">{{x}}</span>
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
        colorFn(o,i){
            return 'background:'+this.colorList[i%4].bgcolor+';color:'+this.colorList[i%4].color
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.label{
    display: inline-block;
    padding: 3px 5px;
    text-align: center;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 12px;
}
</style>
