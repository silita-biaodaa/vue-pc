<template>
	<div class="select dfrb">
		<h6>{{timeTxt}}</h6>
		<div>
			<ul>
				<li v-for='(el,i) in province' :key='i' :class="el.old == Otime ? 'current':''" @click='evalclass(el)'>{{el.name}}</li>
			</ul>
			<div class="row drc fs14">
				<el-date-picker class="borde fs14 mr20" v-model="defO" type="date" value-format='yyyy-MM-dd' placeholder="起始日期"></el-date-picker>
				至
				<el-date-picker class="borde fs14 ml20 mr20" v-model="defN" type="date" value-format='yyyy-MM-dd' placeholder="结束日期"></el-date-picker>
				<div  class="t-btn bg-theme cp" @click="find">确定</div>
			</div>
		</div>
		<!-- <el-col :span='6'>
			<ul class='left pro'>
				<li v-for='(el,i) in province' :key='i' class='left' :class="el.old == Otime ? 'current':''" @click='evalclass(el)'>{{el.name}}
				</li>
			</ul>
		</el-col>
		<el-col :span="12" class="ttt">
			<el-date-picker v-model="defO" type="date" value-format='yyyy-MM-dd' placeholder="起始日期">
			</el-date-picker>
			<div class="in-line">

			</div>
			<el-date-picker v-model="defN" type="date" value-format='yyyy-MM-dd' placeholder="结束日期">
			</el-date-picker>
			<div class="t-btn" @click="find">确定</div>
		</el-col> -->
	</div>
</template>
<script>
	export default {
		data() {
			return {
				province: [{
						name: '全部',
						new: '',
						old: ''
					},
					{
						name: '近三年',
						new: '',
						old: '',
					},
					{
						name: '近五年',
						new: '',
						old: ''
					}
				],
				Ntime: '',
				Otime: '',
				defN: '',
				defO: ''
			}
		},
		methods: {
			evalclass(el) {
				this.defN = ''
				this.defO = ''
				this.Ntime = el.new
				this.Otime = el.old
				this.$emit('time', {
					new: this.Ntime,
					old: this.Otime
				})
			},
			find() {
				if (this.defN == '' && this.defO == '') {
					return
				}
				this.Ntime = null
				this.Otime = null
				this.$emit('time', {
					new: this.defN,
					old: this.defO
				})
			},
			gainTime() {
				var myDate = new Date();
				let y=myDate.getFullYear(),
					mon=myDate.getMonth()+1,
					day=myDate.getDate();
				mon=mon<10?'0'+mon:mon;
				day=day<10?'0'+day:day;
				if(mon=='02'&&day==29){
					day=28
				}
				this.province[1].old=(y-3)+'-'+mon+'-'+day;
				this.province[2].old=(y-5)+'-'+mon+'-'+day;

			}
		},
		watch: {
			defN() {
				if (this.defN == null && this.defO == null) {
					this.Ntime = ''
					this.Otime = ''
					this.$emit('time', {
						new: this.Ntime,
						old: this.Otime
					})
				}
			},
			defO() {
				if (this.defN == null && this.defO == null) {
					this.Ntime = ''
					this.Otime = ''
					this.$emit('time', {
						new: this.Ntime,
						old: this.Otime
					})
				}
			}
		},
		created() {
			this.gainTime()
			let n = this.$parent.data.buildEnd;
			let o = this.$parent.data.buildStart;
			if (sessionStorage.getItem('fwSerach')) {
				let data = JSON.parse(sessionStorage.getItem('fwSerach'));
				n = data.end;
				o = data.start;
			}
			if ((n == this.province[1].new && o == this.province[1].old) || (n == this.province[2].new && o == this.province[2].old)) {
				this.Ntime = n;
				this.Otime = o;
			} else {
				this.defN = n;
				this.defO = o;
			}
		},
		props: {
			timeTxt: {
				default: '竣工时间'
			}
		}
	}
</script>
<style lang="less" scoped>
	.select.dfrb>div{
		width:calc(100% - 84px);
		ul{
			width:100%
		}
		.row{
			.el-input{
				width: 115px;
				height:36px;
				padding: 8px 10px;
				box-sizing: border-box;
			}
			.el-input /deep/ input{
				background: transparent;
				padding: 0;
				border: none;
				height: auto;
				padding-left: 20px;
				line-height: normal
			}
			.el-input /deep/ .el-input__icon{
				line-height: normal
			}
			.t-btn{
				width: 60px;
				line-height: 36px;
				color: #fff;
				text-align: center;
			}
		}
	}
</style>
