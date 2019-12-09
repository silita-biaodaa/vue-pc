<template>
    <div class="screenPage">
        <v-head3></v-head3>
        <div class="screenPage_body">
            <v-bread :breadList="breadList"></v-bread>
        </div>
    </div>
</template>
<script>
import publicBread from '@/components/customize/publicBread'
import head3 from '@/components/head3'
export default {
    components: {
        'v-bread':publicBread,
        'v-head3':head3,
	},
    data() {
        return {
            breadList: [{title:'重庆定制版查询系统'}], //面包屑列表
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../style/publicCSS";
.screenPage {
    .screenPage_body {
        width: 1020px;
		margin: 0 auto 200px;
		background-color: @whiteColor;
    }
}
</style>