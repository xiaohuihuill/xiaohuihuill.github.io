<template>
  <div ref="scroll_wrapper" class="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    pullup: {
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
        if (!this.$refs.scroll_wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.scroll_wrapper, {
          probeType: this.probeType,
          click: this.click
        })
        if (this.listenScroll) {
          let that = this
          this.scroll.on('scroll', (pos) => {
            that.$emit('scroll', pos, this.scroll.y, this.scroll.maxScrollY)
          })
        }
        if (this.listenScroll) {
          let that = this
          this.scroll.on('scroll', (pos) => {
              if (this.scroll.y <= (this.scroll.maxScrollY + 50)||this.scroll.y>0) {
              that.$emit('scroll', pos,this.scroll.y,this.scroll.maxScrollY)
            }
          })
        }
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            // if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            //   this.$emit('scrollToEnd',this.scroll.y,this.scroll.maxScrollY)
            // }
            this.$emit('scrollToEnd',this.scroll.y,this.scroll.maxScrollY)
          })
        }
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          // if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
          //   this.$emit('scrollToEnd',this.scroll.y,this.scroll.maxScrollY)
          // }
          this.$emit('scrollToEnd', this.scroll.y, this.scroll.maxScrollY)
        })
      }
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay)
    }
  }
}
</script>
<style lang="scss">
.scroll {
  width: 100%;
  height: 100%;
}
</style>
