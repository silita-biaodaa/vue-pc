<template>
    <div class="result">
        <v-head3></v-head3>
        <div class="result_body bg-fff">
            <v-publicBread :breadList="breadList"></v-publicBread>
            <v-result></v-result>
        </div>
    </div>
</template>
<script>
import resultsList from "@/components/customize/resultsList";
import head3 from "@/components/head3";
import publicBread from "@/components/customize/publicBread";
export default {
    components: {
        "v-result": resultsList,
        "v-head3": head3,
        "v-publicBread": publicBread,
    },
    data() {
        return {
            breadList: [{ title: "查询列表" }], //面包屑列表,以对象形式添加;
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../style/publicCSS";
.result {
    .result_body{
        width: 1020px;
        margin: 0 auto;
    }
}
</style>