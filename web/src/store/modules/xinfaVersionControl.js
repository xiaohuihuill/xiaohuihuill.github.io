const xinfaVersionControl = {
  state: {
    localhost: window.location.host,
    text: "易信发",
    text1: "云信发",
    img: "https://yixinfa-prod.oss-cn-shenzhen.aliyuncs.com/webImg/login_logo_0.png",
    img1: "https://yixinfa-prod.oss-cn-shenzhen.aliyuncs.com/webImg/login_logo_1.png"
  },
  mutations: {},
  actions: {},
  getters: {
    getLocalHost: state => {
      return state.localhost; 
    },
    getText: state => {
      // console.log(222222,this.a.getters.isNewbp())
      if (state.localhost.indexOf("neubp.yixinfa.cn") == -1) {
        return state.text;
      } else {
        return state.text1;
      }
    },
    getIMG: state => {
      if (state.localhost.indexOf("neubp.yixinfa.cn") == -1) {
        return state.img;
      } else {
        return state.img1;
      }
    },
    isNewbp : state => {
      return state.localhost.indexOf("neubp.yixinfa.cn") == -1;
    }
  }
};

export default xinfaVersionControl;
