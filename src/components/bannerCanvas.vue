<!-- 模型： DOM 结构 -->
<template>
    <div class="bannerCanvas">
        <canvas ref="canvas">你的浏览器居然不支持Canvas？！赶快换一个吧！！</canvas>
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
            oceanWidth:54,
            gridSize:82,
            vertexSize:1,
            oceanHeight:20,
            waveSize:80,
            perspective:800,
            c:null,
            frame:0,
            depth:null,
        }
    },
    props:{
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        // this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
            this.c =this.$refs.canvas.getContext('2d');
            for (let i = 0; i < this.vertexCount; i++) {
                let x = i % this.oceanWidth
                let y = 0
                let z = i / this.oceanWidth >> 0
                let offset = this.oceanWidth / 2
                this.vertices.push([(-offset + x) * this.gridSize, y * this.gridSize, z * this.gridSize])
            }
            this.depth = this.vertexCount / this.oceanWidth * this.gridSize
            requestAnimationFrame(this.loop)
        // });
    },
    methods: {
        // 方法 集合
        loop(){
            let that=this;
            let c=this.c;
            let canvas=c.canvas;
            let { sin, cos, tan, PI } = Math
            let rad = sin(that.frame / 100) * PI / 20
            let rad2 = sin(that.frame / 50) * PI / 10
            that.frame++
            // let img=new Image();
            // img.src='../assets/img/logoB.png';
            // img.onload=function(){
            //     let pattern=c.createPattern(img,'repeat');
            //     c.fillStyle=pattern;
            //     c.fillRect(0,0,canvas.width,canvas.height);
            // }
            let gr=c.createRadialGradient(canvas.width/2,canvas.height/2,5,canvas.width/2,canvas.height/2,canvas.width/2);
            gr.addColorStop(0,'#EC7522');//'#381402'
            gr.addColorStop(1,'#381402');
            c.fillStyle=gr;
            c.fillRect(0,0,canvas.width,canvas.height);
            c.save()
            // c.translate(this.w/ 2,this.h/ 2)
            
            // c.beginPath()
            that.vertices.forEach((vertex, i) => {
                let ni = i + that.oceanWidth
                let x = vertex[0] - that.frame % (that.gridSize * 2)
                let z = vertex[2] - that.frame * 2 % that.gridSize + (i % 2 === 0 ? that.gridSize / 2 : 0)
                let wave = (cos(that.frame / 45 + x / 50) - sin(that.frame / 20 + z / 50) + sin(that.frame / 30 + z*x / 10000))
                let y = vertex[1] + wave * that.waveSize
                let a = Math.max(0, 1 - (Math.sqrt(x ** 2 + z ** 2)) / this.depth)
                let tx, ty, tz
                
                y -= that.oceanHeight
                
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

                x /= z / that.perspective
                y /= z / that.perspective
                
                
                    
                if (a < 0.01) return
                if (z < 0) return
            
                
                c.globalAlpha = a
                c.fillStyle = `rgb(255,255,255)`
                c.fillRect(x - a * that.vertexSize / 2, y - a * that.vertexSize / 2, a * that.vertexSize, a * that.vertexSize)
                c.globalAlpha = 1
            })
            c.restore()
            requestAnimationFrame(this.loop)
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
canvas {
//    position: absolute;
//    top: 0;
//    left: 0;
   width: 100%;
   height:400px;
}
</style>
