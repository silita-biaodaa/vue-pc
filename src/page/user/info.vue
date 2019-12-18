<template>
	<div class="info">
		<div class="det-nav">
			<div>我的消息</div>
			<div>
				<div class="info-btn" v-show="btnS && shide " @click="btnS = false">编辑
				</div>
				<div v-show="!btnS  && shide" class="list-btn">
					<div class="info-btn" @click="addes">{{state}}</div>
					<div class="info-btn" @click="addre">设为已读</div>
					<div class="info-btn" @click="delno">删除</div>
					<div class="info-btn" @click="btnS = true">取消</div>
				</div>
			</div>
		</div>

		<v-reply :current='current' @page='gaincur' @hide='inhide' v-if="btnS"></v-reply>
		<v-redit :current='current' @page='gaincur' @hide='inhide' v-else :alles='alles' :allre='allre' :allde='allde'></v-redit>
	</div>
</template>
<script>
import reply from '@/page/user/reply'
import redit from '@/page/user/redit'
	import {} from "@/api/index";
	export default {
		data() {
			return {
				btnS: true,
				current: 1,
				alles: 1,
				allre: 1,
				allde: 1,
				state: '全选',
				shide: false
			}
		},
		methods: {
			inhide(val) {
				this.shide = val.state
			},
			gaincur(val) {
				this.current = val.state
			},
			addes() {
				this.alles = this.alles + 1
			},
			addre() {
				this.allre = this.allre + 1
			},
			delno() {
				this.allde = this.allde + 1
			},
		},
		created() {

		},
		components: {
			'v-reply':reply,
			'v-redit':redit
		}
	}
</script>
<style lang="less" scoped>
	.info {
		background-color: #fff;
		width: 100%;
		padding-bottom: 20px;

		.det-nav {
			line-height: 54px;
			padding: 0 29px;
			font-size: 16px;
			font-weight: 500;
			border-bottom: 1px solid #F2F2F2;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.list-btn {
				display: flex;
				flex-direction: row;
			}

			.info-btn {
				height: 24px;
				border: 1px solid #DDDFE4;
				border-radius: 5px;
				text-align-last: center;
				line-height: 24px;
				color: #150000;
				font-size: 14px;
				padding: 0 17px;
				cursor: pointer;
				margin-left: 10px;
			}
		}
	}
</style>
