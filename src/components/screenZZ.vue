<template>
    <div class="screenZZ">
        <div class="search-b">
            <span class="font16">资质要求：</span>
            <el-input
                placeholder="请输入关键字，查找资质"
                prefix-icon="el-icon-search"
                v-model="seachTxt">
            </el-input>
            <ul class="search-list" v-if="isshow">
                <li v-for="(o,i) of searchList" :key="i" @click="listClickFn(o)">{{o.quaName}}</li>
            </ul>
            <span v-if="length0" class="search-tips">暂未找到该资质，请输入其他关键字</span>
        </div>
        <!-- 资质筛选 -->
        <div v-for="(el,i) of lengthList" :key="i" class="screen padding-l">
            <el-select placeholder="选择资质类型" clearable v-model="el.one.code" @change="oneChangeFn(el,i)"  @click.native='judvip'>
                <el-option v-for="item in el.one.list" :key="item.name" :label="item.name" :value="item.code"></el-option>
            </el-select>
            <el-select placeholder="请选择" clearable v-model="el.two.code"  @change="twoChangeFn(el,i)" v-if="el.two.list.length>0">
                <el-option v-for="item in el.two.list" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
            <el-select placeholder="请选择" clearable v-model="el.three.code" @change="threeChangeFn(el,i)" v-if="el.three.list.length>0">
                <el-option v-for="item in el.three.list" :key="item.name" :label="item.name" :value="item.code"></el-option>
            </el-select>
            <span class='del-btn' @click='delFn(i)' v-if="i!=0">删除</span>
        </div>
        <!-- 增加条件 -->
        <div class="spacing-box">
            <div class="btn" @click="addFn">
                <i class='el-icon-plus'></i>增加条件
            </div>
        </div>
        <!-- <div class="spacing-box red" v-else>资质最多只可添加3条</div> -->
        <!-- 资质关系 -->
        <div class="rela" v-if="!bid&&lengthList.length>1">
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
            seachTxt:'',
            svip: false,
            rela: [
                {
                    name: '满足任意一个',
                    key: 'or'
                },
                {
                    name: '满足所有',
                    key: 'and'
                }
            ],
            rangeType:'or',
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
            ],
            searchList:[],
            isshow:false,
            length0:false
        }
    },
    props:{
        qualList:{
            type:Array
        },
        zztype:{//资质内容
            default:''
        },
        type:{//资质关系
            default:''
        },
        bid:{//是否招标
            default:false
        },
        query:{//是否综合查询
            default:false
        }
    },
    watch:{
        seachTxt(val,oldVal){
            if(val==''){
                this.isshow=false
                return 
            }
            if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='false'&&!this.query) {
                this.svip = true
                this.modalHelper.afterOpen();
                return false
            }
            this.length0=false
            this.isshow=true
            this.seachFn(val);
        }
    },
    methods: {
        seachFn(val){//资质查询
            let arr=[]
            for(let x of this.qualList){
                for(let y of x.data){
                    let data={
                        quaName:x.name+'-'+y.name,
                        quaCode:x.code+'-'+y.code,
                    }
                    if(y.name.indexOf(val)>-1){
                        arr.push(data)
                    }
                }
            }
            if(arr.length==0){
                this.length0=true;
                this.isshow=false
            }else{
                this.searchList=arr;
            }
        },
        listIsIn(){//是否add
            for(let x of this.lengthList){
                if(!x.three.code||x.three.code==''){//第三级没填，就重复覆盖
                    if((x.two.code&&x.two.code!='')&&x.three.list&&x.three.list.length!=0){//
                        return x
                    }else if(!x.two.code||x.one.code==''){
                        return x
                    }else if(!x.two.code||x.two.code==''){
                        return x
                    }
                    
                }
            }
            return false
        },
        listClickFn(o){//联想搜索的点击
            this.isshow=false;
            this.seachTxt='';
            let arr=o.quaCode.split('-');
            if(this.listIsIn()){
                let x=this.listIsIn();
                for(let y of this.qualList){
                    if(arr[0]==y.code){
                        x.two.list=y.data//取第二层
                        for(let z of y.data){//循环第二层
                            if(arr[1]==z.code){
                                if(z.data){
                                    x.three.list=z.data;//取第三层
                                }else{
                                    x.three.list=[]
                                }
                                break
                            }
                        }
                        break
                    }
                }
                x.one.code=arr[0];
                x.two.code=arr[1];
                x.str=arr[1];
            }else{
                // if(this.lengthList.length==3&&!this.query){
                //     this.$confirm('最多只可添加三条资质', '提示', {
                //         type: 'warning',
                //         showCancelButton: false,
                //         showConfirmButton: false
                //     })
                //     return
                // }
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
                for(let y of this.qualList){
                    if(arr[0]==y.code){
                        data.two.list=y.data//取第二层
                        for(let z of y.data){//循环第二层
                            if(arr[1]==z.code){
                                data.three.list=z.data;//取第三层
                                break
                            }
                        }
                        break
                    }
                }
                data.one.code=arr[0];
                data.two.code=arr[1];
                data.str=arr[1];
                this.lengthList.push(data);
            }
            this.returnStr()
        },
        closeload(val) {
            this.svip = val.cur
        },
        judvip() {
            if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
                if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='false'&&!this.query) {
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
        oneChangeFn(o,i){//第一级资质变化
            o.two.code='';
            o.two.list=[];
            o.three.code='';
            o.three.list=[];
            o.str='';
            for(let x of o.one.list){
                if(x.code==o.one.code){
                    o.two.list=x.data
                }
            }
            this.$set(this.lengthList,i,this.lengthList[i])
            this.returnStr();
        },
        twoChangeFn(o,i){//第二级资质变化
            o.three.code='';
            o.three.list=[];
            for(let x of o.two.list){
                if(x.code==o.two.code){
                    if(x.data){
                        o.three.list=x.data
                    }else{
                        o.three.list=[]
                    }
                    
                }
            }
            o.str=o.two.code;//将code扔到大list上
            this.$set(this.lengthList,i,this.lengthList[i])
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
        threeChangeFn(o,i){//第三级资质变化
            let arr=[];
            arr[0]=o.two.code;
            arr[1]=o.three.code;
            o.str=arr.join('/');//斜线分割
            this.$set(this.lengthList,i,this.lengthList[i])
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
        forinFn(){//匹配是否重复
            if(this.lengthList.length>1){
                let arr=[],arr1=[];
                for(let x of this.lengthList){
                    arr.push(x.str)
                }
                arr1=new Set(arr);
                if(arr.length!=arr1.size){
                    return true
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
                if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='false'&&!this.query) {
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
                if(x.two.code===''){
                    this.$confirm('请将上一级资质填充满,再添加下一级资质！', '提示', {
                        type: 'warning',
                        showCancelButton: false,
                        showConfirmButton: false
                    })
                    return false
                }else{
                    if(x.three.list.length!=0&&x.three.code==''){
                        this.$confirm('请将上一级资质填充满,再添加下一级资质！', '提示', {
                            type: 'warning',
                            showCancelButton: false,
                            showConfirmButton: false
                        })
                        return false
                    }
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
    // mounted(){
    //     this.arrRead()
    // },
    created(){
        //根据父级的值，还原状态
        if(this.type&&this.type!=''){
            this.rangeType=this.type
        }
        if(this.zztype&&this.zztype!=''){
            let arr=this.zztype.split(',');
            for(let o in arr){
                if(arr[o]==''){
                    this.lengthList[o]={
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
                    continue
                }
                let data={};
                data.str=arr[o]
                data.one={
                    list:[],//用作显示
                    code:'',
                };
                data.one.list=this.qualList
                let arr1=arr[o].split('/');
                for(let y of this.qualList){
                    for(let z of y.data){
                        if(z.code==arr1[0]){
                            data.two={
                                list:[],
                                code:'',
                            }
                            data.two.list=y.data;
                            data.two.code=z.code;
                            if(arr1.length>1&&arr1[1]!=''){
                                for(let x of z.data){
                                    if(x.code==arr1[1]){
                                        data.three={
                                            list:[],
                                            code:''
                                        }
                                        data.three.list=z.data;
                                        data.three.code=x.code;
                                        break
                                    }
                                }
                            }else{
                                data.three={
                                    list:z.data,
                                    code:''
                                }
                            }
                            data.one.code=y.code;
                            break
                        }
                    }
                    
                }
                this.lengthList[o]=data
            }
        }else{
            this.lengthList[0].one.list=this.qualList;
        }
    }
}
</script>
<style lang="less" scoped>
.screenZZ{
    font-size: 16px;
    .screen{
        margin-bottom: 10px
    }
    .el-select{
        margin-right: 10px;
        width: 225px;
    }
    .el-input{
        width: 225px;
    }
    .padding-l{
        padding-left: 84px;
        .del-btn{
            color: #FE6603;
            cursor: pointer;
        }
    }
    .spacing-box{
        padding-left: 84px;
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
        font-size: 14px;
    }
    .rela-item{
        padding: 0 9px;
        height: 25px;
        line-height: 25px;
        // background-color: #DDDDDD;
        text-align: center;
        font-size: 16px;
        margin-right: 30px;
        cursor: pointer;
        display: inline-block;
        color: #000;
    }
    .current{
        background-color: #FE6603;
        color: #fff;
    }
    .search-b{
        margin-bottom: 10px;
        position: relative;
        .search-list{
            position: absolute;
            left: 82px;
            z-index: 999;
            top: 40px;
            border: 1px solid #f2f2f2;
            background: #fff;
            max-height: 132px;
            width: 470px;
            border-radius: 0 0 5px 5px;
            overflow-y: auto;
            li{
                padding: 10px;
                font-size: 14px;
                cursor: pointer;
            }
            li:hover{
                background-color: #FE6603;
                color: #fff;
            }
        }
        .search-tips{
            font-size: 14px;
            color: #FE6603;
            margin-left: 30px;
        }
    }
}
</style>