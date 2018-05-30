const upload = {
  state: {
    infor: [1,2,3]
  },
  mutations: {
    addMaterials: (state, val) => {
      state.infor = val;
    }
  },
  getters: {
    getMaterials: start => {
      return start.infor;
    }
  },
  actions: {}
};

export default upload;
