<template>
<div class="pdet">
  <div class="det-nav">
    个人信息
  </div>
  <div class="det-put">
    <div>
      <div class="put-l ">
        <div class="put-w m-r">账&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp号:</div><el-input  v-model="account" disabled placeholder="请输入账号" ></el-input>
      </div>
      <div class="put-l ">
        <div class="put-w m-r">昵&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp称:</div><el-input  v-model="nickname" placeholder="请输入昵称" ></el-input>
      </div>
      <div class="put-l ">
        <div class="m-r put-w">真实姓名:</div><el-input  v-model="name" placeholder="请输入您的真实姓名" ></el-input>
      </div>
      <div class="put-l ">
        <div class="put-w m-r">性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别:</div> 
        <div class="text">
           <el-select v-model="sex" placeholder="请选择性别" clearable >
             <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
           </el-select>
        </div>
       
      </div>
      <div class="put-l ">
        <div class=" put-w m-r">企业名称:</div><el-input  v-model="firm" placeholder="请输入企业名称" ></el-input>
      </div>
      <div class="put-l ">
        <div class=" put-w m-r">职务名称:</div><el-input  v-model="duty" placeholder="请输入职务名称" ></el-input>
      </div>
      <div class="put-l m-t">
        <div class="put-w m-r"></div>
        <div class="put-btn" @click="save" >
          保存
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { updateUserTemp,getUserTemp } from '@/api/index'
export default {
  data () {
    return {
       options: [{
          value: 1,
          label: '男'
        }, {
          value: 0,
          label: '女'
        }],
      account:'',
      nickname:'',
      name:'',
      sex: null,
      firm:'',
      duty:'',
      userData:{},
    }
  },
  methods: {
    save() {
      updateUserTemp({inCompany:this.firm.trim(),sex:this.sex,nikeName:this.nickname.trim(),position:this.duty.trim(),userName:this.name.trim()}).then(res => {
        console.log(res);
        if(res.code == 1) {
            localStorage.setItem('permissions',res.data.permissions)
            localStorage.setItem('Bname',this.nickname.trim())
           if(sessionStorage.getItem('xtoken')) {
             sessionStorage.setItem('xtoken',res.data.xtoken)
           } else {
             localStorage.setItem('Xtoken',res.data.xtoken)
           }
            this.$notify({
            title: '提示',
            message: '用户信息更新成功',
            offset: 100   
          });
          this.$emit('refresh', {cur:true}) 
        }
      })
    },
    getUser() {
      getUserTemp({}).then(res => {
        if(res.code == 1 ) {
            this.account = res.data.phoneNo
            this.nickname = res.data.nikeName
            this.name = res.data.userName ? res.data.userName : ''
            this.sex = (res.data.sex == null ? '' : res.data.sex);
            this.firm = res.data.inCompany ? res.data.inCompany : ''
            this.duty = res.data.position ? res.data.position : ''
        }
      })
    }
  },
  created () {
    this.getUser()
  },
  components: {

  }
}
</script>
<style lang="less" scoped>
.pdet{
  background-color: #fff;
  width: 100%;
  padding-bottom: 120px;
  .det-nav {
    line-height: 54px;
    padding-left: 29px;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 1px solid #F2F2F2;
    box-sizing: border-box;
  }
  .det-put {
    display: flex;
    align-items: center;
    flex-direction:column;
    font-size: 14px;
    color: #666;
    padding-top: 50px;
    .put-l{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 350px;
      margin-bottom: 24px;
      .m-r {
        margin-right: 10px;
      }
      .put-w  {
        width: 80px;
      }
      .text {
        width: 100%;
      }
      .put-btn {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #FE6603;
        font-size: 14px;
        font-weight: 500;
        color:#fff;
        cursor: pointer;
      }
     
    }
    .m-t {
      margin-top: 40px;
    }
  }
}
</style>
