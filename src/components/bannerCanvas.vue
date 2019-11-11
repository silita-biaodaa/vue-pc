<!-- 模型： DOM 结构 -->
<template>
    <div class="bannerCanvas">
        <canvas ref="canvas" :style="{width:w+'px',height:h+'px'}"></canvas>
    </div>
</template>
<script>
export default {
    name: 'bannerCanvas', // 结构名称
    data() {
        return {
            // 数据模型a
            vertices:[],
            vertexCount:6000,
            oceanWidth:64,
            gridSize:32,
            vertexSize:3,
            oceanHeight:-160,
            waveSize:50,
            perspective:500,
            c:null,
            postctx:null,
        }
    },
    props:{
        w:{
            type:Number
        },
        h:{
            type:Number
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.c = document.createElement('canvas').getContext('2d');
        this.postctx = document.body.appendChild(document.createElement('canvas')).getContext('2d');

        for (let i = 0; i < this.vertexCount; i++) {
            let x = i % this.oceanWidth
            let y = 0
            let z = i / this.oceanWidth >> 0
            let offset = this.oceanWidth / 2
            this.vertices.push([(-offset + x) * this.gridSize, y * this.gridSize, z * this.gridSize])
        }
        this.loop()
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
        });
    },
    methods: {
        // 方法 集合
        loop(){
            let c=this.c;
            let postctx=this.postctx;
            let canvas=c.canvas;
            

            let depth = (this.vertexCount / this.oceanWidth * this.gridSize)
            let frame = 0
            let { sin, cos, tan, PI } = Math
            let rad = sin(frame / 100) * PI / 20
            let rad2 = sin(frame / 50) * PI / 10
            frame++
            // if (postctx.canvas.width !== postctx.canvas.offsetWidth || postctx.canvas.height !== postctx.canvas.offsetHeight) { 
            //     postctx.canvas.width = canvas.width = postctx.canvas.offsetWidth
            //     postctx.canvas.height = canvas.height = postctx.canvas.offsetHeight
            // }
            let gr=c.createRadialGradient(this.w/2,this.h/2,40,this.w/2,this.h/2,this.w/2);
            gr.addColorStop(0,'#381402');
            gr.addColorStop(1,'#150700');
            c.fillStyle=gr;
            c.fillRect(0,0,this.w,this.h);
                // c.fillStyle = `rgb(255,102,3)`
            // c.fillRect(0, 0, canvas.width, canvas.height)
            c.save()
            // c.translate(this.w/ 2,this.h/ 2)
            
            c.beginPath()
            this.vertices.forEach((vertex, i) => {
                let ni = i + this.oceanWidth
                let x = vertex[0] - frame % (this.gridSize * 2)
                let z = vertex[2] - frame * 2 % this.gridSize + (i % 2 === 0 ? this.gridSize / 2 : 0)
                let wave = (cos(frame / 45 + x / 50) - sin(frame / 20 + z / 50) + sin(frame / 30 + z*x / 10000))
                let y = vertex[1] + wave * this.waveSize
                let a = Math.max(0, 1 - (Math.sqrt(x ** 2 + z ** 2)) / depth)
                let tx, ty, tz
                
                y -= this.oceanHeight
                
                // Transformation variables
                tx = x
                ty = y
                tz = z

                // Rotation Y
                tx = x * cos(rad) + z * sin(rad)
                tz = -x * sin(rad) + z * cos(rad)
                
                x = tx
                y = ty
                z = tz
                
                // Rotation Z
                tx = x * cos(rad) - y * sin(rad)
                ty = x * sin(rad) + y * cos(rad) 
                
                x = tx;
                y = ty;
                z = tz;
                
                // Rotation X
                
                ty = y * cos(rad2) - z * sin(rad2)
                tz = y * sin(rad2) + z * cos(rad2)
                
                x = tx;
                y = ty;
                z = tz;

                x /= z / this.perspective
                y /= z / this.perspective
                
                
                    
                if (a < 0.01) return
                if (z < 0) return
            
                
                c.globalAlpha = a
                c.fillStyle = `rgb(255,255,255)`
                c.fillRect(x - a * this.vertexSize / 2, y - a * this.vertexSize / 2, a * this.vertexSize, a * this.vertexSize)
                c.globalAlpha = 1
            })
            c.restore()
            
            // Post-processing
            postctx.drawImage(canvas, 0, 0)
            postctx.globalCompositeOperation = "screen"
            // postctx.filter = 'blur(16px)'
            postctx.drawImage(canvas, 0, 0)
            // postctx.filter = 'blur(0)'
            postctx.globalCompositeOperation = "source-over"
            
            requestAnimationFrame(this.loop())
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>

</style>
