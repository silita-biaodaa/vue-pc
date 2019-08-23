<template>
    <div class="screenZZ">
        <!-- 资质筛选 -->
        <div v-for="(el,i) of lengthList" :key="i" class="screen" :class="i!=0?'padding-l':''">
            <span v-if="i==0">资质要求:&nbsp&nbsp</span>
            <el-select placeholder="选择资质类型" clearable v-model="el.one.code" @change="oneChangeFn(el)"  @click.native='judvip'>
                <el-option v-for="item in el.one.list" :key="item.name" :label="item.name" :value="item.code"></el-option>
            </el-select>
            <el-select placeholder="请选择" clearable v-model="el.two.code"  @change="twoChangeFn(el)" v-if="el.two.list.length>0">
                <el-option v-for="item in el.two.list" :key="item.name" :label="item.name" :value="item.code"></el-option>
            </el-select>
            <el-select placeholder="请选择" clearable  v-model="el.three.code" @change="threeChangeFn(el)" v-if="el.three.list.length>0">
                <el-option v-for="item in el.three.list" :key="item.name" :label="item.name" :value="item.code"></el-option>
            </el-select>
            <span class='del-btn' @click='delFn(i)' v-if="i!=0">删除</span>
        </div>
        <!-- 增加条件 -->
        <div class="spacing-box" v-if="lengthList.length<3">
            <div class="btn" @click="addFn">
                <i class='el-icon-plus'></i>增加条件
            </div>
        </div>
        <div class="spacing-box red" v-else>资质最多只可添加3条</div>
        <!-- 资质关系 -->
        <div class="rela">
            <el-row>
                <el-col :span="2">资质关系:</el-col>
                <el-col :span="14">
                    <span v-for="(el,i) in rela" class="rela-item" :class="el.key == rangeType? 'current':''"  :key='i' @click='relaFn(el)'>{{el.name}}</span>
                </el-col>
            </el-row>
        </div>
        <f-vip @toChildEvent='closeload' v-if='svip'></f-vip>
    </div>
