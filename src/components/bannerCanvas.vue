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
            num:600,
            size:0.5,
            speed:20000,
            particles:[]
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
        this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
            this.startAnimation();
        });
    },
    methods: {
        // 方法 集合
        rand(low, high) {
            return Math.random() * (high - low) + low;
        },
        createParticle(canvas) {
            const colour = {
                r: 255,
                g: this.randomNormal({ mean: 125, dev: 20 }),
                b: 50,
                a: this.rand(0, 1),
            };
            return {
                x: -2,
                y: -2,
                diameter: Math.max(0, this.randomNormal({ mean: this.size, dev: this.size / 2 })),
                duration: this.randomNormal({ mean: this.speed, dev: this.speed * 0.1 }),
                amplitude: this.randomNormal({ mean: 16, dev: 2 }),
                offsetY: this.randomNormal({ mean: 0, dev: 10 }),
                arc: Math.PI * 2,
                startTime: performance.now() - this.rand(0, this.speed),
                colour: `rgba(${colour.r}, ${colour.g}, ${colour.b}, ${colour.a})`,
            }
        },
        moveParticle(particle, canvas, time) {
            const progress = ((time - particle.startTime) % particle.duration) / particle.duration;
            return {
                ...particle,
                x: progress,
                y: ((Math.sin(progress * particle.arc) * particle.amplitude) + particle.offsetY),
            };
        },
        normalPool(o){var r=0;do{var a=Math.round(normal({mean:o.mean,dev:o.dev}));if(a<o.pool.length&&a>=0)return o.pool[a];r++}while(r<100)},
        randomNormal(o){if(o=Object.assign({mean:0,dev:1,pool:[]},o),Array.isArray(o.pool)&&o.pool.length>0)return this.normalPool(o);var r,a,n,e,l=o.mean,t=o.dev;do{r=(a=2*Math.random()-1)*a+(n=2*Math.random()-1)*n}while(r>=1);return e=a*Math.sqrt(-2*Math.log(r)/r),t*e+l},
        drawParticle(particle, canvas, ctx) {
            canvas = this.$refs.canvas;
            const vh = canvas.height / 100;
            ctx.fillStyle = particle.colour;
            ctx.beginPath();
            ctx.ellipse(
                particle.x * canvas.width,
                particle.y * vh + (canvas.height / 2),
                particle.diameter * vh,
                particle.diameter * vh,
                0,
                0,
                2 * Math.PI
            );
            ctx.fill();
        },
        draw(time, canvas, ctx) {
            let that=this
            // Move particles
            that.particles.forEach((particle, index) => {
                that.particles[index] = that.moveParticle(particle, canvas, time);
            })
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw the particles
            that.particles.forEach((particle) => {
                that.drawParticle(particle, canvas, ctx);
            })
            // Schedule next frame
            requestAnimationFrame((time) => that.draw(time, canvas, ctx));
        },
        initializeCanvas() {
            let canvas = this.$refs.canvas;
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            let ctx = canvas.getContext("2d");

            window.addEventListener('resize', () => {
                canvas.width = canvas.offsetWidth * window.devicePixelRatio;
                canvas.height = canvas.offsetHeight * window.devicePixelRatio;
                ctx = canvas.getContext("2d");
            })

            return [canvas, ctx];
        },
        startAnimation() {
            let that=this
            const [canvas, ctx] = this.initializeCanvas();
            // Create a bunch of particles
            for (let i = 0; i < this.num; i++) {
                that.particles.push(this.createParticle(canvas));
            }
            requestAnimationFrame((time) => this.draw(time, canvas, ctx));
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
canvas {
    width: 100%;
    height: 400px;
    // background: linear-gradient(to bottom, rgb(10, 10, 50) 0%,rgb(60, 10, 60) 100%);
    background: url('../assets/img/logoB.png')
}
</style>
