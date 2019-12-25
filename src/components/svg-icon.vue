<!-- 模型： DOM 结构 -->
<template>
    <svg class="svg-icon" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
import '@/assets/iconfont.js'
export default {
    name: 'svg-icon', // 结构名称
    data() {
        return {
            // 数据模型a
        }
    },
    props: {
        iconClass: {
            type: String,
            required: true
        }
    },
    computed: {
        iconName() {
        return `#${this.iconClass}`
        }
    }
}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    font-size: 14px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