</template>
<script>
export default {
    name:'screenZZ',    
    data () {
        return {
            svip: false,
            rela: [
                {
                    name: '和',
                    key: 'and'
                },
                {
                    name: '或',
                    key: 'or'
                }
            ],
            rangeType:'and',
            lengthList:[//资质数组，外层条数
                {
                    one:{
                        list:[],//用作显示
                        code:'',
                    },
                    two:{
                        list:[],//用作显示
                        code:'',
                    },
                    three:{
                        list:[],//用作显示
                        code:'',
                    },
                    str:''//记录选择的值
                }
            ]
        }
    },
    props:{
        qualList:{
            type:Array
        },
        zztype:{
            default:''
        },
        type:{
            default:''
        }
    },
    methods: {
        closeload(val) {
            this.svip = val.cur
        },
        judvip() {
            if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
                if (localStorage.getItem('permissions') == '') {
                    this.svip = true
                    this.modalHelper.afterOpen();
                }
            } else {
                this.$confirm(this.qjTipTxt, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/logo')
                }).catch(() => {

                });
            }
        },
        relaFn(el){//资质关系变化
            this.rangeType=el.key;
            this.returnStr()
        },
        oneChangeFn(o){//第一级资质变化
            o.two.code='';
            o.two.list=[];
            o.three.code='';
            o.three.list=[];
            for(let x of o.one.list){
                if(x.code==o.one.code){
                    o.two.list=x.data
                }
            }
        },
        twoChangeFn(o){//第二级资质变化
            o.three.code='';
            o.three.list=[];
            for(let x of o.two.list){
                if(x.code==o.two.code){
                    o.three.list=x.data
                }
            }
            o.str=o.two.code;//将code扔到大list上
            if(this.forinFn()){
                o.two.code='';
                this.$confirm('资质条件重复，请重新选择', '提示', {
                    type: 'warning',
                    showCancelButton: false,
                    showConfirmButton: false
                })
                return
            }
            this.returnStr()
        },
        threeChangeFn(o){//第三级资质变化
            let arr=[];
            arr[0]=o.two.code;
            arr[1]=o.three.code;
            o.str=arr.join('/');//斜线分割
            if(this.forinFn()){
                o.three.code='';
                this.$confirm('资质条件重复，请重新选择', '提示', {
                    type: 'warning',
                    showCancelButton: false,
                    showConfirmButton: false
                })
                return
            }
            this.returnStr()
        },
        forinFn(){
            if(this.lengthList.length>1){
                for(let x in this.lengthList){
                    if(x==1){
                        if(this.lengthList[x].str==this.lengthList[x-1].str){
                            return true
                        }
                    }else if(x==2){
                        if(this.lengthList[x].str==this.lengthList[0].str){
                            return true
                        }
                    }
                }
            }
        },
        returnStr(){//抛回父组件参数
            let arr=[]
            for(let x of this.lengthList){
                if(x.str==''){//防止传空值
                    break
                }
                arr.push(x.str)
            }
            let data={
                type:this.rangeType,//资质关系
                str:arr.join(','),//多条资质一个str
            }
            this.$emit('contentChange',data)
        },
        addFn(){//增加条件
            if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
                if (!localStorage.getItem('permissions')||localStorage.getItem('permissions') == '') {
                    this.svip = true
                    this.modalHelper.afterOpen();
                    return false
                }
            } else {
                this.$confirm(this.qjTipTxt, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/logo')
                }).catch(() => {

                });
                return false
            }
            // 会员拦截 end
            for(let x of this.lengthList){
                if(x.str==''){
                    return this.$confirm('请将上一级资质填充满,再添加下一级资质！', '提示', {
                        type: 'warning',
                        showCancelButton: false,
                        showConfirmButton: false
                    })
                }
            }
            //不可重复 end
            let data={
                one:{
                    list:this.qualList,//用作显示
                    code:'',
                },
                two:{
                    list:[],//用作显示
                    code:'',
                },
                three:{
                    list:[],//用作显示
                    code:'',
                },
                str:''//记录选择的值
            }
            this.lengthList.push(data);
        },
        delFn(i){//删除
            this.lengthList.splice(i,1);
            this.returnStr();
        },
    },
    created(){
        this.lengthList[0].one.list=this.qualList;
        //根据父级的值，还原状态
        if(this.type&&this.type!=''){
            this.rangeType=this.type
        }
        if(this.zztype&&this.zztype!=''){
            let arr=this.zztype.split(',');
            for(let o in arr){
                let data={};
                data.str=arr[o]
                data.one={
                    list:'',//用作显示
                    code:'',
                };
                data.one.list=this.qualList
                let arr1=arr[o].split('/');
                for(let y of this.qualList){
                    for(let z of y.data){
                        if(z.code==arr1[0]){
                            data.two={
                                list:'',
                                code:'',
                            }
                            data.two.list=y.data;
                            data.two.code=z.code;
                            for(let x of z.data){
                                if(x.code==arr1[1]){
                                    data.three={
                                        list:'',
                                        code:''
                                    }
                                    data.three.list=z.data;
                                    data.three.code=x.code;
                                }
                            }
                        }
                    }
                    data.one.code=y.code;
                    break
                }
                this.lengthList[o]=data
            }
        }
    }
}
</script>
<style lang="less" scoped>
.screenZZ{
    .screen{
        margin-bottom: 10px
    }
    .el-select{
        margin-right: 10px;
        width: 225px;
    }
    .padding-l{
        padding-left: 82px;
        .del-btn{
            color: #FE6603;
            cursor: pointer;
        }
    }
    .spacing-box{
        padding-left: 82px;
        margin-top: 20px;
        margin-bottom: 20px;
        .btn{
            color: #FE6603;
            height: 28px;
            line-height: 28px;
            border: 1px solid #FE6603;
            width: 92px;
            border-radius: 5px;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
        }
    }
    .red{
        color: red;
        font-size: 12px;
    }
    .rela-item{
        width: 60px;
        height: 25px;
        line-height: 25px;
        background-color: #DDDDDD;
        text-align: center;
        font-size: 14px;
        margin-right: 30px;
        cursor: pointer;
        display: inline-block;
        color: #000;
    }
    .current{
        background-color: #FE6603;
        color: #fff;
    }
}
</style>